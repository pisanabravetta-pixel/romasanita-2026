import React from 'react';
import Head from 'next/head';
import { DENTISTI } from '../database';

export default function DentistiRomaEur() {
  // Filtriamo solo i dentisti dell'EUR dal database
  const dentistiZona = DENTISTI.filter(s => s.zona === "Eur");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Dentista Roma EUR | Migliori Studi Odontoiatrici EUR</title>
        <meta name="description" content="Cerchi un dentista a Roma EUR? Trova i migliori studi odontoiatrici per pulizia denti, carie e impianti nella zona EUR." />
      </Head>

      {/* HEADER MINIMALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
           <a href="/" style={{ fontWeight: '800', color: '#0070f3', textDecoration: 'none' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#666' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/dentisti-roma" style={{ textDecoration: 'none', color: '#2563eb', fontSize: '14px' }}>← Tutti i Dentisti Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Dentista a Roma EUR</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Elenco aggiornato dei professionisti sanitari nel quartiere EUR.</p>

        {/* NAVIGAZIONE ZONE */}
        <div style={{ backgroundColor: '#fff', padding: '12px 20px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b' }}>Altre zone popolari:</span>
          <a href="/dentisti-roma-prati" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none' }}>Prati</a>
          <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none' }}>San Giovanni</a>
          <a href="/dentisti-roma" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none' }}>Centro</a>
        </div>

        {/* LISTA ANNUNCI DAL DATABASE */}
        {dentistiZona.length > 0 ? (
          dentistiZona.map((s) => (
            <div key={s.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '20px' }}>{s.nome}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>📍 {s.indirizzo} (EUR)</p>
                </div>
                <span style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>VERIFICATO</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '15px', border: '1px dashed #ccc' }}>
            <p>Nessun dentista ancora registrato in questa zona.</p>
            <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold' }}>Sei un dentista all'EUR? Registrati gratis</a>
          </div>
        )}

        {/* SEZIONE SEO FAQ - IL TRUCCO PER GOOGLE */}
        <section style={{ marginTop: '60px', padding: '30px', background: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '20px' }}>Informazioni utili sui Dentisti all'EUR</h2>
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>Quanto costa una pulizia denti a Roma EUR?</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>In zona EUR il prezzo medio per una pulizia professionale varia tra i 70€ e i 100€.</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>Ci sono dentisti aperti il sabato all'EUR?</h4>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Sì, molti studi odontoiatrici in zona EUR ricevono su appuntamento anche il sabato mattina.</p>
          </div>
        </section>
      </main>

      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 20px', marginTop: '60px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Quartiere EUR</p>
      </footer>
    </div>
  );
}
