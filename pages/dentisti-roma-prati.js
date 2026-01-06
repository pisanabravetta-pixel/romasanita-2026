import React from 'react';
import Head from 'next/head';
import { DENTISTI } from '../database';

export default function DentistiRomaPrati() {
  // Automazione: filtra i dentisti con zona "Prati"
  const dentistiZona = DENTISTI.filter(s => s.zona === "Prati");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Dentista Roma Prati | Studi Odontoiatrici</title>
        <meta name="description" content="Trova i migliori studi odontoiatrici a Roma Prati. Contatti diretti, indirizzi e servizi sanitari nel quartiere Prati." />
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
          <a href="/dentisti-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Tutti i Dentisti Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '10px' }}>Dentista a Roma Prati</h1>
        <p style={{ color: '#666', marginBottom: '25px' }}>Elenco dei dentisti e studi dentistici situati nel quartiere Prati.</p>

        {/* LINK INCROCIATI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Altre zone:</span>
          <a href="/dentisti-roma-eur" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>EUR</a>
          <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>San Giovanni</a>
        </div>

        {/* LISTA ANNUNCI */}
        {dentistiZona.length > 0 ? (
          dentistiZona.map((s) => (
            <div key={s.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>{s.nome}</h3>
              <p style={{ margin: '5px 0' }}>📍 {s.indirizzo} (Prati)</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                  WhatsApp
                </a>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Chiama
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '30px', textAlign: 'center', background: 'white', borderRadius: '10px', border: '1px dashed #ccc' }}>
            <p>Nessun dentista trovato per questa zona.</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '30px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Prati</p>
      </footer>
    </div>
  );
}
