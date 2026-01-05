import React from 'react';
import { DIAGNOSTICA } from '../database';

export default function DiagnosticaRomaNord() {
  const centriNord = DIAGNOSTICA.filter(d => d.zona === "Roma Nord");

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <a href="/diagnostica-roma" style={{ color: '#2563eb', textDecoration: 'none' }}>← Torna a Diagnostica</a>
      <h1 style={{ color: '#1e3a8a', marginTop: '20px' }}>Centri Diagnostici Roma Nord</h1>
      {centriNord.length > 0 ? centriNord.map(d => (
        <div key={d.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '15px', marginBottom: '15px' }}>
          <h3>{d.nome}</h3>
          <p>📍 {d.indirizzo}</p>
          <p style={{ color: '#64748b' }}>{d.info}</p>
        </div>
      )) : <p>Selezionando nuovi centri a Roma Nord...</p>}
    </div>
  );
}
