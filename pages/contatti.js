import React from 'react';

export default function Contatti() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      
      <h1 style={{ marginTop: '30px', borderBottom: '2px solid #3182ce', paddingBottom: '10px' }}>Contattaci</h1>
      
      <p>Hai domande o vuoi segnalare un problema? Siamo a tua disposizione.</p>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Supporto Utenti e Professionisti</h3>
        <p>Email: <strong>info@servizisalute.it</strong></p>
        <p>Per comunicazioni urgenti relative agli annunci, scrivi indicando il titolo dell'annuncio.</p>
      </div>

      <h3 style={{ marginTop: '40px' }}>Sei un professionista?</h3>
      <p>Se vuoi sapere come dare più visibilità alla tua struttura o hai bisogno di assistenza per la pubblicazione, non esitare a scriverci.</p>
      
      <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#777' }}>
        © 2026 ServiziSalute – Roma
      </footer>
    </div>
  );
}
