import React from 'react';
import Head from 'next/head';

export default function Contatti() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma</title>
        <meta name="description" content="Contatta il team di ServiziSalute Roma. Siamo qui per rispondere alle tue domande o per assistenza sulla pubblicazione degli annunci." />
      </Head>

      {/* HEADER COERENTE */}
      <div style={{ backgroundColor: '#3182ce', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        ✉️ SUPPORTO E CONTATTI SERVIZISALUTE
      </div>

      <main style={{ flex: '1', maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#3182ce', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#2d3748', fontSize: '36px', fontWeight: '800', marginBottom: '15px' }}>Contattaci</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.8', fontSize: '18px', marginBottom: '40px' }}>
            Hai domande sul funzionamento del portale o hai bisogno di assistenza tecnica? Il team di <strong>ServiziSalute Roma</strong> è a tua completa disposizione.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <div>
              <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📧</span> Email
              </h3>
              <p style={{ color: '#4a5568', margin: '0' }}>
                <a href="mailto:info@servizisalute.it" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>info@servizisalute.it</a>
              </p>
            </div>
            <div>
              <h3 style={{ color: '#2d3748', fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span> Sede
              </h3>
              <p style={{ color: '#4a5568', margin: '0' }}>Roma, Italia</p>
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '40px 0' }} />

          <div style={{ backgroundColor: '#ebf8ff', padding: '30px', borderRadius: '20px', border: '1px solid #bee3f8' }}>
            <h4 style={{ color: '#2c5282', margin: '0 0 10px 0', fontSize: '20px' }}>Sei un professionista sanitario?</h4>
            <p style={{ color: '#2a4365', fontSize: '16px', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Se desideri assistenza per la pubblicazione del tuo annuncio o per modificare i dati del tuo studio, visita la nostra area dedicata.
            </p>
            <a href="/per-i-professionisti" style={{ display: 'inline-block', backgroundColor: '#3182ce', color: 'white', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
              Vai all'Area Professionisti →
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER IDENTICO ALLA HOME (Ufficiale 2026) */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
