import React from 'react';

export default function ServiziDomicilioRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '50px auto', padding: '0 20px' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Torna alla ricerca</a>
      <h1 style={{ marginTop: '20px', color: '#2c5282' }}>Servizi Sanitari a Domicilio a Roma</h1>
      <p>Trova infermieri, fisioterapisti e medici per assistenza domiciliare in tutta Roma.</p>
      <div style={{ marginTop: '30px', border: '1px dashed #cbd5e0', padding: '40px', textAlign: 'center', borderRadius: '10px', color: '#718096' }}>
        <p>Stiamo verificando i professionisti disponibili per il servizio a domicilio...</p>
        <p><strong>Offri assistenza a domicilio?</strong></p>
        <a href="/pubblica-annuncio" style={{ color: '#3182ce', fontWeight: 'bold' }}>Inserisci il tuo profilo gratuitamente</a>
      </div>
    </div>
  );
}
