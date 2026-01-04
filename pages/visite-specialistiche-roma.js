import React from 'react';

export default function VisiteSpecialisticheRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '50px auto', padding: '0 20px' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>← Torna alla ricerca</a>
      <h1 style={{ marginTop: '20px', color: '#2c5282' }}>Visite Specialistiche a Roma</h1>
      <p>Prenota visite con cardiologi, dermatologi, ginecologi e altri specialisti a Roma.</p>
      <div style={{ marginTop: '30px', border: '1px dashed #cbd5e0', padding: '40px', textAlign: 'center', borderRadius: '10px', color: '#718096' }}>
        <p>Cerca tra i professionisti sanitari di Roma...</p>
        <p><strong>Sei un medico specialista?</strong></p>
        <a href="/pubblica-annuncio" style={{ color: '#3182ce', fontWeight: 'bold' }}>Aumenta la tua visibilità, pubblica gratis</a>
      </div>
    </div>
  );
}
