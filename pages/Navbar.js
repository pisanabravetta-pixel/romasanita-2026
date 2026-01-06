import React from 'react';

export default function Navbar() {
  return (
    <header style={{ background: 'white', borderBottom: '1px solid #eee', padding: '15px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '22px' }}>
          ServiziSalute
        </a>

        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/chi-siamo" style={{ textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '15px' }}>Chi Siamo</a>
          <a href="/login" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '800', fontSize: '15px' }}>ACCEDI</a>
          <a href="/pubblica-annuncio" style={{ background: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>Area Medici</a>
        </nav>
        
      </div>
    </header>
  );
}
