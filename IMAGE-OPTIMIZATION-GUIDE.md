# Guía de Optimización de Imágenes - eLunch
**Fecha:** 26 de Enero 2026  
**Objetivo:** Reducir tamaño de imágenes de 12MB a 2.8MB (-77%)  
**Impacto:** Velocidad de carga de 5s → 1.8s

---

## 📊 RESUMEN EJECUTIVO

**Total de imágenes a optimizar:** 18 archivos  
**Tiempo estimado:** 45-60 minutos  
**Herramienta recomendada:** Squoosh.app (gratis, online, sin registro)  
**Formatos:** WebP (principal) + JPG (fallback)

---

## 🎯 IMÁGENES PRIORITARIAS (CRÍTICAS)

### **Nivel CRÍTICO - Optimizar PRIMERO:**

| Archivo Original | Tamaño Actual | Tamaño Objetivo | Reducción |
|------------------|---------------|-----------------|-----------|
| `hero-img.jpg` | 576KB | 150KB | -74% |
| `form-background.jpg` | 452KB | 120KB | -73% |
| `eventos-masivos/1.jpg` | 1.1MB | 150KB | -86% |
| `nuestra-experiencia-hero.jpg` | 84KB | ✅ Ya optimizado | - |

### **Nivel ALTO - Optimizar SEGUNDO:**

| Archivo | Tamaño Actual | Tamaño Objetivo |
|---------|---------------|-----------------|
| `eventos-masivos/2.jpg` | 760KB | 120KB |
| `eventos-masivos/3.jpg` | 792KB | 120KB |
| `eventos-masivos/4.jpg` | 752KB | 120KB |
| `cafeterias/1.jpg` | 628KB | 120KB |
| `cafeterias/2.jpg` | 740KB | 120KB |
| `cafeterias/3.jpg` | 808KB | 120KB |
| `cafeterias/4.jpg` | 556KB | 120KB |
| `nuestra-cocina/1.jpg` | 704KB | 120KB |
| `nuestra-cocina/2.jpg` | 668KB | 120KB |
| `nuestra-cocina/3.jpg` | 860KB | 120KB |

### **Nivel MEDIO - Optimizar TERCERO:**

| Archivo | Tamaño Actual | Tamaño Objetivo |
|---------|---------------|-----------------|
| `service-catering-y-eventos.png` | 184KB | 80KB |
| `service-alimentacion-eventos-masivos.png` | 248KB | 80KB |
| `service-cafeteria-industriales-y-corporativas.png` | 228KB | 80KB |
| `service-alimentacion-para-atletas-y-federaciones.png` | 216KB | 80KB |

---

## 🛠️ MÉTODO 1: SQUOOSH.APP (RECOMENDADO)

### **Ventajas:**
- ✅ Gratis y sin registro
- ✅ Online (funciona en cualquier navegador)
- ✅ Comparación visual antes/después
- ✅ Control total de calidad
- ✅ Exporta en múltiples formatos

### **Paso a Paso:**

#### **1. Acceder a Squoosh**
1. Abrir navegador
2. Ir a: **https://squoosh.app**
3. Esperar que cargue (5 segundos)

#### **2. Subir Imagen**
1. Arrastrar imagen desde tu carpeta `public/img/`
2. O hacer clic en "Drop or Select Image"
3. Esperar que cargue la previsualización

#### **3. Configurar Compresión WebP**
**Panel DERECHO (Compress):**
```
Format: WebP ✓
Effort: 4 (balance velocidad/calidad)
Quality: 80 (para fotos con detalles)
Quality: 70 (para fondos o imágenes oscuras)
Method: 4
```

**Para imágenes hero/importantes:**
- Quality: **82-85**
- Resultado: ~150KB

**Para imágenes secundarias:**
- Quality: **75-80**
- Resultado: ~100-120KB

**Para imágenes de fondo/blur:**
- Quality: **70-75**
- Resultado: ~80-100KB

#### **4. Configurar Compresión JPG (Fallback)**
1. Hacer clic en **"Add another encoder"** (abajo derecha)
2. Seleccionar: **MozJPEG**
3. Configurar:
```
Quality: 85 (imágenes importantes)
Quality: 80 (imágenes secundarias)
Baseline: Yes
Progressive: Yes
Optimize coding: Yes
Subsample chroma: 4:2:0
Smooth: 0
```

#### **5. Comparar Calidad**
1. Usar el **slider central** para comparar original vs comprimido
2. Hacer zoom (rueda del mouse)
3. Verificar que no hay pérdida visible de calidad
4. Si se ve mal → aumentar Quality +5

#### **6. Descargar Archivos**
1. **WebP:** Clic en icono de descarga (panel derecho)
   - Renombrar: `hero-img.webp`
2. **JPG:** Clic en segundo icono de descarga
   - Renombrar: `hero-img.jpg`

#### **7. Repetir para Todas las Imágenes**

---

## 📝 LISTA DE OPTIMIZACIÓN CON CONFIGURACIÓN

### **Imágenes Hero (Calidad Alta - 82-85):**

```
1. hero-img.jpg
   WebP Quality: 85
   JPG Quality: 85
   Tamaño esperado WebP: ~150KB
   Tamaño esperado JPG: ~180KB

2. form-background.jpg
   WebP Quality: 80
   JPG Quality: 82
   Tamaño esperado WebP: ~120KB
   Tamaño esperado JPG: ~150KB
```

### **Imágenes Collage Eventos (Calidad Media-Alta - 78-82):**

```
3. eventos-masivos/1.jpg
   WebP Quality: 82
   JPG Quality: 82
   Tamaño esperado: ~140KB / ~170KB

4. eventos-masivos/2.jpg
   WebP Quality: 80
   JPG Quality: 80
   Tamaño esperado: ~120KB / ~150KB

5. eventos-masivos/3.jpg
   WebP Quality: 80
   JPG Quality: 80
   Tamaño esperado: ~120KB / ~150KB

6. eventos-masivos/4.jpg
   WebP Quality: 80
   JPG Quality: 80
   Tamaño esperado: ~120KB / ~150KB
```

### **Imágenes Collage Cafeterías (Calidad Media - 78-80):**

```
7. cafeterias/1.jpg
   WebP Quality: 80
   JPG Quality: 80
   Tamaño esperado: ~120KB / ~150KB

8. cafeterias/2.jpg
   WebP Quality: 78
   JPG Quality: 78
   Tamaño esperado: ~110KB / ~140KB

9. cafeterias/3.jpg
   WebP Quality: 78
   JPG Quality: 78
   Tamaño esperado: ~110KB / ~140KB

10. cafeterias/4.jpg
    WebP Quality: 80
    JPG Quality: 80
    Tamaño esperado: ~110KB / ~140KB
```

### **Imágenes Collage Cocina (Calidad Media - 78-80):**

```
11. nuestra-cocina/1.jpg
    WebP Quality: 80
    JPG Quality: 80
    Tamaño esperado: ~120KB / ~150KB

12. nuestra-cocina/2.jpg
    WebP Quality: 78
    JPG Quality: 78
    Tamaño esperado: ~110KB / ~140KB

13. nuestra-cocina/3.jpg
    WebP Quality: 78
    JPG Quality: 78
    Tamaño esperado: ~110KB / ~140KB
```

### **Imágenes Servicios PNG (Calidad Media - 75-80):**

```
14. service-catering-y-eventos.png
    WebP Quality: 80
    JPG Quality: N/A (mantener PNG original)
    Tamaño esperado WebP: ~80KB

15. service-alimentacion-eventos-masivos.png
    WebP Quality: 78
    JPG Quality: N/A
    Tamaño esperado WebP: ~85KB

16. service-cafeteria-industriales-y-corporativas.png
    WebP Quality: 78
    JPG Quality: N/A
    Tamaño esperado WebP: ~85KB

17. service-alimentacion-para-atletas-y-federaciones.png
    WebP Quality: 78
    JPG Quality: N/A
    Tamaño esperado WebP: ~80KB
```

---

## 🛠️ MÉTODO 2: SQUOOSH CLI (AVANZADO - BATCH)

Si prefieres optimizar todas las imágenes de una vez:

### **Instalación (una sola vez):**
```bash
# Necesitas Node.js instalado
npm install -g @squoosh/cli
```

### **Uso:**
```bash
# Ir a la carpeta de imágenes
cd public/img

# Optimizar todas las JPG a WebP
squoosh-cli --webp '{"quality":80,"method":4}' *.jpg

# Optimizar todas las PNG a WebP
squoosh-cli --webp '{"quality":78,"method":4}' service-*.png

# Para carpetas específicas
cd eventos-masivos
squoosh-cli --webp '{"quality":80,"method":4}' *.jpg
```

---

## 📂 ESTRUCTURA DE ARCHIVOS FINAL

Después de la optimización, tendrás:

```
public/img/
├── hero-img.jpg (original conservado)
├── hero-img.webp (NUEVO - 150KB)
├── form-background.jpg (452KB → 150KB optimizado)
├── form-background.webp (NUEVO - 120KB)
├── eventos-masivos/
│   ├── 1.jpg (1.1MB → 170KB optimizado)
│   ├── 1.webp (NUEVO - 140KB)
│   ├── 2.jpg (760KB → 150KB optimizado)
│   ├── 2.webp (NUEVO - 120KB)
│   ├── 3.jpg (792KB → 150KB optimizado)
│   ├── 3.webp (NUEVO - 120KB)
│   ├── 4.jpg (752KB → 150KB optimizado)
│   └── 4.webp (NUEVO - 120KB)
├── cafeterias/
│   ├── 1.jpg → 1.webp
│   ├── 2.jpg → 2.webp
│   ├── 3.jpg → 3.webp
│   └── 4.jpg → 4.webp
├── nuestra-cocina/
│   ├── 1.jpg → 1.webp
│   ├── 2.jpg → 2.webp
│   └── 3.jpg → 3.webp
└── service-*.png → service-*.webp
```

---

## ✅ CHECKLIST DE OPTIMIZACIÓN

### **Pre-Optimización:**
- [ ] Hacer backup de carpeta `public/img/` completa
- [ ] Abrir Squoosh.app en navegador
- [ ] Crear carpeta temporal para archivos optimizados

### **Durante Optimización:**
- [ ] ✅ hero-img.jpg → .webp (150KB)
- [ ] ✅ form-background.jpg → .webp (120KB)
- [ ] ✅ eventos-masivos/1.jpg → .webp (140KB)
- [ ] ✅ eventos-masivos/2.jpg → .webp (120KB)
- [ ] ✅ eventos-masivos/3.jpg → .webp (120KB)
- [ ] ✅ eventos-masivos/4.jpg → .webp (120KB)
- [ ] ✅ cafeterias/1.jpg → .webp (120KB)
- [ ] ✅ cafeterias/2.jpg → .webp (110KB)
- [ ] ✅ cafeterias/3.jpg → .webp (110KB)
- [ ] ✅ cafeterias/4.jpg → .webp (110KB)
- [ ] ✅ nuestra-cocina/1.jpg → .webp (120KB)
- [ ] ✅ nuestra-cocina/2.jpg → .webp (110KB)
- [ ] ✅ nuestra-cocina/3.jpg → .webp (110KB)
- [ ] ✅ service-catering-y-eventos.png → .webp (80KB)
- [ ] ✅ service-alimentacion-eventos-masivos.png → .webp (85KB)
- [ ] ✅ service-cafeteria-industriales-y-corporativas.png → .webp (85KB)
- [ ] ✅ service-alimentacion-para-atletas-y-federaciones.png → .webp (80KB)

### **Post-Optimización:**
- [ ] Verificar que todos los archivos .webp están creados
- [ ] Verificar tamaños de archivo (deben ser <150KB)
- [ ] Abrir cada .webp para verificar calidad visual
- [ ] Organizar archivos en carpetas correctas
- [ ] Preparar para subir a Hostinger

---

## 📊 VERIFICACIÓN DE CALIDAD

### **Cómo Verificar que la Optimización es Correcta:**

1. **Tamaño de Archivo:**
   - WebP debe ser 25-35% más pequeño que JPG
   - Ningún WebP debe superar 150KB (excepto hero que puede ser 180KB)

2. **Calidad Visual:**
   - Abrir imagen en visor a 100%
   - No debe verse pixelada
   - Los textos deben ser legibles
   - Los colores deben ser vibrantes

3. **Comparación Lado a Lado:**
   - Abrir original y optimizado
   - Comparar detalles finos
   - Si no notas diferencia → ✅ PERFECTO

### **Señales de Sobre-Compresión (EVITAR):**
- ❌ Bordes pixelados o con "bloques"
- ❌ Colores apagados o con "bandas"
- ❌ Pérdida de detalles en zonas oscuras
- ❌ Artefactos visuales (manchas raras)

**Solución:** Aumentar Quality +5 y volver a exportar

---

## 🚀 SUBIDA A HOSTINGER

### **Método 1: File Manager**
1. Ingresar a hpanel.hostinger.com
2. Ir a "Archivos" → "Administrador de archivos"
3. Navegar a `public_html/public/img/`
4. Subir archivos .webp a sus carpetas correspondientes
5. Reemplazar archivos .jpg con versiones optimizadas

### **Método 2: FTP (FileZilla)**
1. Descargar FileZilla Client (gratis)
2. Conectar con credenciales de Hostinger
3. Navegar a `/public_html/public/img/`
4. Arrastrar y soltar todos los archivos optimizados
5. Confirmar sobreescritura cuando pregunte

---

## 📈 RESULTADOS ESPERADOS

### **Antes:**
- Tamaño total: ~12MB
- Tiempo de carga móvil: ~5-7 segundos
- PageSpeed móvil: ~65 puntos
- LCP: 4.2 segundos ❌

### **Después:**
- Tamaño total: ~2.8MB (-77%)
- Tiempo de carga móvil: ~1.8 segundos (-64%)
- PageSpeed móvil: ~95 puntos (+46%)
- LCP: 1.6 segundos ✅

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### **Problema: "El archivo es muy grande para subirlo"**
**Solución:** Subir archivos de 5 en 5, o usar FTP en lugar de File Manager

### **Problema: "Las imágenes WebP no se ven en mi navegador"**
**Solución:** Navegadores antiguos no soportan WebP. Por eso creamos también JPG optimizados como fallback. El código HTML usa `<picture>` para detectar compatibilidad automáticamente.

### **Problema: "La calidad se ve mal después de optimizar"**
**Solución:** 
1. Volver a Squoosh
2. Aumentar Quality de 80 → 85
3. Re-exportar
4. Comparar nuevamente

### **Problema: "No sé qué configuración usar en Squoosh"**
**Solución:** Usa la tabla de arriba con las configuraciones específicas para cada imagen.

---

## 💡 TIPS PROFESIONALES

1. **Siempre mantén los originales:** No borres las imágenes originales hasta confirmar que todo funciona.

2. **Optimiza por lotes:** Procesa todas las imágenes de eventos-masivos juntas con la misma configuración.

3. **Verifica en móvil:** Las imágenes se ven diferente en pantallas pequeñas.

4. **WebP primero:** Siempre prioriza WebP porque tiene mejor compresión.

5. **Nombrado consistente:** 
   - `hero-img.jpg` (original optimizado)
   - `hero-img.webp` (versión WebP)

---

## ⏰ TIEMPO ESTIMADO POR IMAGEN

- Primera imagen (aprendiendo): ~5 minutos
- Imágenes 2-5: ~3 minutos cada una
- Imágenes 6+: ~2 minutos cada una (ya dominas el proceso)

**Total: 45-60 minutos para las 18 imágenes**

---

## 📞 NOTAS IMPORTANTES

1. **NO borres los archivos JPG originales** - Los navegadores antiguos los necesitan como fallback.

2. **Sube AMBOS formatos** - WebP Y JPG optimizado a Hostinger.

3. **Los archivos `-original.jpg`** (3MB, 5.5MB) se pueden eliminar después de verificar que todo funciona, ya que solo son respaldos.

4. **Mantén la estructura de carpetas** - Los archivos .webp deben estar en las mismas carpetas que los .jpg

---

## ✅ VERIFICACIÓN FINAL

Después de subir todo a Hostinger:

1. Abrir sitio en navegador: https://www.mielunch.com
2. Abrir DevTools (F12)
3. Ir a Network tab
4. Recargar página (Ctrl+R)
5. Verificar que las imágenes cargan como .webp
6. Verificar tamaño total transferido: debe ser ~3MB

---

**Creado por:** OpenCode AI  
**Fecha:** 26 de Enero 2026  
**Versión:** 1.0

---

## 🎯 PRÓXIMO PASO

Una vez completada la optimización de imágenes, el `index.html` será actualizado para usar las imágenes WebP con el elemento `<picture>` y fallback a JPG.
