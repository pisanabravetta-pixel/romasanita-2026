/**
 * FILE: lib/seo-logic.js
 * RIPRISTINO COMPLETO E FIX INDIRIZZO
 */

export const seoData = {
  dentisti: {
    name: "Dentisti",
    specialty: "Dentist",
    h1: "I Migliori Dentisti",
    faq: [
      { q: "Come trovare un dentista a {{zona}}?", a: "Su ServiziSalute trovi i migliori studi dentistici a {{zona}}." },
      { q: "Quali servizi offrono i dentisti a {{zona}}?", a: "Pulizia denti, impianti e ortodonzia." }
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
  }
};

export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// QUESTA È LA FUNZIONE CHE CERCA IL TUO [SLUG].JS
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
        "acceptedAnswer": { "@type": "Answer", "text": (f.a || "").replace('{{zona}}', zonaNome) }
      }))
    }
  };
};

// QUESTA È LA FUNZIONE CHE CERCANO LE TUE PAGINE FISSE (Cardiologi-roma.js ecc.)
// La esportiamo con il nome vecchio così la Build non si rompe
export const getSeoContent = (categoriaKey, zona) => {
  return getSchemas(categoriaKey, zona, "Roma");
};
