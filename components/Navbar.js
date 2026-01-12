import React from 'react';

export default function Navbar() {
  return (
    <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '15px 0', width: '100%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <a href="/" style={{ fontWeight: '900', color: '#1e3a8a', textDecoration: 'none', fontSize: '24px', letterSpacing: '-0.5px' }}>
          Servizi<span style={{ color: '#2563eb' }}>Salute</span>
        </a>

        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/chi-siamo" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '14px' }}>Chi Siamo</a>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontWeight: '800', fontSize: '14px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>AREA MEDICI</a>
        </nav>
        
      </div>
    </header>
  );
}
