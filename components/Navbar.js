import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuAperto, setMenuAperto] = useState(false);
  const [catAperto, setCatAperto] = useState(false);
  const [isHome, setIsHome] = useState(false);

  // Controlla se siamo in Home Page per mostrare la barra verde
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHome(window.location.pathname === '/');
    }
  }, []);

  return (
    <>
      {/* TOP BAR VERDE - APPARE SOLO IN HOME PAGE */}
      {isHome && (
        <div style={{ 
          backgroundColor: '#065f46', 
          color: 'white', 
          padding: '10px 15px', 
          textAlign: 'center', 
          fontSize: '12px', 
          fontWeight: '800', 
          textTransform: 'uppercase', 
          letterSpacing: '1px' 
        }}>
          🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
        </div>
      )}

      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #e2e8f0', 
        padding: '12px 0', 
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000 
      }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* SINISTRA: LOGO */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '900', fontSize: '20px', textDecoration: 'none' }}>
            <i className="fas fa-heartbeat" style={{ color: '#2563eb' }}></i> 
            <span style={{ color: '#065f46' }}>Servizi</span><span style={{ color: '#2563eb' }}>Salute</span>
          </a>

          {/* CENTRO: MENU ▼ */}
          <div 
            onMouseEnter={() => setMenuAperto(true)}
            onMouseLeave={() => { setMenuAperto(false); setCatAperto(false); }}
            style={{ position: 'relative' }}
          >
            <div style={{ cursor: 'pointer', color: '#475569', fontWeight: '700', fontSize: '13px', padding: '10px' }}>
              MENU <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
            </div>
            
            {/* PRIMO LIVELLO MENU */}
            <div style={{ 
              display: menuAperto ? 'block' : 'none',
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: 'white', minWidth: '200px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', 
              borderRadius: '12px', padding: '8px', border: '1px solid #f1f5f9', zIndex: 9999 
            }}>
              
              {/* CATEGORIE CON SOTTOCATEGORIE */}
              <div 
                onMouseEnter={() => setCatAperto(true)}
                onMouseLeave={() => setCatAperto(false)}
                style={{ position: 'relative' }}
              >
                <div className="menu-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span>🧩 Categorie</span>
                  <i className="fas fa-chevron-right" style={{ fontSize: '10px' }}></i>
                </div>

                {/* SOTTOMENU CATEGORIE (SECONDO LIVELLO) */}
                <div style={{ 
                  display: catAperto ? 'block' : 'none',
                  position: 'absolute', top: 0, left: '100%', marginLeft: '5px',
                  backgroundColor: 'white', minWidth: '200px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', 
                  borderRadius: '12px', padding: '8px', border: '1px solid #f1f5f9'
                }}>
                  <a href="/farmacie-roma" className="menu-link">💊 Farmacie</a>
                  <a href="/dentisti-roma" className="menu-link">🦷 Dentisti</a>
                  <a href="/diagnostica-roma" className="menu-link">🔬 Diagnostica</a>
                  <a href="/visite-specialistiche-roma" className="menu-link">👨‍⚕️ Specialisti</a>
                  <a href="/servizi-domicilio-roma" className="menu-link">🏠 Domicilio</a>
                </div>
              </div>

              <a href="/quartieri-roma" className="menu-link">📍 Quartieri</a>
              <a href="/guide" className="menu-link">📘 Guide</a>
              <a href="/chi-siamo" className="menu-link">ℹ️ Chi siamo</a>
            </div>
          </div>

          {/* DESTRA: ACCEDI + PUBBLICA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <a href="/login" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px' }}>Accedi</a>
            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '20px', 
              textDecoration: 'none', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase' 
            }}>
              Pubblica
            </a>
          </div>
        </div>

        <style jsx>{`
          .menu-link {
            display: block;
            padding: 10px 15px;
            text-decoration: none;
            color: #475569;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            transition: background 0.2s;
          }
          .menu-link:hover {
            background-color: #f8fafc;
            color: #2563eb;
          }
          @media (max-width: 480px) {
            span { font-size: 15px; }
          }
        `}</style>
      </header>
    </>
  );
}
