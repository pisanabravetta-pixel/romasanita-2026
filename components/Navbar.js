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

      {/* HEADER - NAVIGAZIONE STILE SUBITO.IT */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #e2e8f0', 
        padding: '12px 0', 
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000 
      }}>
        <div style={{ 
          maxWidth: '1250px', 
          margin: '0 auto', 
          padding: '0 20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          
          {/* 1️⃣ SINISTRA: LOGO (Senza link home come richiesto) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', fontSize: '22px', letterSpacing: '-0.5px' }}>
            <i className="fas fa-heartbeat" style={{ fontSize: '20px', color: '#2563eb' }}></i> 
            <span style={{ color: '#065f46' }}>Servizi</span><span style={{ color: '#2563eb' }}>Salute</span>
          </div>

          {/* 2️⃣ CENTRO: UNICO MENU A TENDINA "MENU ▼" */}
          <div 
            onMouseEnter={() => setMenuAperto(true)}
            onMouseLeave={() => setMenuAperto(false)}
            style={{ position: 'relative' }}
          >
            <div style={{ 
              cursor: 'pointer', 
              color: '#475569', 
              fontWeight: '700', 
              fontSize: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              padding: '10px'
            }}>
              MENU <i className="fas fa-chevron-down" style={{ fontSize: '12px' }}></i>
            </div>
            
            {/* CONTENUTO DEL MENU A TENDINA */}
            <div style={{ 
              display: menuAperto ? 'block' : 'none',
              position: 'absolute', 
              top: '100%', 
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white', 
              minWidth: '240px', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)', 
              borderRadius: '16px', 
              padding: '15px', 
              border: '1px solid #f1f5f9', 
              zIndex: 9999 
            }}>
              {/* SEZIONE CATEGORIE */}
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px', paddingLeft: '10px', textTransform: 'uppercase' }}>Categorie</div>
              <a href="/farmacie-roma" className="menu-link">💊 Farmacie a Roma</a>
              <a href="/dentisti-roma" className="menu-link">🦷 Dentisti a Roma</a>
              <a href="/diagnostica-roma" className="menu-link">🔬 Diagnostica a Roma</a>
              <a href="/visite-specialistiche-roma" className="menu-link">👨‍⚕️ Visite Specialistiche</a>
              <a href="/servizi-domicilio-roma" className="menu-link">🏠 Servizi a Domicilio</a>

              <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '10px 0' }}></div>

              {/* SEZIONE QUARTIERI */}
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px', paddingLeft: '10px', textTransform: 'uppercase' }}>Quartieri</div>
              <a href="/roma/prati" className="menu-link">📍 Roma Prati</a>
              <a href="/roma/eur" className="menu-link">📍 Roma EUR</a>
              <a href="/roma/trastevere" className="menu-link">📍 Roma Trastevere</a>
              <a href="/quartieri-roma" className="menu-link" style={{ fontWeight: '800', color: '#2563eb' }}>Tutti i quartieri</a>

              <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '10px 0' }}></div>

              {/* SEZIONE INFO */}
              <a href="/guide" className="menu-link">📘 Guide Sanitarie</a>
              <a href="/chi-siamo" className="menu-link">ℹ️ Chi Siamo</a>
            </div>
          </div>

          {/* 3️⃣ DESTRA: ACCEDI + PUBBLICA ANNUNCIO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="/login" style={{ 
              textDecoration: 'none', 
              color: '#475569', 
              fontWeight: '700', 
              fontSize: '14px' 
            }}>
              Accedi
            </a>

            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '24px', 
              textDecoration: 'none', 
              fontWeight: '800', 
              fontSize: '13px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              transition: 'transform 0.2s'
            }}>
              Pubblica annuncio
            </a>
          </div>
        </div>

        {/* STILI PER HOVER E MOBILE */}
        <style jsx>{`
          .menu-link {
            display: block;
            padding: 8px 12px;
            text-decoration: none;
            color: #475569;
            font-size: 13px;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.2s;
          }
          .menu-link:hover {
            background-color: #f8fafc;
            color: #2563eb;
            padding-left: 15px;
          }
          
          /* OTTIMIZZAZIONE MOBILE */
          @media (max-width: 768px) {
            header { padding: 8px 0; }
            span { display: none; } /* Nasconde "ServiziSalute" per far spazio */
            .menu-link { padding: 12px; font-size: 14px; }
            a[href="/pubblica-annuncio"] { 
              padding: 8px 14px; 
              font-size: 11px; 
            }
          }
        `}</style>
      </header>
    </>
  );
}
