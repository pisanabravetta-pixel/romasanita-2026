/**
 * FILE: lib/seo-logic.js
 * RIPRISTINO TOTALE + COMPATIBILITÀ getDBQuery
 */

// 1. I DATI
export const seoData = {
  dentisti: {
    name: "Dentisti",
    specialty: "Dentist",
    h1: "I Migliori Dentisti",
    faq: [
      { q: "Come trovare un dentista a {{zona}}?", a: "Su ServiziSalute trovi i migliori studi dentistici a {{zona}} con contatti diretti, indirizzi e recensioni." },
      { q: "Quanto costa una pulizia dei denti a {{zona}}?", a: "Il costo medio per una detartrasi a Roma varia tra i 70€ e i 120€, a seconda dello studio scelto." },
      { q: "Ci sono dentisti aperti il sabato a {{zona}}?", a: "Sì, molti studi dentistici a {{zona}} ricevono su appuntamento anche il sabato mattina." },
      { q: "Come prenotare una visita dentistica urgente?", a: "Puoi chiamare direttamente i numeri presenti sulle schede dei professionisti a {{zona}} per richiedere un pronto soccorso odontoiatrico." }
    ]
  },
  farmacie: {
    name: "Farmacie",
    specialty: "Pharmacy",
    h1: "Farmacie di Turno",
    faq: [
      { q: "Dove trovare una farmacia a {{zona}}?", a: "Puoi consultare l'elenco aggiornato delle farmacie a {{zona}} su ServiziSalute per trovare la più vicina a te." },
      { q: "Quali farmacie fanno i turni notturni a {{zona}}?", a: "Le farmacie di turno a {{zona}} variano giornalmente. Ti consigliamo di chiamare i numeri indicati per conferma immediata." },
      { q: "È possibile trovare parafarmacie aperte a {{zona}}?", a: "Sì, nell'elenco sono presenti sia farmacie che parafarmacie situate nel quartiere {{zona}}." },
      { q: "Le farmacie a {{zona}} effettuano tamponi o test rapidi?", a: "Molte farmacie a {{zona}} offrono servizi di screening e test rapidi, contattale telefonicamente per la disponibilità." }
    ]
  },
  cardiologi: {
    name: "Cardiologi",
    specialty: "Cardiovascular",
    h1: "Cardiologi a Roma",
    faq: [
      { q: "Come trovare un cardiologo a {{zona}}?", a: "Trova i migliori specialisti in cardiologia a {{zona}} su ServiziSalute, con info su visite ed elettrocardiogramma." },
      { q: "Qual è il costo di una visita cardiologica a Roma?", a: "Il prezzo medio per una visita con ECG a Roma si aggira tra i 100€ e i 180€." },
      { q: "Posso fare un Holter cardiaco a {{zona}}?", a: "Sì, diversi centri specialistici a {{zona}} offrono il servizio di monitoraggio Holter 24/48h." }
    ]
  },
  diagnostica: {
    name: "Centri Diagnostici",
    specialty: "Diagnostic",
    h1: "Centri Diagnostici a Roma",
    faq: [
      { q: "Dove fare una risonanza o TAC a {{zona}}?", a: "Trova i centri diagnostici a {{zona}} convenzionati e privati su ServiziSalute." },
      { q: "Quanto tempo serve per i risultati degli esami?", a: "A {{zona}}, i centri diagnostici solitamente consegnano i referti tra le 24 e le 72 ore lavorative." },
      { q: "Posso prenotare esami diagnostici online?", a: "Molti centri a {{zona}} permettono la prenotazione telefonica rapida tramite i contatti forniti su ServiziSalute." }
    ]
  }
};

// 2. UTILITÀ
export const formatZona = (str) => {
  if (!str || str.toLowerCase() === 'roma') return "Roma";
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// 3. FUNZIONE PER LA QUERY DATABASE (Mancava questa!)
export const getDBQuery = (cat) => {
  // Ritorna il nome della categoria come salvato nel database
  const queries = {
    'farmacie': 'farmacie',
    'dentisti': 'dentisti',
    'cardiologi': 'cardiologi',
    'diagnostica': 'centri diagnostici'
  };
  return queries[cat] || cat;
};

// 4. FUNZIONE SCHEMI (Per [slug].js)
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
};

// 5. COMPATIBILITÀ VECCHIE PAGINE
export const getSeoData = (cat) => seoData[cat] || seoData['dentisti'];
export const getSeoContent = (cat, zona) => getSchemas(cat, zona, "Roma");

export default getSchemas;
