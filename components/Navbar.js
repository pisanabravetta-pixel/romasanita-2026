import React, { useState } from 'react';

export default function Navbar() {
  const [menuAperto, setMenuAperto] = useState(false);

  return (
    <>
      {/* 1. BARRA VERDE (Quella che era sparita) */}
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

      {/* 2. HEADER BIANCO */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #e2e8f0', 
        padding: '15px 0', 
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000 
      }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* LOGO */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', textDecoration: 'none', fontSize: '24px' }}>
            <i className="fas fa-heartbeat" style={{ fontSize: '22px', color: '#2563eb' }}></i> 
            <span style={{ color: '#065f46' }}>Servizi</span><span style={{ color: '#2563eb' }}>Salute</span>
          </a>

          {/* MENU CENTRALE */}
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            
            <div 
              onMouseEnter={() => setMenuAperto(true)}
              onMouseLeave={() => setMenuAperto(false)}
              style={{ position: 'relative' }}
            >
              <div style={{ cursor: 'pointer', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>
                Categorie <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
              </div>
              
              <div style={{ 
                display: menuAperto ? 'block' : 'none',
                position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', minWidth: '180px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '10px', border: '1px solid #f1f5f9', zIndex: 9999 
              }}>
                <a href="/farmacie-roma" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#475569', fontSize: '13px', fontWeight: '600' }}>💊 Farmacie</a>
                <a href="/dentisti-roma" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#475569', fontSize: '13px', fontWeight: '600' }}>🦷 Dentisti</a>
                <a href="/diagnostica-roma" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#475569', fontSize: '13px', fontWeight: '600' }}>🔬 Diagnostica</a>
                <a href="/visite-specialistiche-roma" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#475569', fontSize: '13px', fontWeight: '600' }}>👨‍⚕️ Specialisti</a>
              </div>
            </div>

            <a href="/servizi-sanitari-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>Servizi</a>
            <a href="/quartieri-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>Quartieri</a>

            {/* BOTTONE BLU */}
            <a href="/per-i-professionisti" style={{ 
              backgroundColor: '#2563eb', color: 'white', padding: '10px 18px', borderRadius: '10px', 
              textDecoration: 'none', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' 
            }}>
              Area Medici
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
