import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ComeFunziona() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Come Funziona ServiziSalute | Visibilità per Medici a Roma</title>
        <meta name="description" content="Scopri come pubblicare il tuo annuncio sanitario su ServiziSalute Roma. Tre semplici passi per trovare nuovi pazienti nel tuo quartiere nel 2026." />
      </Head>

      {/* BARRA SUPERIORE COERENTE */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
        🚀 GUIDA PER I PROFESSIONISTI SANITARI — EDIZIONE 2026
      </div>

      <Navbar />

      {/* NAVIGAZIONE DI RITORNO */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', fontSize: '14px', fontWeight: '600' }}>
          <a href="/per-i-professionisti" style={{ color: '#2563eb', textDecoration: 'none' }}>Area Professionisti</a>
          <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
          <span style={{ color: '#64748b' }}>Come Funziona</span>
        </div>
      </div>

      <main style={{ flex: '1', maxWidth: '900px', margin: '40px auto', padding: '0 20px', width: '100%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', color: '#0f172a', marginBottom: '15px', fontWeight: '900', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
            Semplice. Diretto. <span style={{ color: '#2563eb' }}>Romano.</span>
          </h1>
          <p style={{ fontSize: '19px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Abbiamo rimosso ogni complicazione tecnica. Ecco come portiamo il tuo studio sotto gli occhi dei pazienti del tuo quartiere.
          </p>
        </div>

        {/* STEP A GRIGLIA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', marginTop: '40px' }}>
          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '25px', backgroundColor: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>1</div>
            <h3 style={{ color: '#0f172a', marginBottom: '12px', marginTop: '10px', fontSize: '20px', fontWeight: '800' }}>Configurazione</h3>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              Compila il form con i dettagli del tuo studio: specializzazioni, zona (es. Prati, EUR) e il tuo contatto WhatsApp diretto.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '25px', backgroundColor: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>2</div>
            <h3 style={{ color: '#0f172a', marginBottom: '12px', marginTop: '10px', fontSize: '20px', fontWeight: '800' }}>Validazione</h3>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              Il nostro team analizza la richiesta per assicurarsi che i dati siano corretti e la struttura rispetti gli standard di qualità del portale.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '25px', backgroundColor: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>3</div>
            <h3 style={{ color: '#0f172a', marginBottom: '12px', marginTop: '10px', fontSize: '20px', fontWeight: '800' }}>Pubblicazione</h3>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
              Il tuo profilo va online. Diventi visibile sulla mappa e nelle ricerche organiche per categoria e quartiere a Roma.
            </p>
          </div>
        </div>

        {/* VALORE AGGIUNTO */}
        <section style={{ marginTop: '80px', padding: '40px', backgroundColor: '#f0fdf4', borderRadius: '32px', border: '1px solid #dcfce7' }}>
          <h3 style={{ color: '#166534', marginBottom: '25px', fontSize: '24px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💎</span> Perché scegliere ServiziSalute Roma
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div>
              <h4 style={{ color: '#166534', fontSize: '17px', marginBottom: '8px', fontWeight: '800' }}>Pazienti di Prossimità</h4>
              <p style={{ fontSize: '15px', color: '#14532d', margin: 0, lineHeight: '1.5' }}>Portiamo nel tuo studio pazienti che abitano o lavorano a pochi metri da te, aumentando la fedeltà nel tempo.</p>
            </div>
            <div>
              <h4 style={{ color: '#166534', fontSize: '17px', marginBottom: '8px', fontWeight: '800' }}>Nessuna Intermediazione</h4>
              <p style={{ fontSize: '15px', color: '#14532d', margin: 0, lineHeight: '1.5' }}>Non tratteniamo commissioni e non gestiamo i tuoi pagamenti. Il rapporto tra te e il paziente resta privato e diretto.</p>
            </div>
          </div>
        </section>

        {/* CTA BOX */}
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '60px 40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', color: 'white', boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: '900' }}>Non restare invisibile.</h2>
          <p style={{ marginBottom: '40px', fontSize: '18px', opacity: 0.9 }}>Mentre leggi, decine di romani stanno cercando uno specialista nella tua zona.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', background: '#10b981', color: 'white', padding: '18px 45px', borderRadius: '15px', textDecoration: 'none', fontWeight: '900', fontSize: '18px', transition: 'transform 0.2s' }}>
            PUBBLICA IL TUO PROFILO
          </a>
          <p style={{ marginTop: '20px', fontSize: '13px', opacity: 0.6, fontWeight: '600' }}>ISCRIZIONE GRATUITA — TEMPO STIMATO: 2 MINUTI</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
