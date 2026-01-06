import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* LOGO */}
        <Link href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '22px' }}>
          ServiziSalute
        </Link>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', fontSize: '24px' }}>
          {isOpen ? '✕' : '☰'}
        </div>

        {/* MENU */}
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link href="/chi-siamo">Chi Siamo</Link>
          <Link href="/come-funziona">Come Funziona</Link>
          <Link href="/contatti">Contatti</Link>
          
          {/* LINK ACCEDI - Corretto per Next.js */}
          <Link href="/login" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>
            Accedi
          </Link>
          
          <Link href="/pubblica-annuncio" className="btn-nav">
            Area Medici
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .header { background: white; border-bottom: 1px solid #eee; padding: 15px 0; position: sticky; top: 0; z-index: 1000; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
        .nav-menu { display: flex; gap: 20px; align-items: center; }
        
        /* Stile universale per i link della nav */
        .nav-menu :global(a) { 
          text-decoration: none; 
          color: #555; 
          font-size: 15px; 
          font-weight: 600; 
          padding: 5px 10px;
        }

        .btn-nav { 
          background: #2563eb; 
          color: white !important; 
          padding: 10px 20px !important; 
          border-radius: 8px; 
        }
        
        @media (max-width: 768px) {
          .nav-menu { 
            display: none; 
            flex-direction: column; 
            position: absolute; 
            top: 60px; left: 0; width: 100%; 
            background: white; padding: 20px; border-bottom: 1px solid #eee;
          }
          .nav-menu.active { display: flex; }
          .hamburger { display: block; }
          .nav-menu :global(a) { width: 100%; text-align: center; padding: 15px 0; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none; }
        }
      `}</style>
    </header>
  );
}
