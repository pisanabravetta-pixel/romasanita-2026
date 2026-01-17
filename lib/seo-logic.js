/**
 * FILE: lib/seo-logic.js
 * VERSIONE INTEGRALE 2026 - Tutte le categorie con 3 FAQ e Mapping Plurale
 */

export const seoData = {
  dentisti: {
    name: "Dentisti",
    specialty: "Dentist",
    medicalSpecialty: "Dentistry",
    h1: "I Migliori Dentisti a Roma",
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
    h1: "Farmacie a Roma",
    faq: [
      { q: "Dove trovare una farmacia a {{zona}}?", a: "Puoi consultare l'elenco aggiornato delle farmacie a {{zona}} su ServiziSalute per trovare la più vicina a te." },
      { q: "Quali farmacie fanno i turni notturni a {{zona}}?", a: "Le farmacie di turno a {{zona}} variano giornalmente. Ti consigliamo di chiamare i numeri indicati per conferma immediata." },
      { q: "Posso trovare farmacie aperte H24 a {{zona}}?", a: "Sì, in diverse zone di Roma sono presenti farmacie aperte 24 ore su 24 per ogni emergenza." }
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
      { q: "Quando fare una visita cardiologica a {{zona}}?", a: "È consigliabile prenotare un controllo se si avvertono palpitazioni, dolore toracico o per prevenzione post-40 anni." }
    ]
  },
  dermatologi: {
    name: "Dermatologi",
    specialty: "Physician",
    medicalSpecialty: "Dermatology",
    faq: [
      { q: "Dove trovare un dermatologo a {{zona}}?", a: "Su ServiziSalute trovi specialisti in dermatologia a {{zona}} per mappatura nei e visite dermatologiche." },
      { q: "Quanto costa una visita dermatologica a Roma?", a: "A Roma una visita specialistica costa mediamente tra gli 80€ e i 150€." },
      { q: "Mappatura nei a {{zona}}: ogni quanto farla?", a: "I dermatologi consigliano un controllo annuale dei nei per prevenire melanomi e patologie cutanee." }
    ]
  },
  diagnostica: {
    name: "Centri Diagnostici",
    specialty: "DiagnosticLab",
    medicalSpecialty: "DiagnosticServices",
    faq: [
      { q: "Dove fare analisi del sangue a {{zona}}?", a: "Trova i centri diagnostici e laboratori analisi a {{zona}} più vicini, con orari e contatti per prenotare." },
      { q: "Tempi di attesa per risonanza magnetica a Roma?", a: "Nei centri privati di {{zona}} è possibile eseguire esami diagnostici entro 24-48 ore." },
      { q: "I centri diagnostici a {{zona}} sono convenzionati?", a: "Molti centri presenti su ServiziSalute offrono tariffe agevolate o convenzioni dirette." }
    ]
  },
  ginecologi: {
    name: "Ginecologi",
    specialty: "Physician",
    medicalSpecialty: "Gynecologic",
    faq: [
      { q: "Come trovare un ginecologo a {{zona}}?", a: "Consulta i migliori ginecologi a {{zona}} su ServiziSalute per visite di controllo o ecografie." },
      { q: "Costo visita ginecologica con ecografia a Roma?", a: "Il prezzo medio a Roma per visita ed ecografia pelvica varia dai 100€ ai 180€." },
      { q: "Ginecologi per urgenze a {{zona}}?", a: "Molti studi ginecologici a {{zona}} offrono appuntamenti rapidi per necessità urgenti." }
    ]
  },
  nutrizionisti: {
    name: "Nutrizionisti",
    specialty: "Physician",
    medicalSpecialty: "DietNutrition",
    faq: [
      { q: "Nutrizionista a {{zona}}: come prenotare?", a: "Scegli tra i biologi nutrizionisti a {{zona}} su ServiziSalute e fissa la tua prima consulenza alimentare." },
      { q: "Quanto costa la prima visita dal nutrizionista?", a: "La prima visita a Roma con piano alimentare incluso costa mediamente tra gli 80€ e i 130€." },
      { q: "Dieta personalizzata a {{zona}}: dove andare?", a: "I nostri esperti a {{zona}} sviluppano piani nutrizionali su misura per ogni esigenza." }
    ]
  },
  oculisti: {
    name: "Oculisti",
    specialty: "Physician",
    medicalSpecialty: "Optometry",
    faq: [
      { q: "Migliori oculisti a {{zona}}?", a: "Trova medici oculisti a {{zona}} specializzati in chirurgia refrattiva, cataratta e visite della vista." },
      { q: "Costo visita oculistica completa a Roma?", a: "Il costo di una visita oculistica con esame del fondo oculare a Roma è tra i 90€ e i 150€." },
      { q: "Oculista pediatrico a {{zona}}?", a: "Su ServiziSalute trovi specialisti esperti in oftalmologia pediatrica nel tuo quartiere." }
    ]
  },
  ortopedici: {
    name: "Ortopedici",
    specialty: "Physician",
    medicalSpecialty: "Orthodontic",
    faq: [
      { q: "Ortopedico specializzato a {{zona}}?", a: "Trova esperti in ortopedia e traumatologia a {{zona}} per problemi a schiena, ginocchia o spalle." },
      { q: "Costo infiltrazioni o visite ortopediche a Roma?", a: "Le visite ortopediche a Roma hanno un costo che oscilla tra i 100€ e i 160€." },
      { q: "Fisioterapia e ortopedia a {{zona}}?", a: "Molti centri a {{zona}} integrano studi ortopedici e percorsi di riabilitazione fisioterapica." }
    ]
  },
  psicologi: {
    name: "Psicologi",
    specialty: "Physician",
    medicalSpecialty: "Psychology",
    faq: [
      { q: "Psicologo a {{zona}}: come scegliere?", a: "Valuta i profili dei psicoterapeuti a {{zona}} su ServiziSalute in base alla specializzazione." },
      { q: "Prezzo seduta psicologo a Roma?", a: "A Roma una seduta di psicoterapia individuale costa mediamente tra i 50€ e gli 80€." },
      { q: "Supporto psicologico online a {{zona}}?", a: "Molti professionisti a {{zona}} offrono sedute in videochiamata oltre che in studio." }
    ]
  },
  'servizi-domicilio': {
    name: "Servizi a Domicilio",
    specialty: "HomeHealthCare",
    medicalSpecialty: "Nursing",
    faq: [
      { q: "Infermiere a domicilio a {{zona}}?", a: "Trova professionisti per iniezioni, medicazioni o prelievi direttamente a casa tua a {{zona}}." },
      { q: "Costo assistenza domiciliare a Roma?", a: "Le tariffe variano in base al servizio, partendo da circa 20-30€ per prestazioni infermieristiche." },
      { q: "Fisioterapia a domicilio a {{zona}}?", a: "Prenota un fisioterapista che ti raggiunga a {{zona}} per riabilitazione post-operatoria o motoria." }
    ]
  }
};

export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export const getDBQuery = (slug) => {
  if (!slug) return { cat: '', spec: '' };
  const cleanSlug = slug.replace('-roma', '');
  
  const mapping = {
    'dentisti': { cat: 'dentisti', spec: 'dentista' },
    'farmacie': { cat: 'farmacia', spec: 'farmacia' }, 
    'cardiologi': { cat: 'visite-specialistiche', spec: 'cardiologo' },
    'psicologi': { cat: 'visite-specialistiche', spec: 'psicologo' },
    'dermatologi': { cat: 'visite-specialistiche', spec: 'dermatologo' },
    'ginecologi': { cat: 'visite-specialistiche', spec: 'ginecologo' },
    'nutrizionisti': { cat: 'visite-specialistiche', spec: 'nutrizionista' },
    'oculisti': { cat: 'visite-specialistiche', spec: 'oculista' },
    'ortopedici': { cat: 'visite-specialistiche', spec: 'ortopedico' },
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
