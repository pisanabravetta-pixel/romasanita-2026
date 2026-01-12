import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '60px 20px', marginTop: 'auto', width: '100%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        
        <div>
          <h4 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', color: '#3b82f6' }}>ServiziSalute</h4>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
            Il portale di riferimento per la sanità a Roma. Trova i migliori specialisti e centri diagnostici vicini a te.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px' }}>Link Utili</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
            <li><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
            <li><a href="/chi-siamo" style={{ color: '#94a3b8', textDecoration: 'none' }}>Chi Siamo</a></li>
            <li><a href="/pubblica-annuncio" style={{ color: '#94a3b8', textDecoration: 'none' }}>Inserisci Studio</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px' }}>Supporto</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
            <li><a href="/contatti" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contattaci</a></li>
            <li><a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="/cookie" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
          </ul>
        </div>

      </div>
      
      <div style={{ maxWidth: '1100px', margin: '40px auto 0', paddingTop: '20px', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
        © {new Date().getFullYear()} ServiziSalute Roma. Tutti i diritti riservati. P.IVA 12345678901
      </div>
    </footer>
  );
}
