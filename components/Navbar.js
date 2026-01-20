import React, { useState } from 'react';

export default function Navbar() {
  const [menuAperto, setMenuAperto] = useState(false);

  return (
    <>
      {/* TOP BAR - VERDE ISTITUZIONALE */}
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

      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #e2e8f0', 
        padding: '12px 0', 
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000 
      }}>
        <div className="nav-container" style={{ 
          maxWidth: '1250px', 
          margin: '0 auto', 
          padding: '0 15px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          
          {/* 1️⃣ SINISTRA: LOGO + NOME (Sempre visibile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '900', fontSize: '20px', flexShrink: 0 }}>
            <i className="fas fa-heartbeat" style={{ color: '#2563eb' }}></i> 
            <span style={{ color: '#065f46' }}>Servizi</span><span style={{ color: '#2563eb' }}>Salute</span>
          </div>

          {/* 2️⃣ CENTRO: MENU ▼ (Accorciato) */}
          <div 
            onMouseEnter={() => setMenuAperto(true)}
            onMouseLeave={() => setMenuAperto(false)}
            style={{ position: 'relative', flexShrink: 0 }}
          >
            <div style={{ 
              cursor: 'pointer', 
              color: '#475569', 
              fontWeight: '700', 
              fontSize: '13px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              padding: '10px'
            }}>
              MENU <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
            </div>
            
            <div style={{ 
              display: menuAperto ? 'block' : 'none',
              position: 'absolute', 
              top: '100%', 
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white', 
              minWidth: '200px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)', 
              borderRadius: '12px', 
              padding: '8px', 
              border: '1px solid #f1f5f9', 
              zIndex: 9999 
            }}>
              <a href="/servizi-sanitari-roma" className="menu-link">🧩 Categorie</a>
              <a href="/quartieri-roma" className="menu-link">📍 Quartieri</a>
              <a href="/guide" className="menu-link">📘 Guide</a>
              <a href="/chi-siamo" className="menu-link">ℹ️ Chi siamo</a>
            </div>
          </div>

          {/* 3️⃣ DESTRA: ACCEDI + PUBBLICA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <a href="/login" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px' }}>
              Accedi
            </a>

            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '20px', 
              textDecoration: 'none', 
              fontWeight: '800', 
              fontSize: '12px',
              textTransform: 'uppercase'
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
          }
          .menu-link:hover {
            background-color: #f8fafc;
            color: #2563eb;
          }
          
          @media (max-width: 480px) {
            .nav-container { padding: 0 8px !important; }
            span { font-size: 16px; } /* Rimpicciolisce ma non sparisce */
            i { font-size: 16px; }
            a[href="/pubblica-annuncio"] { padding: 6px 10px; font-size: 10px; }
          }
        `}</style>
      </header>
    </>
  );
}
