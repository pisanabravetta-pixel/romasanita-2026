import React from 'react';
import { DOMICILIO } from '../database';

export default function ServiziDomicilioRomaSud() {
  const serviziSud = DOMICILIO.filter(s => s.zona === "Roma Sud");

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <a href="/servizi-domicilio-roma" style={{ color: '#2563eb', textDecoration: 'none' }}>← Torna ai Servizi a Domicilio</a>
      <h1 style={{ color: '#1e3a8a', marginTop: '20px' }}>Assistenza a Domicilio Roma Sud</h1>
      {serviziSud.map(s => (
        <div key={s.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '15px', marginBottom: '15px' }}>
          <h3>{s.nome}</h3>
          <p>📍 Copertura: {s.zona}</p>
          <p>🩺 {s.info}</p>
        </div>
      ))}
    </div>
  );
}
