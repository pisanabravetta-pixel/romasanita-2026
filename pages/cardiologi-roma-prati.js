import React from 'react';
import { VISITE } from '../database';

export default function CardiologiRomaPrati() {
  const cardiologiPrati = VISITE.filter(v => v.zona === "Prati" && v.info.toLowerCase().includes("cardio"));

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <a href="/cardiologi-roma" style={{ color: '#2563eb', textDecoration: 'none' }}>← Torna a Cardiologi</a>
      <h1 style={{ color: '#1e3a8a', marginTop: '20px' }}>Cardiologo a Roma Prati</h1>
      {cardiologiPrati.length > 0 ? cardiologiPrati.map(c => (
        <div key={c.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '15px', marginBottom: '15px', backgroundColor: '#fff' }}>
          <h3>{c.nome}</h3>
          <p>📍 {c.indirizzo}</p>
          <a href="https://wa.me/39" style={{ color: '#25D366', fontWeight: 'bold' }}>Contatta su WhatsApp</a>
        </div>
      )) : <p>Ricerca nuovi cardiologi in zona Prati...</p>}
    </div>
  );
}
