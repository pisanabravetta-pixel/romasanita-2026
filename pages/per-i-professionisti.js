import React from 'react';
import Head from 'next/head';

// Navbar inline per evitare conflitti con altri file
const SimpleNavbar = () => (
  <nav style={{ backgroundColor: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <a href="/" style={{ fontSize: '20px', fontWeight: '800', color: '#065f46', textDecoration: 'none' }}>ServiziSalute</a>
    <div style={{ display: 'flex', gap: '20px' }}>
      <a href="/servizi-sanitari-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Servizi</a>
      <a href="/pubblica-annuncio" style={{ textDecoration: 'none', color: '#10b981', fontWeight: '700' }}>Pubblica</a>
    </div>
  </nav>
);

export default function PerIProfessionistiRoma() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Per i Professionisti | ServiziSalute Roma</title>
      </Head>
      
      <div style={{ backgroundColor: '#065f46', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
        🚀 AREA PROFESSIONISTI ROMA — GENNAIO 2026
      </div>

      <SimpleNavbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ margin: '10px 0', fontSize: '13px', color: '#64748b' }}>
          <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a> > Professionisti
        </div>

        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #10b981', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>
            Sei un Medico o Specialista a Roma?
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600' }}>
            Ricevi contatti <span style={{ color: '#10b981' }}>Gratis</span> dal tuo quartiere
          </p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#065f46', marginBottom: '15px' }}>Perché iscriverti:</h2>
          <p>● <strong>Visibilità mirata</strong> nei quartieri di Roma.<br/>
             ● <strong>Nessun intermediario</strong>: il paziente chiama te.<br/>
             ● <strong>Nessuna commissione</strong> sulle tue prestazioni.</p>
        </div>

        <div style={{ backgroundColor: '#0f172a', padding: '35px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ marginBottom: '10px' }}>Pubblica il tuo annuncio ora</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '15px 30px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI GRATIS</a>
        </div>

        <div style={{ paddingBottom: '40px' }}>
          <h3>FAQ Professionisti</h3>
          <p><strong>1. Quanto costa?</strong> È gratis.<br/>
             <strong>2. Posso modificare l'annuncio?</strong> Sì, in ogni momento.<br/>
             <strong>3. Come ricevo i pazienti?</strong> Via WhatsApp o Telefono direttamente.</p>
        </div>

      </main>

      {/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 20px 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div><h4 style={{ color: '#63b3ed' }}>ServiziSalute</h4><p style={{ fontSize: '14px', color: '#a0aec0' }}>Il portale sanitario di Roma.</p></div>
          <div>
            <h4>Per gli utenti</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
              <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica</a></li>
            </ul>
          </div>
          <div>
            <h4>Per i professionisti</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
              <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none' }}>Pubblica annuncio</a></li>
            </ul>
          </div>
          <div>
            <h4>Legale</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
              <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
