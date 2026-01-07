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
        <h1 style={{ fontSize: '42px', color: '#1e3a8a', marginBottom: '15px', fontWeight: '900' }}>Contatti</h1>
        <p style={{ fontSize: '19px', color: '#64748b', marginBottom: '40px' }}>Hai domande? Il nostro team a Roma è qui per aiutarti.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          <div style={{ padding: '35px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '32px', marginBottom: '20px' }}>✉️</div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Supporto Utenti</h3>
            <a href="mailto:info@servizisalute.it" style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb', textDecoration: 'none' }}>info@servizisalute.it</a>
          </div>

          <div style={{ padding: '35px', background: '#eff6ff', borderRadius: '24px', border: '1px solid #dbeafe' }}>
            <div style={{ fontSize: '32px', marginBottom: '20px' }}>👨‍⚕️</div>
            <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Area Professionisti</h3>
            <p style={{ fontSize: '14px', color: '#1e40af' }}>Gestione prioritaria per i medici iscritti al portale.</p>
          </div>
        </div>

        <section style={{ marginTop: '60px', padding: '40px', backgroundColor: '#f8fafc', borderRadius: '32px' }}>
          <h2 style={{ fontSize: '26px', color: '#1e3a8a', marginBottom: '30px' }}>Domande Frequenti</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p><strong>Il servizio è gratuito?</strong> Sì, per i cittadini e per la pubblicazione base.</p>
            <p><strong>Come modifico un annuncio?</strong> Inviaci una mail con i dati aggiornati.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
