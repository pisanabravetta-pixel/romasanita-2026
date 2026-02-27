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
          
          {/* LOGO E NOME - GRANDEZZA DINAMICA */}
          <a href="/" className="logo-section" style={{ textDecoration: 'none' }}>
  {/* L'icona del battito cardiaco blu */}
  <i className="fas fa-heartbeat" style={{ color: '#2563eb', fontSize: '1.2em' }}></i> 
  
  <span style={{ color: '#065f46' }}>Servizi</span>
  <span style={{ color: '#2563eb' }}>Salute</span>
</a>
          {/* NAVIGAZIONE (MENU + AZIONI) */}
          <nav className="nav-actions">
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

            <div className="user-actions">
              <a href="/login" className="accedi-link">Accedi</a>
              <a href="/pubblica-annuncio" className="pubblica-btn">Pubblica</a>
            </div>
          </nav>
        </div>

<style jsx>{`
  /* CONTENITORE PRINCIPALE PC */
  .nav-container {
    max-width: 1250px;
    margin: 0 auto;
    padding: 15px 20px;
    display: flex;
    flex-direction: row; /* Forza l'allineamento orizzontale */
    align-items: center;
    justify-content: space-between; /* Distribuisce i tre blocchi */
  }

  /* BLOCCO SINISTRA (1/3 dello spazio) */
  .nav-left-menu { 
    flex: 1; 
    display: flex; 
    justify-content: flex-start; 
  }

  /* BLOCCO CENTRO (Prende solo lo spazio del logo) */
  .logo-section { 
    flex: 0 0 auto; 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    font-weight: 900; 
    font-size: 30px; 
    letter-spacing: -1px; 
    text-decoration: none;
    white-space: nowrap;
  }

  /* BLOCCO DESTRA (1/3 dello spazio) */
  .nav-right-actions { 
    flex: 1; 
    display: flex; 
    justify-content: flex-end; 
  }
  
  .menu-trigger { cursor: pointer; color: #475569; font-weight: 700; font-size: 15px; padding: 10px; }
  
  .dropdown-main {
    position: absolute; 
    top: 100%; 
    left: 0; 
    background: white; 
    min-width: 240px; 
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    border-radius: 12px; 
    padding: 10px; 
    border: 1px solid #f1f5f9; 
    z-index: 2000;
  }
  
  .user-actions { display: flex; align-items: center; gap: 20px; }
  .accedi-link { text-decoration: none; color: #475569; font-weight: 700; font-size: 15px; }
  .pubblica-btn { 
    background: #2563eb; 
    color: white; 
    padding: 10px 22px; 
    border-radius: 25px; 
    text-decoration: none; 
    font-weight: 800; 
    font-size: 13px; 
    text-transform: uppercase; 
  }

  /* MOBILE (Sotto i 768px) */
  @media (max-width: 768px) {
    .nav-container { 
      flex-direction: column; /* Qui sì, li mettiamo uno sotto l'altro */
      gap: 15px; 
    }
    .nav-left-menu { order: 2; width: 100%; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 10px; }
    .logo-section { order: 1; font-size: 24px; }
    .nav-right-actions { order: 3; width: 100%; justify-content: center; }
  }
`}</style>
      </header>
    </>
  );
}
