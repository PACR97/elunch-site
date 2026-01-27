#!/bin/bash

# Script de Optimización de Imágenes para eLunch
# Fecha: 26 de Enero 2026
# Optimiza JPG/PNG y crea versiones WebP

echo "=========================================="
echo "   Optimización de Imágenes - eLunch"
echo "=========================================="
echo ""

# Directorio base
BASE_DIR="/home/cano/Documents/elunch-site/public/img"
cd "$BASE_DIR" || exit 1

# Contador
TOTAL=0
OPTIMIZED=0
WEBP_CREATED=0

# Función para optimizar JPG
optimize_jpg() {
    local file="$1"
    local filename=$(basename "$file")
    local dir=$(dirname "$file")
    
    # Si ya existe un backup, no lo sobrescribimos
    if [ ! -f "${file%.jpg}-original.jpg" ] && [ ! -f "${file%.jpg}-backup.jpg" ]; then
        # Hacer backup
        cp "$file" "${file%.jpg}-backup.jpg"
        echo "  [BACKUP] Creado: ${filename%.jpg}-backup.jpg"
    fi
    
    # Obtener tamaño original
    SIZE_BEFORE=$(du -k "$file" | cut -f1)
    
    # Optimizar JPG con ImageMagick
    # Reducir calidad a 82%, strip metadata, resize si es muy grande
    convert "$file" \
        -strip \
        -quality 82 \
        -resize '1920x1920>' \
        -sampling-factor 4:2:0 \
        "${file}.tmp" 2>/dev/null
    
    # Si la optimización fue exitosa, reemplazar
    if [ -f "${file}.tmp" ]; then
        mv "${file}.tmp" "$file"
        SIZE_AFTER=$(du -k "$file" | cut -f1)
        SAVED=$((SIZE_BEFORE - SIZE_AFTER))
        PERCENT=$((SAVED * 100 / SIZE_BEFORE))
        
        echo "  [OPTIMIZED] $filename: ${SIZE_BEFORE}KB → ${SIZE_AFTER}KB (-${PERCENT}%)"
        OPTIMIZED=$((OPTIMIZED + 1))
    else
        echo "  [ERROR] No se pudo optimizar: $filename"
    fi
}

# Función para optimizar PNG
optimize_png() {
    local file="$1"
    local filename=$(basename "$file")
    
    # Si ya existe un backup, no lo sobrescribimos
    if [ ! -f "${file%.png}-original.png" ] && [ ! -f "${file%.png}-backup.png" ]; then
        cp "$file" "${file%.png}-backup.png"
        echo "  [BACKUP] Creado: ${filename%.png}-backup.png"
    fi
    
    SIZE_BEFORE=$(du -k "$file" | cut -f1)
    
    # Para PNG, convertir a JPG si no tiene transparencia (más eficiente)
    # Verificar si tiene transparencia
    HAS_ALPHA=$(identify -format '%A' "$file" 2>/dev/null)
    
    if [ "$HAS_ALPHA" = "True" ]; then
        # Tiene transparencia, optimizar como PNG
        convert "$file" \
            -strip \
            -quality 85 \
            "${file}.tmp" 2>/dev/null
    else
        # No tiene transparencia, convertir a JPG (mucho más liviano)
        JPG_FILE="${file%.png}.jpg"
        convert "$file" \
            -strip \
            -quality 82 \
            -background white \
            -flatten \
            "$JPG_FILE" 2>/dev/null
        
        if [ -f "$JPG_FILE" ]; then
            SIZE_JPG=$(du -k "$JPG_FILE" | cut -f1)
            echo "  [CONVERTED] $filename → ${filename%.png}.jpg: ${SIZE_BEFORE}KB → ${SIZE_JPG}KB"
            OPTIMIZED=$((OPTIMIZED + 1))
            
            # Crear WebP para el JPG también
            create_webp "$JPG_FILE"
            return
        fi
    fi
    
    if [ -f "${file}.tmp" ]; then
        mv "${file}.tmp" "$file"
        SIZE_AFTER=$(du -k "$file" | cut -f1)
        SAVED=$((SIZE_BEFORE - SIZE_AFTER))
        PERCENT=$((SAVED * 100 / SIZE_BEFORE))
        echo "  [OPTIMIZED] $filename: ${SIZE_BEFORE}KB → ${SIZE_AFTER}KB (-${PERCENT}%)"
        OPTIMIZED=$((OPTIMIZED + 1))
    fi
}

# Función para crear WebP
create_webp() {
    local file="$1"
    local webp_file="${file%.*}.webp"
    
    # Si ya existe WebP, saltar
    if [ -f "$webp_file" ]; then
        return
    fi
    
    # Crear WebP con ImageMagick (calidad 80)
    convert "$file" \
        -quality 80 \
        -define webp:method=6 \
        "$webp_file" 2>/dev/null
    
    if [ -f "$webp_file" ]; then
        SIZE_WEBP=$(du -k "$webp_file" | cut -f1)
        SIZE_ORIGINAL=$(du -k "$file" | cut -f1)
        SAVED=$((SIZE_ORIGINAL - SIZE_WEBP))
        PERCENT=$((SAVED * 100 / SIZE_ORIGINAL))
        echo "  [WEBP] Creado: $(basename "$webp_file") (${SIZE_WEBP}KB, -${PERCENT}%)"
        WEBP_CREATED=$((WEBP_CREATED + 1))
    fi
}

echo "Iniciando optimización..."
echo ""

# Optimizar imágenes principales
echo "=== Imágenes Principales ==="
for img in hero-img.jpg form-background.jpg; do
    if [ -f "$img" ]; then
        echo "Procesando: $img"
        TOTAL=$((TOTAL + 1))
        optimize_jpg "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar eventos-masivos
echo "=== Eventos Masivos ==="
for img in eventos-masivos/*.jpg; do
    if [ -f "$img" ]; then
        echo "Procesando: $(basename "$img")"
        TOTAL=$((TOTAL + 1))
        optimize_jpg "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar cafeterías
echo "=== Cafeterías ==="
for img in cafeterias/*.jpg; do
    if [ -f "$img" ]; then
        echo "Procesando: $(basename "$img")"
        TOTAL=$((TOTAL + 1))
        optimize_jpg "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar nuestra-cocina
echo "=== Nuestra Cocina ==="
for img in nuestra-cocina/*.jpg; do
    if [ -f "$img" ]; then
        echo "Procesando: $(basename "$img")"
        TOTAL=$((TOTAL + 1))
        optimize_jpg "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar servicios (PNG)
echo "=== Servicios (PNG → JPG + WebP) ==="
for img in service-*.png; do
    if [ -f "$img" ]; then
        echo "Procesando: $(basename "$img")"
        TOTAL=$((TOTAL + 1))
        optimize_png "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar logos
echo "=== Logos ==="
for img in logo-*.png footer-image.png; do
    if [ -f "$img" ]; then
        echo "Procesando: $(basename "$img")"
        TOTAL=$((TOTAL + 1))
        optimize_png "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar sliders
echo "=== Slider Images ==="
for img in slider-*.png; do
    if [ -f "$img" ]; then
        echo "Procesando: $(basename "$img")"
        TOTAL=$((TOTAL + 1))
        optimize_png "$img"
        create_webp "$img"
        echo ""
    fi
done

# Optimizar hero de experiencia
if [ -f "nuestra-experiencia-hero.jpg" ]; then
    echo "=== Hero Experiencia ==="
    echo "Procesando: nuestra-experiencia-hero.jpg"
    TOTAL=$((TOTAL + 1))
    optimize_jpg "nuestra-experiencia-hero.jpg"
    create_webp "nuestra-experiencia-hero.jpg"
    echo ""
fi

# Resumen final
echo "=========================================="
echo "           RESUMEN FINAL"
echo "=========================================="
echo "Total de imágenes procesadas: $TOTAL"
echo "Imágenes optimizadas (JPG/PNG): $OPTIMIZED"
echo "Versiones WebP creadas: $WEBP_CREATED"
echo ""
echo "Tamaño total DESPUÉS de optimización:"
du -sh . 2>/dev/null | awk '{print $1}'
echo ""
echo "Los archivos originales se guardaron con sufijo -backup"
echo ""
echo "✅ ¡Optimización completa!"
echo "=========================================="
