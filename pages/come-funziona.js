import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';

export default function ComeFunziona() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1a202c', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>Come Funziona ServiziSalute | Visibilità per Medici a Roma</title>
        <meta name="description" content="Scopri come pubblicare il tuo annuncio sanitario su ServiziSalute Roma. Tre semplici passi per trovare nuovi pazienti nel tuo quartiere nel 2026." />
      </Head>

      {/* HEADER COERENTE */}
      <div style={{ backgroundColor: '#3182ce', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🚀 GUIDA PER I PROFESSIONISTI SANITARI
      </div>

      <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/per-i-professionisti" style={{ textDecoration: 'none', color: '#3182ce', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Torna all'Area Professionisti
          </a>
        </nav>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', color: '#2c5282', marginBottom: '15px', fontWeight: '900', letterSpacing: '-1px' }}>
            Semplice. Diretto. Romano.
          </h1>
          <p style={{ fontSize: '19px', color: '#4a5568', maxWidth: '600px', margin: '0 auto' }}>
            Abbiamo rimosso ogni complicazione tecnica. Ecco come portiamo il tuo studio sotto gli occhi dei pazienti.
          </p>
        </div>

        {/* STEP A GRIGLIA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginTop: '40px' }}>
          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#3182ce', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 10px rgba(49, 130, 206, 0.4)' }}>1</div>
            <h3 style={{ color: '#2c5282', marginBottom: '12px', marginTop: '10px', fontSize: '20px' }}>Configurazione</h3>
            <p style={{ fontSize: '15px', color: '#4a5568', margin: 0 }}>
              Compila il form con i dettagli del tuo studio: specializzazioni, zona (es. Prati, EUR) e il tuo contatto WhatsApp diretto.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#3182ce', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 10px rgba(49, 130, 206, 0.4)' }}>2</div>
            <h3 style={{ color: '#2c5282', marginBottom: '12px', marginTop: '10px', fontSize: '20px' }}>Validazione</h3>
            <p style={{ fontSize: '15px', color: '#4a5568', margin: 0 }}>
              Il nostro team analizza la richiesta per assicurarsi che i dati siano corretti e la struttura sia idonea agli standard del portale.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', backgroundColor: '#3182ce', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 10px rgba(49, 130, 206, 0.4)' }}>3</div>
            <h3 style={{ color: '#2c5282', marginBottom: '12px', marginTop: '10px', fontSize: '20px' }}>Pubblicazione</h3>
            <p style={{ fontSize: '15px', color: '#4a5568', margin: 0 }}>
              Il tuo profilo va online. Diventi visibile sulla mappa e nelle ricerche organiche per categoria e quartiere.
            </p>
          </div>
        </div>

        {/* VALORE AGGIUNTO */}
        <section style={{ marginTop: '80px', padding: '40px', backgroundColor: '#f0fdf4', borderRadius: '32px', border: '1px solid #dcfce7' }}>
          <h3 style={{ color: '#166534', marginBottom: '25px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💎</span> Cosa ci rende diversi
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div>
              <h4 style={{ color: '#166534', fontSize: '16px', marginBottom: '8px', fontWeight: 'bold' }}>Sanità di Prossimità</h4>
              <p style={{ fontSize: '14px', color: '#14532d', margin: 0 }}>Non ci interessa il traffico generico. Portiamo nel tuo studio pazienti che abitano o lavorano a pochi metri da te.</p>
            </div>
            <div>
              <h4 style={{ color: '#166534', fontSize: '16px', marginBottom: '8px', fontWeight: 'bold' }}>Nessuna Commissione</h4>
              <p style={{ fontSize: '14px', color: '#14532d', margin: 0 }}>A differenza delle grandi piattaforme, non tratteniamo percentuali e non gestiamo i tuoi pagamenti. Il rapporto è diretto.</p>
            </div>
          </div>
        </section>

        {/* CTA BOX */}
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '60px 40px', background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)', borderRadius: '32px', color: 'white', boxShadow: '0 20px 25px -5px rgba(44, 82, 130, 0.2)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: '800' }}>Non restare invisibile.</h2>
          <p style={{ marginBottom: '40px', fontSize: '18px', opacity: 0.9 }}>Mentre leggi, decine di persone a Roma cercano un professionista come te.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', background: '#48bb78', color: 'white', padding: '18px 45px', borderRadius: '15px', textDecoration: 'none', fontWeight: '800', fontSize: '18px', boxShadow: '0 10px 15px -3px rgba(72, 187, 120, 0.4)' }}>
            Pubblica Ora il tuo Profilo
          </a>
          <p style={{ marginTop: '20px', fontSize: '13px', opacity: 0.6 }}>Tempo stimato: 120 secondi.</p>
        </div>
      </main>

     <Footer />
    </div>
  );
}
