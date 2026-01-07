import React from 'react';
import Head from 'next/head';

export default function Contatti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma</title>
      </Head>

      {/* HEADER */}
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

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '42px', color: '#1e3a8a', fontWeight: '900' }}>Contatti</h1>
        <p style={{ fontSize: '19px', color: '#64748b' }}>Siamo qui per aiutarti. Scrivici per assistenza o informazioni.</p>
        
        <div style={{ marginTop: '40px', padding: '30px', background: '#eff6ff', borderRadius: '24px', border: '1px solid #dbeafe' }}>
          <h3 style={{ color: '#1e40af' }}>Email Supporto</h3>
          <a href="mailto:info@servizisalute.it" style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb', textDecoration: 'none' }}>
            info@servizisalute.it
          </a>
        </div>
      </main>
    </div>
  );
}
