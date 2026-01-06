import React from 'react';
import Head from 'next/head';
import { VISITE } from '../database';

export default function CardiologiRoma() {
  // Automazione: Filtriamo dal database solo quelli che contengono "cardio" nelle info
  const cardiologi = VISITE.filter(v => v.info.toLowerCase().includes("cardio"));

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Cardiologi a Roma | Prenota Visita Cardiologica</title>
        <meta name="description" content="Trova i migliori cardiologi a Roma. Cerca per quartiere, consulta indirizzi e prenota la tua visita specialistica cardiologica." />
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
          <span style={{ margin: '0 10px', color: '#ccc' }}>/</span>
          <a href="/visite-specialistiche-roma" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px' }}>Tutte le Visite</a>
        </nav>

        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Cardiologi a Roma</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Trova lo specialista in cardiologia più vicino a te tra i quartieri della capitale.</p>

        {/* MENU RAPIDO QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '35px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e3a8a' }}>Cerca per quartiere:</span>
          <a href="/cardiologi-roma-prati" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '6px 15px', borderRadius: '20px', border: '1px solid #dbeafe' }}>Prati</a>
        </div>

        {/* LISTA AUTOMATICA */}
        {cardiologi.length > 0 ? (
          cardiologi.map((c) => (
            <div key={c.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: c.isTop ? '2px solid #2563eb' : '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 'bold', backgroundColor: '#eef2ff', padding: '3px 8px', borderRadius: '4px' }}>
                Zona {c.zona}
              </span>
              <h3 style={{ margin: '10px 0 5px 0', color: '#1e3a8a' }}>{c.nome}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>📍 {c.indirizzo}</p>
              
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
          <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Nessun cardiologo trovato nel database.</p>
        )}

        {/* CTA PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', backgroundColor: '#fff', border: '2px dashed #cbd5e1', borderRadius: '15px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Sei un Cardiologo a Roma?</h3>
          <p style={{ fontSize: '14px', marginBottom: '20px', color: '#64748b' }}>Inserisci il tuo studio nella nostra mappa dei servizi sanitari.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Aggiungi il tuo profilo gratis</a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Area Cardiologia</p>
      </footer>
    </div>
  );
}
