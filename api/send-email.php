<?php
/**
 * eLunch Contact Form - Email Notification Handler
 * Sends email notifications to sales team via Resend API
 * 
 * @version 1.0.0
 * @author eLunch Development Team
 */

// ===================================
// SECURITY HEADERS
// ===================================
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Método no permitido. Solo se aceptan solicitudes POST.'
    ]);
    exit;
}

// ===================================
// LOAD ENVIRONMENT VARIABLES
// ===================================
function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Parse KEY=VALUE
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Remove quotes if present
            $value = trim($value, '"\'');
            
            // Set environment variable
            putenv("$key=$value");
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }
    
    return true;
}

// Load .env from parent directory (outside public_html)
$env_path = dirname($_SERVER['DOCUMENT_ROOT']) . '/.env';

// Fallback: try current directory (for local testing)
if (!file_exists($env_path)) {
    $env_path = dirname(__DIR__) . '/.env';
}

if (!loadEnv($env_path)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de configuración del servidor. Por favor, contacta al administrador.'
    ]);
    error_log('ERROR: .env file not found at: ' . $env_path);
    exit;
}

// ===================================
// RATE LIMITING
// ===================================
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $rate_limit_file = sys_get_temp_dir() . '/elunch_rate_limit_' . md5($ip) . '.json';
    
    $max_submissions = 5;
    $time_window = 3600; // 1 hour in seconds
    
    // Load existing rate limit data
    if (file_exists($rate_limit_file)) {
        $data = json_decode(file_get_contents($rate_limit_file), true);
        $first_submission = $data['first_submission'] ?? time();
        $count = $data['count'] ?? 0;
        
        // Check if time window has expired
        if (time() - $first_submission > $time_window) {
            // Reset counter
            $data = [
                'first_submission' => time(),
                'count' => 1
            ];
        } else {
            // Increment counter
            $count++;
            
            if ($count > $max_submissions) {
                return [
                    'allowed' => false,
                    'remaining' => 0,
                    'reset_time' => $first_submission + $time_window
                ];
            }
            
            $data['count'] = $count;
        }
    } else {
        // First submission
        $data = [
            'first_submission' => time(),
            'count' => 1
        ];
    }
    
    // Save rate limit data
    file_put_contents($rate_limit_file, json_encode($data));
    
    return [
        'allowed' => true,
        'remaining' => $max_submissions - $data['count'],
        'reset_time' => $data['first_submission'] + $time_window
    ];
}

$rate_limit = checkRateLimit();

if (!$rate_limit['allowed']) {
    $minutes_remaining = ceil(($rate_limit['reset_time'] - time()) / 60);
    
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'error' => "Has excedido el límite de solicitudes. Por favor, intenta nuevamente en $minutes_remaining minutos."
    ]);
    exit;
}

// ===================================
// HONEYPOT SPAM DETECTION
// ===================================
$honeypot = $_POST['website'] ?? '';

if (!empty($honeypot)) {
    // Bot detected - return success but don't send email
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Formulario enviado correctamente.'
    ]);
    error_log('SPAM BLOCKED: Honeypot field filled by IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    exit;
}

// ===================================
// INPUT VALIDATION & SANITIZATION
// ===================================
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

// Validate required fields
if (empty($nombre) || empty($telefono) || empty($email) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Todos los campos son obligatorios.'
    ]);
    exit;
}

// Sanitize inputs
$nombre = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
$telefono = htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$mensaje = htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8');

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Por favor, ingresa un correo electrónico válido.'
    ]);
    exit;
}

// Validate name length
if (strlen($nombre) < 2 || strlen($nombre) > 100) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'El nombre debe tener entre 2 y 100 caracteres.'
    ]);
    exit;
}

// Validate phone length
if (strlen($telefono) < 8 || strlen($telefono) > 20) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'El teléfono debe tener entre 8 y 20 caracteres.'
    ]);
    exit;
}

// Validate message length
if (strlen($mensaje) < 10 || strlen($mensaje) > 1000) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'El mensaje debe tener entre 10 y 1000 caracteres.'
    ]);
    exit;
}

// ===================================
// GET RESEND API CREDENTIALS
// ===================================
$resend_api_key = getenv('RESEND_API_KEY') ?: '';
$from_email = getenv('RESEND_FROM_EMAIL') ?: 'noreply@mielunch.com';
$to_email = getenv('RESEND_TO_EMAIL') ?: 'cnavas@mielunch.com';

if (empty($resend_api_key)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de configuración del servidor. Por favor, contacta al administrador.'
    ]);
    error_log('ERROR: RESEND_API_KEY not configured in .env file');
    exit;
}

// ===================================
// COMPOSE EMAIL
// ===================================
$timestamp = date('d/m/Y H:i:s');
$subject = "🔔 Nuevo Lead - eLunch | $nombre";

// HTML Email Template
$html_body = <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.95;
        }
        .content {
            padding: 30px 20px;
        }
        .meta {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 12px 16px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-size: 13px;
        }
        .meta p {
            margin: 4px 0;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #ea580c;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .field-value {
            color: #1f2937;
            font-size: 15px;
            padding: 10px 12px;
            background-color: #f9fafb;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        .message-box {
            background-color: #f0fdf4;
            border: 1px solid #86efac;
            border-radius: 8px;
            padding: 16px;
            color: #166534;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .cta-section {
            background-color: #fef3c7;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin-top: 25px;
        }
        .cta-section h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #92400e;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 20px;
            text-align: center;
            font-size: 13px;
        }
        .footer a {
            color: #ea580c;
            text-decoration: none;
        }
        .divider {
            border: 0;
            border-top: 2px solid #e5e7eb;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍴 Nueva Solicitud de Cotización</h1>
            <p>eLunch - Catering Corporativo</p>
        </div>
        
        <div class="content">
            <div class="meta">
                <p><strong>📅 Fecha:</strong> $timestamp</p>
                <p><strong>🌐 Origen:</strong> Formulario Web (mielunch.com)</p>
            </div>
            
            <div class="section">
                <div class="section-title">👤 Datos del Cliente</div>
                
                <div class="field">
                    <div class="field-label">Nombre Completo</div>
                    <div class="field-value">$nombre</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Teléfono</div>
                    <div class="field-value">$telefono</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Correo Electrónico</div>
                    <div class="field-value">$email</div>
                </div>
            </div>
            
            <hr class="divider">
            
            <div class="section">
                <div class="section-title">💬 Mensaje del Cliente</div>
                <div class="message-box">$mensaje</div>
            </div>
            
            <div class="cta-section">
                <h3>🎯 Próximos Pasos</h3>
                <p style="margin: 10px 0 20px 0; color: #92400e;">Responde al cliente lo antes posible vía WhatsApp</p>
                <a href="https://wa.me/$telefono" class="btn">📱 Contactar por WhatsApp</a>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>eLunch</strong> - Catering Corporativo en El Salvador</p>
            <p>📞 <a href="tel:+50378778253">+503-7877-8253</a> | 🌐 <a href="https://mielunch.com">mielunch.com</a></p>
            <p style="margin-top: 10px; font-size: 11px; opacity: 0.8;">
                Este correo fue generado automáticamente desde el formulario de contacto web.
            </p>
        </div>
    </div>
</body>
</html>
HTML;

// Plain text version (fallback)
$text_body = <<<TEXT
🔔 NUEVA SOLICITUD DE COTIZACIÓN - eLunch

📅 Fecha: $timestamp
🌐 Origen: Formulario Web (mielunch.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 DATOS DEL CLIENTE:

Nombre: $nombre
Teléfono: $telefono
Email: $email

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MENSAJE:

$mensaje

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 PRÓXIMOS PASOS:
• Contactar al cliente vía WhatsApp: https://wa.me/$telefono
• Enviar cotización personalizada
• Seguimiento en 24 horas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

eLunch - Catering Corporativo
📞 +503-7877-8253 | 🌐 mielunch.com
TEXT;

// ===================================
// SEND EMAIL VIA RESEND API
// ===================================
$resend_payload = [
    'from' => 'eLunch <noreply@mielunch.com>',
    'to' => [$to_email],
    'subject' => $subject,
    'html' => $html_body,
    'text' => $text_body,
    'tags' => [
        [
            'name' => 'category',
            'value' => 'lead-notification'
        ]
    ]
];

$ch = curl_init('https://api.resend.com/emails');

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $resend_api_key,
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($resend_payload),
    CURLOPT_TIMEOUT => 10
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// ===================================
// HANDLE RESPONSE
// ===================================
if ($http_code === 200 || $http_code === 201) {
    $response_data = json_decode($response, true);
    
    // Log success
    error_log("SUCCESS: Email sent to $to_email | Lead: $nombre ($email) | Resend ID: " . ($response_data['id'] ?? 'unknown'));
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Tu solicitud ha sido enviada correctamente. Te contactaremos pronto.'
    ]);
} else {
    // Log error
    error_log("ERROR: Resend API failed | HTTP $http_code | Response: $response | cURL Error: $curl_error");
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error al enviar el correo. Por favor, intenta nuevamente o contáctanos por WhatsApp.'
    ]);
}

exit;
