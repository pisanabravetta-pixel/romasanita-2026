import React from 'react';
import Head from 'next/head';

export default function Contatti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma</title>
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

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.7' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        <h1 style={{ fontSize: '42px', color: '#1e3a8a', marginBottom: '15px', fontWeight: '900' }}>Contatti</h1>
        <p style={{ fontSize: '19px', color: '#64748b', marginBottom: '40px' }}>Hai domande o suggerimenti? Il nostro team dedicato a Roma è qui per aiutarti.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          <div style={{ padding: '35px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Supporto Utenti</h3>
            <a href="mailto:info@servizisalute.it" style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb', textDecoration: 'none' }}>info@servizisalute.it</a>
          </div>
          <div style={{ padding: '35px', background: '#eff6ff', borderRadius: '24px', border: '1px solid #dbeafe' }}>
            <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Area Professionisti</h3>
            <p style={{ fontSize: '15px' }}>Assistenza prioritaria per medici e strutture sanitarie.</p>
          </div>
        </div>

        {/* DISCLAIMER SERIO */}
        <section style={{ marginTop: '80px', padding: '30px', backgroundColor: '#fef2f2', borderRadius: '20px', border: '1px solid #fee2e2' }}>
          <h4 style={{ color: '#991b1b', margin: '0 0 10px 0' }}>Disclaimer Legale e Informativo</h4>
          <p style={{ fontSize: '14px', color: '#7f1d1d', lineHeight: '1.6' }}>
            ServiziSalute è un aggregatore di informazioni e annunci sanitari forniti da terzi. Non eroga prestazioni mediche, non garantisce l'accuratezza dei dati inseriti dai professionisti e non si assume alcuna responsabilità per i servizi sanitari ricevuti. Il portale non sostituisce in alcun modo il parere del medico o dei servizi di emergenza nazionali.
          </p>
        </section>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ marginBottom: '15px' }}>© 2026 ServiziSalute Roma</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}>Privacy Policy</a>
          <a href="/chi-siamo" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}>Chi Siamo</a>
        </div>
      </footer>
    </div>
  );
}
