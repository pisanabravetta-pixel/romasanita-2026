import React from 'react';
import Head from 'next/head';
import { FARMACIE } from '../database';

export default function FarmacieRomaCentro() {
  // Automazione: Filtra le farmacie per la zona "Centro"
  const farmacieCentro = FARMACIE.filter(f => f.zona === "Centro");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie Roma Centro | Orari e Servizi Centro Storico</title>
        <meta name="description" content="Trova le farmacie nel Centro Storico di Roma. Orari, indirizzi e servizi come test rapidi, autoanalisi e consegna a domicilio." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #dcfce7' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#10b981', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', fontSize: '14px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>Home</a>
          <span style={{ color: '#ccc' }}>/</span>
          <a href="/farmacie-roma" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>Tutte le Farmacie</a>
        </nav>

        <h1 style={{ color: '#065f46', fontSize: '32px', marginBottom: '10px' }}>Farmacia Roma Centro</h1>
        <p style={{ color: '#374151', marginBottom: '30px' }}>
          Le farmacie di turno e i presidi sanitari nel cuore del Centro Storico di Roma.
        </p>

        {/* MENU RAPIDO ZONE */}
        <div style={{ backgroundColor: '#fff', padding: '12px 20px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #dcfce7', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#065f46' }}>Altre zone:</span>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Al momento è disponibile la lista per il Centro Storico.</span>
        </div>

        {/* LISTA FARMACIE AUTOMATICA */}
        {farmacieCentro.length > 0 ? (
          farmacieCentro.map((f) => (
            <div key={f.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #dcfce7',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#065f46', fontSize: '20px' }}>{f.nome}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#4b5563' }}>📍 {f.indirizzo} (Roma Centro)</p>
                  <p style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold', marginTop: '10px' }}>✨ {f.info}</p>
                </div>
                <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>APERTA</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="tel:06000000" style={{ flex: 1, textAlign: 'center', backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama ora
                </a>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', border: '1px solid #10b981', color: '#10b981', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #10b981' }}>
            <p style={{ color: '#374151' }}>Nessuna farmacia presente nel database per il Centro Storico.</p>
            <a href="/pubblica-annuncio" style={{ color: '#059669', fontWeight: 'bold', textDecoration: 'none' }}>Sei il titolare? Aggiungila ora gratis</a>
          </div>
        )}

        {/* BOX INFORMATIVO SEO */}
        <section style={{ marginTop: '50px', padding: '25px', background: 'white', borderRadius: '15px', border: '1px solid #dcfce7' }}>
          <h2 style={{ fontSize: '18px', color: '#065f46', marginBottom: '10px' }}>Cerca Farmacie nel Centro di Roma</h2>
          <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>
            Le farmacie nel Centro Storico offrono servizi essenziali per residenti e turisti, inclusi test rapidi per il benessere, misurazione della pressione e consigli farmaceutici specializzati. 
            Controlla sempre gli orari di apertura o chiama direttamente dal pulsante verde.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#064e3b', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Farmacie Centro</p>
      </footer>
    </div>
  );
}
