import React from 'react';

export default function DomicilioRomaSud() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
      </nav>
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '30px', fontWeight: '800' }}>Assistenza Sanitaria a Domicilio Roma Sud</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Infermieri, fisioterapisti e medici a domicilio in zona Eur, Garbatella e Laurentina.</p>
        
        <div style={{ backgroundColor: '#fffaf0', padding: '25px', borderRadius: '12px', border: '1px solid #feebc8' }}>
          <p>I <strong>servizi a domicilio a Roma Sud</strong> sono ideali per chi cerca assistenza infermieristica o fisioterapia post-operatoria senza spostarsi da casa, garantendo massima professionalità e rapidità.</p>
        </div>

        <div style={{ marginTop: '30px', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ color: '#dd6b20' }}>Assistenza Sanitaria Eur</h3>
          <p>📍 Copertura totale Roma Sud - Interventi entro 2 ore.</p>
          <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>Contatta Ora</button>
        </div>
      </div>
    </div>
  );
}
