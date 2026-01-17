export const seoData = {
  psicologi: {
    name: "Psicologi",
    medicalSpecialty: "Psychology",
    faq: [
      { q: "Come scegliere lo psicologo a {{zona}}?", a: "Su ServiziSalute puoi confrontare i profili dei migliori psicoterapeuti a {{zona}}." },
      { q: "Quanto costa una seduta a Roma?", a: "Il prezzo medio a Roma oscilla tra i 50€ e gli 80€ a seduta." },
      { q: "Psicologi convenzionati a {{zona}}?", a: "Molti professionisti offrono tariffe agevolate per i residenti del quartiere {{zona}}." }
    ]
  },
  // Aggiungi qui le altre categorie (cardiologi, dermatologi, etc.) seguendo lo stesso schema
};

export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export const getDBQuery = (slug) => {
  const mapping = {
    'psicologi': { cat: 'visite-specialistiche', spec: 'psicologo' },
    'cardiologi': { cat: 'visite-specialistiche', spec: 'cardiologo' },
    'dermatologi': { cat: 'visite-specialistiche', spec: 'dermatologo' }
  };
  return mapping[slug] || { cat: slug, spec: slug };
};

export const getSchemas = (categoriaKey, zona) => {
  const data = seoData[categoriaKey] || { name: categoriaKey, faq: [] };
  const zonaNome = formatZona(zona);
  return {
    medical: { "@context": "https://schema.org", "@type": "MedicalBusiness", "name": `${data.name} a ${zonaNome}` },
    faq: { 
      "@context": "https://schema.org", 
      "@type": "FAQPage", 
      "mainEntity": data.faq.map(f => ({
        "@type": "Question",
        "name": f.q.replace('{{zona}}', zonaNome),
        "acceptedAnswer": { "@type": "Answer", "text": f.a.replace('{{zona}}', zonaNome) }
      }))
    }
  };
};

export default getSchemas;
