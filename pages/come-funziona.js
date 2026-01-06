import React from 'react';
import Head from 'next/head';

export default function ComeFunziona() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Come Funziona ServiziSalute | Visibilità per Medici a Roma</title>
        <meta name="description" content="Scopri come pubblicare il tuo annuncio sanitario su ServiziSalute Roma. Tre semplici passi per trovare nuovi pazienti nel tuo quartiere nel 2026." />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/pubblica-annuncio" style={{ fontSize: '13px', backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>Inizia Ora</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/per-i-professionisti" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Torna all'Area Professionisti
          </a>
        </nav>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', color: '#1e3a8a', marginBottom: '15px', fontWeight: '900', letterSpacing: '-1px' }}>
            Semplice. Diretto. Romano.
          </h1>
          <p style={{ fontSize: '19px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Abbiamo rimosso ogni complicazione tecnica. Ecco come portiamo il tuo studio sotto gli occhi dei pazienti.
          </p>
        </div>

        {/* STEP A GRIGLIA DESIGN AGGIORNATO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginTop: '40px' }}>
          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.4)' }}>1</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '12px', marginTop: '10px', fontSize: '20px' }}>Configurazione</h3>
            <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
              Compila il form con i dettagli del tuo studio: specializzazioni, zona (es. Prati, EUR) e il tuo contatto WhatsApp diretto.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.4)' }}>2</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '12px', marginTop: '10px', fontSize: '20px' }}>Validazione</h3>
            <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
              Il nostro team analizza la richiesta per assicurarsi che i dati siano corretti e la struttura sia idonea agli standard del portale.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.4)' }}>3</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '12px', marginTop: '10px', fontSize: '20px' }}>Pubblicazione</h3>
            <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
              Il tuo profilo va online. Diventi visibile sulla mappa e nelle ricerche organiche per categoria e quartiere.
            </p>
          </div>
        </div>

        {/* VALORE AGGIUNTO */}
        <section style={{ marginTop: '80px', padding: '40px', backgroundColor: '#f0fdf4', borderRadius: '32px', border: '1px solid #dcfce7' }}>
          <h3 style={{ color: '#166534', marginBottom: '25px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💎</span> Cosa ci rende diversi
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <h4 style={{ color: '#166534', fontSize: '16px', marginBottom: '8px' }}>Sanità di Prossimità</h4>
              <p style={{ fontSize: '14px', color: '#14532d', margin: 0 }}>Non ci interessa il traffico generico. Portiamo nel tuo studio pazienti che abitano o lavorano a pochi metri da te.</p>
            </div>
            <div>
              <h4 style={{ color: '#166534', fontSize: '16px', marginBottom: '8px' }}>Nessuna Commissione</h4>
              <p style={{ fontSize: '14px', color: '#14532d', margin: 0 }}>A differenza delle grandi piattaforme di prenotazione, non tratteniamo percentuali e non gestiamo i tuoi pagamenti.</p>
            </div>
          </div>
        </section>

        {/* CTA BOX */}
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '60px 40px', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', borderRadius: '32px', color: 'white', boxShadow: '0 20px 25px -5px rgba(30, 58, 138, 0.2)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: '800' }}>Non restare invisibile.</h2>
          <p style={{ marginBottom: '40px', fontSize: '18px', opacity: 0.9 }}>Mentre leggi, decine di persone a Roma cercano un professionista come te.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', background: '#22c55e', color: 'white', padding: '18px 45px', borderRadius: '15px', textDecoration: 'none', fontWeight: '800', fontSize: '18px', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.4)' }}>
            Pubblica Ora il tuo Profilo
          </a>
          <p style={{ marginTop: '20px', fontSize: '13px', opacity: 0.6 }}>Tempo stimato: 120 secondi.</p>
        </div>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', textAlign: 'center', marginTop: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '14px', margin: 0, opacity: 0.6 }}>© 2026 ServiziSalute Roma – Il Tuo Partner per la Crescita Digitale</p>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px' }}>
            <a href="/chi-siamo" style={{ color: '#94a3b8', textDecoration: 'none' }}>Chi Siamo</a>
            <a href="/contatti" style={{ color: '#94a3b8', textDecoration: 'none' }}>Assistenza</a>
            <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
