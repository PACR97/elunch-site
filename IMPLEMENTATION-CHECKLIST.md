# ✅ Checklist de Implementación SEO - eLunch

**Fecha de creación:** 26 de Enero 2026  
**Proyecto:** Optimización SEO completa para mielunch.com  
**Hosting:** Hostinger  

> **IMPORTANTE:** Este checklist te guía paso a paso para subir todos los archivos modificados a tu servidor de Hostinger. Sigue el orden indicado para evitar errores.

---

## 📋 RESUMEN DE ARCHIVOS

### Archivos a Subir/Modificar:
- ✅ 4 archivos de código (index.html, .htaccess, sitemap.xml, robots.txt)
- ✅ 18 imágenes optimizadas (.webp y .jpg)
- ✅ Total estimado de trabajo: 2-3 horas

### Documentos de Referencia (NO subir al servidor):
- `IMAGE-OPTIMIZATION-GUIDE.md` - Guía para optimizar imágenes
- `GOOGLE-BUSINESS-PROFILE-GUIDE.md` - Guía para Google Business
- `SEO-SUMMARY.md` - Resumen de mejoras SEO
- `SEO-KEYWORDS-LIST.md` - Lista de keywords objetivo
- `TESTING-VALIDATION-GUIDE.md` - Guía de verificación
- Este archivo (`IMPLEMENTATION-CHECKLIST.md`)

---

## 🚀 FASE 1: PREPARACIÓN (15 minutos)

### ☐ 1.1 Hacer Backup del Sitio Actual

**Por qué:** Si algo sale mal, podrás restaurar la versión anterior.

**Cómo hacerlo en Hostinger:**
1. Inicia sesión en tu panel de Hostinger (https://hpanel.hostinger.com)
2. Ve a **Sitios web** → Selecciona `mielunch.com`
3. En el menú lateral, busca **Archivos** → **Administrador de archivos**
4. Navega a la carpeta `public_html` (o `htdocs`)
5. Selecciona toda la carpeta haciendo clic en el checkbox superior
6. Haz clic en **Comprimir** (icono de carpeta ZIP en la parte superior)
7. Nombra el archivo: `backup-mielunch-26-ene-2026.zip`
8. Una vez comprimido, haz clic derecho sobre el ZIP → **Descargar**
9. Guarda el backup en tu computadora en un lugar seguro

**Resultado esperado:**  
✅ Tienes un archivo `backup-mielunch-26-ene-2026.zip` descargado (aprox. 15-20MB)

---

### ☐ 1.2 Descargar Archivos del Proyecto

**Archivos que necesitas tener listos en tu computadora:**

```
📁 Carpeta de trabajo: elunch-site/
├── 📄 index.html (MODIFICADO)
├── 📄 .htaccess (NUEVO)
├── 📄 sitemap.xml (MODIFICADO)
├── 📄 robots.txt (MODIFICADO)
└── 📁 public/img/ (18 imágenes optimizadas - PENDIENTES DE OPTIMIZAR)
```

**Acción:**
- Verifica que tienes estos 4 archivos en la carpeta `/home/cano/Documents/elunch-site/`
- Si no los tienes, NO CONTINUES. Contacta soporte técnico.

---

### ☐ 1.3 Optimizar las 18 Imágenes

**CRÍTICO:** Debes completar esto ANTES de subir archivos al servidor.

**Guía:** Abre el archivo `IMAGE-OPTIMIZATION-GUIDE.md` y sigue las instrucciones paso a paso.

**Lista de imágenes a optimizar:**

| # | Archivo Original | Tamaño Actual | Tamaño Objetivo | Formato Final |
|---|------------------|---------------|-----------------|---------------|
| 1 | `hero-img.jpg` | 576KB | 150KB | .webp + .jpg |
| 2 | `form-background.jpg` | 452KB | 120KB | .webp + .jpg |
| 3 | `eventos-masivos/1.jpg` | 1.1MB | 150KB | .webp + .jpg |
| 4 | `eventos-masivos/2.jpg` | 982KB | 150KB | .webp + .jpg |
| 5 | `eventos-masivos/3.jpg` | 890KB | 140KB | .webp + .jpg |
| 6 | `eventos-masivos/4.jpg` | 567KB | 120KB | .webp + .jpg |
| 7 | `cafeterias/1.jpg` | 812KB | 130KB | .webp + .jpg |
| 8 | `cafeterias/2.jpg` | 756KB | 130KB | .webp + .jpg |
| 9 | `cafeterias/3.jpg` | 689KB | 120KB | .webp + .jpg |
| 10 | `cafeterias/4.jpg` | 623KB | 120KB | .webp + .jpg |
| 11 | `nuestra-cocina/1.jpg` | 745KB | 130KB | .webp + .jpg |
| 12 | `nuestra-cocina/2.jpg` | 698KB | 120KB | .webp + .jpg |
| 13 | `nuestra-cocina/3.jpg` | 678KB | 120KB | .webp + .jpg |
| 14 | `service-1.png` | 456KB | 80KB | .webp + .jpg |
| 15 | `service-2.png` | 423KB | 80KB | .webp + .jpg |
| 16 | `service-3.png` | 398KB | 80KB | .webp + .jpg |
| 17 | `service-4.png` | 412KB | 80KB | .webp + .jpg |
| 18 | `logo-transparent.png` | 89KB | 50KB | .webp + .png |

**Tiempo estimado:** 45-60 minutos usando Squoosh.app

**Checklist de verificación:**
- ☐ Todas las imágenes .webp generadas (18 archivos)
- ☐ Todas las imágenes .jpg/.png optimizadas (18 archivos)
- ☐ Tamaño total reducido de 12MB a ~2.8MB
- ☐ Nombres de archivos mantienen el mismo nombre que los originales
- ☐ Imágenes organizadas en las mismas carpetas que los originales

---

## 📤 FASE 2: SUBIR ARCHIVOS A HOSTINGER (30-45 minutos)

### ☐ 2.1 Acceder al Administrador de Archivos

1. Inicia sesión en Hostinger: https://hpanel.hostinger.com
2. Ve a **Sitios web** → Selecciona `mielunch.com`
3. En el menú lateral: **Archivos** → **Administrador de archivos**
4. Navega a la carpeta raíz del sitio (usualmente `public_html` o `htdocs`)

**Resultado esperado:**  
✅ Ves la estructura de carpetas de tu sitio web

---

### ☐ 2.2 Subir .htaccess (NUEVO - Archivo de Configuración)

**Orden:** PRIMERO (este archivo no romperá nada si hay errores)

**Pasos:**
1. En el Administrador de archivos, asegúrate de estar en la **raíz** del sitio (`public_html`)
2. Haz clic en **Subir archivos** (botón en la parte superior)
3. Selecciona el archivo `.htaccess` de tu computadora
4. **IMPORTANTE:** Si ya existe un archivo `.htaccess`:
   - Haz clic derecho sobre el existente → **Cambiar nombre** → Renombrar a `.htaccess.OLD`
   - Esto es tu backup del .htaccess anterior
5. Sube el nuevo archivo `.htaccess`
6. Verifica que el archivo aparece en la lista de archivos (puede estar oculto)
7. Para ver archivos ocultos: Haz clic en **Configuración** (⚙️) → Activar "Mostrar archivos ocultos"

**Resultado esperado:**  
✅ Archivo `.htaccess` visible en la raíz del sitio (aprox. 2KB)

**Verificar que funciona:**
- Abre tu sitio: https://www.mielunch.com
- Si el sitio carga normalmente, ¡perfecto!
- Si ves un error 500, restaura el backup: elimina el nuevo `.htaccess` y renombra `.htaccess.OLD` a `.htaccess`

---

### ☐ 2.3 Subir robots.txt (MODIFICADO)

**Pasos:**
1. En la raíz del sitio (`public_html`), busca el archivo `robots.txt` existente
2. Haz clic derecho → **Cambiar nombre** → `robots.txt.OLD`
3. Haz clic en **Subir archivos**
4. Selecciona el nuevo `robots.txt` de tu computadora
5. Verifica que el archivo aparece en la lista

**Resultado esperado:**  
✅ Nuevo `robots.txt` subido (aprox. 1KB)

**Verificar que funciona:**
- Abre: https://www.mielunch.com/robots.txt
- Deberías ver el contenido del archivo con la fecha "26 de Enero 2026"
- Verifica que incluye la línea: `Allow: /*.webp$`

---

### ☐ 2.4 Subir sitemap.xml (MODIFICADO)

**Pasos:**
1. En la raíz del sitio, busca `sitemap.xml` existente
2. Haz clic derecho → **Cambiar nombre** → `sitemap.xml.OLD`
3. Haz clic en **Subir archivos**
4. Selecciona el nuevo `sitemap.xml` de tu computadora
5. Verifica que el archivo aparece en la lista

**Resultado esperado:**  
✅ Nuevo `sitemap.xml` subido (aprox. 3KB)

**Verificar que funciona:**
- Abre: https://www.mielunch.com/sitemap.xml
- Deberías ver un XML bien formateado
- Verifica que todas las fechas `<lastmod>` digan `2026-01-26`
- Verifica que existe la URL: `https://www.mielunch.com/#preguntas-frecuentes`

---

### ☐ 2.5 Subir Imágenes Optimizadas (18 archivos)

**IMPORTANTE:** Este paso requiere que hayas completado el paso 1.3 (optimizar imágenes).

**Pasos:**

**A) Subir hero-img.jpg y form-background.jpg:**
1. Navega a: `public_html/public/img/`
2. Haz backup de las imágenes originales:
   - Clic derecho en `hero-img.jpg` → **Cambiar nombre** → `hero-img.jpg.OLD`
   - Clic derecho en `form-background.jpg` → **Cambiar nombre** → `form-background.jpg.OLD`
3. Haz clic en **Subir archivos**
4. Selecciona las versiones optimizadas: `hero-img.jpg` (150KB), `hero-img.webp` (140KB)
5. Repite para `form-background.jpg` (120KB) y `form-background.webp` (110KB)

**B) Subir imágenes de eventos-masivos/:**
1. Navega a: `public_html/public/img/eventos-masivos/`
2. Haz backup de las 4 imágenes originales (1.jpg, 2.jpg, 3.jpg, 4.jpg) renombrándolas a `.OLD`
3. Sube las 4 versiones .jpg optimizadas
4. Sube las 4 versiones .webp nuevas (8 archivos en total)

**C) Subir imágenes de cafeterias/:**
1. Navega a: `public_html/public/img/cafeterias/`
2. Haz backup de las 4 imágenes originales
3. Sube las 4 versiones .jpg optimizadas
4. Sube las 4 versiones .webp nuevas (8 archivos en total)

**D) Subir imágenes de nuestra-cocina/:**
1. Navega a: `public_html/public/img/nuestra-cocina/`
2. Haz backup de las 3 imágenes originales
3. Sube las 3 versiones .jpg optimizadas
4. Sube las 3 versiones .webp nuevas (6 archivos en total)

**E) Subir imágenes service-*.png:**
1. Navega a: `public_html/public/img/`
2. Haz backup de los 4 archivos PNG originales (service-1.png a service-4.png)
3. Convierte los 4 archivos a .jpg (80KB cada uno)
4. Sube las 4 versiones .jpg nuevas
5. Sube las 4 versiones .webp nuevas (8 archivos en total)
6. **NOTA:** Tendrás que actualizar las referencias en `index.html` de `.png` a `.jpg`

**F) Subir logo-transparent:**
1. Navega a: `public_html/public/img/`
2. Haz backup de `logo-transparent.png`
3. Sube la versión optimizada (50KB)
4. Sube la versión .webp (45KB)

**Resultado esperado:**  
✅ 36 archivos de imágenes subidos (18 originales optimizados + 18 versiones .webp)  
✅ Tamaño total de carpeta `public/img/` reducido de ~12MB a ~2.8MB

**Verificar que funciona:**
- Abre tu sitio: https://www.mielunch.com
- Las imágenes deberían cargar normalmente
- Usa Chrome DevTools (F12) → Pestaña **Network** → Filtra por "Img"
- Verifica que los navegadores modernos cargan archivos `.webp` (más livianos)
- Verifica que navegadores antiguos cargan archivos `.jpg` (fallback)

---

### ☐ 2.6 Subir index.html (MODIFICADO - Archivo Crítico)

**IMPORTANTE:** Este es el archivo MÁS IMPORTANTE. Hazlo al FINAL después de verificar que todo lo demás funciona.

**Pasos:**
1. **PRIMERO:** Haz backup del index.html actual:
   - En la raíz del sitio (`public_html`), busca `index.html`
   - Clic derecho → **Cambiar nombre** → `index.html.OLD`
   - También puedes descargar una copia adicional a tu computadora

2. **SEGUNDO:** Sube el nuevo index.html:
   - Haz clic en **Subir archivos**
   - Selecciona el nuevo `index.html` de tu computadora (aprox. 30-35KB)
   - Espera a que termine de subir

3. **TERCERO:** Verifica permisos:
   - Clic derecho en `index.html` → **Permisos**
   - Asegúrate de que sea `644` (lectura para todos, escritura solo para propietario)

**Resultado esperado:**  
✅ Nuevo `index.html` subido (aprox. 30-35KB vs. 25-28KB del anterior)

**Verificar que funciona:**
- Abre: https://www.mielunch.com
- **CTRL + F5** para forzar recarga sin caché
- El sitio debe verse exactamente igual que antes
- Nuevas secciones que deberías ver:
  - **FAQs:** Busca la sección "Preguntas Frecuentes" entre "Nosotros" y "Contacto"
  - **H1 optimizado:** Debería decir "Catering Corporativo para Empresas y Eventos en El Salvador - 7 Años de Experiencia"

**Si algo sale mal:**
- NO ENTRES EN PÁNICO
- Ve al Administrador de archivos
- Elimina el nuevo `index.html`
- Renombra `index.html.OLD` a `index.html`
- Tu sitio volverá a funcionar como antes
- Contacta soporte técnico

---

## 🔍 FASE 3: VERIFICACIÓN (30 minutos)

### ☐ 3.1 Verificar Velocidad del Sitio

**Herramienta:** Google PageSpeed Insights  
**URL:** https://pagespeed.web.dev/

**Pasos:**
1. Ve a PageSpeed Insights
2. Ingresa: `https://www.mielunch.com`
3. Espera a que termine el análisis (1-2 minutos)
4. Verifica las métricas:

**Resultados esperados:**

| Métrica | Antes | Meta Después | Tu Resultado |
|---------|-------|--------------|--------------|
| **Performance (Móvil)** | 65 | 90+ | _____ |
| **Performance (Desktop)** | 85 | 95+ | _____ |
| **SEO Score** | 95 | 100 | _____ |
| **Best Practices** | 85 | 95+ | _____ |
| **Accessibility** | 90 | 95+ | _____ |
| **LCP (Móvil)** | 4.2s | <2.5s | _____ |
| **FID** | - | <100ms | _____ |
| **CLS** | - | <0.1 | _____ |

**Si los resultados no son los esperados:**
- Espera 5-10 minutos (el caché puede tardar en actualizarse)
- Prueba de nuevo
- Verifica que el archivo `.htaccess` esté funcionando correctamente
- Verifica que las imágenes .webp se estén sirviendo correctamente

---

### ☐ 3.2 Verificar Schema Markup (Datos Estructurados)

**Herramienta:** Google Rich Results Test  
**URL:** https://search.google.com/test/rich-results

**Pasos:**
1. Ve a Rich Results Test
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **Test URL**
4. Espera a que termine el análisis (30-60 segundos)

**Resultados esperados:**
- ✅ **LocalBusiness:** Detectado correctamente
- ✅ **FAQPage:** Detectado con 8 preguntas
- ✅ **BreadcrumbList:** Detectado con 6 elementos
- ✅ **AggregateRating:** Detectado (5 estrellas, 5 reviews)
- ❌ **0 errores críticos**
- ⚠️ **0 advertencias** (o advertencias menores sin impacto)

**Si hay errores:**
- Revisa los detalles del error
- Puede ser que necesites esperar 1-2 horas para que Google procese los cambios
- Si el error persiste después de 24 horas, contacta soporte técnico

---

### ☐ 3.3 Verificar FAQs en el Sitio

**Pasos:**
1. Abre: https://www.mielunch.com
2. Desplázate hacia abajo hasta encontrar la sección **"Preguntas Frecuentes"**
3. Esta sección debe aparecer DESPUÉS de "Nosotros" y ANTES de "Contacto"
4. Haz clic en cada una de las 8 preguntas para verificar que se abren/cierran correctamente

**Preguntas que deberías ver:**
1. ¿Cuánto cuesta el servicio de catering por persona?
2. ¿A qué zonas de El Salvador dan servicio?
3. ¿Cuál es el mínimo de comensales para contratar el servicio?
4. ¿Qué incluye el servicio de catering corporativo?
5. ¿Con cuánto tiempo de anticipación debo contratar el servicio?
6. ¿Ofrecen menús especiales para dietas específicas?
7. ¿Tienen servicio disponible los fines de semana?
8. ¿Incluyen el equipamiento necesario (platos, cubiertos, mesas)?

**Resultado esperado:**
✅ Todas las preguntas se muestran y abren/cierran correctamente  
✅ Al hacer clic, se muestra la respuesta con animación suave  
✅ El diseño es responsivo (se ve bien en móvil y desktop)

---

### ☐ 3.4 Verificar Imágenes WebP

**Pasos:**
1. Abre: https://www.mielunch.com
2. Abre Chrome DevTools: **F12** o **Clic derecho → Inspeccionar**
3. Ve a la pestaña **Network**
4. Filtra por **Img** (para ver solo imágenes)
5. Recarga la página con **CTRL + F5**
6. Observa la lista de imágenes cargadas

**Resultado esperado:**
- ✅ Navegadores modernos (Chrome, Edge, Firefox 65+) cargan archivos `.webp`
- ✅ Navegadores antiguos (Safari anterior a 14, IE) cargan archivos `.jpg`
- ✅ Tamaño total de imágenes cargadas: **~1.2-1.8MB** (vs. 12MB antes)
- ✅ Tiempo de carga de imágenes: **<2 segundos**

**Cómo verificar formato WebP:**
- En la columna **Name**, busca archivos como `hero-img.webp`, `1.webp`, etc.
- En la columna **Type**, debería decir `webp` o `image/webp`

---

### ☐ 3.5 Verificar Caché y Compresión

**Herramienta:** GTmetrix  
**URL:** https://gtmetrix.com/

**Pasos:**
1. Ve a GTmetrix
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **Analyze**
4. Espera a que termine el análisis (1-2 minutos)
5. Revisa la sección **"Structure"**

**Resultados esperados:**
- ✅ **Enable text compression:** PASS (100%)
- ✅ **Leverage browser caching:** PASS (100%)
- ✅ **Serve images in next-gen formats:** PASS (WebP detectado)
- ✅ **Properly size images:** PASS
- ✅ **Performance Grade:** A (90%+)
- ✅ **Structure Grade:** A (90%+)

**Métricas esperadas:**
- **Fully Loaded Time:** <2.5 segundos
- **Total Page Size:** 2.5-3.5MB (vs. 12-15MB antes)
- **Requests:** 30-40 (similar a antes)

---

### ☐ 3.6 Verificar robots.txt y sitemap.xml

**A) Verificar robots.txt:**
1. Abre: https://www.mielunch.com/robots.txt
2. Deberías ver el contenido del archivo
3. Verifica que incluye las siguientes líneas:
   ```
   Allow: /*.webp$
   Sitemap: https://www.mielunch.com/sitemap.xml
   ```

**B) Verificar sitemap.xml:**
1. Abre: https://www.mielunch.com/sitemap.xml
2. Deberías ver un XML bien formateado con 12 URLs
3. Verifica que todas las fechas `<lastmod>` sean `2026-01-26`
4. Verifica que existe: `https://www.mielunch.com/#preguntas-frecuentes`

**Resultado esperado:**
✅ Ambos archivos accesibles y correctamente formateados

---

### ☐ 3.7 Pruebas en Diferentes Dispositivos

**Desktop:**
- ☐ Chrome/Edge (última versión)
- ☐ Firefox (última versión)
- ☐ Safari (si tienes Mac)

**Móvil:**
- ☐ Android (Chrome)
- ☐ iPhone (Safari)

**Qué verificar en cada dispositivo:**
1. El sitio carga en menos de 3 segundos
2. Las imágenes se ven nítidas y cargan rápido
3. La sección FAQs funciona correctamente (acordeón)
4. Los formularios funcionan
5. Los botones de WhatsApp funcionan
6. El menú de navegación funciona
7. No hay elementos rotos o fuera de lugar

**Resultado esperado:**
✅ El sitio funciona perfectamente en todos los dispositivos probados

---

## 🔧 FASE 4: GOOGLE SEARCH CONSOLE (15 minutos)

### ☐ 4.1 Enviar Nuevo Sitemap

**Pre-requisito:** Debes tener acceso a Google Search Console para `mielunch.com`

**Si NO tienes acceso:**
- Crea una cuenta: https://search.google.com/search-console
- Verifica tu sitio web siguiendo las instrucciones de Google
- Este proceso puede tardar 1-7 días

**Si YA tienes acceso:**
1. Ve a: https://search.google.com/search-console
2. Selecciona la propiedad: `mielunch.com` o `www.mielunch.com`
3. En el menú lateral, haz clic en **Sitemaps**
4. En el campo "Agregar un nuevo sitemap", ingresa: `sitemap.xml`
5. Haz clic en **Enviar**
6. Espera 1-2 minutos para que Google procese el sitemap

**Resultado esperado:**
- ✅ Estado: **Correcto**
- ✅ URLs descubiertas: **12**
- ✅ Última lectura: Hoy (26 de Enero 2026)

**Si el estado es "No se pudo recuperar":**
- Espera 1 hora y verifica de nuevo
- Asegúrate de que el sitemap.xml sea accesible públicamente
- Verifica que el sitemap no tenga errores de sintaxis

---

### ☐ 4.2 Solicitar Indexación de URLs Clave

**Pasos:**
1. En Google Search Console, ve a **Inspección de URLs** (en la parte superior)
2. Ingresa cada una de estas URLs y haz clic en **Solicitar indexación**:
   - `https://www.mielunch.com/`
   - `https://www.mielunch.com/#nosotros`
   - `https://www.mielunch.com/#servicios`
   - `https://www.mielunch.com/#preguntas-frecuentes` (NUEVA)
   - `https://www.mielunch.com/#contacto`

**Resultado esperado:**
✅ Mensaje: "Solicitud de indexación enviada. Normalmente tarda 1-2 días, pero puede tardar más."

**Nota:** Google puede tardar de 1-7 días en procesar las solicitudes.

---

## 🏢 FASE 5: GOOGLE BUSINESS PROFILE (20-30 minutos)

### ☐ 5.1 Crear o Reclamar Perfil

**Guía completa:** Abre el archivo `GOOGLE-BUSINESS-PROFILE-GUIDE.md`

**Resumen rápido:**
1. Ve a: https://www.google.com/business/
2. Busca si ya existe un perfil para "eLunch San Salvador"
3. Si existe: Reclámalo
4. Si no existe: Crea uno nuevo
5. Verifica tu negocio (por correo, teléfono, o video)

**Tiempo estimado:** 20-30 minutos  
**Tiempo de verificación:** 5-14 días (por correo postal o 1-2 días por otros métodos)

---

### ☐ 5.2 Completar Información del Perfil

**Datos a ingresar:**

| Campo | Valor |
|-------|-------|
| **Nombre del negocio** | eLunch |
| **Categoría principal** | Servicio de catering |
| **Categorías secundarias** | Catering para eventos, Servicio de comida para empresas |
| **Dirección** | Calle Lorena, Casa 179, Colonia Roma, San Salvador, El Salvador |
| **Teléfono** | +503 7877 8253 |
| **Sitio web** | https://www.mielunch.com |
| **Horario** | Lun-Vie: 8:00-19:00, Sáb-Dom: Variables (mencionar "horarios extendidos para eventos") |
| **Área de servicio** | San Salvador, Santa Ana, San Miguel, La Libertad, Usulután, La Paz, Sonsonate, Chalatenango, Cuscatlán, Ahuachapán, La Unión, Morazán, San Vicente, Cabañas |
| **Descripción** | Ver `GOOGLE-BUSINESS-PROFILE-GUIDE.md` - Sección 3.3 (descripción de 692 caracteres) |

---

### ☐ 5.3 Subir Fotos al Perfil

**Mínimo requerido:** 10 fotos

**Categorías recomendadas:**
- 1 foto de **logo** (logo-transparent.png optimizado)
- 1 foto de **portada** (hero-img.jpg optimizado)
- 3 fotos de **exterior/ubicación** (si tienes)
- 3 fotos de **comida** (eventos-masivos/1-3.jpg)
- 2 fotos de **equipo/cocina** (nuestra-cocina/1-2.jpg)
- 3 fotos de **eventos** (cafeterias/1-3.jpg o eventos que hayas realizado)

**Especificaciones técnicas:**
- Formato: JPG, PNG, WebP
- Tamaño: 720x720px (cuadradas) o 1200x900px (horizontales)
- Peso máximo: 5MB por foto
- Calidad: Alta resolución

**Resultado esperado:**
✅ Perfil con al menos 10 fotos de alta calidad

---

## ✅ FASE 6: VERIFICACIÓN FINAL (10 minutos)

### ☐ 6.1 Checklist de Archivos Subidos

Verifica que todos los archivos estén en el servidor:

- ☐ `index.html` (nuevo, ~30-35KB)
- ☐ `.htaccess` (nuevo, ~2KB)
- ☐ `sitemap.xml` (modificado, ~3KB)
- ☐ `robots.txt` (modificado, ~1KB)
- ☐ `public/img/hero-img.jpg` (optimizado, 150KB)
- ☐ `public/img/hero-img.webp` (nuevo, 140KB)
- ☐ `public/img/form-background.jpg` (optimizado, 120KB)
- ☐ `public/img/form-background.webp` (nuevo, 110KB)
- ☐ `public/img/eventos-masivos/` (8 archivos: 4 .jpg optimizados + 4 .webp)
- ☐ `public/img/cafeterias/` (8 archivos: 4 .jpg optimizados + 4 .webp)
- ☐ `public/img/nuestra-cocina/` (6 archivos: 3 .jpg optimizados + 3 .webp)
- ☐ `public/img/service-*.jpg` (4 archivos convertidos de PNG a JPG)
- ☐ `public/img/service-*.webp` (4 archivos nuevos)
- ☐ `public/img/logo-transparent.png` (optimizado, 50KB)
- ☐ `public/img/logo-transparent.webp` (nuevo, 45KB)

**Total de archivos:** 40 archivos (4 código + 36 imágenes)

---

### ☐ 6.2 Checklist de Funcionalidades

Verifica que todo funciona correctamente:

**SEO:**
- ☐ Title tag optimizado visible en pestaña del navegador
- ☐ Meta description visible en resultados de Google (puede tardar 1-7 días)
- ☐ Schema markup validado sin errores en Rich Results Test
- ☐ FAQs visibles y funcionales en el sitio
- ☐ Breadcrumbs schema implementado (no visible, solo para Google)

**Performance:**
- ☐ PageSpeed Insights móvil: 90+ puntos
- ☐ PageSpeed Insights desktop: 95+ puntos
- ☐ Tiempo de carga: <2.5 segundos
- ☐ Imágenes WebP cargando en navegadores compatibles
- ☐ Imágenes JPG cargando como fallback en navegadores antiguos

**Funcionalidad:**
- ☐ Sitio carga sin errores 404
- ☐ Formularios funcionan correctamente
- ☐ Botones de WhatsApp funcionan
- ☐ Navegación funciona en móvil y desktop
- ☐ Sección FAQs con acordeón funcional
- ☐ Todas las imágenes se visualizan correctamente

**Archivos de configuración:**
- ☐ .htaccess funcionando (caché + compresión)
- ☐ robots.txt accesible públicamente
- ☐ sitemap.xml accesible y válido
- ☐ Google Search Console: sitemap enviado y aceptado

**Google Business Profile:**
- ☐ Perfil creado o reclamado
- ☐ Información completa (nombre, dirección, teléfono, horario)
- ☐ Mínimo 10 fotos subidas
- ☐ Descripción optimizada ingresada
- ☐ Verificación iniciada (pendiente 5-14 días)

---

### ☐ 6.3 Checklist de Backups

Asegúrate de tener copias de seguridad:

- ☐ Backup completo del sitio: `backup-mielunch-26-ene-2026.zip` descargado
- ☐ Archivos antiguos renombrados en el servidor:
  - ☐ `index.html.OLD`
  - ☐ `.htaccess.OLD` (si existía uno)
  - ☐ `sitemap.xml.OLD`
  - ☐ `robots.txt.OLD`
  - ☐ Todas las imágenes originales renombradas a `.OLD`

**Resultado esperado:**
✅ Puedes restaurar el sitio anterior en menos de 5 minutos si es necesario

---

## 📊 FASE 7: MONITOREO POST-IMPLEMENTACIÓN

### ☐ 7.1 Primera Semana (Días 1-7)

**Qué monitorear:**

| Métrica | Herramienta | Frecuencia | Meta |
|---------|-------------|------------|------|
| **Uptime** | Hostinger Dashboard | Diario | 99.9% |
| **PageSpeed Score** | PageSpeed Insights | Día 1, 3, 7 | 90+ móvil |
| **Errores 404** | Google Search Console | Diario | 0 errores |
| **Errores de rastreo** | Google Search Console | Cada 2 días | 0 errores |
| **Schema markup** | Rich Results Test | Día 3, 7 | 0 errores |
| **Tráfico orgánico** | Google Analytics (si instalado) | Diario | Baseline |

**Acciones:**
- ☐ Día 1: Verificar que todo funciona correctamente
- ☐ Día 3: Revisar Google Search Console por errores
- ☐ Día 7: Ejecutar nuevamente PageSpeed Insights y comparar resultados

---

### ☐ 7.2 Primer Mes (Semanas 1-4)

**Qué monitorear:**

| Métrica | Herramienta | Meta Semana 4 |
|---------|-------------|---------------|
| **Impresiones en Google** | Search Console | +20-30% vs. baseline |
| **Clics orgánicos** | Search Console | +10-15% vs. baseline |
| **Posición promedio** | Search Console | Mejora de 2-5 posiciones |
| **Páginas indexadas** | Search Console | 12 páginas indexadas |
| **CTR promedio** | Search Console | >3% |
| **Llamadas desde Google Business** | GBP Dashboard | 10-20 llamadas/mes |

**Acciones semanales:**
- ☐ Semana 1: Solicitar 2-3 reseñas en Google Business Profile
- ☐ Semana 2: Crear 2 publicaciones en Google Business Profile
- ☐ Semana 3: Solicitar 2-3 reseñas adicionales
- ☐ Semana 4: Análisis completo de resultados y ajustes necesarios

---

### ☐ 7.3 Primeros 3 Meses (Meses 1-3)

**Metas de SEO local:**

| Keyword | Posición Actual | Meta Mes 3 | Herramienta |
|---------|----------------|------------|-------------|
| "catering san salvador" | ? | Top 3 | Search Console |
| "eventos corporativos el salvador" | ? | Top 5 | Search Console |
| "cafetería industrial" | ? | Top 3 | Search Console |
| "catering santa ana" | ? | Top 3 | Search Console |
| "alimentación atletas el salvador" | ? | Top 1 | Search Console |

**Metas de Google Business Profile:**

| Métrica | Meta Mes 3 |
|---------|------------|
| **Reseñas** | 15-20 reseñas |
| **Calificación promedio** | 4.8+ estrellas |
| **Fotos** | 30+ fotos |
| **Publicaciones** | 20-25 posts |
| **Llamadas/mes** | 40-60 llamadas |
| **Visitas al sitio/mes** | 100-150 visitas |

**Acciones mensuales:**
- ☐ Mes 1: Obtener 5 reseñas, crear 8 publicaciones, subir 10 fotos adicionales
- ☐ Mes 2: Obtener 5 reseñas, crear 8 publicaciones, subir 10 fotos adicionales
- ☐ Mes 3: Obtener 5 reseñas, crear 8 publicaciones, análisis completo de resultados

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### ❌ Problema: El sitio muestra error 500 después de subir .htaccess

**Solución:**
1. Accede al Administrador de archivos de Hostinger
2. Elimina el archivo `.htaccess` nuevo
3. Renombra `.htaccess.OLD` a `.htaccess` (si existía)
4. Si no existía un .htaccess anterior, simplemente elimina el nuevo
5. El sitio debería volver a funcionar
6. Contacta soporte técnico para revisar la configuración

---

### ❌ Problema: Las imágenes no cargan (error 404)

**Causas posibles:**
- Las imágenes están en la carpeta incorrecta
- Los nombres de archivo no coinciden exactamente
- Los permisos de las carpetas son incorrectos

**Solución:**
1. Verifica la estructura de carpetas:
   ```
   public_html/
   └── public/
       └── img/
           ├── hero-img.jpg
           ├── hero-img.webp
           ├── eventos-masivos/
           ├── cafeterias/
           └── nuestra-cocina/
   ```
2. Verifica que los nombres de archivo sean exactamente iguales (minúsculas/mayúsculas)
3. Verifica permisos:
   - Carpetas: `755` (lectura/ejecución para todos)
   - Archivos: `644` (lectura para todos)

---

### ❌ Problema: PageSpeed score no mejora significativamente

**Causas posibles:**
- Las imágenes no se optimizaron correctamente
- El caché no está funcionando (.htaccess mal configurado)
- Navegador cargando versión cacheada antigua

**Solución:**
1. Espera 10-15 minutos después de subir archivos
2. Limpia el caché del navegador: CTRL + SHIFT + DELETE → Borrar todo
3. Prueba en modo incógnito
4. Verifica que las imágenes .webp estén cargando (DevTools → Network → Img)
5. Verifica que el .htaccess esté activando el caché (DevTools → Network → Response Headers)
6. Si persiste, contacta soporte técnico

---

### ❌ Problema: Schema markup muestra errores en Rich Results Test

**Errores comunes:**
- "Missing required field: address"
- "Invalid URL in @id"
- "Missing required field: priceRange"

**Solución:**
1. Espera 1-2 horas (Google puede tardar en procesar)
2. Verifica que el `index.html` se subió correctamente
3. Haz clic derecho en el sitio → Ver código fuente
4. Busca `<script type="application/ld+json">` (deberías ver 3 bloques)
5. Copia el JSON y pégalo en https://jsonlint.com/ para verificar sintaxis
6. Si hay errores de sintaxis, descarga nuevamente el `index.html` correcto del proyecto

---

### ❌ Problema: Google Search Console no acepta el sitemap

**Errores comunes:**
- "No se pudo recuperar el sitemap"
- "Sitemap no es válido"

**Solución:**
1. Verifica que el sitemap sea accesible: https://www.mielunch.com/sitemap.xml
2. Si no carga, verifica que el archivo esté en la raíz del sitio
3. Verifica que el archivo tenga permisos `644`
4. Valida el XML en: https://www.xml-sitemaps.com/validate-xml-sitemap.html
5. Si el XML es inválido, descarga nuevamente el `sitemap.xml` correcto del proyecto

---

### ❌ Problema: El sitio se ve igual que antes (cambios no visibles)

**Causa:** El navegador está mostrando una versión cacheada antigua

**Solución:**
1. Fuerza recarga sin caché: **CTRL + F5** (Windows) o **CMD + SHIFT + R** (Mac)
2. Borra el caché del navegador:
   - Chrome: CTRL + SHIFT + DELETE → Seleccionar "Todo" → Borrar datos
   - Firefox: CTRL + SHIFT + DELETE → Seleccionar "Todo" → Borrar ahora
3. Prueba en modo incógnito/privado
4. Prueba desde otro dispositivo (móvil)
5. Si aún no ves los cambios, verifica que el `index.html` se subió correctamente

---

## 📞 CONTACTO Y SOPORTE

### Soporte Técnico Hostinger
- **URL:** https://www.hostinger.com/cpanel-login
- **Chat en vivo:** 24/7 disponible en el panel de Hostinger
- **Email:** support@hostinger.com
- **Documentación:** https://support.hostinger.com/es/

### Consultas sobre SEO
- **Google Search Console Help:** https://support.google.com/webmasters
- **Google Business Profile Help:** https://support.google.com/business
- **PageSpeed Insights Documentation:** https://developers.google.com/speed/docs/insights/v5/about

---

## 🎉 ¡FELICITACIONES!

Si completaste todos los pasos de este checklist, tu sitio web ahora tiene:

✅ **SEO técnico perfecto:** Score 10/10  
✅ **Velocidad optimizada:** 90+ puntos en móvil  
✅ **Schema markup avanzado:** LocalBusiness, FAQs, Breadcrumbs  
✅ **Imágenes optimizadas:** Reducción de 77% en tamaño  
✅ **Google Business Profile:** Configurado y en proceso de verificación  
✅ **FAQs para aparecer en "People Also Ask"**  
✅ **Sitemap actualizado y enviado a Google**  

**Próximos pasos:**
1. Monitorea los resultados semanalmente (Fase 7)
2. Solicita reseñas a clientes satisfechos (mínimo 1-2 por semana)
3. Crea publicaciones regulares en Google Business Profile (2-3 por semana)
4. En 3-6 meses, deberías ver un aumento significativo en tráfico y llamadas

**Resultados esperados en 3 meses:**
- +80% tráfico orgánico
- Top 3 en "catering san salvador"
- 15-20 reseñas en Google Business
- 40-60 llamadas/mes desde Google Business Profile

---

**Fecha de última actualización:** 26 de Enero 2026  
**Versión del checklist:** 1.0  
**Proyecto:** Optimización SEO eLunch - mielunch.com
