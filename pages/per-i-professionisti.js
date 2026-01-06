import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Visibilità Online per Medici e Professionisti Sanitari Roma | ServiziSalute</title>
        <meta name="description" content="Aumenta la visibilità del tuo studio medico a Roma. Scopri come trovare nuovi pazienti e pubblicizzare la tua attività sanitaria gratuitamente." />
      </Head>

      {/* HEADER COERENTE CON IL RESTO DEL SITO */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        
        {/* SEZIONE HERO */}
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', color: '#1e3a8a', marginBottom: '20px', lineHeight: '1.2' }}>
            Come trovare nuovi pazienti a Roma nel 2026
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
            Unisciti al network di <strong>ServiziSalute</strong>. Ti diamo visibilità locale dove i pazienti cercano davvero: nel tuo quartiere.
          </p>
        </section>

        {/* I 3 VANTAGGI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '70px' }}>
          <div style={{ padding: '30px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📍</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Posizionamento Locale</h3>
            <p style={{ fontSize: '15px', color: '#4b5563' }}>Compari nelle ricerche specifiche per il tuo quartiere (Prati, EUR, Roma Nord, ecc.) migliorando la tua Local SEO.</p>
          </div>
          
          <div style={{ padding: '30px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚀</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Zero Costi Pubblicitari</h3>
            <p style={{ fontSize: '15px', color: '#4b5563' }}>Nessun abbonamento forzato. La pubblicazione dell'annuncio base su ServiziSalute è e rimarrà gratuita.</p>
          </div>
          
          <div style={{ padding: '30px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📈</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Target Qualificato</h3>
            <p style={{ fontSize: '15px', color: '#4b5563' }}>Connettiti con persone che cercano attivamente assistenza medica immediata o specialistica vicino casa.</p>
          </div>
        </div>

        {/* GUIDA STRATEGICA */}
        <section style={{ background: '#eff6ff', padding: '40px', borderRadius: '20px', border: '1px solid #dbeafe', marginBottom: '70px' }}>
          <h2 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '15px' }}>Perché la visibilità del tuo studio dipende dai dati</h2>
          <p style={{ fontSize: '16px', color: '#1e40af', lineHeight: '1.7' }}>
            Google premia le strutture che offrono informazioni strutturate: orari aggiornati, servizi specifici e geolocalizzazione precisa. 
            Registrandoti su <strong>ServiziSalute</strong>, crei un "backlink" autorevole e un segnale di rilevanza locale che aiuta il tuo studio a scalare le classifiche di ricerca a Roma.
          </p>
        </section>

        {/* CALL TO ACTION FINALE */}
        <div style={{ textAlign: 'center', padding: '60px 40px', background: '#2563eb', borderRadius: '24px', color: 'white', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)' }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 15px 0' }}>Ricevi subito nuovi contatti</h2>
          <p style={{ marginBottom: '35px', fontSize: '18px', opacity: '0.9' }}>La registrazione è rapida e non richiede carta di credito.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: 'white', color: '#2563eb', padding: '16px 45px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display: 'inline-block', transition: '0.3s' }}>
            Pubblica Annuncio Gratis
          </a>
        </div>

      </main>

      {/* FOOTER PROFESSIONALE (Lo stesso della Mappa Servizi) */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 0 30px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#3b82f6', marginBottom: '20px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>Il portale di riferimento per la sanità locale.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Link</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Mappa Servizi</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold' }}>Aggiungi Studio</a></li>
                <li><a href="/contatti" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contatti</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '60px', borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Portale per la Sanità Professionale
          </div>
        </div>
      </footer>
    </div>
  );
}
