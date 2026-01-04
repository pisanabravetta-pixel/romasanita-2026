import React from 'react';

export default function DiagnosticaRomaNord() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
      </nav>
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '30px', fontWeight: '800' }}>Centri Diagnostici e Analisi Roma Nord</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>I migliori centri per Risonanze, TAC e analisi del sangue tra Parioli, Corso Francia e Ponte Milvio.</p>
        
        <div style={{ backgroundColor: '#fff5f5', padding: '25px', borderRadius: '12px', border: '1px solid #fed7d7' }}>
          <p>Cerchi <strong>diagnostica a Roma Nord</strong>? In questa zona si trovano le cliniche più rinomate per la radiologia e la diagnostica per immagini. Ideale per chi cerca tempi d'attesa brevi e referti immediati.</p>
        </div>

        <div style={{ marginTop: '30px', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ color: '#c53030' }}>Centro Radiologico Parioli</h3>
          <p>📍 Viale dei Parioli - Alta tecnologia e referti online.</p>
          <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>Chiama Ora</button>
        </div>
      </div>
    </div>
  );
}
