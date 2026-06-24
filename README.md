# quincho.com.py — landing

Landing autocontenida en **HTML + CSS + JS plano** (sin frameworks, sin build).
Se despliega subiendo `index.html` a cualquier hosting estático (tu Vercel, Netlify, Cloudflare Pages, o un hosting común con cPanel).

Todo lo que tocás en el día a día está en el objeto **`CONFIG`**, arriba del `<script>` en `index.html`.

---

## 1. Marca y contacto
En `CONFIG.brand`:
- `whatsapp`: tu número en formato internacional **sin +** (ej: `595972827903`).
- `email`, `address`, `whatsappText` (mensaje inicial del chat).

El logo es un SVG inline (techo + 3 postes, heredando las 3 barras de Hause). Si querés cambiarlo, está en el `<header>` y en el `<footer>`.

## 2. Renders (cuando lleguen)
- Hero: subí la imagen y poné su ruta en `CONFIG.heroImage` (ej: `"renders/hero.jpg"`).
- Cada diseño: campo `image` dentro de `CONFIG.designs[]`.
- Mientras estén vacíos (`""`) se muestra un placeholder prolijo, así la página ya luce bien.
- Recomendado: imágenes en proporción 4:3, ~1200px de ancho, `.webp` o `.jpg`.

## 3. Descuentos (3 formas)
1. **Fijo (código):** editá `discount` (en %) en cada diseño de `CONFIG.designs`. `0` = sin descuento.
2. **Por URL, sin tocar código** — ideal para campañas:
   - `?off=15` → 15% en los tres.
   - `?d=tatakua:10,brasa:20` → distinto por diseño.
   - `?promo=1` → fuerza mostrar la barra de promo.
3. **Panel visual:** abrí `tudominio.com/?admin=1`. Movés los descuentos en vivo y:
   - **Copiar URL de campaña** → genera el link con los descuentos ya puestos (completás `utm_source` y `utm_campaign`).
   - **Copiar configuración** → te da el código para pegar en `CONFIG` y dejarlo fijo.

> El panel no publica solo: aplica en pantalla, y vos decidís si lo dejás fijo (código) o lo lanzás como link de campaña.

## 4. Medición: qué anuncio trae compradores
La landing captura automáticamente `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, referrer y la página, en **first-touch** (persistente) y **last-touch**. Eso viaja con **cada lead** y también dentro del mensaje de WhatsApp (`Origen: ...`), así ventas sabe de dónde vino el cliente aunque entre por WhatsApp.

Para cerrar el círculo (click → lead → **venta**):
- Pegá tus IDs en `CONFIG.analytics`: `ga4Id` (`G-XXXX`) y `metaPixelId`. Se cargan solos y se disparan eventos del embudo: `page_view`, `view_design`, `open_quote`, `lead_submit`, `whatsapp_click` (mapeados a `ViewContent / InitiateCheckout / Lead / Contact` en Meta).
- En tu CRM (la planilla), marcá el **Estado = Ganado** cuando un lead compra. Filtrando por `utm_campaign` ves qué campaña trajo **plata**, no solo clicks.
- Avanzado: como guardás `gclid`/`fbclid`, podés subir *conversiones offline* a Google/Meta cuando se firma la obra, para que optimicen hacia compradores reales.

**Armá los links de tus anuncios así:**
```
https://quincho.com.py/?utm_source=facebook&utm_medium=cpc&utm_campaign=quinchos_verano&utm_content=video_pileta&d=verano:15
```
Cada anuncio con su `utm_content` distinto = sabés exactamente cuál convierte.

## 5. CRM (guardar prospectos)
- **Opción gratis (recomendada para arrancar):** seguí `crm-google-apps-script.gs`. Te deja una Google Sheet que funciona de CRM, con columnas de atribución y estado. Pegás la URL `/exec` en `CONFIG.crm.endpoint`.
- **Tu propio backend:** apuntá `CONFIG.crm.endpoint` a tu API (NestJS, etc.). Recibe un POST con `Content-Type: text/plain` y body JSON con todos los campos del lead + atribución. (Si preferís `application/json`, habilitá CORS en tu endpoint.)
- **HubSpot / otro CRM:** poné su endpoint de formularios.
- Si dejás `endpoint` vacío, el formulario igual funciona: registra en consola y manda al WhatsApp con todo el contexto.

## 6. El embudo (por qué está armado así)
Para este segmento (dueño de casa, compra emocional + de estatus, ticket alto) el orden busca: **deseo → confianza → diferenciación → reversión de riesgo → captura de baja fricción**.

1. **Hero** aspiracional con CTA claro y señales de confianza (+15 años, equipo único).
2. **Valor**: por qué un quincho bien hecho vale la pena (parrilla real, precio cerrado, llave en mano).
3. **3 diseños** con precio "desde", features concretas y descuento visible cuando aplica.
4. **Proceso** en 4 pasos: baja la ansiedad ("¿y ahora qué?").
5. **Prueba social**: trayectoria + testimonios (reemplazá por reales).
6. **Formulario corto** (nombre + WhatsApp + diseño) — WhatsApp es el canal #1 en Paraguay, así que todo termina ahí.
7. **FAQ** que responde las objeciones típicas (precio, plazo, financiación, terreno).
8. **WhatsApp flotante** siempre visible + CTA repetidos.

**Para mejorar la conversión cuando tengas datos:** sumá fotos reales de obras terminadas (más que renders), 2–3 testimonios con nombre y barrio, y un disparador de urgencia honesto en la barra de promo (cupos reales del mes).

---

## Archivos
- `index.html` — la landing (desplegá esto).
- `crm-google-apps-script.gs` — CRM gratis en Google Sheets.
- `README.md` — esta guía.

## Pendientes tuyos antes de publicar
- [ ] Número de WhatsApp real en `CONFIG.brand.whatsapp`.
- [ ] Renders en `heroImage` y en cada `designs[].image`.
- [ ] Precios reales en `priceUsd`.
- [ ] `ga4Id` y `metaPixelId`.
- [ ] `crm.endpoint` (Apps Script o tu API).
- [ ] Reemplazar testimonios de muestra por reales.
- [ ] Imagen `og-cover.jpg` para previews de WhatsApp/redes.
