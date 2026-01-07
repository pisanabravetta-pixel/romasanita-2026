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
        <h1 style={{ fontSize: '40px', color: '#1e3a8a', fontWeight: '900' }}>Chi Siamo</h1>
        <div style={{ width: '60px', height: '5px', backgroundColor: '#3b82f6', borderRadius: '10px', marginBottom: '30px' }}></div>
        
        <p style={{ fontSize: '20px', color: '#475569', marginBottom: '35px' }}>
          <strong>ServiziSalute</strong> è il portale indipendente nato per mappare l'eccellenza sanitaria a Roma.
        </p>

        <section style={{ marginBottom: '50px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '20px' }}>
            <h4 style={{ color: '#2563eb' }}>Cittadini</h4>
            <p style={{ fontSize: '14px' }}>Trova assistenza nel tuo quartiere in pochi click.</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '20px' }}>
            <h4 style={{ color: '#2563eb' }}>Professionisti</h4>
            <p style={{ fontSize: '14px' }}>Una vetrina digitale per medici e strutture locali.</p>
          </div>
        </section>

        <div style={{ backgroundColor: '#fff7ed', padding: '30px', borderRadius: '20px', border: '1px solid #ffedd5' }}>
          <h4 style={{ color: '#9a3412', margin: '0 0 10px 0' }}>⚠️ Disclaimer</h4>
          <p style={{ fontSize: '14px', color: '#7c2d12' }}>ServiziSalute è un aggregatore informativo. Per emergenze chiamare il 112.</p>
        </div>
      </main>
    </div>
  );
}
