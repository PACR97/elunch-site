# 🧪 eLunch - Email Notification System Testing Guide

## Table of Contents
1. [Pre-Deployment Testing (Local)](#pre-deployment-testing-local)
2. [Post-Deployment Testing (Production)](#post-deployment-testing-production)
3. [Test Scenarios](#test-scenarios)
4. [Email Template Testing](#email-template-testing)
5. [Security Testing](#security-testing)
6. [Performance Testing](#performance-testing)
7. [Browser Compatibility Testing](#browser-compatibility-testing)
8. [Test Checklist](#test-checklist)

---

## 🏠 Pre-Deployment Testing (Local)

### Prerequisites

Before testing locally, ensure you have:
- ✅ PHP 7.4+ installed (`php -v` to check)
- ✅ Local web server (XAMPP, MAMP, or PHP built-in server)
- ✅ `.env` file configured with Resend API key
- ✅ Domain verified in Resend (or using sandbox domain)

### Step 1: Start Local PHP Server

Navigate to project directory and start server:

```bash
cd /home/cano/Documents/elunch-site
php -S localhost:8000
```

**Output should show:**
```
PHP 8.1.0 Development Server (http://localhost:8000) started
```

### Step 2: Validate PHP Syntax

Check all PHP files for syntax errors:

```bash
# Test send-email.php
php -l api/send-email.php

# Expected output:
# No syntax errors detected in api/send-email.php
```

If errors are found, fix them before proceeding.

### Step 3: Test .env File Loading

Create a test script to verify environment variables load correctly:

**Create:** `test-env.php` (temporary file)

```php
<?php
// Test .env loading
function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            putenv("$key=" . trim($value, '"\''));
        }
    }
    return true;
}

$env_path = __DIR__ . '/.env';

if (loadEnv($env_path)) {
    echo "✅ .env file loaded successfully\n";
    echo "RESEND_API_KEY: " . (getenv('RESEND_API_KEY') ? 'Set (hidden)' : 'NOT SET') . "\n";
    echo "RESEND_FROM_EMAIL: " . getenv('RESEND_FROM_EMAIL') . "\n";
    echo "RESEND_TO_EMAIL: " . getenv('RESEND_TO_EMAIL') . "\n";
} else {
    echo "❌ Failed to load .env file\n";
}
?>
```

**Run:**
```bash
php test-env.php
```

**Expected output:**
```
✅ .env file loaded successfully
RESEND_API_KEY: Set (hidden)
RESEND_FROM_EMAIL: noreply@mielunch.com
RESEND_TO_EMAIL: cnavas@mielunch.com
```

**Delete test file after verification:**
```bash
rm test-env.php
```

### Step 4: Test Form Rendering

1. Open browser and navigate to: `http://localhost:8000`
2. Scroll to contact form section
3. **Verify:**
   - [ ] Form displays correctly
   - [ ] All 4 fields visible (nombre, telefono, email, mensaje)
   - [ ] Submit button shows "ENVIAR"
   - [ ] No JavaScript errors in console (F12)

### Step 5: Inspect Honeypot Field

1. Open browser DevTools (F12)
2. Go to **Elements** tab
3. Search for `id="website"`
4. **Verify:**
   - [ ] Field exists in HTML
   - [ ] Field has `style="position:absolute;left:-5000px;"` (hidden from view)
   - [ ] Field has `tabindex="-1"` (not focusable)
   - [ ] Field is NOT visible on the page

### Step 6: Test JavaScript Loading

1. Open browser console (F12 > Console tab)
2. Type: `contactForm`
3. **Expected:** Should show the form element object (not null/undefined)
4. Type: `showFormMessage('Test', 'success')`
5. **Expected:** Green success message appears above form

---

## 🌐 Post-Deployment Testing (Production)

### Prerequisites

- ✅ All files uploaded to Hostinger
- ✅ `.env` file placed outside `public_html/`
- ✅ Domain `mielunch.com` pointing to Hostinger
- ✅ SSL certificate active (HTTPS)

### Test 1: Basic Form Submission (Happy Path)

**Objective:** Verify complete workflow from form submission to email delivery and WhatsApp redirect.

**Steps:**

1. Navigate to **https://mielunch.com**
2. Scroll to **"Contacto"** section
3. Fill out form with valid data:
   - **Nombre:** Juan Pérez
   - **Teléfono:** 78778253
   - **Email:** test@example.com
   - **Mensaje:** Necesito cotización para evento corporativo de 50 personas el próximo viernes.

4. Click **"ENVIAR"**

**Expected Behavior:**

| Step | Expected Result | ✅/❌ |
|------|----------------|-------|
| 1. Button state changes | "ENVIAR" → "ENVIANDO..." with spinner | |
| 2. Message appears | Blue info message: "Enviando tu solicitud..." | |
| 3. Success message | Green message: "¡Solicitud enviada! Redirigiendo a WhatsApp..." | |
| 4. WhatsApp opens | New tab opens with WhatsApp Web after 1.5 seconds | |
| 5. Form resets | All fields cleared | |
| 6. Button resets | Returns to "ENVIAR" state | |
| 7. Email received | Email arrives at `cnavas@mielunch.com` within 10 seconds | |

**Verify Email Content:**

- [ ] Subject: "🔔 Nuevo Lead - eLunch | Juan Pérez"
- [ ] From: eLunch <noreply@mielunch.com>
- [ ] To: cnavas@mielunch.com
- [ ] Contains: Name, phone, email, message
- [ ] Contains: Timestamp (current date/time)
- [ ] Contains: "Contactar por WhatsApp" button
- [ ] HTML design displays correctly (colors, formatting)

**Verify WhatsApp:**

- [ ] URL includes phone number: 50372994388
- [ ] Message pre-filled with form data
- [ ] Name, phone, email, message all present in WhatsApp text

---

### Test 2: Form Validation (Error Handling)

**Objective:** Verify client-side validation catches invalid inputs.

#### Test 2a: Empty Fields

1. Leave all fields empty
2. Click **"ENVIAR"**

**Expected:**
- [ ] Red error message: "Por favor, completa todos los campos."
- [ ] Button remains enabled
- [ ] No API request sent (check Network tab)
- [ ] No WhatsApp redirect

#### Test 2b: Invalid Email Format

1. Fill out form:
   - Nombre: Test User
   - Teléfono: 12345678
   - Email: `notanemail` (no @ symbol)
   - Mensaje: Test message

2. Click **"ENVIAR"**

**Expected:**
- [ ] Red error message: "Por favor, ingresa un correo electrónico válido."
- [ ] No API request sent
- [ ] No WhatsApp redirect

#### Test 2c: Email with Missing Domain

1. Email: `test@` (incomplete)
2. Submit form

**Expected:**
- [ ] Same validation error as 2b

---

### Test 3: API Error Handling

**Objective:** Verify graceful degradation when email API fails.

#### Test 3a: Invalid API Key (Temporary)

**Setup:**
1. Edit `.env` file on server
2. Change `RESEND_API_KEY` to invalid value (e.g., `re_invalid`)
3. Save file

**Execute:**
1. Submit form with valid data
2. Observe behavior

**Expected:**
- [ ] Yellow warning message: "Error al enviar el correo. Redirigiendo a WhatsApp..."
- [ ] WhatsApp STILL opens (fallback behavior)
- [ ] User can continue despite email failure

**Cleanup:**
- Restore correct `RESEND_API_KEY` in `.env`

#### Test 3b: Network Timeout (Simulated)

**Note:** This requires temporarily modifying PHP timeout or simulating slow connection.

**Expected behavior:**
- Timeout after 10 seconds (configured in `send-email.php`)
- Fallback to WhatsApp redirect
- User sees warning message

---

### Test 4: Rate Limiting

**Objective:** Verify spam prevention blocks excessive submissions.

**Steps:**

1. Submit form with valid data - **Submission #1**
   - Expected: ✅ Success, email sent

2. Immediately submit again - **Submission #2**
   - Expected: ✅ Success, email sent

3. Continue submitting - **Submissions #3, #4, #5**
   - Expected: ✅ All successful

4. Submit 6th time - **Submission #6**
   - Expected: ❌ **Rate limit triggered**

**Verify 6th Submission:**

- [ ] HTTP 429 response code (check Network tab)
- [ ] Red error message: "Has excedido el límite de solicitudes. Por favor, intenta nuevamente en X minutos."
- [ ] No WhatsApp redirect
- [ ] No email sent

**Wait 1 hour, then retry:**

- [ ] Rate limit resets
- [ ] Submission works again

**Note:** Rate limit is per IP address. If testing from different devices/networks, each has independent limit.

---

### Test 5: Honeypot Spam Detection

**Objective:** Verify bot submissions are silently rejected.

**Setup:**

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Run command to fill honeypot field:
   ```javascript
   document.getElementById('website').value = 'bot-filled-this';
   ```

4. Fill out form normally with valid data
5. Click **"ENVIAR"**

**Expected Behavior:**

- [ ] Success message appears: "Formulario enviado correctamente."
- [ ] WhatsApp redirect DOES NOT occur
- [ ] Email is NOT sent to `cnavas@mielunch.com`
- [ ] Check inbox: No email received
- [ ] Check server logs: Entry logged "SPAM BLOCKED: Honeypot field filled"

**Why this matters:**
- Bots typically fill ALL fields (including hidden ones)
- Real users never see or interact with honeypot field
- Silent rejection prevents bots from knowing they were blocked

---

## 📧 Email Template Testing

### Test 6: Email Rendering Across Clients

**Objective:** Ensure email displays correctly in different email clients.

**Steps:**

1. Submit form from production site
2. Check email in multiple clients:

| Email Client | HTML Support | Test Result | Notes |
|--------------|--------------|-------------|-------|
| **Gmail (Web)** | Excellent | ✅/❌ | Full CSS support |
| **Outlook (Web)** | Good | ✅/❌ | Most features work |
| **Outlook (Desktop)** | Limited | ✅/❌ | Basic styling only |
| **Apple Mail (macOS)** | Excellent | ✅/❌ | Full support |
| **iPhone Mail** | Excellent | ✅/❌ | Full support |
| **Android Gmail App** | Good | ✅/❌ | Good support |
| **Yahoo Mail** | Good | ✅/❌ | Most features work |

**Verify in Each Client:**

- [ ] Orange gradient header displays
- [ ] Logo/branding visible
- [ ] Text is readable (font size, color contrast)
- [ ] "Contactar por WhatsApp" button displays and is clickable
- [ ] Sections are properly separated
- [ ] Contact info in footer is visible
- [ ] No broken images
- [ ] Mobile responsive (if viewing on phone)

**Fallback Test:**

If HTML fails in a client, verify plain text version displays:

- [ ] Open email
- [ ] Look for plain text content (if HTML is broken)
- [ ] All information should be readable in plain text format

---

### Test 7: Email Content Accuracy

**Objective:** Verify all form data appears correctly in email.

**Test Cases:**

#### Test 7a: Special Characters

**Input:**
- Nombre: José María Pérez
- Teléfono: +503-7877-8253
- Email: jose.maria@empresa.com.sv
- Mensaje: Necesito café, té & postres para reunión.

**Verify in Email:**
- [ ] Accented characters display correctly (é, í, á)
- [ ] Plus sign in phone number appears
- [ ] Ampersand (&) displays properly (not as &amp;)

#### Test 7b: Long Text

**Input:**
- Mensaje: (500+ characters of text)

**Verify:**
- [ ] Entire message displays in email
- [ ] No truncation
- [ ] Proper line breaks preserved

#### Test 7c: HTML/Script Injection Attempt

**Input:**
- Nombre: `<script>alert('test')</script>`
- Mensaje: `<b>Bold text</b> and <a href="http://evil.com">link</a>`

**Verify in Email:**
- [ ] Script tags are escaped (displayed as text, not executed)
- [ ] HTML tags are escaped (shown as `&lt;script&gt;`, not rendered as HTML)
- [ ] No clickable malicious links
- [ ] Input is sanitized and safe

---

## 🔒 Security Testing

### Test 8: .env File Access Protection

**Objective:** Verify API key is not accessible via browser.

**Steps:**

1. Try accessing `.env` directly via URL:
   ```
   https://mielunch.com/.env
   https://mielunch.com/api/.env
   ```

**Expected:**
- [ ] HTTP 403 Forbidden or 404 Not Found
- [ ] File contents NOT displayed
- [ ] No API key visible

2. Try accessing PHP file directly:
   ```
   https://mielunch.com/api/send-email.php
   ```

**Expected:**
- [ ] HTTP 405 Method Not Allowed (only POST allowed)
- [ ] Error message: "Método no permitido"

---

### Test 9: SQL Injection & XSS Prevention

**Objective:** Verify input sanitization prevents attacks.

**Note:** This system doesn't use a database, but we still test input handling.

#### Test 9a: SQL Injection Attempt

**Input:**
- Email: `test@example.com'; DROP TABLE users; --`
- Mensaje: `'; DELETE FROM contacts; --`

**Verify:**
- [ ] Form submits normally
- [ ] Email contains sanitized text (special chars escaped)
- [ ] No errors occur
- [ ] System remains functional

#### Test 9b: Cross-Site Scripting (XSS)

**Input:**
- Nombre: `<img src=x onerror=alert('XSS')>`
- Mensaje: `<script>document.location='http://evil.com'</script>`

**Verify in Email:**
- [ ] Tags are escaped and display as text
- [ ] No JavaScript executes
- [ ] No images try to load

---

### Test 10: HTTPS & SSL Certificate

**Objective:** Verify secure connection.

**Steps:**

1. Navigate to: `http://mielunch.com` (without HTTPS)
   - **Expected:** Auto-redirect to `https://mielunch.com`

2. Check SSL certificate:
   - Click padlock icon in browser address bar
   - **Verify:**
     - [ ] Valid certificate
     - [ ] Issued to: mielunch.com
     - [ ] Not expired
     - [ ] No security warnings

3. Submit form over HTTPS:
   - [ ] Form works normally
   - [ ] Data transmitted securely

---

## ⚡ Performance Testing

### Test 11: Form Submission Speed

**Objective:** Measure time from submit to WhatsApp redirect.

**Steps:**

1. Open browser DevTools > Network tab
2. Submit form with valid data
3. Measure timing:

| Stage | Target Time | Actual Time | ✅/❌ |
|-------|-------------|-------------|-------|
| API request sent | 0ms (immediate) | | |
| API response received | < 3 seconds | | |
| WhatsApp redirect | +1.5s after response | | |
| **Total time** | < 5 seconds | | |

**Acceptable:**
- ✅ Total time < 5 seconds (excellent)
- ⚠️ Total time 5-10 seconds (acceptable)
- ❌ Total time > 10 seconds (investigate)

**If slow, check:**
- Resend API response time (should be < 2 seconds)
- Server processing time
- Network latency

---

### Test 12: Concurrent Submissions

**Objective:** Verify system handles multiple users submitting simultaneously.

**Setup:**

Requires multiple devices or browser tabs/incognito windows (different IPs).

**Steps:**

1. Open site in 3 different browsers/devices
2. Fill out form in each
3. Submit all 3 forms within 10 seconds

**Expected:**
- [ ] All 3 submissions succeed
- [ ] 3 emails received at `cnavas@mielunch.com`
- [ ] All timestamps accurate
- [ ] No emails lost
- [ ] No server errors

---

## 🌍 Browser Compatibility Testing

### Test 13: Cross-Browser Testing

**Objective:** Ensure functionality across all major browsers.

| Browser | Version | Form Works | Email Sent | WhatsApp Opens | Notes |
|---------|---------|------------|------------|----------------|-------|
| Chrome (Desktop) | Latest | ✅/❌ | ✅/❌ | ✅/❌ | |
| Firefox (Desktop) | Latest | ✅/❌ | ✅/❌ | ✅/❌ | |
| Safari (macOS) | Latest | ✅/❌ | ✅/❌ | ✅/❌ | |
| Edge (Desktop) | Latest | ✅/❌ | ✅/❌ | ✅/❌ | |
| Chrome (Android) | Latest | ✅/❌ | ✅/❌ | ✅/❌ | Opens WhatsApp app |
| Safari (iOS) | Latest | ✅/❌ | ✅/❌ | ✅/❌ | Opens WhatsApp app |
| Samsung Internet | Latest | ✅/❌ | ✅/❌ | ✅/❌ | |

**Test in each browser:**

1. Navigate to site
2. Fill out form
3. Submit and verify:
   - [ ] No JavaScript errors (check console)
   - [ ] AJAX request completes
   - [ ] Success message displays
   - [ ] WhatsApp redirect works
   - [ ] Form resets properly

---

### Test 14: Mobile Responsiveness

**Objective:** Verify form is usable on mobile devices.

**Test on actual devices (not just emulator):**

**Phone Sizes:**
- Small (iPhone SE): 375px width
- Medium (iPhone 12): 390px width  
- Large (iPhone 14 Pro Max): 430px width

**Verify:**

- [ ] Form fields are large enough to tap (min 44x44px)
- [ ] No horizontal scrolling required
- [ ] Text is readable (min 16px font size)
- [ ] Keyboard doesn't hide submit button
- [ ] Success messages display properly
- [ ] Loading spinner visible
- [ ] WhatsApp app opens (not just WhatsApp Web)

---

### Test 15: Accessibility Testing

**Objective:** Ensure form is accessible to users with disabilities.

**Keyboard Navigation:**

1. Navigate to form using only keyboard (Tab key)
2. **Verify:**
   - [ ] Can focus on all fields (nombre, telefono, email, mensaje)
   - [ ] Can reach submit button
   - [ ] Honeypot field is skipped (tabindex="-1")
   - [ ] Enter key submits form from any field

**Screen Reader:**

If available, test with screen reader (NVDA, JAWS, VoiceOver):

- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Success messages are announced
- [ ] Loading state is communicated

**Contrast:**

- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Error messages are distinguishable (not just color)
- [ ] Success messages clearly visible

---

## ✅ Test Checklist

### Pre-Deployment

- [ ] PHP syntax validated (no errors)
- [ ] .env file loads correctly
- [ ] JavaScript has no syntax errors
- [ ] Form renders correctly locally
- [ ] Honeypot field is hidden
- [ ] All files ready for upload

### Post-Deployment - Functionality

- [ ] Basic form submission works
- [ ] Email arrives at correct inbox
- [ ] WhatsApp redirect works
- [ ] Form resets after submission
- [ ] Validation catches empty fields
- [ ] Validation catches invalid email
- [ ] Rate limiting blocks 6th submission
- [ ] Honeypot blocks bot submissions

### Post-Deployment - Email

- [ ] Email subject correct
- [ ] Email from address correct
- [ ] Email to address correct
- [ ] All form data included
- [ ] HTML design displays properly
- [ ] Plain text fallback works
- [ ] WhatsApp button in email works
- [ ] Tested in 3+ email clients

### Post-Deployment - Security

- [ ] .env file not accessible via URL
- [ ] API endpoint rejects GET requests
- [ ] Input sanitization working
- [ ] XSS prevention working
- [ ] HTTPS enforced
- [ ] SSL certificate valid

### Post-Deployment - Performance

- [ ] Submission completes < 5 seconds
- [ ] Concurrent submissions work
- [ ] No server errors under load

### Post-Deployment - Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on Android mobile
- [ ] Works on iOS mobile
- [ ] Keyboard navigation works
- [ ] Mobile responsive

---

## 🐛 Common Issues & Quick Fixes

### Issue: Email Not Arriving

**Quick Checks:**
1. Check spam folder
2. Verify `RESEND_TO_EMAIL` in `.env` has no typos
3. Check Resend dashboard logs (https://resend.com/logs)
4. Verify domain is verified in Resend

### Issue: WhatsApp Not Opening

**Quick Checks:**
1. Check browser console for JavaScript errors
2. Verify WhatsApp number is correct in `main.js` (line 68)
3. Test on mobile device (may not work on desktop without WhatsApp Desktop installed)

### Issue: Form Not Submitting

**Quick Checks:**
1. Check browser console for errors
2. Verify `main.js` is loaded (Network tab)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Test in incognito/private mode

### Issue: Rate Limit Too Aggressive

**Quick Fix:**
1. SSH or File Manager access to server
2. Edit `api/send-email.php`
3. Change line ~93: `$max_submissions = 10;` (increase from 5)
4. Save file

---

## 📊 Test Results Template

Use this template to document your test results:

```
# eLunch Email System Test Results

Date: [YYYY-MM-DD]
Tester: [Your Name]
Environment: [Local / Production]

## Functionality Tests
- [ ] Basic submission: PASS / FAIL
- [ ] Email delivery: PASS / FAIL (Time: __s)
- [ ] WhatsApp redirect: PASS / FAIL
- [ ] Form validation: PASS / FAIL
- [ ] Rate limiting: PASS / FAIL
- [ ] Honeypot: PASS / FAIL

## Browser Tests
- [ ] Chrome: PASS / FAIL
- [ ] Firefox: PASS / FAIL
- [ ] Safari: PASS / FAIL
- [ ] Mobile: PASS / FAIL

## Email Tests
- [ ] Gmail: PASS / FAIL
- [ ] Outlook: PASS / FAIL
- [ ] iPhone: PASS / FAIL

## Security Tests
- [ ] .env protected: PASS / FAIL
- [ ] Input sanitization: PASS / FAIL
- [ ] HTTPS: PASS / FAIL

## Issues Found:
1. [Issue description]
2. [Issue description]

## Notes:
[Additional observations]

Status: ✅ READY FOR PRODUCTION / ⚠️ ISSUES FOUND / ❌ NOT READY
```

---

## 🎯 Success Criteria

System is ready for production when:

1. ✅ **All functionality tests pass** (submission, email, WhatsApp)
2. ✅ **Email arrives within 10 seconds** consistently
3. ✅ **No JavaScript errors** in any major browser
4. ✅ **Security tests pass** (.env protected, inputs sanitized)
5. ✅ **Works on mobile** (iOS and Android)
6. ✅ **Rate limiting functions** correctly
7. ✅ **Email renders properly** in Gmail, Outlook, iPhone
8. ✅ **Fallback works** (WhatsApp opens even if email fails)

---

**Happy Testing! 🚀**

*Last updated: January 26, 2026*
*Version: 1.0.0*
