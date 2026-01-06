import React from 'react';
import Head from 'next/head';
import { DIAGNOSTICA } from '../database';

export default function DiagnosticaRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Centri Diagnostici a Roma | Esami, Ecografie e Analisi</title>
        <meta name="description" content="Mappa dei migliori centri diagnostici a Roma. Trova laboratori per analisi del sangue, risonanze magnetiche, ecografie e radiografie nella tua zona." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#0070f3', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Diagnostica a Roma</h1>
        <p style={{ marginBottom: '25px', color: '#64748b' }}>Centri specializzati in ecografie, radiografie, risonanze e analisi cliniche nella Capitale.</p>
        
        {/* NAVIGAZIONE QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '35px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e3a8a' }}>Filtra per zona:</span>
          <a href="/diagnostica-roma-nord" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '6px 15px', borderRadius: '20px', border: '1px solid #dbeafe' }}>Roma Nord</a>
        </div>

        {/* LISTA CENTRI DAL DATABASE */}
        {DIAGNOSTICA.length > 0 ? (
          DIAGNOSTICA.map((d) => (
            <div key={d.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: d.isTop ? '2px solid #2563eb' : '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 'bold', backgroundColor: '#eef2ff', padding: '3px 8px', borderRadius: '4px' }}>
                {d.zona}
              </span>
              <h3 style={{ margin: '10px 0 5px 0', color: '#1e3a8a', fontSize: '20px' }}>{d.nome}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>📍 {d.indirizzo}</p>
              <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: '500', marginTop: '10px' }}>🔬 {d.info}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama
                </a>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Nessun centro diagnostico trovato nel database.</p>
        )}

        {/* CTA PER I PROPRIETARI DI CENTRI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', backgroundColor: '#fff', border: '2px dashed #cbd5e1', borderRadius: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Gestisci un Centro Diagnostico?</h3>
          <p style={{ fontSize: '15px', marginBottom: '25px', color: '#64748b' }}>Unisciti al network di ServiziSalute Roma e raggiungi nuovi pazienti ogni giorno.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Aggiungi centro gratuitamente</a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Diagnostica e Analisi</p>
      </footer>
    </div>
  );
}
