# Guía de Testing y Validación SEO - eLunch

**Fecha:** 26 de Enero 2026  
**Proyecto:** Verificación Post-Implementación SEO  
**Objetivo:** Asegurar que todas las optimizaciones funcionan correctamente

---

## 📋 ÍNDICE

1. [Verificación Inmediata (5 minutos)](#verificación-inmediata)
2. [Testing de Performance (15 minutos)](#testing-de-performance)
3. [Validación de Schema Markup (10 minutos)](#validación-de-schema-markup)
4. [Verificación de Imágenes (10 minutos)](#verificación-de-imágenes)
5. [Testing de Dispositivos Móviles (15 minutos)](#testing-móvil)
6. [Verificación de Google Search Console (10 minutos)](#google-search-console)
7. [Testing de Funcionalidades (10 minutos)](#testing-funcionalidades)
8. [Verificación de Seguridad (5 minutos)](#verificación-seguridad)
9. [Checklist Final (5 minutos)](#checklist-final)
10. [Monitoreo Continuo](#monitoreo-continuo)

**Tiempo total estimado:** 85 minutos (1 hora 25 minutos)

---

## ✅ 1. VERIFICACIÓN INMEDIATA (5 minutos)

### Objetivo
Asegurarse de que el sitio carga correctamente después de subir los archivos.

### Pasos

#### 1.1 Verificar que el sitio esté en línea

1. Abre tu navegador (Chrome recomendado)
2. Ve a: https://www.mielunch.com
3. Fuerza recarga sin caché: **CTRL + F5** (Windows) o **CMD + SHIFT + R** (Mac)

**✅ Resultado esperado:**
- El sitio carga en menos de 3 segundos
- No hay errores 404 o 500
- El contenido se ve correctamente
- Las imágenes se visualizan

**❌ Si el sitio NO carga:**
- Verifica que subiste `index.html` a la carpeta correcta
- Verifica permisos del archivo (644)
- Contacta soporte de Hostinger

---

#### 1.2 Verificar nueva sección FAQs

1. En https://www.mielunch.com, desplázate hacia abajo
2. Busca la sección "Preguntas Frecuentes"
3. Esta debe aparecer DESPUÉS de "Nosotros" y ANTES de "Contacto"
4. Haz clic en cada una de las 8 preguntas

**✅ Resultado esperado:**
- La sección FAQs es visible
- Las 8 preguntas están presentes
- Al hacer clic, se abren/cierran con animación suave
- El diseño es limpio y profesional

**❌ Si NO ves la sección FAQs:**
- El archivo `index.html` NO se subió correctamente
- Verifica que subiste la versión correcta del index.html
- Vuelve a subir el archivo

---

#### 1.3 Verificar H1 optimizado

1. En la página principal (parte superior), busca el título grande
2. Debe decir: "Catering Corporativo para Empresas y Eventos en El Salvador - 7 Años de Experiencia"

**✅ Resultado esperado:**
- El H1 tiene el texto optimizado (no el anterior "Somos la solución...")

**❌ Si el H1 NO cambió:**
- El navegador está mostrando una versión cacheada
- Fuerza recarga: CTRL + F5
- Borra caché del navegador completamente
- Espera 5-10 minutos y vuelve a intentar

---

#### 1.4 Verificar robots.txt

1. Ve a: https://www.mielunch.com/robots.txt
2. Verifica el contenido

**✅ Resultado esperado:**
```
# robots.txt para mielunch.com
# Última actualización: 26 de Enero 2026
# Optimizado para SEO completo con soporte WebP

User-agent: *
Allow: /
Allow: /*.css$
Allow: /*.js$
Allow: /*.webp$

Disallow: /cgi-bin/
Disallow: /tmp/
Disallow: /.htaccess
Disallow: /.git/

Sitemap: https://www.mielunch.com/sitemap.xml

Crawl-delay: 5
```

**❌ Si robots.txt NO se actualizó:**
- El archivo NO se subió correctamente
- Vuelve a subir robots.txt a la raíz del sitio
- Limpia caché del navegador (CTRL + F5)

---

#### 1.5 Verificar sitemap.xml

1. Ve a: https://www.mielunch.com/sitemap.xml
2. Busca la nueva URL de FAQs
3. Verifica las fechas

**✅ Resultado esperado:**
- El sitemap se visualiza correctamente (XML formateado)
- Contiene 12 URLs (incluida `#preguntas-frecuentes`)
- Todas las fechas `<lastmod>` dicen `2026-01-26`

**❌ Si sitemap.xml NO se actualizó:**
- El archivo NO se subió correctamente
- Vuelve a subir sitemap.xml a la raíz del sitio
- Limpia caché del navegador

---

## 📊 2. TESTING DE PERFORMANCE (15 minutos)

### Objetivo
Verificar que las optimizaciones de velocidad están funcionando correctamente.

### 2.1 PageSpeed Insights - Móvil

**Herramienta:** Google PageSpeed Insights  
**URL:** https://pagespeed.web.dev/

**Pasos:**
1. Ve a PageSpeed Insights
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **"Analyze"**
4. Espera 1-2 minutos
5. Verifica la pestaña **"Mobile"**

**✅ Resultados esperados:**

| Métrica | Meta | Cómo verificar |
|---------|------|----------------|
| **Performance Score** | 90-100 (verde) | Número grande en la parte superior |
| **LCP (Largest Contentful Paint)** | <2.5s (verde) | En "Core Web Vitals Assessment" |
| **FID (First Input Delay)** | <100ms (verde) | En "Core Web Vitals Assessment" |
| **CLS (Cumulative Layout Shift)** | <0.1 (verde) | En "Core Web Vitals Assessment" |
| **SEO Score** | 100 (verde) | En las pestañas superiores |

**Diagnósticos esperados (en verde):**
- ✅ Serve images in next-gen formats (WebP detectado)
- ✅ Efficiently encode images
- ✅ Enable text compression
- ✅ Reduce unused CSS
- ✅ Properly size images

**🔍 Cómo interpretar:**
- **Verde (90-100):** EXCELENTE ✅
- **Naranja (50-89):** Aceptable, pero hay margen de mejora ⚠️
- **Rojo (0-49):** CRÍTICO - Algo salió mal ❌

**❌ Si Performance Score <90:**

**Causas posibles:**
1. Las imágenes NO se optimizaron correctamente
2. El archivo `.htaccess` NO está funcionando (caché/compresión)
3. Las imágenes WebP NO se están sirviendo

**Solución:**
1. Verifica que las imágenes .webp existen en el servidor
2. Verifica que el .htaccess está en la raíz del sitio
3. Espera 10-15 minutos (el caché puede tardar en activarse)
4. Prueba de nuevo en modo incógnito
5. Contacta soporte técnico si persiste

---

### 2.2 PageSpeed Insights - Desktop

**Pasos:**
1. En la misma página de PageSpeed Insights
2. Haz clic en la pestaña **"Desktop"**
3. Verifica las métricas

**✅ Resultados esperados:**

| Métrica | Meta |
|---------|------|
| **Performance Score** | 95-100 (verde) |
| **LCP** | <1.5s (verde) |
| **FID** | <50ms (verde) |
| **CLS** | <0.05 (verde) |

**Nota:** Desktop generalmente tiene mejores scores que móvil.

---

### 2.3 GTmetrix

**Herramienta:** GTmetrix  
**URL:** https://gtmetrix.com/

**Pasos:**
1. Ve a GTmetrix
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **"Analyze"**
4. Espera 1-2 minutos

**✅ Resultados esperados:**

| Métrica | Meta | Ubicación |
|---------|------|-----------|
| **GTmetrix Grade** | A (90%+) | Parte superior |
| **Performance** | 90%+ | Barra de progreso |
| **Structure** | 90%+ | Barra de progreso |
| **Fully Loaded Time** | <2.5s | Resumen |
| **Total Page Size** | 2.5-3.5MB | Resumen |
| **Requests** | 30-40 | Resumen |

**Verificaciones específicas (pestaña "Structure"):**
- ✅ **Enable text compression:** PASS (100%)
- ✅ **Leverage browser caching:** PASS (100%)
- ✅ **Serve images in next-gen formats:** PASS (WebP)
- ✅ **Properly size images:** PASS

**❌ Si "Enable text compression" FAIL:**
- El archivo `.htaccess` NO está funcionando
- Verifica que el .htaccess está en la raíz del sitio
- Verifica que el módulo `mod_deflate` está habilitado en Hostinger
- Contacta soporte técnico

**❌ Si "Leverage browser caching" FAIL:**
- El archivo `.htaccess` NO tiene las directivas de caché
- Verifica que el módulo `mod_expires` está habilitado
- Contacta soporte técnico

---

### 2.4 WebPageTest

**Herramienta:** WebPageTest  
**URL:** https://www.webpagetest.org/

**Pasos:**
1. Ve a WebPageTest
2. Ingresa: `https://www.mielunch.com`
3. Selecciona ubicación: **"Dulles, VA - Chrome"** (default)
4. Haz clic en **"Start Test"**
5. Espera 2-3 minutos

**✅ Resultados esperados:**

| Métrica | Meta | Letra |
|---------|------|-------|
| **First Byte Time** | <0.5s | A |
| **Keep-alive Enabled** | Sí | A |
| **Compress Transfer** | Sí | A |
| **Compress Images** | Sí | A |
| **Cache Static Content** | >30 días | A |
| **Use of CDN** | N/A | - |

**Métricas de tiempo:**
- **Load Time:** <3s
- **First Contentful Paint:** <1.5s
- **Speed Index:** <2.5s

---

## 🔍 3. VALIDACIÓN DE SCHEMA MARKUP (10 minutos)

### Objetivo
Verificar que todos los Schema Markup (datos estructurados) están correctos y sin errores.

### 3.1 Rich Results Test - LocalBusiness

**Herramienta:** Google Rich Results Test  
**URL:** https://search.google.com/test/rich-results

**Pasos:**
1. Ve a Rich Results Test
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **"Test URL"**
4. Espera 30-60 segundos

**✅ Resultados esperados:**

| Schema Type | Status | Detalles |
|-------------|--------|----------|
| **LocalBusiness** | ✅ Valid | Detectado correctamente |
| **FAQPage** | ✅ Valid | 8 preguntas detectadas |
| **BreadcrumbList** | ✅ Valid | 6 elementos detectados |
| **AggregateRating** | ✅ Valid | 5 estrellas, 5 reviews |

**Panel derecho debe mostrar:**
- ✅ **0 errores críticos**
- ⚠️ **0-2 advertencias** (advertencias menores sin impacto están OK)
- ℹ️ Información adicional

**❌ Si hay errores críticos:**

**Error común 1:** "Missing required field: address"
- **Causa:** El Schema LocalBusiness NO se actualizó correctamente
- **Solución:** Verifica que subiste el index.html correcto

**Error común 2:** "Invalid URL in @id"
- **Causa:** URLs en el schema no coinciden con el dominio
- **Solución:** Verifica que todas las URLs usan `https://www.mielunch.com`

**Error común 3:** "Missing required field: priceRange"
- **Causa:** El Schema LocalBusiness está incompleto
- **Solución:** Vuelve a subir el index.html correcto

---

### 3.2 Schema Markup Validator

**Herramienta:** Schema.org Validator  
**URL:** https://validator.schema.org/

**Pasos:**
1. Ve a Schema Markup Validator
2. Selecciona pestaña **"Fetch URL"**
3. Ingresa: `https://www.mielunch.com`
4. Haz clic en **"Run Test"**
5. Espera 30 segundos

**✅ Resultados esperados:**
- **0 errores** en la lista
- 3-4 bloques de schema detectados:
  1. FoodEstablishment (LocalBusiness)
  2. FAQPage
  3. BreadcrumbList
  4. AggregateRating (puede estar dentro de FoodEstablishment)

**Cómo verificar cada schema:**

**A) LocalBusiness (FoodEstablishment):**
```json
{
  "@type": "FoodEstablishment",
  "name": "eLunch - Catering Corporativo El Salvador",
  "telephone": "+503-7877-8253",
  "address": { ... },
  "areaServed": [ ... 14 departamentos ... ],
  "priceRange": "$",
  "openingHoursSpecification": [ ... ]
}
```

**B) FAQPage:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuánto cuesta...", ... },
    // ... 7 preguntas más
  ]
}
```

**C) BreadcrumbList:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Inicio", ... },
    { "position": 2, "name": "Nosotros", ... },
    // ... 4 elementos más
  ]
}
```

---

### 3.3 Verificar FAQs en Google (manual)

**Nota:** Esto puede tardar 1-7 días en aparecer.

**Pasos:**
1. Abre Google (https://www.google.com)
2. Busca: `site:mielunch.com catering`
3. Busca tu sitio en los resultados

**✅ Resultado esperado (después de 1-7 días):**
- Tu sitio aparece en los resultados
- Debajo de la descripción, verás dropdowns de preguntas (FAQs)
- Ejemplo visual:
  ```
  eLunch - Catering Corporativo El Salvador | eLunch...
  https://www.mielunch.com
  ⭐⭐⭐⭐⭐ 5.0 (5) · Servicio de catering
  Servicio profesional de catering en El Salvador...
  ▼ ¿Cuánto cuesta el servicio de catering por persona?
  ▼ ¿A qué zonas de El Salvador dan servicio?
  ```

**Nota:** Si NO aparecen los FAQs después de 7 días:
- Solicita indexación manual en Google Search Console
- Verifica que no hay errores en Rich Results Test
- Los FAQs pueden tardar hasta 30 días en algunos casos

---

## 🖼️ 4. VERIFICACIÓN DE IMÁGENES (10 minutos)

### Objetivo
Verificar que las imágenes están optimizadas y cargando correctamente en formato WebP.

### 4.1 Verificar que las imágenes cargan

**Pasos:**
1. Abre https://www.mielunch.com
2. Desplázate por toda la página
3. Verifica visualmente que todas las imágenes se ven correctamente

**✅ Resultado esperado:**
- Todas las imágenes cargan sin errores 404
- Las imágenes se ven nítidas (no borrosas o pixeladas)
- No hay espacios en blanco donde deberían estar las imágenes

**❌ Si alguna imagen NO carga:**
- Error 404: La imagen NO se subió al servidor
- Verifica la carpeta: `public/img/` en Hostinger
- Verifica que los nombres de archivo coinciden exactamente

---

### 4.2 Verificar formato WebP (Chrome DevTools)

**Pasos:**
1. Abre https://www.mielunch.com
2. Abre Chrome DevTools: **F12** o **Clic derecho → Inspeccionar**
3. Ve a la pestaña **"Network"**
4. Filtra por **"Img"** (botón en la barra superior)
5. Recarga la página: **CTRL + F5**
6. Observa la lista de imágenes cargadas

**✅ Resultado esperado:**

| Columna | Valor Esperado |
|---------|----------------|
| **Name** | hero-img.webp, 1.webp, 2.webp, etc. |
| **Type** | webp o image/webp |
| **Size** | 140-150KB (vs. 500-600KB originales) |
| **Time** | <500ms por imagen |

**Verificación específica:**

**Navegadores modernos (Chrome, Edge, Firefox 65+, Safari 14+):**
- Deben cargar archivos `.webp`

**Navegadores antiguos (Safari <14, IE):**
- Deben cargar archivos `.jpg` como fallback
- Para probar: Usa navegador antiguo o simula en DevTools

**❌ Si NO se cargan archivos .webp:**

**Causa 1:** Los archivos .webp NO existen en el servidor
- **Solución:** Optimiza las imágenes siguiendo IMAGE-OPTIMIZATION-GUIDE.md
- Sube los archivos .webp al servidor

**Causa 2:** El HTML no está configurado para servir WebP
- **Solución:** Verifica que subiste el index.html correcto

**Causa 3:** El tipo MIME de WebP NO está configurado
- **Solución:** Verifica que el .htaccess tiene: `AddType image/webp .webp`

---

### 4.3 Verificar tamaño total de imágenes

**En Chrome DevTools (pestaña Network):**
1. Recarga la página: **CTRL + F5**
2. Espera a que termine de cargar
3. En la parte inferior de DevTools, verás un resumen

**✅ Resultado esperado:**
- **Total Transferred:** 1.5-2.5MB (con imágenes WebP)
- **Resources:** 1.8-2.8MB (uncompressed)
- **Finish:** <3 segundos
- **DOMContentLoaded:** <1.5 segundos
- **Load:** <2.5 segundos

**❌ Si Total Transferred >5MB:**
- Las imágenes NO se optimizaron correctamente
- Verifica que subiste las versiones optimizadas (no las originales)
- Vuelve a optimizar las imágenes

---

### 4.4 Verificar alt text de imágenes

**Pasos:**
1. En https://www.mielunch.com
2. Clic derecho en cualquier imagen → **Inspeccionar**
3. En el HTML que aparece, verifica el atributo `alt`

**✅ Resultado esperado:**

**Imagen hero:**
```html
<img src="public/img/hero-img.jpg" 
     alt="Catering corporativo para eventos empresariales en El Salvador - eLunch San Salvador"
     width="1200" 
     height="800">
```

**Imágenes de servicios:**
```html
<img src="public/img/service-1.jpg" 
     alt="Catering y eventos corporativos - Servicio profesional de comida para empresas en El Salvador"
     width="400" 
     height="300">
```

**Verificar:**
- ✅ Todos los `<img>` tienen atributo `alt`
- ✅ El alt text es descriptivo (no solo "imagen 1")
- ✅ El alt text incluye keywords relevantes
- ✅ Todos los `<img>` tienen `width` y `height`

---

## 📱 5. TESTING DE DISPOSITIVOS MÓVILES (15 minutos)

### Objetivo
Verificar que el sitio funciona perfectamente en dispositivos móviles.

### 5.1 Mobile-Friendly Test

**Herramienta:** Google Mobile-Friendly Test  
**URL:** https://search.google.com/test/mobile-friendly

**Pasos:**
1. Ve a Mobile-Friendly Test
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **"Test URL"**
4. Espera 30-60 segundos

**✅ Resultado esperado:**
- **"Page is mobile-friendly"** (mensaje verde con checkmark)
- Preview muestra el sitio correctamente en móvil
- No hay errores de "text too small" o "clickable elements too close"

**❌ Si NO es mobile-friendly:**
- Hay un problema con el CSS responsive
- Verifica que subiste el index.html correcto
- Contacta soporte técnico

---

### 5.2 Chrome DevTools - Modo Responsive

**Pasos:**
1. Abre https://www.mielunch.com
2. Abre Chrome DevTools: **F12**
3. Haz clic en el icono de **"Toggle device toolbar"** (o **CTRL + SHIFT + M**)
4. Selecciona diferentes dispositivos del dropdown

**Dispositivos a probar:**

| Dispositivo | Resolución | Qué verificar |
|-------------|------------|---------------|
| **iPhone 12 Pro** | 390x844 | Navegación funcional, imágenes proporcionales |
| **Samsung Galaxy S20** | 360x800 | Textos legibles, botones clickeables |
| **iPad Air** | 820x1180 | Layout tablet, menú colapsado |
| **iPhone SE** | 375x667 | Funciona en pantallas pequeñas |

**✅ Qué verificar en cada dispositivo:**
- ✅ El sitio se ve bien (no hay elementos cortados o fuera de lugar)
- ✅ Los textos son legibles (no demasiado pequeños)
- ✅ Los botones son clickeables (no demasiado cerca unos de otros)
- ✅ El menú de navegación funciona correctamente
- ✅ La sección FAQs abre/cierra correctamente
- ✅ Los formularios se ven y funcionan bien
- ✅ Las imágenes cargan y se ven nítidas

---

### 5.3 Probar en dispositivos reales

**Si tienes acceso a dispositivos reales:**

**Android:**
1. Abre Chrome en tu Android
2. Ve a: https://www.mielunch.com
3. Prueba navegación, botones, formularios

**iPhone:**
1. Abre Safari en tu iPhone
2. Ve a: https://www.mielunch.com
3. Prueba navegación, botones, formularios

**✅ Resultado esperado:**
- El sitio carga en <3 segundos (4G/WiFi)
- Todo funciona correctamente
- La barra de direcciones se colorea de naranja (theme-color funcionando)

**Verificar theme-color (Android Chrome / iPhone Safari):**
- En Android Chrome: La barra superior debe ser naranja (#ea580c)
- En iPhone Safari: La barra de estado debe tener tinte naranja

---

## 🔍 6. VERIFICACIÓN DE GOOGLE SEARCH CONSOLE (10 minutos)

### Objetivo
Enviar el sitemap y verificar que Google puede rastrear el sitio correctamente.

### 6.1 Enviar sitemap

**Pre-requisito:** Debes tener acceso a Google Search Console.

**Si NO tienes acceso:**
- Crea cuenta: https://search.google.com/search-console
- Verifica propiedad del dominio (puede tardar 1-24 horas)

**Si YA tienes acceso:**

**Pasos:**
1. Ve a: https://search.google.com/search-console
2. Selecciona la propiedad: `mielunch.com` o `www.mielunch.com`
3. En el menú lateral, haz clic en **"Sitemaps"**
4. En el campo "Agregar un nuevo sitemap", ingresa: `sitemap.xml`
5. Haz clic en **"Enviar"**
6. Espera 1-2 minutos

**✅ Resultado esperado:**
- Estado: **"Correcto"** (verde)
- URLs descubiertas: **12**
- Última lectura: Hoy (26 de Enero 2026)

**❌ Si el estado es "No se pudo recuperar":**
- Espera 1 hora y verifica de nuevo
- Asegúrate de que https://www.mielunch.com/sitemap.xml es accesible públicamente
- Verifica que el sitemap no tenga errores de sintaxis
- Prueba el sitemap en: https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

### 6.2 Solicitar indexación de URLs clave

**Pasos:**
1. En Google Search Console, busca el campo de búsqueda en la parte superior
2. Ingresa cada una de estas URLs (una por una):
   - `https://www.mielunch.com/`
   - `https://www.mielunch.com/#nosotros`
   - `https://www.mielunch.com/#servicios`
   - `https://www.mielunch.com/#preguntas-frecuentes` (NUEVA)
   - `https://www.mielunch.com/#contacto`

3. Para cada URL:
   - Espera a que termine la inspección (30 segundos)
   - Haz clic en **"Solicitar indexación"**
   - Espera confirmación (1-2 minutos)

**✅ Resultado esperado:**
- Mensaje: "Solicitud de indexación enviada. Normalmente tarda 1-2 días, pero puede tardar más."

**Nota:** Google puede tardar de 1-7 días en procesar las solicitudes.

---

### 6.3 Verificar robots.txt en Search Console

**Pasos:**
1. En Google Search Console, en el menú lateral, busca **"Configuración"** (settings)
2. Haz clic en **"robots.txt tester"** (puede estar en "Legacy tools")
3. Verifica el contenido

**✅ Resultado esperado:**
- Se muestra el contenido de tu robots.txt actualizado
- Fecha: 26 de Enero 2026
- Incluye: `Allow: /*.webp$`
- Incluye: `Sitemap: https://www.mielunch.com/sitemap.xml`

**Probar robots.txt:**
1. En el campo de prueba, ingresa: `/public/img/hero-img.webp`
2. Haz clic en **"Test"**
3. Resultado: **"Allowed"** (verde)

---

## ⚙️ 7. TESTING DE FUNCIONALIDADES (10 minutos)

### Objetivo
Verificar que todas las funcionalidades del sitio funcionan correctamente.

### 7.1 Testing de navegación

**Pasos:**
1. Abre https://www.mielunch.com
2. Prueba cada enlace del menú de navegación

**Enlaces a probar:**
- ☐ Inicio → Debe llevarte al top de la página
- ☐ Nosotros → Debe llevarte a la sección "Nosotros"
- ☐ Servicios → Debe llevarte a la sección "Servicios"
- ☐ Clientes → Debe llevarte a la sección "Clientes"
- ☐ FAQs → Debe llevarte a la sección "Preguntas Frecuentes" (NUEVA)
- ☐ Contacto → Debe llevarte a la sección "Contacto"

**✅ Resultado esperado:**
- Todos los enlaces funcionan
- El scroll es suave (no instantáneo)
- No hay errores 404

---

### 7.2 Testing de formularios

**Formulario de contacto:**
1. Llena el formulario con datos de prueba
2. Haz clic en **"Enviar"** o **"Cotizar"**
3. Verifica que funciona

**✅ Resultado esperado:**
- El formulario envía correctamente
- Recibes un mensaje de confirmación
- Recibes el email con los datos del formulario

**❌ Si el formulario NO funciona:**
- Verifica la configuración del backend (PHP, SMTP, etc.)
- Esto NO está relacionado con las optimizaciones SEO
- Contacta al desarrollador o soporte técnico

---

### 7.3 Testing de botones de WhatsApp

**Pasos:**
1. Busca los botones de WhatsApp en el sitio
2. Haz clic en cada uno

**✅ Resultado esperado:**
- Se abre WhatsApp Web o la app de WhatsApp
- El número es: +503-7877-8253
- Hay un mensaje pre-escrito (si está configurado)

**❌ Si NO funciona:**
- Verifica el número de teléfono en el código
- El link debe ser: `https://wa.me/50378778253`

---

### 7.4 Testing de FAQs (acordeón)

**Pasos:**
1. Ve a la sección "Preguntas Frecuentes"
2. Haz clic en cada una de las 8 preguntas
3. Verifica que se abren/cierran correctamente

**✅ Resultado esperado:**
- Al hacer clic, la respuesta se expande con animación suave
- Al hacer clic de nuevo, la respuesta se colapsa
- Solo una pregunta puede estar abierta a la vez (opcional)
- El icono + cambia a - cuando está abierto (opcional)

**❌ Si NO funciona:**
- Hay un problema con el JavaScript
- Verifica que el script `main.js` se cargó correctamente
- Abre Chrome DevTools (F12) → pestaña **Console**
- Busca errores en rojo

---

### 7.5 Testing de enlaces externos

**Pasos:**
1. Busca enlaces a redes sociales (Footer o Header)
2. Haz clic en cada uno

**Enlaces a verificar:**
- ☐ Facebook → Debe abrir https://www.facebook.com/elunchsv
- ☐ Instagram → Debe abrir https://www.instagram.com/elunchsv
- ☐ Ambos deben abrirse en nueva pestaña

**✅ Resultado esperado:**
- Los enlaces abren en nueva pestaña
- Las URLs de redes sociales son correctas
- No hay errores 404

**Nota:** Si las URLs de redes sociales aún son placeholders, actualízalas en el código.

---

## 🔒 8. VERIFICACIÓN DE SEGURIDAD (5 minutos)

### Objetivo
Verificar que el sitio tiene las configuraciones de seguridad básicas.

### 8.1 Verificar HTTPS

**Pasos:**
1. Abre: http://mielunch.com (sin HTTPS)
2. Verifica que redirige automáticamente a: https://www.mielunch.com

**✅ Resultado esperado:**
- Redirección automática a HTTPS
- El candado verde aparece en la barra de direcciones
- No hay advertencias de "sitio no seguro"

**❌ Si NO redirige a HTTPS:**
- El archivo `.htaccess` NO está funcionando
- Verifica que el .htaccess tiene las directivas de redirección
- Contacta soporte de Hostinger para verificar certificado SSL

---

### 8.2 Verificar redirección non-www → www

**Pasos:**
1. Abre: https://mielunch.com (sin www)
2. Verifica que redirige a: https://www.mielunch.com (con www)

**✅ Resultado esperado:**
- Redirección automática a www
- La URL en la barra de direcciones muestra: `https://www.mielunch.com`

**❌ Si NO redirige:**
- El archivo `.htaccess` NO está funcionando
- Verifica las directivas de redirección en .htaccess

---

### 8.3 Verificar headers de seguridad

**Herramienta:** SecurityHeaders.com  
**URL:** https://securityheaders.com/

**Pasos:**
1. Ve a SecurityHeaders.com
2. Ingresa: `https://www.mielunch.com`
3. Haz clic en **"Scan"**
4. Espera 30 segundos

**✅ Resultado esperado:**

| Header | Presente | Valor |
|--------|----------|-------|
| **X-Content-Type-Options** | ✅ | nosniff |
| **X-XSS-Protection** | ✅ | 1; mode=block |
| **X-Frame-Options** | ✅ | SAMEORIGIN |
| **Referrer-Policy** | ✅ | strict-origin-when-cross-origin |

**Calificación esperada:** B o superior

**❌ Si faltan headers:**
- El archivo `.htaccess` NO está configurado correctamente
- Verifica que subiste el .htaccess completo
- Contacta soporte técnico si persiste

---

## ✅ 9. CHECKLIST FINAL (5 minutos)

### Verificación Completa

Marca cada ítem al completarlo:

#### Archivos subidos
- ☐ `index.html` (nuevo, ~30-35KB)
- ☐ `.htaccess` (nuevo, ~2KB)
- ☐ `sitemap.xml` (modificado, ~3KB)
- ☐ `robots.txt` (modificado, ~1KB)
- ☐ 18 imágenes `.webp` (nuevas)
- ☐ 18 imágenes `.jpg/.png` optimizadas (reemplazadas)

#### Funcionalidades básicas
- ☐ El sitio carga correctamente (sin errores 404 o 500)
- ☐ Nueva sección FAQs visible y funcional
- ☐ H1 optimizado visible
- ☐ Navegación funciona correctamente
- ☐ Formularios funcionan
- ☐ Botones de WhatsApp funcionan

#### Performance
- ☐ PageSpeed Móvil: 90+ puntos
- ☐ PageSpeed Desktop: 95+ puntos
- ☐ LCP <2.5s (verde)
- ☐ FID <100ms (verde)
- ☐ CLS <0.1 (verde)
- ☐ Tiempo de carga <3s

#### Schema Markup
- ☐ Rich Results Test: 0 errores
- ☐ LocalBusiness detectado
- ☐ FAQPage detectado (8 preguntas)
- ☐ BreadcrumbList detectado (6 elementos)
- ☐ AggregateRating detectado

#### Imágenes
- ☐ Todas las imágenes cargan correctamente
- ☐ Imágenes WebP se sirven en navegadores compatibles
- ☐ Tamaño total de página: 2.5-3.5MB (vs. 15MB anterior)
- ☐ Alt text optimizado en todas las imágenes

#### Mobile
- ☐ Mobile-Friendly Test: PASS
- ☐ Funciona en iPhone/Android
- ☐ Theme-color visible en móvil (barra naranja)
- ☐ Responsive en diferentes tamaños de pantalla

#### Google Search Console
- ☐ Sitemap enviado y aceptado
- ☐ Indexación solicitada para URLs clave
- ☐ robots.txt validado

#### Seguridad
- ☐ HTTPS funcionando (candado verde)
- ☐ Redirección non-www → www funciona
- ☐ Headers de seguridad presentes

---

## 📊 10. MONITOREO CONTINUO

### Objetivo
Establecer rutina de monitoreo para rastrear mejoras SEO en el tiempo.

### 10.1 Monitoreo Semanal (10 minutos)

**Qué monitorear cada semana:**

#### Google Search Console
1. Ve a: https://search.google.com/search-console
2. Revisa la sección **"Performance"**
3. Anota las métricas:

| Métrica | Semana 1 | Semana 2 | Semana 3 | Semana 4 |
|---------|----------|----------|----------|----------|
| **Total Clicks** | _____ | _____ | _____ | _____ |
| **Total Impressions** | _____ | _____ | _____ | _____ |
| **Average CTR** | _____ | _____ | _____ | _____ |
| **Average Position** | _____ | _____ | _____ | _____ |

**Meta progresiva:**
- Clicks: +10-15% cada semana
- Impressions: +15-20% cada semana
- CTR: Mantener 3-4%
- Position: Mejorar 2-3 posiciones cada semana

#### Google Business Profile
1. Abre la app de Google Business en tu móvil
2. Ve a **"Insights"** o **"Estadísticas"**
3. Anota las métricas:

| Métrica | Semana 1 | Semana 2 | Semana 3 | Semana 4 |
|---------|----------|----------|----------|----------|
| **Total views** | _____ | _____ | _____ | _____ |
| **Discovery searches** | _____ | _____ | _____ | _____ |
| **Direct searches** | _____ | _____ | _____ | _____ |
| **Calls** | _____ | _____ | _____ | _____ |
| **Website visits** | _____ | _____ | _____ | _____ |

**Meta progresiva:**
- Views: +20% cada semana
- Calls: +15% cada semana
- Website visits: +25% cada semana

---

### 10.2 Monitoreo Mensual (30 minutos)

**Qué hacer cada mes:**

#### 1. Análisis de Keywords (Google Search Console)
1. Ve a **Performance** → **Search results**
2. Haz clic en la pestaña **"Queries"**
3. Ordena por **"Impressions"** (descendente)
4. Anota las top 10 keywords:

| # | Keyword | Clicks | Impressions | CTR | Position |
|---|---------|--------|-------------|-----|----------|
| 1 | _____ | _____ | _____ | _____ | _____ |
| 2 | _____ | _____ | _____ | _____ | _____ |
| ... | ... | ... | ... | ... | ... |

**Acción:**
- Identifica keywords con alta impresión pero baja posición (oportunidades)
- Crea contenido nuevo enfocado en esas keywords

#### 2. Análisis de Páginas (Google Search Console)
1. Ve a **Performance** → **Pages**
2. Identifica páginas con mejor rendimiento
3. Identifica páginas con oportunidades de mejora

#### 3. Verificar Core Web Vitals
1. En Google Search Console, ve a **Core Web Vitals**
2. Verifica que no haya URLs en "Poor" (rojo)
3. Objetivo: Todas las URLs en "Good" (verde)

#### 4. Revisar errores de rastreo
1. En Google Search Console, ve a **Coverage**
2. Verifica que no haya errores 404
3. Corrige cualquier error encontrado

#### 5. Actualizar contenido
1. Revisa el contenido del sitio
2. Actualiza fechas si es relevante
3. Agrega contenido nuevo (blog posts, FAQs adicionales)

---

### 10.3 Monitoreo Trimestral (2 horas)

**Qué hacer cada 3 meses:**

#### 1. Análisis competitivo
1. Busca en Google: "catering san salvador"
2. Identifica a los top 3 competidores
3. Analiza sus sitios:
   - ¿Qué hacen bien?
   - ¿Qué puedes mejorar tú?
   - ¿Tienen más reseñas?
   - ¿Tienen más contenido?

#### 2. Auditoría SEO completa
1. Ejecuta PageSpeed Insights de nuevo
2. Ejecuta Rich Results Test de nuevo
3. Verifica que todas las métricas se mantienen o mejoran

#### 3. Actualización de sitemap
1. Si agregaste contenido nuevo, actualiza el sitemap.xml
2. Actualiza las fechas `<lastmod>`
3. Envía el sitemap actualizado a Google Search Console

#### 4. Revisión de backlinks
1. Busca en Google: `link:mielunch.com`
2. Identifica nuevos backlinks
3. Contacta a sitios relevantes para obtener más backlinks

#### 5. Plan de contenido para próximo trimestre
1. Basándote en los datos de Search Console
2. Identifica 10-15 nuevas keywords objetivo
3. Crea calendario de publicaciones de blog

---

## 🎯 MÉTRICAS DE ÉXITO - METAS POR PERÍODO

### Mes 1

| Métrica | Meta |
|---------|------|
| PageSpeed Móvil | 90+ |
| Keywords en Top 10 | 5-8 |
| Tráfico orgánico | +30% vs. baseline |
| Reseñas Google | 5 reseñas |
| Llamadas desde Google | 15-20/mes |

### Mes 3

| Métrica | Meta |
|---------|------|
| PageSpeed Móvil | 95+ |
| Keywords en Top 10 | 15-20 |
| Keywords en Top 3 | 5-8 |
| Tráfico orgánico | +100% vs. baseline |
| Reseñas Google | 15 reseñas |
| Llamadas desde Google | 40-50/mes |

### Mes 6

| Métrica | Meta |
|---------|------|
| PageSpeed Móvil | 95+ (mantener) |
| Keywords en Top 10 | 25-30 |
| Keywords en Top 3 | 15-20 |
| Tráfico orgánico | +200% vs. baseline |
| Reseñas Google | 25 reseñas |
| Llamadas desde Google | 70-80/mes |

---

## 🚨 SEÑALES DE ALERTA

### Cuándo preocuparse

**❌ Señales de que algo salió mal:**

1. **PageSpeed Score cae debajo de 80:**
   - Acción: Re-verificar optimización de imágenes y .htaccess

2. **Tráfico orgánico cae >20% de un mes a otro:**
   - Acción: Revisar Google Search Console por penalizaciones
   - Verificar que el sitio no está caído
   - Revisar si hay errores de rastreo

3. **Errores en Rich Results Test:**
   - Acción: Corregir errores de schema markup inmediatamente
   - Re-enviar sitemap a Google Search Console

4. **Muchos errores 404 en Search Console:**
   - Acción: Corregir enlaces rotos
   - Configurar redirecciones 301 si es necesario

5. **Posiciones promedio empeoran:**
   - Acción: Analizar competencia
   - Actualizar contenido existente
   - Crear contenido nuevo

---

## 📞 CONTACTO DE EMERGENCIA

### Si algo no funciona

**Soporte Técnico Hostinger:**
- Chat en vivo: https://www.hostinger.com (24/7)
- Email: support@hostinger.com
- Documentación: https://support.hostinger.com/es/

**Recursos de Google:**
- Google Search Console Help: https://support.google.com/webmasters
- Google Business Profile Help: https://support.google.com/business

**Herramientas de diagnóstico:**
- PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

---

## ✅ CONCLUSIÓN

Si completaste todos los tests de esta guía y todos están en **✅ PASS**, entonces:

🎉 **¡Felicitaciones! Tu sitio está perfectamente optimizado para SEO.**

Ahora debes:
1. ✅ Configurar Google Business Profile (usa GOOGLE-BUSINESS-PROFILE-GUIDE.md)
2. ✅ Obtener primeras 5 reseñas
3. ✅ Monitorear métricas semanalmente
4. ✅ Esperar 2-4 semanas para ver primeros resultados en rankings

**Recuerda:** El SEO es un proceso continuo. Los mejores resultados se ven después de 3-6 meses de trabajo consistente.

---

**Creado por:** OpenCode AI  
**Fecha:** 26 de Enero 2026  
**Versión:** 1.0  
**Proyecto:** Optimización SEO eLunch - mielunch.com
