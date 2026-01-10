/**
 * FILE: lib/seo-logic.js
 * Sistema tutto: Logica SEO, Dati e Compatibilità con le vecchie pagine
 */

// 1. I DATI (Aggiunto EXPORT per le pagine cardiologi-roma.js ecc.)
export const seoData = {
  dentisti: {
    name: "Dentisti",
    specialty: "Dentist",
    h1: "I Migliori Dentisti",
    faq: [
      { q: "Come trovare un dentista a {{zona}}?", a: "Su ServiziSalute trovi i migliori studi dentistici a {{zona}} con contatti diretti." },
      { q: "Quali servizi offrono i dentisti a {{zona}}?", a: "Offrono pulizia denti, impianti, ortodonzia e pronto soccorso odontoiatrico." }
    ]
  },
  farmacie: {
    name: "Farmacie",
    specialty: "Pharmacy",
    h1: "Farmacie di Turno",
    faq: [
      { q: "Dove trovare una farmacia a {{zona}}?", a: "Puoi consultare l'elenco delle farmacie a {{zona}} su ServiziSalute per orari e indirizzi." },
      { q: "Ci sono farmacie aperte ora a {{zona}}?", a: "L'elenco include le principali farmacie del quartiere {{zona}} con numeri di telefono per verificare i turni." }
    ]
  },
  cardiologi: {
    name: "Cardiologi",
    specialty: "Cardiovascular",
    h1: "Cardiologi a Roma",
    faq: [
      { q: "Come trovare un cardiologo a {{zona}}?", a: "Trova i migliori specialisti in cardiologia a {{zona}} su ServiziSalute." }
    ]
  }
  // Aggiungi qui altre categorie se ne hai, seguendo lo stesso formato
};

// 2. FUNZIONE DI UTILITÀ PER LA ZONA
const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// 3. LA FUNZIONE PRINCIPALE (getSchemas)
export const getSchemas = (categoriaKey, zona, indirizzo = "Roma") => {
  const cat = categoriaKey || 'dentisti';
  const data = seoData[cat] || seoData['dentisti'];
  const zonaNome = formatZona(zona);

  const faqList = data.faq || [];

  return {
    medical: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": `${data.name || 'Servizio'} a ${zonaNome}`,
      "medicalSpecialty": data.specialty || "Medical",
      "areaServed": { "@type": "City", "name": "Roma" },
      "description": `Trova i migliori ${data.name || 'specialisti'} a ${zonaNome}. Contatti e indirizzi utili.`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": indirizzo || "Roma",
        "addressLocality": "Roma",
        "addressRegion": "Lazio",
        "postalCode": "00100",
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
};

// 4. COMPATIBILITÀ (Sostituisce i nomi vecchi con quelli nuovi per non far crashare la Build)
export const getSeoContent = getSchemas;
