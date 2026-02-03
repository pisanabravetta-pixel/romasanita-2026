import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contatti() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma</title>
        <meta name="description" content="Contatta il team di ServiziSalute Roma. Siamo qui per rispondere alle tue domande o per assistenza sulla pubblicazione degli annunci." />
      </Head>

      {/* BARRA SUPERIORE COERENTE */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
        ✉️ SUPPORTO E CONTATTI SERVIZISALUTE ROMA
      </div>

      <Navbar />

      {/* NAVIGAZIONE DI RITORNO (BREADCRUMB) */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '14px', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
          <span style={{ color: '#64748b' }}>Contatti</span>
        </div>
      </div>

      <main style={{ flex: '1', maxWidth: '800px', margin: '40px auto', padding: '0 20px', width: '100%' }}>
        
        <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '32px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#0f172a', fontSize: '36px', fontWeight: '900', marginBottom: '15px', letterSpacing: '-1px' }}>Contattaci</h1>
          <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '18px', marginBottom: '40px' }}>
            Hai domande sul funzionamento del portale o hai bisogno di assistenza tecnica? Il team di <strong>ServiziSalute Roma</strong> è a tua completa disposizione per aiutarti.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <div>
              <h3 style={{ color: '#0f172a', fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                <span style={{ fontSize: '20px' }}>📧</span> Email
              </h3>
              <p style={{ color: '#475569', margin: '0' }}>
                <a href="mailto:info@servizisalute.com" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>info@servizisalute.it</a>
              </p>
            </div>
            <div>
              <h3 style={{ color: '#0f172a', fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                <span style={{ fontSize: '20px' }}>📍</span> Sede
              </h3>
              <p style={{ color: '#475569', margin: '0', fontWeight: '500' }}>Roma, Italia</p>
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #f1f5f9', margin: '40px 0' }} />

          {/* BOX CTA PER PROFESSIONISTI AGGIORNATO */}
          <div style={{ backgroundColor: '#eff6ff', padding: '30px', borderRadius: '24px', border: '1px solid #bfdbfe' }}>
            <h4 style={{ color: '#1e40af', margin: '0 0 10px 0', fontSize: '20px', fontWeight: '900' }}>Sei un professionista sanitario?</h4>
            <p style={{ color: '#1e40af', fontSize: '15px', margin: '0 0 20px 0', lineHeight: '1.5', opacity: 0.9 }}>
              Se desideri assistenza per la pubblicazione del tuo annuncio o per modificare i dati del tuo studio, visita la nostra area dedicata ai medici e specialisti.
            </p>
            <a href="/per-i-professionisti" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: '800', textDecoration: 'none', fontSize: '15px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
              Vai all'Area Professionisti →
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500' }}>Tempo di risposta medio: 24 ore lavorative</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
