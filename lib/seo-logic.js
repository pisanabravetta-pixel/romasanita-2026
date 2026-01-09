/**
 * Utility per gestire la logica SEO e i filtri Supabase
 */

// 1. Dati per FAQ e Contenuti (Nuovo: integrato dai tuoi suggerimenti)
export const seoData = {
  dentisti: {
    name: "Dentisti a Roma",
    specialty: "Dentistry",
    faq: [
      { q: "Come scegliere un dentista a Roma?", a: "Su ServiziSalute puoi confrontare studi dentistici a Roma in base alla zona, ai trattamenti offerti e ai contatti diretti." },
      { q: "Quanto costa una visita dentistica a Roma?", a: "I costi variano in base al tipo di visita. Molti studi pubblicano offerte e prezzi direttamente nell'annuncio." }
    ]
  },
  farmacie: {
    name: "Farmacie a Roma",
    specialty: "Pharmacy",
    faq: [
      { q: "Come trovare una farmacia a Roma vicino a me?", a: "Su ServiziSalute puoi trovare farmacie a Roma filtrando per quartiere e servizi disponibili, come test rapidi e consulenze." },
      { q: "Le farmacie su ServiziSalute sono affidabili?", a: "Gli annunci sono pubblicati da farmacie reali sul territorio. Ogni scheda riporta contatti diretti." }
    ]
  },
  cardiologi: {
    name: "Cardiologi a Roma",
    specialty: "Cardiology",
    faq: [
      { q: "Come trovare uno specialista a Roma?", a: "Puoi cercare medici specialisti a Roma per branca medica e quartiere, contattandoli direttamente tramite il portale." },
      { q: "Le visite sono prenotabili online?", a: "Ogni annuncio indica come contattare lo studio (Telefono o WhatsApp) per richiedere informazioni." }
    ]
  },
  diagnostica: {
    name: "Centri Diagnostici a Roma",
    specialty: "Diagnostic",
    faq: [
      { q: "Dove fare esami diagnostici a Roma?", a: "ServiziSalute raccoglie centri diagnostici a Roma per TAC, risonanze, ecografie e analisi cliniche." },
      { q: "È possibile confrontare i prezzi degli esami?", a: "Sì, molti centri indicano prezzi e promozioni direttamente nelle loro schede." }
    ]
  }
};

// 2. Standardizzazione delle Categorie per il Database
export const getDBQuery = (categoria) => {
  const mapping = {
    'dentisti': 'dentisti%', // Usiamo minuscolo perché ora usiamo .ilike
    'farmacie': 'farmaci%',
    'cardiologi': 'cardiolog%',
    'diagnostica': 'diagnostica%',
    'visite-specialistiche': 'medico%',
    'servizi-domicilio': 'domicilio%'
  };
  return mapping[categoria] || `%${categoria}%`;
};

// 3. Pulizia nomi Zone
export const formatZona = (zonaSlug) => {
  if (!zonaSlug) return 'Roma';
  return zonaSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// 4. Schema Generator Potenziato (FAQ + MedicalBusiness)
export const getSchemas = (categoriaKey, zona) => {
  const data = seoData[categoriaKey] || seoData['dentisti'];
  const zonaNome = formatZona(zona);

  return {
    // Schema MedicalBusiness (quello che volevi tu)
    medical: {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": `${data.name} ${zonaNome}`,
      "medicalSpecialty": data.specialty,
      "areaServed": { "@type": "City", "name": "Roma" },
      "description": `Trova i migliori ${data.name} a ${zonaNome}.`
    },
    // Schema FAQ (Nuovo!)
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  };
};
