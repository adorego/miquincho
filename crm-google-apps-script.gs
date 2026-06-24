/**
 * quincho.com.py — CRM gratis con Google Sheets
 * ------------------------------------------------------------------
 * Convierte una planilla de Google en tu CRM. Recibe cada lead de la
 * landing y lo agrega como una fila, con el origen del anuncio incluido.
 *
 * CÓMO ACTIVARLO (5 minutos, sin servidor ni costo):
 *  1. Creá una Google Sheet nueva. Copiá su ID desde la URL
 *     (https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit).
 *  2. Pegá ese ID abajo en SHEET_ID.
 *  3. En la Sheet: menú Extensiones → Apps Script. Borrá todo y pegá este archivo.
 *  4. Implementar → Nueva implementación → tipo "Aplicación web".
 *       - Ejecutar como: Yo
 *       - Quién tiene acceso: Cualquier persona
 *  5. Copiá la URL que termina en /exec y pegala en la landing:
 *       CONFIG.crm.endpoint = "https://script.google.com/.../exec";
 *
 * Cada lead llega con: nombre, WhatsApp, diseño, descuento aplicado, zona,
 * mensaje, origen (campaña/anuncio), first-touch y last-touch completos.
 * Cuando un lead se convierte en venta, marcá la columna "Estado" = Ganado:
 * así sabés qué CAMPAÑA trajo COMPRADORES, no solo clicks.
 */

const SHEET_ID  = "PEGÁ_AQUÍ_EL_ID_DE_TU_PLANILLA";
const SHEET_TAB = "Leads";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName(SHEET_TAB);

    if (!sh) {
      sh = ss.insertSheet(SHEET_TAB);
      sh.appendRow([
        "Fecha", "Nombre", "WhatsApp", "Diseño", "Descuento %", "Zona",
        "Mensaje", "Origen (campaña/anuncio)", "utm_source", "utm_medium",
        "utm_campaign", "fbclid/gclid", "Referrer", "Página", "Estado"
      ]);
      sh.setFrozenRows(1);
    }

    const last = data.last_touch  || {};
    const first = data.first_touch || {};

    sh.appendRow([
      data.submitted_at || new Date().toISOString(),
      data.name || "",
      "'" + (data.phone || ""),              // ' fuerza texto y conserva el 0 inicial
      data.design || "",
      data.discount || 0,
      data.zona || "",
      data.message || "",
      data.source || "",
      last.utm_source   || first.utm_source   || "",
      last.utm_medium   || first.utm_medium   || "",
      last.utm_campaign || first.utm_campaign || "",
      last.fbclid || last.gclid || first.fbclid || first.gclid || "",
      last.referrer || "",
      data.page || "",
      "Nuevo"
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "quincho.com.py CRM" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
