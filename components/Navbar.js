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
        /* --- DESKTOP (PC) --- */
        .nav-container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }
        .nav-col-left { flex: 1; display: flex; justify-content: flex-start; }
        .nav-col-center { flex: 0; display: flex; justify-content: center; }
        .nav-col-right { flex: 1; display: flex; justify-content: flex-end; }

        .logo-link { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 32px; text-decoration: none; white-space: nowrap; }
        .menu-trigger { cursor: pointer; font-weight: 700; color: #475569; font-size: 15px; }
        .dropdown-box { position: absolute; top: 50px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); z-index: 2000; min-width: 200px; }
        .menu-link { display: block; padding: 10px; text-decoration: none; color: #475569; font-weight: 600; }
        .auth-buttons { display: flex; align-items: center; gap: 20px; }
        .login-txt { text-decoration: none; color: #475569; font-weight: 700; }
        .btn-pubblica { background: #2563eb; color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-weight: 800; font-size: 13px; text-transform: uppercase; }

        /* --- MOBILE (Smartphone) --- */
        @media (max-width: 768px) {
          .nav-container { 
            flex-direction: column; 
            height: auto; 
            padding: 15px 10px;
            gap: 15px;
          }
          /* Logo al centro in alto */
          .nav-col-center { order: 1; width: 100%; }
          .logo-link { font-size: 24px; justify-content: center; }

          /* Riga sotto: Menu a sx e Pulsanti a dx */
          .nav-col-left { order: 2; width: 100%; justify-content: space-between; display: flex; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 15px; }
          .nav-col-right { order: 3; position: absolute; bottom: 15px; right: 10px; }
          
          .auth-buttons { gap: 10px; }
          .btn-pubblica { padding: 8px 15px; font-size: 11px; }
          .login-txt { font-size: 13px; }
        }
      `}</style>
    </header>
  );
}
