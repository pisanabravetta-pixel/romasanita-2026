import React from 'react';
import { FARMACIE } from '../database';

export default function FarmacieRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Farmacie a Roma</h1>
      {FARMACIE.map(f => (
        <div key={f.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '10px' }}>
          <h3>{f.nome}</h3>
          <p>📍 {f.indirizzo} ({f.zona}) - <span>{f.info}</span></p>
          <a href={f.slug} style={{ color: '#2563eb' }}>Dettagli zona →</a>
        </div>
      ))}
    </div>
  );
}
