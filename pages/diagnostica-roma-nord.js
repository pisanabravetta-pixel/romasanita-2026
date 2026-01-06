import React from 'react';
import Head from 'next/head';
import { DIAGNOSTICA } from '../database';

export default function DiagnosticaRomaNord() {
  // Automazione: Filtra i centri per la zona "Roma Nord"
  const centriNord = DIAGNOSTICA.filter(d => d.zona === "Roma Nord");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Diagnostica Roma Nord | Centri Eccellenza e Laboratori</title>
        <meta name="description" content="Trova i migliori centri di diagnostica e laboratori di analisi a Roma Nord. Prenota esami del sangue, radiografie ed ecografie vicino a te." />
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
          <a href="/diagnostica-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna a Diagnostica Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Diagnostica a Roma Nord</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>
          Centri diagnostici, laboratori di analisi e cliniche specializzate nei quartieri di Roma Nord.
        </p>

        {/* LISTA RISULTATI AUTOMATIZZATA */}
        {centriNord.length > 0 ? (
          centriNord.map((d) => (
            <div key={d.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '20px' }}>{d.nome}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>📍 {d.indirizzo} (Roma Nord)</p>
                  <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: 'bold', marginTop: '10px' }}>🔬 {d.info}</p>
                </div>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>CONVENZIONATO</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Prenota Esame
                </a>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Centro
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessun centro diagnostico a Roma Nord attualmente nel database.</p>
            <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Sei un titolare di un centro? Aggiungilo gratis</a>
          </div>
        )}

        {/* INFO EXTRA PER SEO */}
        <section style={{ marginTop: '50px', padding: '25px', backgroundColor: '#fff', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Esami frequenti a Roma Nord</h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
            I centri presenti nel quadrante nord di Roma (Parioli, Corso Francia, Cassia) offrono servizi rapidi per esami del sangue, RM, TC e analisi cliniche con tempi di attesa ridotti grazie alla presenza di numerose strutture private e convenzionate.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Diagnostica Nord</p>
      </footer>
    </div>
  );
}
