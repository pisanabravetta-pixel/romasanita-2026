import React from 'react';
import Head from 'next/head';
import { DOMICILIO } from '../database';

export default function ServiziDomicilioRomaSud() {
  // Automazione: Filtra i servizi per la zona "Roma Sud"
  const serviziSud = DOMICILIO.filter(s => s.zona === "Roma Sud");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdf2f2', minHeight: '100vh' }}>
      <Head>
        <title>Servizi a Domicilio Roma Sud | Assistenza Sanitaria Casa</title>
        <meta name="description" content="Hai bisogno di assistenza medica a casa a Roma Sud? Trova infermieri, fisioterapisti e medici per visite a domicilio in zona EUR, Garbatella e Ostiense." />
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
          <a href="/servizi-domicilio-roma" style={{ textDecoration: 'none', color: '#dc2626', fontWeight: 'bold', fontSize: '14px' }}>← Torna a Domicilio Roma</a>
        </nav>

        <h1 style={{ color: '#991b1b', fontSize: '32px', marginBottom: '10px' }}>Assistenza a Domicilio Roma Sud</h1>
        <p style={{ color: '#4b5563', marginBottom: '30px' }}>Infermieri, fisioterapisti e medici specialisti disponibili per interventi rapidi a Roma Sud.</p>

        {/* LISTA RISULTATI AUTOMATIZZATA */}
        {serviziSud.length > 0 ? (
          serviziSud.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #fee2e2',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#991b1b', fontSize: '20px' }}>{s.nome}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#4b5563' }}>📍 Zona operativa: {s.zona}</p>
                  <p style={{ fontSize: '14px', color: '#dc2626', fontWeight: 'bold', marginTop: '10px' }}>🩺 {s.info}</p>
                </div>
                <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>H24 / DISPONIBILE</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', backgroundColor: '#dc2626', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Subito
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #dc2626' }}>
            <p style={{ color: '#4b5563' }}>Nessun servizio a domicilio per Roma Sud nel database.</p>
            <a href="/pubblica-annuncio" style={{ color: '#dc2626', fontWeight: 'bold', textDecoration: 'none' }}>Sei un professionista? Iscriviti gratis</a>
          </div>
        )}

        {/* SEO INFO BOX */}
        <section style={{ marginTop: '50px', padding: '25px', backgroundColor: '#fff', borderRadius: '15px', border: '1px solid #fee2e2' }}>
          <h2 style={{ fontSize: '20px', color: '#991b1b', marginBottom: '15px' }}>Come funziona l'assistenza a casa?</h2>
          <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>
            I servizi a domicilio a Roma Sud coprono aree come EUR, Ardeatina, Laurentina e Magliana. 
            Contattando direttamente i professionisti, potrai richiedere prelievi, medicazioni, fisioterapia o visite specialistiche senza spostarti da casa.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#7f1d1d', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Assistenza Domiciliare Sud</p>
      </footer>
    </div>
  );
}
