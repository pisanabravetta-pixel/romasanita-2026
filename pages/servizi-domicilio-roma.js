import React from 'react';
import { DOMICILIO } from '../database';

export default function DomicilioRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Servizi Sanitari a Domicilio</h1>
      {DOMICILIO.map(s => (
        <div key={s.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '10px' }}>
          <h3>{s.nome}</h3>
          <p>📍 Zona: {s.zona} - {s.info}</p>
          <a href={s.slug} style={{ color: '#2563eb' }}>Contatta servizio →</a>
        </div>
      ))}
    </div>
  );
}
