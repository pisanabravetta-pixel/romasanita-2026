import React from 'react';

export default function ChiSiamo() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <nav style={{ marginBottom: '20px' }}>
        <a href="/" style={{ marginRight: '20px', fontWeight: 'bold', color: '#2563eb' }}>ServiziSalute</a>
        <a href="/login" style={{ marginRight: '20px', color: '#333' }}>Accedi</a>
        <a href="/pubblica-annuncio">Pubblica annuncio</a>
      </nav>
      <h1>Chi Siamo</h1>
      <p>ServiziSalute Roma - Portale della Sanita Locale.</p>
    </div>
  );
}
