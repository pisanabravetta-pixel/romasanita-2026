import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ background: 'white', borderBottom: '1px solid #eee', padding: '15px 0', position: 'sticky', top: 0, z-index: 1000 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO */}
        <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '22px' }}>
          ServiziSalute
        </a>

        {/* MENU */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/chi-siamo" style={{ textDecoration: 'none', color: '#555', fontWeight: '600' }}>Chi Siamo</a>
          
          {/* LINK ACCEDI - SE ANCHE QUESTO DA #, IL PROBLEMA E' ALTROVE */}
          <a href="/login" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '800' }}>
            ACCEDI
          </a>

          <a href="/pubblica-annuncio" style={{ background: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Area Medici
          </a>
        </nav>
      </div>
    </header>
  );
}
