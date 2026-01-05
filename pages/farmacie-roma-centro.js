import React from 'react';
import { FARMACIE } from '../database';

export default function FarmacieRomaCentro() {
  const farmacieCentro = FARMACIE.filter(f => f.zona === "Centro");

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <a href="/farmacie-roma" style={{ color: '#059669', textDecoration: 'none' }}>← Torna a Farmacie Roma</a>
      <h1 style={{ color: '#065f46', marginTop: '20px' }}>Farmacie a Roma Centro</h1>
      {farmacieCentro.map(f => (
        <div key={f.id} style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '15px', marginBottom: '20px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#065f46' }}>{f.nome}</h3>
          <p>📍 {f.indirizzo}</p>
          <p>✨ {f.info}</p>
          <a href="tel:060000" style={{ color: '#059669', fontWeight: 'bold' }}>Chiama Ora</a>
        </div>
      ))}
    </div>
  );
}
