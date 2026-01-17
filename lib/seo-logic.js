/**
 * FILE: lib/seo-logic.js
 * VERSIONE FIX 2026 - Allineamento chiavi cat/spec
 */

export const seoData = {
  dentisti: {
    name: "Dentisti",
    specialty: "Dentist",
    medicalSpecialty: "Dentistry",
    h1: "I Migliori Dentisti",
    faq: [
      { q: "Come trovare un dentista a {{zona}}?", a: "Su ServiziSalute trovi i migliori studi dentistici a {{zona}} con contatti diretti, indirizzi e recensioni." },
      { q: "Quanto costa una pulizia dei denti a {{zona}}?", a: "Il costo medio per una detartrasi a Roma varia tra i 70€ e i 120€, a seconda dello studio scelto." },
      { q: "Ci sono dentisti aperti il sabato a {{zona}}?", a: "Sì, molti studi dentistici a {{zona}} ricevono su appuntamento anche il sabato mattina." }
    ]
  },
  farmacie: {
    name: "Farmacie",
    specialty: "Pharmacy",
    medicalSpecialty: "PharmacySpecialty",
    h1: "Farmacie di Turno",
    faq: [
      { q: "Dove trovare una farmacia a {{zona}}?", a: "Puoi consultare l'elenco aggiornato delle farmacie a {{zona}} su ServiziSalute per trovare la più vicina a te." },
      { q: "Quali farmacie fanno i turni notturni a {{zona}}?", a: "Le farmacie di turno a {{zona}} variano giornalmente. Ti consigliamo di chiamare i numeri indicati per conferma immediata." }
    ]
  },
  cardiologi: {
    name: "Cardiologi",
    specialty: "Physician",
    medicalSpecialty: "Cardiovascular",
    h1: "Cardiologi a Roma",
    faq: [
      { q: "Come trovare un cardiologo a {{zona}}?", a: "Trova i migliori specialisti in cardiologia a {{zona}} su ServiziSalute, con info su visite ed elettrocardiogramma." },
      { q: "Qual è il costo di una visita cardiologica a Roma?", a: "Il prezzo medio per una visita con ECG a Roma si aggira tra i 100€ e i 180€." },
      { q: "Quando fare una visita cardiologica a {{zona}}?", a: "È consigliabile prenotare un controllo se si avvertono palpitazioni, dolore toracico o per prevenzione dopo i 40 anni." } // <--- AGGIUNGI QUESTA
    ]
  }
};

export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// FIX: Usiamo le chiavi 'cat' e 'spec' per combaciare con [slug].js
export const getDBQuery = (slug) => {
  if (!slug) return { cat: '', spec: '' };

  // Rimuove "-roma" dallo slug per farlo combaciare con il mapping
  const cleanSlug = slug.replace('-roma', '');
  
  const mapping = {
    'dentisti': { cat: 'dentisti', spec: 'dentista' },
    'farmacie': { cat: 'farmacia', spec: 'farmacia' }, 
    'cardiologi': { cat: 'visite-specialistiche', spec: 'cardiologo' }, // Corretto
    'psicologi': { cat: 'visite-specialistiche', spec: 'psicologo' },   // Corretto
    'dermatologi': { cat: 'visite-specialistiche', spec: 'dermatologo' }, // Corretto
    'diagnostica': { cat: 'diagnostica', spec: 'centro diagnostico' },
    'servizi-domicilio': { cat: 'servizi-domicilio', spec: 'domicilio' }
  };

  return mapping[cleanSlug] || { cat: cleanSlug, spec: cleanSlug };
};

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
      "medicalSpecialty": data.medicalSpecialty,
      "description": `Trova i migliori ${data.name.toLowerCase()} a Roma nel quartiere ${zonaNome}. Contatti diretti e info utili.`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": indirizzo,
        "addressLocality": "Roma",
        "addressRegion": "RM",
        "postalCode": "00100",
        "addressCountry": "IT"
      }
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

export default getSchemas;
