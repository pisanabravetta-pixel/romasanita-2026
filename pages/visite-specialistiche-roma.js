import React from 'react';
import { VISITE } from '../database';

export default function VisiteRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Visite Specialistiche a Roma</h1>
      {VISITE.map(v => (
        <div key={v.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '10px' }}>
          <h3>{v.nome}</h3>
          <p>📍 {v.indirizzo} ({v.zona}) - <strong>{v.info}</strong></p>
          <a href={v.slug} style={{ color: '#2563eb' }}>Prenota visita →</a>
        </div>
      ))}
    </div>
  );
}
