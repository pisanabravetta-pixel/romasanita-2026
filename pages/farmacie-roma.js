import React from 'react';
import Head from 'next/head';
import { FARMACIE } from '../database';

export default function FarmacieRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie a Roma | Orari, Turni e Servizi per Quartiere</title>
        <meta name="description" content="Trova la farmacia più vicina a te a Roma. Cerca per quartiere, consulta i servizi offerti e trova i contatti delle farmacie nel Centro, EUR, Prati e altre zone." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #dcfce7' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#10b981', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#16a34a', fontWeight: 'bold', fontSize: '14px' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#166534', fontSize: '32px', marginBottom: '10px' }}>Farmacie a Roma</h1>
        <p style={{ marginBottom: '25px', color: '#4b5563' }}>Trova le farmacie e i presidi sanitari nel tuo quartiere.</p>
        
        {/* MENU SELEZIONE ZONA */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '35px', border: '1px solid #dcfce7', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#166534', width: '100%', marginBottom: '5px' }}>Seleziona Zona:</span>
          <a href="/farmacie-roma-centro" style={{ color: '#16a34a', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold', backgroundColor: '#f0fdf4', padding: '6px 15px', borderRadius: '20px', border: '1px solid #dcfce7' }}>
            Roma Centro
          </a>
        </div>

        {/* LISTA AUTOMATICA */}
        {FARMACIE.length > 0 ? (
          FARMACIE.map((f) => (
            <div key={f.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: f.isTop ? '2px solid #10b981' : '1px solid #dcfce7',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <span style={{ fontSize: '11px', color: '#059669', textTransform: 'uppercase', fontWeight: 'bold', backgroundColor: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                Quartiere: {f.zona}
              </span>
              <h3 style={{ margin: '10px 0 5px 0', color: '#166534', fontSize: '20px' }}>{f.nome}</h3>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: '0' }}>📍 {f.indirizzo}</p>
              <p style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold', marginTop: '10px' }}>💊 {f.info}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="tel:06000000" style={{ flex: 1, textAlign: 'center', backgroundColor: '#10b981', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama
                </a>
                <a href={f.slug} style={{ flex: 1, textAlign: 'center', border: '1px solid #dcfce7', color: '#166534', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Vedi Dettagli
                </a>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Caricamento farmacie...</p>
        )}

        {/* SEZIONE PER PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', backgroundColor: '#fff', border: '2px dashed #10b981', borderRadius: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#166534' }}>Sei il titolare di una Farmacia?</h3>
          <p style={{ fontSize: '15px', marginBottom: '25px', color: '#4b5563' }}>Pubblica i tuoi servizi, orari e turni sulla nostra mappa di Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '12px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Aggiungi farmacia gratis</a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#064e3b', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Portale Farmacie</p>
      </footer>
    </div>
  );
}
