import React from 'react';
import { DIAGNOSTICA } from '../database';

export default function DiagnosticaRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Centri di Diagnostica a Roma</h1>
      {DIAGNOSTICA.map(d => (
        <div key={d.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '10px' }}>
          <h3>{d.nome}</h3>
          <p>📍 {d.indirizzo} ({d.zona})</p>
          <a href={d.slug} style={{ color: '#2563eb' }}>Vedi centro →</a>
        </div>
      ))}
    </div>
  );
}
