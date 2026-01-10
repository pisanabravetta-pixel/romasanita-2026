/**
 * FILE: lib/seo-logic.js
 * VERSIONE DEFINITIVA, CHIUSA E CORRETTA
 */

// 1. I DATI (Esportati per le pagine fisse)
export const seoData = {
  dentisti: {
    name: "Dentisti",
    specialty: "Dentist",
    h1: "I Migliori Dentisti",
    faq: [
      { q: "Come trovare un dentista a {{zona}}?", a: "Su ServiziSalute trovi i migliori studi dentistici a {{zona}}." }
    ]
  },
  farmacie: {
    name: "Farmacie",
    specialty: "Pharmacy",
    h1: "Farmacie di Turno",
    faq: [
      { q: "Dove trovare una farmacia a {{zona}}?", a: "Consulta l'elenco su ServiziSalute per orari e indirizzi." }
    ]
  },
  cardiologi: {
    name: "Cardiologi",
    specialty: "Cardiovascular",
    h1: "Cardiologi a Roma",
    faq: [
      { q: "Come trovare un cardiologo a {{zona}}?", a: "Trova i migliori specialisti su ServiziSalute." }
    ]
  },
  diagnostica: {
    name: "Centri Diagnostici",
    specialty: "Diagnostic",
    h1: "Centri Diagnostici a Roma",
    faq: [
      { q: "Dove fare esami a Roma?", a: "Trova centri per TAC e risonanze su ServiziSalute." }
    ]
  }
}; // <--- Questa chiude seoData

// 2. UTILITÀ PER LA ZONA
export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// 3. LA FUNZIONE PER IL TUO [SLUG].JS
export const getSchemas = (categoriaKey, zona, indirizzo = "Roma") => {
  const cat = categoriaKey || 'dentisti';
  const data = seoData[cat] || seoData['dentisti'];
  const zonaNome = formatZona(zona);
  const faqList = data.faq || [];

  return {
    medical: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": `${data.name} a ${zonaNome}`,
      "medicalSpecialty": data.specialty,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": indirizzo || "Roma",
        "addressLocality": "Roma",
        "addressRegion": "Lazio",
        "addressCountry": "IT"
      },
      "image": "https://www.servizisalute.com/logo.png",
      "priceRange": "$$"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map(f => ({
        "@type": "Question",
        "name": (f.q || "").replace('{{zona}}', zonaNome),
        "acceptedAnswer": { 
          "@type": "Answer", 
          "text": (f.a || "").replace('{{zona}}', zonaNome) 
        }
      }))
    }
  };
}; // <--- Questa chiude getSchemas

// 4. COMPATIBILITÀ PER LE PAGINE FISSE (Cardiologi-roma.js ecc.)
// Queste righe servono a far trovare alle vecchie pagine i nomi che cercano.

export const getSeoData = (cat) => {
  return seoData[cat] || seoData['dentisti'];
};

export const getSeoContent = (cat, zona) => {
  return getSchemas(cat, zona, "Roma");
};

export default getSchemas;
