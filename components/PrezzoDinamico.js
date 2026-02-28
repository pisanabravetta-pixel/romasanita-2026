import React from 'react';

const prezziIndicativi = {
  farmacie: [
    { servizio: "Misurazione pressione", min: 2, max: 5 },
    { servizio: "Test glicemia", min: 3, max: 6 },
    { servizio: "Tampone Covid", min: 8, max: 15 },
  ],
  dentisti: [
    { servizio: "Visita odontoiatrica", min: 50, max: 100 },
    { servizio: "Igiene dentale", min: 45, max: 80 },
    { servizio: "Otturazione", min: 70, max: 120 },
  ],
  diagnostica: [
    { servizio: "Ecografia", min: 60, max: 110 },
    { servizio: "TAC senza contrasto", min: 120, max: 250 },
    { servizio: "Analisi sangue base", min: 20, max: 40 },
  ],
  'servizi-domicilio': [
    { servizio: "Prelievo sangue a domicilio", min: 30, max: 50 },
    { servizio: "Assistenza infermieristica", min: 60, max: 120 },
    { servizio: "Fisioterapia a casa", min: 35, max: 60 },
  ],
  cardiologi: [
    { servizio: "Visita cardiologica", min: 80, max: 140 },
    { servizio: "ECG", min: 35, max: 60 }
  ],
  psicologi: [
    { servizio: "Colloquio psicologico", min: 50, max: 100 },
    { servizio: "Terapia individuale", min: 60, max: 110 }
  ],
  dermatologi: [
    { servizio: "Visita dermatologica", min: 65, max: 120 },
    { servizio: "Mappatura nei", min: 80, max: 150 }
  ],
  ginecologi: [
    { servizio: "Visita ginecologica", min: 65, max: 120 },
    { servizio: "Pap test", min: 25, max: 50 }
  ],
  nutrizionisti: [
    { servizio: "Visita nutrizionale", min: 60, max: 100 },
    { servizio: "Piano alimentare personalizzato", min: 80, max: 150 }
  ],
  ortopedici: [
    { servizio: "Visita ortopedica", min: 70, max: 120 },
    { servizio: "Infiltrazione articolare", min: 65, max: 100 }
  ],
  oculisti: [
    { servizio: "Visita oculistica", min: 60, max: 110 },
    { servizio: "Campo visivo", min: 30, max: 70 }
  ],
  specialisti: [{ servizio: "Visita specialistica", min: 70, max: 120 }]
};

export default function PrezzoDinamico({ categoria, index }) {
  // Pulizia chiave
  let key = categoria ? categoria.toLowerCase().replace('visite-specialistiche-', '').replace('-roma', '') : 'specialisti';
  
  // Trova i servizi per la categoria (o usa specialisti come fallback)
  const listaServizi = prezziIndicativi[key] || prezziIndicativi['specialisti'];
  
  // Seleziona il servizio in base all'indice (0, 1, 2...)
  const s = listaServizi[index % listaServizi.length];

  return (
    <div style={{
      padding: '6px 14px', 
      background: 'linear-gradient(90deg, #f97316, #fb923c)', 
      color: '#fff', 
      borderRadius: '20px', 
      fontWeight: 'bold', 
      fontSize: '13px'
    }}>
      Prezzo medio zona {s.servizio}: {s.min}€ – {s.max}€
    </div>
  );
}
