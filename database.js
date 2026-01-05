// --- DENTISTI ---
export const DENTISTI = [
  { id: 1, nome: "Studio Dentistico dr Marco Bazzucchi", zona: "Prati", indirizzo: "Via dei Gracchi, 151", slug: "/dentisti-roma-prati", isTop: true },
  { id: 2, nome: "Centro Dentistico Cavour", zona: "Prati", indirizzo: "Via Pietro Cossa, 28", slug: "/dentisti-roma-prati", isTop: false },
  { id: 3, nome: "De Sanctis Odontoiatria Digitale", zona: "Eur", indirizzo: "Viale Europa, 64", slug: "/dentisti-roma-eur", isTop: true },
  { id: 4, nome: "Studio Giovannini Ludovici", zona: "Eur", indirizzo: "Viale Beethoven, 70", slug: "/dentisti-roma-eur", isTop: false },
  { id: 5, nome: "Studio Dentistico Appio - Dr. Gazzardi", zona: "San Giovanni", indirizzo: "Via Appia Nuova, 103", slug: "/dentisti-roma-san-giovanni", isTop: true },
  // NUOVO AGGIUNTO
  { id: 6, nome: "Dott. Riccardo Marsili", zona: "San Giovanni", indirizzo: "Via Taranto, 95", slug: "/dentisti-roma-san-giovanni", isTop: false }
];

// --- FARMACIE ---
export const FARMACIE = [
  { id: 1, nome: "Farmacia Internazionale Capranica", zona: "Centro", indirizzo: "Piazza Capranica, 96", slug: "/farmacie-roma-centro", info: "H24", isTop: true },
  { id: 2, nome: "Farmacia Campo de' Fiori", zona: "Centro", indirizzo: "Piazza Campo de' Fiori, 41", slug: "/farmacie-roma-centro", info: "Omeopatia", isTop: false },
  // NUOVO AGGIUNTO
  { id: 3, nome: "Farmacia del Senato", zona: "Centro", indirizzo: "Corso del Rinascimento, 50", slug: "/farmacie-roma-centro", info: "Autoanalisi del sangue", isTop: false }
];

// --- DIAGNOSTICA ---
export const DIAGNOSTICA = [
  { id: 1, nome: "Altamedica", zona: "Roma Nord", indirizzo: "Viale Liegi, 45", slug: "/diagnostica-roma-nord", info: "Analisi e Ecografie", isTop: true },
  // NUOVO AGGIUNTO
  { id: 2, nome: "Artemisia Lab Panigea", zona: "Roma Nord", indirizzo: "Via delle Medaglie d'Oro, 467", slug: "/diagnostica-roma-nord", info: "Centro Diagnostico Clinico", isTop: false }
];

// --- SERVIZI A DOMICILIO ---
export const DOMICILIO = [
  { id: 1, nome: "Medicus", zona: "Roma Sud", indirizzo: "Servizio Itinerante", slug: "/servizi-domicilio-roma-sud", info: "Infermiere a casa", isTop: true },
  // NUOVO AGGIUNTO
  { id: 2, nome: "PrivatAssistenza Roma Sud", zona: "Roma Sud", indirizzo: "Copertura Zona EUR e Ostiense", slug: "/servizi-domicilio-roma-sud", info: "Fisioterapia e Assistenza Anziani", isTop: false }
];

// --- VISITE SPECIALISTICHE (CARDIOLOGI ECC) ---
export const VISITE = [
  { id: 1, nome: "Cardiocentro Prati", zona: "Prati", indirizzo: "Via Germanico, 12", slug: "/cardiologi-roma-prati", info: "Cardiologia", isTop: true },
  // NUOVO AGGIUNTO
  { id: 2, nome: "Centro Cardiologico Eur", zona: "Eur", indirizzo: "Viale America, 11", slug: "/visite-specialistiche-roma", info: "Cardiologia dello Sport", isTop: false }
];
