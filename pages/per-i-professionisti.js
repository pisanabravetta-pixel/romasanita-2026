import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute</title>
        <meta name="description" content="Pubblica il tuo profilo professionale su ServiziSalute Roma. Aumenta la tua visibilità nel tuo quartiere e ricevi contatti diretti dai pazienti." />
      </Head>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#1e40af', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
          Porta il tuo studio medico nel cuore del tuo quartiere
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto 30px auto', opacity: '0.9' }}>
          Unisciti al network di ServiziSalute Roma. Fatti trovare da chi cerca uno specialista proprio nella tua zona.
        </p>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#22c55e', color: 'white', padding: '15px 40px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          Pubblica il tuo profilo gratis
        </a>
      </section>

      {/* Vantaggi Section */}
      <main style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📍</div>
            <h3 style={{ color: '#1e3a8a' }}>Visibilità Locale</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Ti posizioniamo nelle ricerche specifiche per il tuo quartiere (es. Prati, EUR, Centro).</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📱</div>
            <h3 style={{ color: '#1e3a8a' }}>Contatto Diretto</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>I pazienti ti chiamano o ti scrivono su WhatsApp senza intermediari o commissioni.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚀</div>
            <h3 style={{ color: '#1e3a8a' }}>Semplice e Veloce</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Crei il tuo annuncio in meno di 2 minuti. Nessuna configurazione complessa richiesta.</p>
          </div>
        </div>

        <section style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Perché scegliere ServiziSalute Roma?</h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '20px' }}>
            A differenza dei grandi portali nazionali dove il tuo profilo si perde tra migliaia di altri, 
            <strong> ServiziSalute focalizza l'attenzione sulla realtà locale di Roma</strong>. 
            Il nostro obiettivo è connettere i professionisti della salute con la comunità locale, valorizzando la prossimità e la fiducia.
          </p>
          <ul style={{ color: '#475569', lineHeight: '2' }}>
            <li>✅ <strong>Nessun costo di iscrizione</strong> per il profilo base</li>
            <li>✅ <strong>Nessuna trattenuta</strong> sulle prestazioni erogate</li>
            <li>✅ <strong>Posizionamento SEO</strong> ottimizzato per i quartieri di Roma</li>
            <li>✅ <strong>Dashboard semplice</strong> per gestire i tuoi contatti</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <h2 style={{ color: '#1e3a8a' }}>Pronto a ricevere nuovi pazienti?</h2>
          <p style={{ marginBottom: '30px', color: '#64748b' }}>Non restare invisibile nelle ricerche locali.</p>
          <a href="/pubblica-annuncio" style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '18px', textDecoration: 'underline' }}>
            Inizia ora: crea il tuo annuncio gratuito
          </a>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px', borderTop: '1px solid #eee' }}>
        © 2026 ServiziSalute Roma - Area Professionisti
      </footer>
    </div>
  );
}
