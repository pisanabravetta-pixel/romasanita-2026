import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute</title>
        <meta name="description" content="Pubblica il tuo profilo professionale su ServiziSalute Roma. Aumenta la tua visibilità nel tuo quartiere e ricevi contatti diretti dai pazienti." />
      </Head>

      {/* 🟦 HERO SECTION - Impatto immediato */}
      <section style={{ backgroundColor: '#1e40af', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Porta il tuo studio medico nel cuore del tuo quartiere
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '750px', margin: '0 auto 40px auto', opacity: '0.9', lineHeight: '1.6' }}>
          Unisciti al network di <strong>ServiziSalute Roma</strong>. Fatti trovare dai pazienti che cercano uno specialista esattamente nella tua zona.
        </p>
        <a href="/pubblica-annuncio" style={{ 
          backgroundColor: '#22c55e', color: 'white', padding: '18px 45px', borderRadius: '15px', 
          textDecoration: 'none', fontWeight: 'bold', fontSize: '19px', display: 'inline-block', 
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)', transition: 'transform 0.2s' 
        }}>
          Inizia Ora: Pubblica Profilo Gratis
        </a>
      </section>

      <main style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
        
        {/* 🛠️ VANTAGGI - Grid layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '45px', marginBottom: '15px' }}>📍</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Visibilità Locale</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>Ti posizioniamo nelle ricerche specifiche per il tuo quartiere (es. Prati, EUR, Centro) per darti pazienti vicini.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '45px', marginBottom: '15px' }}>📱</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Contatto Diretto</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>I pazienti ti contattano direttamente su WhatsApp o telefono. Nessun intermediario, nessuna commissione.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '45px', marginBottom: '15px' }}>🚀</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Semplice e Veloce</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>Crei il tuo profilo in 2 minuti. Gestisci i tuoi servizi e le promozioni in totale autonomia.</p>
          </div>
        </div>

        {/* 💡 SEZIONE DETTAGLIO */}
        <section style={{ backgroundColor: '#f8fafc', padding: '50px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: '25px', fontSize: '28px' }}>Perché scegliere ServiziSalute Roma?</h2>
          <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '25px', fontSize: '17px' }}>
            Mentre i grandi portali nazionali disperdono il tuo profilo, 
            <strong> ServiziSalute valorizza la tua presenza locale</strong>. 
            Siamo l'unico portale dedicato esclusivamente alla città di Roma, progettato per chi crede nel valore della medicina di prossimità.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <ul style={{ color: '#475569', lineHeight: '2.2', listStyle: 'none', padding: 0 }}>
              <li>✅ <strong>Profilo Base Gratis</strong> per sempre</li>
              <li>✅ <strong>Zero commissioni</strong> sulle visite</li>
              <li>✅ <strong>Badge "Vicino Metro"</strong> incluso</li>
            </ul>
            <ul style={{ color: '#475569', lineHeight: '2.2', listStyle: 'none', padding: 0 }}>
              <li>✅ <strong>SEO Quartieri</strong> di Roma</li>
              <li>✅ <strong>Supporto WhatsApp</strong> dedicato</li>
              <li>✅ <strong>Promozioni</strong> attivabili subito</li>
            </ul>
          </div>
        </section>

        {/* 📢 CALL TO ACTION FINALE */}
        <div style={{ textAlign: 'center', marginTop: '80px', paddingBottom: '40px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '10px' }}>Pronto a ricevere nuovi pazienti?</h2>
          <p style={{ marginBottom: '35px', color: '#64748b', fontSize: '18px' }}>Non restare invisibile nelle ricerche locali dei tuoi futuri pazienti.</p>
          <a href="/pubblica-annuncio" style={{ 
            color: '#2563eb', fontWeight: 'bold', fontSize: '20px', textDecoration: 'none',
            border: '2px solid #2563eb', padding: '15px 35px', borderRadius: '12px'
          }}>
            Crea il tuo profilo gratuito →
          </a>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px', borderTop: '1px solid #f1f5f9' }}>
        © 2026 <strong>ServiziSalute Roma</strong> - Il network dei professionisti della salute locale.
      </footer>
    </div>
  );
}
