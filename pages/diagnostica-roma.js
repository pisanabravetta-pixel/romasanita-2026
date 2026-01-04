import React from 'react';

export default function DiagnosticaRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '50px auto', padding: '0 20px' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Torna alla ricerca</a>
      <h1 style={{ marginTop: '20px', color: '#2c5282' }}>Centri Diagnostici a Roma</h1>
      <p>Trova centri per analisi del sangue, ecografie, risonanze magnetiche e radiologia a Roma.</p>
      <div style={{ marginTop: '30px', border: '1px dashed #cbd5e0', padding: '40px', textAlign: 'center', borderRadius: '10px', color: '#718096' }}>
        <p>Elenco centri diagnostici in fase di aggiornamento...</p>
        <p><strong>Gestisci un centro diagnostico?</strong></p>
        <a href="/pubblica-annuncio" style={{ color: '#3182ce', fontWeight: 'bold' }}>Inserisci la tua struttura gratuitamente</a>
      </div>
    </div>
  );
}
