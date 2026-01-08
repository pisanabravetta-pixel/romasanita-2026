import React from 'react';
import Head from 'next/head';

export default function Contatti() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma</title>
        <meta name="description" content="Contatta il team di ServiziSalute Roma. Siamo qui per rispondere alle tue domande o per assistenza sulla pubblicazione degli annunci." />
      </Head>

      {/* Header Semplice */}
      <header style={{ background: 'white', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <a href="/" style={{ fontWeight: '800', color: '#3b82f6', textDecoration: 'none' }}>ServiziSalute Roma</a>
        </div>
      </header>

      {/* Contenuto Principale */}
      <main style={{ flex: '1', maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#1e40af', fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>Contattaci</h1>
          <p style={{ color: '#64748b', marginBottom: '40px' }}>
            Hai bisogno di assistenza o vuoi maggiori informazioni sul nostro portale? Il team di <strong>ServiziSalute Roma</strong> è a tua disposizione.
          </p>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '18px', marginBottom: '5px' }}>📧 Email</h3>
            <p style={{ color: '#475569', margin: '0' }}>
              <a href="mailto:info@servizisalute.it" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>info@servizisalute.it</a>
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '18px', marginBottom: '5px' }}>📍 Sede</h3>
            <p style={{ color: '#475569', margin: '0' }}>Roma, Italia</p>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '40px 0' }} />

          <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '12px' }}>
            <h4 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Sei un professionista?</h4>
            <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 15px 0' }}>
              Per supporto sulla pubblicazione o modifica del tuo profilo medico.
            </p>
            <a href="/per-i-professionisti" style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Area Professionisti →</a>
          </div>
        </div>
      </main>

      {/* FOOTER ISTITUZIONALE */}
      <footer style={{ background: '#1e293b', color: '#f1f5f9', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>ServiziSalute Roma</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', fontSize: '14px', flexWrap: 'wrap' }}>
            <a href="/chi-siamo" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Chi Siamo</a>
            <a href="/privacy-policy" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/cookie-policy" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Cookie Policy</a>
            <a href="/disclaimer" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Disclaimer Legale</a>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>
            © 2026 ServiziSalute Roma. Tutti i diritti riservati. <br />
            Il portale non eroga prestazioni mediche ma facilita il contatto con i professionisti.
          </p>
        </div>
      </footer>
    </div>
  );
}
