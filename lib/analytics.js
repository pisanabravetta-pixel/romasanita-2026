/**
 * lib/analytics.js
 * Libreria centralizzata per Google Analytics 4 — ServiziSalute.com
 * GA4 ID: G-2CNB67FYJG
 *
 * EVENTI TRACCIATI:
 *  - click_chiama       → utente clicca su "Chiama ora" (tel:)
 *  - click_whatsapp     → utente clicca su WhatsApp
 *  - click_mappa        → utente clicca su "Apri su Maps"
 *  - click_scheda       → utente clicca su "Visualizza scheda"
 *  - click_cerca        → utente usa la barra di ricerca homepage
 *  - click_categoria    → utente clicca su una categoria (homepage)
 */

/**
 * Invia un evento a GA4 in modo sicuro (lato client).
 * @param {string} eventName  - Nome evento GA4
 * @param {object} params     - Parametri addizionali
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch (e) {
    // Non bloccare mai il flusso per un errore di analytics
    console.warn('[GA4] Errore tracking:', e);
  }
}

// ─── EVENTI SPECIFICI ────────────────────────────────────────────────────────

/** Click su "Chiama ora" (tel:) */
export function trackChiama(nomeProfessionist, categoria = '', zona = '') {
  trackEvent('click_chiama', {
    event_category: 'CTA',
    event_label: nomeProfessionist,
    categoria,
    zona,
  });
}

/** Click su WhatsApp */
export function trackWhatsApp(nomeProfessionist, categoria = '', zona = '') {
  trackEvent('click_whatsapp', {
    event_category: 'CTA',
    event_label: nomeProfessionist,
    categoria,
    zona,
  });
}

/** Click su "Apri su Google Maps" */
export function trackMappa(nomeProfessionist, categoria = '', zona = '') {
  trackEvent('click_mappa', {
    event_category: 'CTA',
    event_label: nomeProfessionist,
    categoria,
    zona,
  });
}

/** Click su "Visualizza scheda" */
export function trackScheda(nomeProfessionist, categoria = '', zona = '') {
  trackEvent('click_scheda', {
    event_category: 'navigazione',
    event_label: nomeProfessionist,
    categoria,
    zona,
  });
}

/** Click su "Cerca" in homepage */
export function trackCerca(query, zona = '') {
  trackEvent('click_cerca', {
    event_category: 'ricerca',
    event_label: query,
    zona,
  });
}

/** Click su categoria in homepage */
export function trackCategoria(nomeCategoria) {
  trackEvent('click_categoria', {
    event_category: 'navigazione',
    event_label: nomeCategoria,
  });
}
