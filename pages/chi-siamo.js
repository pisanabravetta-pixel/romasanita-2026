import React from 'react';
import Head from 'next/head';

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Chi Siamo | ServiziSalute Roma</title>
      </Head>

      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
            <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
              <a href="/login" style={{ fontSize: '13px', color: '#333', textDecoration: 'none', fontWeight: '500' }}>Accedi</a>
              <a href="/pubblica-annuncio" style={{ fontSize: '12px', background: '#2563eb', color: 'white', padding: '8px 18px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica annuncio</a>
            </nav>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <h1 style={{ fontSize: '40px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '900' }}>Chi Siamo</h1>
        <div style={{ width: '60px', height: '5px', backgroundColor: '#3b82f6', borderRadius: '10px', marginBottom: '30px' }}></div>
        
        <p style={{ fontSize: '20px', color: '#475569', marginBottom: '35px' }}>
          <strong>ServiziSalute</strong> è il portale nato per mappare la capillarità dei servizi medici nella città di <strong>Roma</strong>.
        </p>

        <section style={{ marginBottom: '50px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '15px' }}>La nostra visione</h3>
          <p>Centralizzare i dati di studi medici, farmacie e centri diagnostici in un'unica piattaforma gratuita, geolocalizzata e intuitiva per abbattere la distanza tra medico e paziente.</p>
        </section>

        {/* DISCLAIMER SERIO */}
        <div style={{ backgroundColor: '#fff7ed', padding: '30px', borderRadius: '20px', border: '1px solid #ffedd5', marginTop: '60px' }}>
          <h4 style={{ color: '#9a3412', margin: '0 0 10px 0' }}>Disclaimer Legale</h4>
          <p style={{ fontSize: '14px', color: '#7c2d12', lineHeight: '1.6' }}>
            ServiziSalute è un aggregatore informativo di annunci. Non costituisce una struttura sanitaria, non eroga direttamente prestazioni mediche e non si assume responsabilità sulla qualità o veridicità delle prestazioni fornite dai terzi inserzionisti. In caso di emergenza sanitaria, fare affidamento esclusivamente sui canali ufficiali del Servizio Sanitario Nazionale.
          </p>
        </div>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', textAlign: 'center', marginTop: '100px' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#3b82f6' }}>ServiziSalute Roma</p>
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '25px', marginTop: '20px' }}>
          <a href="/privacy" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'none', margin: '0 15px' }}>Privacy Policy</a>
          <a href="/contatti" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'none', margin: '0 15px' }}>Contatti</a>
        </div>
      </footer>
    </div>
  );
}
