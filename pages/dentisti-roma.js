import React from 'react';

export default function DentistiRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '50px auto', padding: '0 20px' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Torna alla ricerca</a>
      <h1 style={{ marginTop: '20px', color: '#2c5282' }}>Dentisti a Roma</h1>
      <p>Trova dentisti, odontoiatri e studi dentistici nei quartieri di Roma. Prenota la tua visita specialistica.</p>
      <div style={{ marginTop: '30px', border: '1px dashed #cbd5e0', padding: '40px', textAlign: 'center', borderRadius: '10px', color: '#718096' }}>
        <p>Stiamo selezionando i migliori studi dentistici di Roma...</p>
        <p><strong>Sei un dentista?</strong></p>
        <a href="/pubblica-annuncio" style={{ color: '#3182ce', fontWeight: 'bold' }}>Pubblica il tuo studio gratuitamente qui</a>
      </div>
    </div>
  );
}
