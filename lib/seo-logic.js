export const seoData = {
  dentisti: { name: "Dentisti", medicalSpecialty: "Dentistry", faq: [] },
  farmacie: { name: "Farmacie", medicalSpecialty: "PharmacySpecialty", faq: [] },
  cardiologi: { name: "Cardiologi", medicalSpecialty: "Cardiovascular", faq: [] },
  dermatologi: { name: "Dermatologi", medicalSpecialty: "Dermatology", faq: [] },
  diagnostica: { name: "Centri Diagnostici", medicalSpecialty: "DiagnosticServices", faq: [] },
  'servizi-domicilio': { name: "Servizi a Domicilio", medicalSpecialty: "Nursing", faq: [] }
};

export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export const getDBQuery = (slug) => {
  const cleanSlug = slug.replace('-roma', '');
  const mapping = {
    'servizi-domicilio': { cat: 'Servizi a Domicilio', root: 'domicilio' },
    'cardiologi': { cat: 'visite-specialistiche', root: 'cardiolog' },
    'dermatologi': { cat: 'visite-specialistiche', root: 'dermatolog' }
  };
  return mapping[cleanSlug] || { cat: cleanSlug, root: cleanSlug };
};

export const getSchemas = (categoriaKey, zona) => {
  const data = seoData[categoriaKey] || { name: categoriaKey, medicalSpecialty: "Medical", faq: [] };
  const zonaNome = formatZona(zona);
  return {
    medical: { "@context": "https://schema.org", "@type": "MedicalBusiness", "name": `${data.name} a ${zonaNome}` },
    faq: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] }
  };
};

export default getSchemas;
