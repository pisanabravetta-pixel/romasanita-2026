import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', width: '100%', flexShrink: 0 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
            <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
              ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
              <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica annuncio</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
          © 2026 ServiziSalute – Tutti i diritti riservati
        </div>
      </div>
    </footer>
  );
}
