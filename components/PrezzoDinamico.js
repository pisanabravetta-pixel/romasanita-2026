import React from 'react';

const prezziIndicativi = {
  // --- CATEGORIE SPECIALI ---
  farmacie: [
    { servizio: "Misurazione pressione", min: 2, max: 5 },
    { servizio: "Test glicemia", min: 3, max: 6 },
    { servizio: "Tampone Covid", min: 8, max: 15 },
    { servizio: "Holter Cardiaco", min: 60, max: 90 }
  ],
  diagnostica: [
    { servizio: "Ecografia", min: 60, max: 110 },
    { servizio: "TAC senza contrasto", min: 150, max: 280 },
    { servizio: "Risonanza Magnetica", min: 180, max: 350 },
    { servizio: "Analisi del sangue", min: 15, max: 45 }
  ],
  'servizi-domicilio': [
    { servizio: "Prelievo a domicilio", min: 35, max: 60 },
    { servizio: "Assistenza infermieristica", min: 25, max: 50 },
    { servizio: "Fisioterapia a casa", min: 45, max: 80 }
  ],

  // --- I 7 SPECIALISTI (CON 3 PREZZI OGNUNO) ---
  cardiologi: [
    { servizio: "Visita Cardiologica", min: 100, max: 150 },
    { servizio: "Elettrocardiogramma (ECG)", min: 40, max: 70 },
    { servizio: "Ecocardiogramma", min: 90, max: 140 }
  ],
  dermatologi: [
    { servizio: "Visita Dermatologica", min: 90, max: 130 },
    { servizio: "Mappatura nei", min: 120, max: 180 },
    { servizio: "Crioterapia", min: 80, max: 150 }
  ],
  psicologi: [
    { servizio: "Colloquio individuale", min: 60, max: 90 },
    { servizio: "Terapia di coppia", min: 90, max: 130 },
    { servizio: "Sostegno psicologico", min: 50, max: 80 }
  ],
  ginecologi: [
    { servizio: "Visita Ginecologica", min: 100, max: 150 },
    { servizio: "Ecografia pelvica", min: 80, max: 120 },
    { servizio: "Pap Test", min: 30, max: 60 }
  ],
  oculisti: [
    { servizio: "Visita Oculistica completa", min: 90, max: 140 },
    { servizio: "Esame del fondo oculare", min: 50, max: 80 },
    { servizio: "Misurazione pressione occhio", min: 40, max: 70 }
  ],
  ortopedici: [
    { servizio: "Visita Ortopedica", min: 100, max: 160 },
    { servizio: "Infiltrazione articolare", min: 70, max: 120 },
    { servizio: "Controllo post-operatorio", min: 80, max: 130 }
  ],
  nutrizionisti: [
    { servizio: "Prima Visita Nutrizionale", min: 80, max: 130 },
    { servizio: "Piano alimentare personalizzato", min: 100, max: 180 },
    { servizio: "Bioimpedenziometria (BIA)", min: 40, max: 70 }
  ],
  dentisti: [
    { servizio: "Visita Odontoiatrica", min: 0, max: 50 },
    { servizio: "Igiene dentale professionale", min: 60, max: 100 },
    { servizio: "Otturazione semplice", min: 80, max: 150 }
  ],
  specialisti: [
    { servizio: "Visita Specialistica", min: 90, max: 150 },
    { servizio: "Consulto di controllo", min: 70, max: 110 }
  ]
};

export default function PrezzoDinamico({ categoria, index }) {
  const catParam = categoria ? categoria.toLowerCase() : '';
  
  // 1. Identificazione intelligente della categoria
  let key = 'specialisti'; // Default

  if (catParam.includes('cardio')) key = 'cardiologi';
  else if (catParam.includes('dentista') || catParam.includes('odonto')) key = 'dentisti';
  else if (catParam.includes('dermato')) key = 'dermatologi';
  else if (catParam.includes('psicolo')) key = 'psicologi';
  else if (catParam.includes('gineco')) key = 'ginecologi';
  else if (catParam.includes('oculi')) key = 'oculisti';
  else if (catParam.includes('ortope')) key = 'ortopedici';
  else if (catParam.includes('nutrizion')) key = 'nutrizionisti';
  else if (catParam.includes('farmac')) key = 'farmacie';
  else if (catParam.includes('diagnost')) key = 'diagnostica';
  else if (catParam.includes('domicilio')) key = 'servizi-domicilio';

  // 2. Recupero lista
  const lista = prezziIndicativi[key] || prezziIndicativi['specialisti'];
  
  // 3. Selezione servizio (Rotazione su base index i)
  const s = lista[index % lista.length];

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
