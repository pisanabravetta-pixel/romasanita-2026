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
    <>
      {/* TOP BAR VERDE - SOLO IN HOME */}
      {isHome && (
        <div style={{ backgroundColor: '#065f46', color: 'white', padding: '10px', textAlign: 'center', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
          🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
        </div>
      )}

      <header style={{ backgroundColor: 'white', borderBottom: '2px solid #e2e8f0', width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="nav-container">
          
          {/* SINISTRA: MENU (PC) */}
          <div className="nav-col nav-left">
            <div 
              onMouseEnter={() => setMenuAperto(true)}
              onMouseLeave={() => { setMenuAperto(false); setCatAperto(false); }}
              className="menu-wrapper"
            >
              <div className="menu-trigger">
                MENU <i className="fas fa-chevron-down"></i>
              </div>
              
              {menuAperto && (
                <div className="dropdown-main">
                  <div className="cat-section">
                    <div onClick={() => setCatAperto(!catAperto)} className="menu-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                      <span>🧩 Categorie</span>
                      <i className={`fas ${catAperto ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{fontSize: '10px'}}></i>
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
          </div>

          {/* CENTRO: LOGO */}
          <a href="/" className="logo-section" style={{ textDecoration: 'none' }}>
            <i className="fas fa-heartbeat" style={{ color: '#2563eb', fontSize: '1.2em' }}></i> 
            <span style={{ color: '#065f46' }}>Servizi</span>
            <span style={{ color: '#2563eb' }}>Salute</span>
          </a>

          {/* DESTRA: AZIONI (PC) */}
          <div className="nav-col nav-right">
            <div className="user-actions">
              <a href="/login" className="accedi-link">Accedi</a>
              <a href="/pubblica-annuncio" className="pubblica-btn">Pubblica</a>
            </div>
          </div>
        </div>

<style jsx>{`
          /* --- DESKTOP (PC) --- */
          .nav-container {
            max-width: 1250px;
            margin: 0 auto;
            padding: 15px 20px;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }

          .nav-left { display: flex; justify-content: flex-start; }
          .nav-right { display: flex; justify-content: flex-end; }
          
          .logo-section {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 900;
            font-size: 32px;
            letter-spacing: -1px;
          }

          .menu-wrapper { position: relative; }
          .menu-trigger { cursor: pointer; color: #475569; font-weight: 700; font-size: 15px; padding: 10px; }
          
          .dropdown-main {
            position: absolute; top: 100%; left: 0;
            background: white; min-width: 240px; box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            border-radius: 12px; padding: 10px; border: 1px solid #f1f5f9; z-index: 2000;
          }
          
          .user-actions { display: flex; align-items: center; gap: 20px; }
          .accedi-link { text-decoration: none; color: #475569; font-weight: 700; font-size: 15px; }
          .pubblica-btn { background: #2563eb; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; }

         /* ADATTAMENTO MOBILE */
          @media (max-width: 768px) {
            .nav-container { 
              flex-direction: column; 
              gap: 15px; 
              padding: 10px; 
            }
            
            /* Logo sopra al centro */
            .logo-section { 
              font-size: 22px; 
              justify-content: center; 
              width: 100%; 
              gap: 6px; 
              order: 1; 
            }
            
            /* Riga sotto: Menu a sx e Bottoni a dx */
            .nav-col-left, .nav-col-right { 
              display: contents; /* Annulla i contenitori superflui per usare il flex del padre */
            }

            /* Trasformiamo la nav-actions o i blocchi interni per stare sulla stessa riga */
            .nav-container {
              display: flex;
            }

            /* Creiamo la riga inferiore */
            .nav-col-left { 
              order: 2; 
              width: 100%; 
              display: flex; 
              justify-content: space-between; /* Spinge Menu a sx e Bottoni a dx */
              align-items: center;
              border-top: 1px solid #f1f5f9; 
              padding-top: 10px; 
            }
            
            .nav-col-right { 
              order: 3;
              margin-top: -45px; /* Tira su i bottoni sulla riga del menu */
              width: 100%;
              display: flex;
              justify-content: flex-end;
              pointer-events: none; /* Evita che il contenitore copra il menu */
            }

            .nav-col-right > * { pointer-events: auto; } /* Riabilita i click sui bottoni */

            .dropdown-main { left: 0; transform: none; width: 250px; }
            .pubblica-btn { padding: 8px 16px; font-size: 12px; }
          }
        `}</style>

      </header>
    </>
  );
}
