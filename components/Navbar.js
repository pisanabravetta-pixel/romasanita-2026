import React from 'react';

export default function Navbar() {
  return (
    <header style={{ 
      backgroundColor: 'white', 
      borderBottom: '2px solid #e2e8f0', 
      padding: '15px 0', 
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000 
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO - BICOLORE COME NELLA HOME */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', textDecoration: 'none', fontSize: '24px', letterSpacing: '-0.5px' }}>
  <i className="fas fa-heartbeat" style={{ fontSize: '22px', color: '#2563eb' }}></i> 
  <span style={{ color: '#065f46' }}>Servizi</span><span style={{ color: '#2563eb' }}>Salute</span>
</a>

        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
<div 
  <div 
  className="nav-item-dropdown" 
  onMouseEnter={(e) => e.currentTarget.querySelector('.dropdown-menu').style.display = 'block'}
  onMouseLeave={(e) => e.currentTarget.querySelector('.dropdown-menu').style.display = 'none'}
  style={{ position: 'relative', paddingBottom: '15px', marginBottom: '-15px' }} // <--- IL PONTE INVISIBILE
>
  <div style={{ cursor: 'pointer', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
    Categorie <i className="fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
  </div>
  
  <div className="dropdown-menu" style={{ 
    display: 'none',
    position: 'absolute', 
    top: '100%', // Ora si attacca perfettamente grazie al padding sopra
    left: 0, 
    backgroundColor: 'white', 
    minWidth: '180px', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    padding: '10px', 
    marginTop: '0px', // Azzerato perché il ponte copre lo spazio
    border: '1px solid #f1f5f9', 
    zIndex: 9999 
  }}>
    {[
      { label: 'Farmacie', emoji: '💊', href: '/farmacie-roma' },
      { label: 'Dentisti', emoji: '🦷', href: '/dentisti-roma' },
      { label: 'Diagnostica', emoji: '🔬', href: '/diagnostica-roma' },
      { label: 'Specialisti', emoji: '👨‍⚕️', href: '/visite-specialistiche-roma' },
      { label: 'Domicilio', emoji: '🏠', href: '/servizi-domicilio-roma' }
    ].map((item, idx) => (
      <a 
        key={idx}
        href={item.href} 
        style={{ 
          display: 'block', 
          padding: '10px', 
          textDecoration: 'none', 
          color: '#475569', 
          fontSize: '13px', 
          fontWeight: '600',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = '#2563eb'; }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#475569'; }}
      >
        {item.emoji} {item.label}
      </a>
    ))}
  </div>
</div>
          {/* 1. LINK ALLA PAGINA HUB */}
          <a href="/servizi-sanitari-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>
            Tutti i Servizi
          </a>
{/* LINK QUARTIERI */}
          <a href="/quartieri-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>
            Quartieri
          </a>
          {/* 2. CHI SIAMO */}
          <a href="/chi-siamo" style={{ textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>
            Chi Siamo
          </a>

          {/* 3. TASTO AREA MEDICI - AGGIORNATO AL BLU */}
          <a href="/per-i-professionisti" style={{ 
            backgroundColor: '#2563eb', // <--- CAMBIATO IN BLU
            color: 'white', 
            padding: '10px 18px', 
            borderRadius: '10px', 
            textDecoration: 'none', 
            fontWeight: '800', 
            fontSize: '13px',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)', // <--- Ombra blu coordinata
            textTransform: 'uppercase'
          }}>
            Area Medici
          </a>
        </nav>
        
      </div>
    </header>
  );
}
