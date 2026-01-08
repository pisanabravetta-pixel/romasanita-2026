/**
 * Utility per gestire la logica SEO e i filtri Supabase
 */

// 1. Standardizzazione delle Categorie per il Database
export const getDBQuery = (categoria) => {
  // Questa funzione assicura che se cerchiamo "dentisti", 
  // il database cerchi correttamente "Dentista" o "Dentisti" senza distinzione
  const mapping = {
    'dentisti': 'Dentist%',
    'farmacie': 'Farmaci%',
    'cardiologi': 'Cardiolog%',
    'diagnostica': 'Diagnostica%',
    'visite-specialistiche': 'Medico%',
    'servizi-domicilio': 'Domicilio%'
  };
  return mapping[categoria] || `%${categoria}%`;
};

// 2. Pulizia nomi Zone per i Titoli <h1>
export const formatZona = (zonaSlug) => {
  if (!zonaSlug) return 'Roma';
  // Trasforma "roma-nord" in "Roma Nord" o "prati" in "Prati"
  return zonaSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// 3. Schema.org Generator (Il codice invisibile per Google)
export const generateSchema = (tipo, zona) => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": `${tipo} a ${formatZona(zona)}`,
    "description": `Elenco professionale di ${tipo} nella zona di ${formatZona(zona)} a Roma.`,
    "provider": {
      "@type": "Organization",
      "name": "ServiziSalute",
      "url": "https://www.servizisalute.com"
    }
  };
};
