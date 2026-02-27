import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuAperto, setMenuAperto] = useState(false);
  const [catAperto, setCatAperto] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHome(window.location.pathname === '/');
    }
  }, []);

  return (
    <header style={{ backgroundColor: 'white', borderBottom: '2px solid #e2e8f0', width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* TOP BAR VERDE SOLO HOME */}
      {isHome && (
        <div style={{ backgroundColor: '#065f46', color: 'white', padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '800' }}>
          🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
        </div>
      )}

      <div className="nav-main-row">
        
        {/* SINISTRA: MENU */}
        <div className="nav-col-left">
          <div className="menu-wrapper" onMouseEnter={() => setMenuAperto(true)} onMouseLeave={() => { setMenuAperto(false); setCatAperto(false); }}>
            <div className="menu-trigger">MENU <i className="fas fa-chevron-down"></i></div>
            {menuAperto && (
              <div className="dropdown-box">
                <a href="/farmacie-roma" className="menu-link">💊 Farmacie</a>
                <a href="/dentisti-roma" className="menu-link">🦷 Dentisti</a>
                <a href="/diagnostica-roma" className="menu-link">🔬 Diagnostica</a>
                <a href="/visite-specialistiche-roma" className="menu-link">👨‍⚕️ Specialisti</a>
                <a href="/quartieri-roma" className="menu-link">📍 Quartieri</a>
              </div>
            )}
          </div>
        </div>

        {/* CENTRO: LOGO */}
        <div className="nav-col-center">
          <a href="/" className="logo-link">
            <i className="fas fa-heartbeat" style={{ color: '#2563eb' }}></i> 
            <span style={{ color: '#065f46' }}>Servizi</span>
            <span style={{ color: '#2563eb' }}>Salute</span>
          </a>
        </div>

        {/* DESTRA: PULSANTI */}
        <div className="nav-col-right">
          <div className="auth-buttons">
            <a href="/login" className="login-txt">Accedi</a>
            <a href="/pubblica-annuncio" className="btn-pubblica">Pubblica</a>
          </div>
        </div>

      </div>

<style jsx>{`
        /* --- PC: LOGO AL CENTRO, MENU SX, BOTTONI DX --- */
        .nav-container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr auto 1fr; /* Tre colonne fisse */
          align-items: center;
          height: 80px;
        }

        .nav-col-left { display: flex; justify-content: flex-start; }
        .nav-col-center { display: flex; justify-content: center; }
        .nav-col-right { display: flex; justify-content: flex-end; }

        .logo-link { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 32px; text-decoration: none; white-space: nowrap; }
        .menu-trigger { cursor: pointer; font-weight: 700; color: #475569; font-size: 15px; }
        .auth-buttons { display: flex; align-items: center; gap: 20px; }
        .login-txt { text-decoration: none; color: #475569; font-weight: 700; }
        .btn-pubblica { background: #2563eb; color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-weight: 800; font-size: 13px; text-transform: uppercase; }

        /* --- MOBILE: LOGO SOPRA, MENU E BOTTONI SOTTO --- */
        @media (max-width: 768px) {
          .nav-container { 
            display: flex; 
            flex-direction: column; 
            height: auto; 
            padding: 15px 10px;
            gap: 10px;
          }
          /* Logo in alto al centro */
          .nav-col-center { width: 100%; order: 1; justify-content: center; }
          .logo-link { font-size: 24px; }

          /* Contenitore per mettere Menu e Bottoni sulla stessa riga */
          .nav-col-left { order: 2; width: 100%; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 10px; }
          .nav-col-right { order: 3; width: 100%; justify-content: flex-end; margin-top: -42px; } 
          
          .auth-buttons { gap: 10px; }
          .btn-pubblica { padding: 8px 15px; font-size: 11px; }
          .login-txt { font-size: 13px; }
        }
      `}</style>
    </header>
  );
}
