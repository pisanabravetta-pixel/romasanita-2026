import React, { useState } from 'react';
import Link from 'next/link'; // Importante per la navigazione in Next.js

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* LOGO */}
        <Link href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '22px', zIndex: 1001 }}>
          ServiziSalute
        </Link>

        {/* BOTTONE HAMBURGER */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', fontSize: '24px', zIndex: 1001 }}>
          <span style={{ display: isOpen ? 'none' : 'block' }}>☰</span>
          <span style={{ display: isOpen ? 'block' : 'none' }}>✕</span>
        </div>

        {/* MENU */}
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link href="/chi-siamo">Chi Siamo</Link>
          <Link href="/come-funziona">Come Funziona</Link>
          <Link href="/contatti">Contatti</Link>
          
          {/* LINK ACCEDI - Usiamo Link per Next.js */}
          <Link href="/login" style={{ color: '#2563eb', fontWeight: 'bold' }}>
            Accedi
          </Link>
          
          <Link href="/pubblica-annuncio" className="btn-nav">
            Area Medici
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .header { background: white; border-bottom: 1px solid #eee; padding: 15px 0; position: sticky; top: 0; z-index: 1000; width: 100%; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
        .nav-menu { display: flex; gap: 20px; align-items: center; }
        
        /* Forza i link a essere cliccabili */
        .nav-menu :global(a) { 
          text-decoration: none; 
          color: #555; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer;
          position: relative;
          z-index: 1002;
        }

        .btn-nav { background: #2563eb; color: white !important; padding: 10px 20px; border-radius: 8px; }
        
        @media (max-width: 768px) {
          .hamburger { display: block; }
          .nav-menu { 
            display: none; 
            flex-direction: column; 
            position: absolute; 
            top: 100%; left: 0; width: 100%; 
            background: white; padding: 20px; border-bottom: 1px solid #eee;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .nav-menu.active { display: flex; }
          .nav-menu :global(a) { padding: 15px 0; width: 100%; text-align: center; border-bottom: 1px solid #f9f9f9; }
        }

        @media (min-width: 769px) {
          .hamburger { display: none; }
          .nav-menu { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
