import React from 'react';
import Head from 'next/head';

export default function Contatti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma - Supporto Utenti e Professionisti</title>
        <meta name="description" content="Contatta il team di ServiziSalute Roma. Siamo a disposizione per supporto tecnico, segnalazioni o informazioni sulla pubblicazione degli annunci sanitari." />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <nav>
             <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Torna alla Home</a>
           </nav>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.7' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <h1 style={{ fontSize: '36px', color: '#1e3a8a', marginBottom: '10px' }}>Contattaci</h1>
        <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>Hai domande, suggerimenti o vuoi segnalare un problema? Il nostro team è a tua disposizione.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* BOX EMAIL */}
          <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>✉️</span> Supporto Diretto
            </h3>
            <p style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Email ufficiale:</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>info@servizisalute.it</p>
            <p style={{ marginTop: '15px', fontSize: '13px', color: '#64748b' }}>
              Rispondiamo solitamente entro 24 ore lavorative.
            </p>
          </div>

          {/* BOX PROFESSIONISTI */}
          <div style={{ padding: '30px', background: '#eff6ff', borderRadius: '20px', border: '1px solid #dbeafe' }}>
            <h3 style={{ color: '#1e40af', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👨‍⚕️</span> Per i Professionisti
            </h3>
            <p style={{ fontSize: '15px', color: '#1e40af' }}>
              Hai bisogno di assistenza per la pubblicazione del tuo annuncio o vuoi richiedere una modifica ai tuoi dati? 
              Specifica nell'oggetto il <strong>Nome della Struttura</strong>.
            </p>
          </div>

        </div>

        {/* FAQ VELOCE */}
        <section style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '20px' }}>Domande Frequenti</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>È possibile modificare un annuncio già pubblicato?</p>
            <p style={{ fontSize: '15px', color: '#475569' }}>Certamente. Inviaci una mail indicando le modifiche e procederemo all'aggiornamento dopo una breve verifica.</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quanto costa pubblicare un profilo?</p>
            <p style={{ fontSize: '15px', color: '#475569' }}>Il servizio base di ServiziSalute Roma è completamente gratuito per tutti i professionisti sanitari della capitale.</p>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px 20px', fontSize: '13px', color: '#94a3b8', borderTop: '1px solid #f1f5f9', marginTop: '60px' }}>
        © 2026 ServiziSalute Roma - Tutti i diritti riservati.
      </footer>
    </div>
  );
}
