import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Visibilità Online per Medici e Professionisti Sanitari Roma | ServiziSalute</title>
        <meta name="description" content="Aumenta la visibilità del tuo studio medico a Roma. Scopri come trovare nuovi pazienti e pubblicizzare la tua attività sanitaria gratuitamente nel 2026." />
      </Head>

      {/* HEADER COERENTE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <nav style={{ display: 'flex', gap: '20px' }}>
             <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
             <a href="/pubblica-annuncio" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>Inizia Ora</a>
           </nav>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        
        {/* SEZIONE HERO STRATEGICA */}
        <section style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ backgroundColor: '#dbeafe', color: '#2563eb', padding: '5px 15px', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Edizione 2026
          </span>
          <h1 style={{ fontSize: '46px', color: '#1e3a8a', marginTop: '20px', marginBottom: '25px', lineHeight: '1.1', fontWeight: '900' }}>
            Fai crescere il tuo studio medico a Roma
          </h1>
          <p style={{ fontSize: '21px', color: '#64748b', maxWidth: '750px', margin: '0 auto', lineHeight: '1.5' }}>
            Non servono grandi budget pubblicitari. Ti serve essere presente dove i pazienti del tuo quartiere stanno cercando oggi stesso.
          </p>
        </section>

        {/* I VANTAGGI COMPETITIVI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div style={{ padding: '35px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', transition: '0.3s' }}>
            <div style={{ fontSize: '45px', marginBottom: '20px' }}>📍</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '12px', fontSize: '20px' }}>Local SEO Dominance</h3>
            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6' }}>Ottimizziamo il tuo profilo per le ricerche locali: EUR, Prati, Parioli o Roma Sud. I pazienti ti trovano per vicinanza.</p>
          </div>
          
          <div style={{ padding: '35px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '45px', marginBottom: '20px' }}>💬</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '12px', fontSize: '20px' }}>Contatto WhatsApp</h3>
            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6' }}>Abbatti le barriere. Ricevi richieste dirette sul tuo numero, facilitando la prenotazione rapida senza intermediari.</p>
          </div>
          
          <div style={{ padding: '35px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '45px', marginBottom: '20px' }}>🛡️</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '12px', fontSize: '20px' }}>Autorevolezza</h3>
            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6' }}>Essere presenti in un network sanitario dedicato aumenta la percezione di fiducia e professionalità della tua struttura.</p>
          </div>
        </div>

        {/* SCHEMA DI FUNZIONAMENTO */}
        <section style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', color: '#1e3a8a', marginBottom: '40px' }}>Come funziona il network?</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            {[
              { s: '1', t: 'Ti registri', d: 'Inserisci i tuoi dati' },
              { s: '2', t: 'Validiamo', d: 'Verifichiamo il profilo' },
              { s: '3', t: 'Sei Online', d: 'Ricevi nuovi pazienti' }
            ].map((step, idx) => (
              <div key={idx} style={{ flex: '1', minWidth: '200px', padding: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontWeight: 'bold' }}>{step.s}</div>
                <h4 style={{ color: '#1e3a8a', margin: '0 0 5px 0' }}>{step.t}</h4>
                <p style={{ fontSize: '14px', color: '#64748b' }}>{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GUIDA STRATEGICA SEO */}
        <section style={{ background: '#f0f9ff', padding: '45px', borderRadius: '32px', border: '1px solid #bae6fd', marginBottom: '80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '24px', color: '#0369a1', marginBottom: '20px' }}>Perché la visibilità del tuo studio dipende dai dati</h2>
            <p style={{ fontSize: '16px', color: '#0c4a6e', lineHeight: '1.8' }}>
              Nel 2026, Google premia le strutture che offrono <strong>informazioni strutturate</strong>: orari aggiornati, servizi specifici e geolocalizzazione precisa. 
              Registrandoti su <strong>ServiziSalute</strong>, crei un segnale di rilevanza locale che aiuta il tuo studio a comparire nelle prime posizioni quando qualcuno cerca un professionista nel tuo quartiere di Roma.
            </p>
          </div>
        </section>

        {/* CTA FINALE IMPATTANTE */}
        <div style={{ textAlign: 'center', padding: '70px 40px', background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', borderRadius: '32px', color: 'white', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3)' }}>
          <h2 style={{ fontSize: '36px', margin: '0 0 20px 0', fontWeight: '800' }}>Inizia oggi stesso</h2>
          <p style={{ marginBottom: '40px', fontSize: '19px', opacity: '0.9', maxWidth: '600px', margin: '0 auto 40px' }}>
            Bastano 2 minuti per creare la tua scheda professionale e iniziare a ricevere contatti diretti dai pazienti di Roma.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: 'white', color: '#2563eb', padding: '18px 50px', borderRadius: '15px', textDecoration: 'none', fontWeight: '800', fontSize: '18px', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            PUBBLICA IL TUO STUDIO GRATIS
          </a>
          <p style={{ marginTop: '20px', fontSize: '13px', opacity: '0.7' }}>Nessun costo nascosto. Nessun impegno.</p>
        </div>

      </main>

      {/* FOOTER PROFESSIONALE */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '80px 0 40px', marginTop: '100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px' }}>
            <div>
              <h4 style={{ color: '#3b82f6', marginBottom: '25px', fontSize: '18px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Il network nato per connettere la salute e il territorio a Roma.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '25px', fontSize: '18px' }}>Navigazione</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.8' }}>
                <li><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Mappa Servizi</a></li>
                <li><a href="/contatti" style={{ color: '#94a3b8', textDecoration: 'none' }}>Supporto</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '25px', fontSize: '18px' }}>Area Professionale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.8' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold' }}>Aggiungi il tuo Studio</a></li>
                <li><a href="/guida-seo-medici" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog per Professionisti</a></li>
                <li><a href="/termini" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '80px', borderTop: '1px solid #1e293b', paddingTop: '30px', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
            © 2026 ServiziSalute Roma – Network Indipendente di Professionisti della Salute
          </div>
        </div>
      </footer>
    </div>
  );
}
