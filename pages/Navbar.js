import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* LOGO */}
        <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '22px' }}>
          ServiziSalute
        </a>

        {/* BOTTONE HAMBURGER (Le 3 linee sul cellulare) */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', fontSize: '24px' }}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* MENU */}
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <a href="/chi-siamo">Chi Siamo</a>
          <a href="/come-funziona">Come Funziona</a>
          <a href="/contatti">Contatti</a>
          
          {/* LINK ACCEDI AGGIUNTO QUI */}
          <a href="/login" style={{ color: '#2563eb' }}>Accedi</a>
          
          <a href="/pubblica-annuncio" className="btn-nav">Area Medici</a>
        </nav>
      </div>

      <style jsx>{`
        .header { background: white; border-bottom: 1px solid #eee; padding: 15px 0; position: sticky; top: 0; z-index: 1000; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }
        .nav-menu { display: flex; gap: 20px; align-items: center; }
        .nav-menu a { text-decoration: none; color: #555; font-size: 15px; font-weight: 600; }
        .btn-nav { background: #2563eb; color: white !important; padding: 10px 20px; border-radius: 8px; }
        
        /* VERSIONE CELLULARE */
        @media (max-width: 768px) {
          .nav-menu { 
            display: none; 
            flex-direction: column; 
            position: absolute; 
            top: 60px; left: 0; width: 100%; 
            background: white; padding: 20px; border-bottom: 1px solid #eee;
            box-shadow: 0 10px 15px rgba(0,0,0,0.05);
          }
          .nav-menu.active { display: flex; }
          .hamburger { display: block; }
          .nav-menu a { width: 100%; text-align: center; padding: 10px 0; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none; }
        }
      `}</style>
    </header>
  );
}
