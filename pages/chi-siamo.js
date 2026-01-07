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
        
        <p style={{ fontSize: '20px', color: '#475569', marginBottom: '35px' }}>
          <strong>ServiziSalute</strong> è il portale indipendente nato per mappare l'eccellenza sanitaria a <strong>Roma</strong>.
        </p>

        <section style={{ marginBottom: '50px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '24px' }}>La nostra visione</h3>
          <p>La nostra missione è abbattere la distanza tra medico e paziente, centralizzando i dati in un'unica piattaforma gratuita.</p>
        </section>

        <div style={{ backgroundColor: '#fff7ed', padding: '30px', borderRadius: '20px', border: '1px solid #ffedd5' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#7c2d12' }}>
            <strong>Nota:</strong> ServiziSalute è un aggregatore informativo. In caso di emergenza contattare il 112.
          </p>
        </div>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <p>© 2026 ServiziSalute Roma</p>
      </footer>
    </div>
  );
}
