import React, { useState, useEffect } from 'react';

// SVG inline — sostituisce Font Awesome (risparmio ~83 KiB CSS/JS)
const IconChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'inline',verticalAlign:'middle',marginLeft:'4px' }}>
    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconChevronUp = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'inline',verticalAlign:'middle',marginLeft:'4px' }}>
    <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconHeartbeat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'inline',verticalAlign:'middle',color:'#2563eb' }}>
    <path d="M3 12h3l3-8 4 16 3-10 2 4h3" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
    <>
      {/* TOP BAR VERDE - SOLO IN HOME */}
      {isHome && (
        <div style={{ backgroundColor: '#065f46', color: 'white', padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
          🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
        </div>
      )}

      <header style={{ backgroundColor: 'white', borderBottom: '2px solid #e2e8f0', width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="nav-container">

          {/* ── SINISTRA: MENU (solo desktop) ── */}
          <div
            className="menu-wrapper desktop-left"
          >
            <div className="menu-trigger" onClick={() => { setMenuAperto(!menuAperto); setCatAperto(false); }}>
              MENU {menuAperto ? <IconChevronUp /> : <IconChevronDown />}
            </div>

            {menuAperto && (
              <div className="dropdown-main" onMouseLeave={() => { setMenuAperto(false); setCatAperto(false); }}>
                <div className="cat-section">
                  <div onClick={() => setCatAperto(!catAperto)} className="menu-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span>🧩 Categorie</span>
                    {catAperto ? <IconChevronUp /> : <IconChevronDown />}
                  </div>

                  {catAperto && (
                    <div className="submenu-vertical">
                      <a href="/farmacie-roma">💊 Farmacie</a>
                      <a href="/dentisti-roma">🦷 Dentisti</a>
                      <a href="/diagnostica-roma">🔬 Diagnostica</a>
                      <a href="/visite-specialistiche-roma">👨‍⚕️ Specialisti</a>
                      <a href="/servizi-domicilio-roma">🏠 Domicilio</a>
                    </div>
                  )}
                </div>

                <a href="/quartieri-roma" className="menu-link">📍 Quartieri</a>
                <a href="/guide" className="menu-link">📘 Guide</a>
                <a href="/chi-siamo" className="menu-link">ℹ️ Chi siamo</a>
              </div>
            )}
          </div>

          {/* ── CENTRO: LOGO ── */}
          <a href="/" className="logo-section" style={{ textDecoration: 'none' }}>
            <IconHeartbeat />
            <span style={{ color: '#065f46' }}>Servizi</span>
            <span style={{ color: '#2563eb' }}>Salute</span>
          </a>

          {/* ── DESTRA: ACCEDI + PUBBLICA (solo desktop) ── */}
          <div className="user-actions desktop-right">
            <a href="/login" className="accedi-link">Accedi</a>
            <a href="/pubblica-annuncio" className="pubblica-btn">Pubblica</a>
          </div>

          {/* ── MOBILE: MENU + AZIONI in una sola riga ── */}
          <nav className="nav-actions mobile-only">
            <div
              className="menu-wrapper"
            >
              <div className="menu-trigger" onClick={() => { setMenuAperto(!menuAperto); setCatAperto(false); }}>
                MENU {menuAperto ? <IconChevronUp /> : <IconChevronDown />}
              </div>

              {menuAperto && (
                <div className="dropdown-main" onMouseLeave={() => { setMenuAperto(false); setCatAperto(false); }}>
                  <div className="cat-section">
                    <div onClick={() => setCatAperto(!catAperto)} className="menu-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                      <span>🧩 Categorie</span>
                      {catAperto ? <IconChevronUp /> : <IconChevronDown />}
                    </div>

                    {catAperto && (
                      <div className="submenu-vertical">
                        <a href="/farmacie-roma">💊 Farmacie</a>
                        <a href="/dentisti-roma">🦷 Dentisti</a>
                        <a href="/diagnostica-roma">🔬 Diagnostica</a>
                        <a href="/visite-specialistiche-roma">👨‍⚕️ Specialisti</a>
                        <a href="/servizi-domicilio-roma">🏠 Domicilio</a>
                      </div>
                    )}
                  </div>

                  <a href="/quartieri-roma" className="menu-link">📍 Quartieri</a>
                  <a href="/guide" className="menu-link">📘 Guide</a>
                  <a href="/chi-siamo" className="menu-link">ℹ️ Chi siamo</a>
                </div>
              )}
            </div>

            <div className="user-actions">
              <a href="/login" className="accedi-link">Accedi</a>
              <a href="/pubblica-annuncio" className="pubblica-btn">Pubblica</a>
            </div>
          </nav>

        </div>

        <style jsx>{`
          /* ═══════════════════════════════════════
             DESKTOP (> 768px): layout a 3 colonne
             MENU | LOGO (centrato) | ACCEDI+PUBBLICA
          ═══════════════════════════════════════ */
          .nav-container {
            max-width: 1250px;
            margin: 0 auto;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            /* 3 colonne uguali: sx | centro | dx */
            justify-content: space-between;
          }

          /* Colonna sinistra: occupa ~1/3 */
          .desktop-left {
            flex: 1;
            display: flex;
            justify-content: flex-start;
          }

          /* Logo: assoluto al centro */
          .logo-section {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 900;
            font-size: 40px;
            letter-spacing: -1px;
            cursor: pointer;
            white-space: nowrap;
          }

          /* Colonna destra: occupa ~1/3 */
          .desktop-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }

          /* Mobile nav row: nascosta su desktop */
          .mobile-only { display: none; }

          /* ── MENU ── */
          .menu-wrapper { position: relative; }
          .menu-trigger { cursor: pointer; color: #475569; font-weight: 700; font-size: 15px; padding: 10px; }

          .dropdown-main {
            position: absolute; top: 100%; left: 0; transform: none;
            background: white; min-width: 240px; box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            border-radius: 12px; padding: 10px; border: 1px solid #f1f5f9; z-index: 999;
          }

          .submenu-vertical { background: #f8fafc; border-radius: 8px; margin: 5px 0; padding: 5px 0; }
          .submenu-vertical a { display: block; padding: 8px 20px; font-size: 13px; text-decoration: none; color: #475569; font-weight: 600; }
          .submenu-vertical a:hover { color: #2563eb; background: #f1f5f9; }

          .menu-link { display: block; padding: 12px 15px; text-decoration: none; color: #475569; font-size: 15px; font-weight: 600; border-radius: 8px; }
          .menu-link:hover { background-color: #f8fafc; color: #2563eb; }

          /* ── AZIONI UTENTE ── */
          .user-actions { display: flex; align-items: center; gap: 20px; }
          .accedi-link { text-decoration: none; color: #475569; font-weight: 700; font-size: 15px; }
          .pubblica-btn { background: #2563eb; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2); }

         /* ═══════════════════════════════════════
              MOBILE (≤ 768px): RIGA UNICA
             ═══════════════════════════════════════ */
          @media (max-width: 768px) {
            /* Nascondi elementi desktop */
            .desktop-left, .desktop-right { display: none; }

            /* Il logo torna in flusso normale, centrato in alto */
            .logo-section {
              position: static;
              transform: none;
              font-size: 28px;
              justify-content: center;
              width: 100%;
              gap: 6px;
            }

            .nav-container {
              flex-direction: column;
              gap: 15px;
              padding: 10px;
            }

            /* Riga inferiore: Menu a sx, Accedi al centro, Pubblica a dx */
            .mobile-only {
              display: flex;
              width: 100%;
              justify-content: space-between; 
              align-items: center;
              border-top: 1px solid #f1f5f9;
              padding-top: 12px;
            }

            /* Contenitore azioni utente in riga */
            .mobile-only .user-actions { 
              display: flex; 
              flex-direction: row; 
              align-items: center; 
              flex: 1; 
              justify-content: space-between; 
              margin-left: 15px;
            }

            /* Accedi centrato tra Menu e Pubblica */
            .accedi-link { 
              text-align: center; 
              flex: 1; 
              font-size: 14px;
              white-space: nowrap;
            }

            .pubblica-btn { 
              padding: 8px 14px; 
              font-size: 11px; 
              white-space: nowrap;
              flex-shrink: 0;
            }

            .dropdown-main { left: 0; transform: none; width: 250px; }
          }
        `}</style>
      </header>
    </>
  );
}
