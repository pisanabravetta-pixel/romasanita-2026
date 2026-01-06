import React from 'react';
import Head from 'next/head';
import { DOMICILIO } from '../database';

export default function ServiziDomicilioRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdf2f2', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari a Domicilio Roma | Infermieri e Visite a Casa</title>
        <meta name="description" content="Trova assistenza sanitaria a domicilio a Roma. Infermieri, fisioterapisti e medici specialisti disponibili per visite e cure presso la tua abitazione." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #fee2e2' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#dc2626', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#dc2626', fontWeight: 'bold', fontSize: '14px' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#991b1b', fontSize: '32px', marginBottom: '10px' }}>Servizi a Domicilio a Roma</h1>
        <p style={{ marginBottom: '25px', color: '#4b5563' }}>Assistenza infermieristica, fisioterapia e visite mediche direttamente a casa tua.</p>
        
        {/* NAVIGAZIONE QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '35px', border: '1px solid #fee2e2', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#991b1b' }}>Filtra per zona:</span>
          <a href="/servizi-domicilio-roma-sud" style={{ color: '#dc2626', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold', backgroundColor: '#fef2f2', padding: '6px 15px', borderRadius: '20px', border: '1px solid #fee2e2' }}>
            Roma Sud
          </a>
        </div>

        {/* LISTA AUTOMATICA SERVIZI */}
        {DOMICILIO.length > 0 ? (
          DOMICILIO.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: s.isTop ? '2px solid #dc2626' : '1px solid #fee2e2',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <span style={{ fontSize: '11px', color: '#b91c1c', textTransform: 'uppercase', fontWeight: 'bold', backgroundColor: '#fef2f2', padding: '3px 8px', borderRadius: '4px' }}>
                Copertura: {s.zona}
              </span>
              <h3 style={{ margin: '10px 0 5px 0', color: '#991b1b', fontSize: '20px' }}>{s.nome}</h3>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: '0' }}>📍 {s.indirizzo}</p>
              <p style={{ fontSize: '14px', color: '#dc2626', fontWeight: '500', marginTop: '10px' }}>🩺 {s.info}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', backgroundColor: '#dc2626', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama ora
                </a>
                <a href={s.slug} style={{ flex: 1, textAlign: 'center', border: '1px solid #fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Dettagli
                </a>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Ricerca servizi a domicilio...</p>
        )}

        {/* CTA PER PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', backgroundColor: '#fff', border: '2px dashed #dc2626', borderRadius: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#991b1b' }}>Offri servizi sanitari a domicilio?</h3>
          <p style={{ fontSize: '15px', marginBottom: '25px', color: '#4b5563' }}>Raggiungi i pazienti della tua zona iscrivendoti al nostro portale.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Pubblica il tuo servizio gratis</a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#7f1d1d', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Assistenza Domiciliare</p>
      </footer>
    </div>
  );
}
