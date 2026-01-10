// Funzione di utilità per formattare la zona (se non l'hai già definita sopra)
const formatZona = (str) => {
  if (!str) return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export const getSchemas = (categoriaKey, zona, indirizzo = "Roma") => {
  // 1. Recupero dati con fallback totale
  const categoria = categoriaKey || 'dentisti';
  const data = seoData[categoria] || seoData['dentisti'] || {};
  const zonaNome = zona || "Roma";
  
  // 2. Prepariamo le FAQ in una variabile separata per evitare l'errore alla riga 39
  const listaFaq = data.faq || []; 
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": listaFaq.map(f => ({
      "@type": "Question",
      "name": (f.q || "").replace('{{zona}}', zonaNome),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": (f.a || "").replace('{{zona}}', zonaNome)
      }
    }))
  };

  return {
    medical: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": `${data.name || 'Servizio'} ${zonaNome}`,
      "medicalSpecialty": data.specialty || "Health",
      "areaServed": { "@type": "City", "name": "Roma" },
      "description": `Trova i migliori ${data.name || 'specialisti'} a ${zonaNome}.`,
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
    faq: faqSchema
  };
};
