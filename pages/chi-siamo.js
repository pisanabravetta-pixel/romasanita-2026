import React from 'react';

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', marginRight: '20px' }}>ServiziSalute</a>
        <a href="/login" style={{ textDecoration: 'none', color: '#333', marginRight: '20px' }}>Accedi</a>
        <a href="/pubblica-annuncio" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Pubblica annuncio</a>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#1e3a8a' }}>Chi Siamo</h1>
        <p>ServiziSalute è il portale della sanità a Roma.</p>
        <p>La nostra missione è connettere medici e cittadini in modo semplice e gratuito.</p>
        <div style={{ marginTop: '40px', padding: '20px', background: '#f8fafc' }}>
           <a href="/">← Torna alla Home</a>
        </div>
      </main>
    </div>
  );
}
