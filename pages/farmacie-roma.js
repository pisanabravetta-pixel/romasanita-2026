import React from 'react';

export default function FarmacieRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '50px auto', padding: '0 20px' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Torna alla ricerca</a>
      
      <h1 style={{ marginTop: '20px', color: '#2c5282' }}>Farmacie a Roma</h1>
      <p>Trova le migliori farmacie aperte, farmacie di turno e servizi farmaceutici nei quartieri di Roma.</p>

      {/* Spazio per gli annunci */}
      <div style={{ marginTop: '30px', border: '1px dashed #cbd5e0', padding: '40px', textAlign: 'center', borderRadius: '10px', color: '#718096' }}>
        <p>Stiamo aggiornando l'elenco delle farmacie...</p>
        <p><strong>Sei il titolare di una farmacia?</strong></p>
        <a href="/pubblica-annuncio" style={{ color: '#3182ce', fontWeight: 'bold' }}>Inserisci la tua attività gratuitamente qui</a>
      </div>
    </div>
  );
}
