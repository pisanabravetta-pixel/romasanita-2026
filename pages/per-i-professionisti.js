import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute</title>
        <meta name="description" content="Pubblica il tuo profilo professionale su ServiziSalute Roma. Aumenta la tua visibilità nel tuo quartiere e ricevi contatti diretti dai pazienti." />
      </Head>

      {/* 🧭 SCHEMA BREADCRUMB (SEO) */}
      <Script id="breadcrumb-professionisti" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Per i Professionisti", "item": "https://www.servizisalute.it/per-i-professionisti" }
          ]
        })
      }} />

      {/* 🟦 HERO SECTION - Layout Premium */}
      <section style={{ backgroundColor: '#1e40af', color: 'white', padding: '100px 20px', textAlign: 'center', backgroundImage: 'radial-gradient(circle at top right, #1e3a8a, #1e40af)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Porta il tuo studio online a Roma
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '20px 0', lineHeight: '1.1' }}>
            Fatti trovare dai pazienti del tuo quartiere
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: '0.9', lineHeight: '1.6' }}>
            Unisciti al network di <strong>ServiziSalute Roma</strong>. L'unica piattaforma dedicata esclusivamente alla medicina di prossimità nella Capitale.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#22c55e', color: 'white', padding: '18px 45px', borderRadius: '15px', 
              textDecoration: 'none', fontWeight: 'bold', fontSize: '19px', display: 'inline-block', 
              boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.4)'
            }}>
              Pubblica Profilo Gratis
            </a>
            <a href="#come-funziona" style={{ 
              backgroundColor: 'transparent', color: 'white', padding: '18px 45px', borderRadius: '15px', 
              textDecoration: 'none', fontWeight: 'bold', fontSize: '19px', display: 'inline-block', 
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              Scopri di più
            </a>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 20px' }}>
        
        {/* 🛠️ VANTAGGI CHIAVE */}
        <div id="come-funziona" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '100px' }}>
          {[
            { icon: '📍', title: 'Visibilità di Quartiere', desc: 'Ti posizioniamo per ricerche specifiche come "Dentista Prati" o "Fisioterapista EUR" per darti contatti realmente raggiungibili.' },
            { icon: '📱', title: 'Zero Intermediari', desc: 'I pazienti cliccano e ti chiamano. Non tratteniamo commissioni sulle visite e non gestiamo la tua agenda: il rapporto è diretto.' },
            { icon: '🚀', title: 'SEO Localizzata', desc: 'Sfrutta la forza del nostro portale per apparire su Google quando qualcuno cerca assistenza sanitaria nella tua zona di Roma.' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '30px', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>{item.icon}</div>
              <h3 style={{ color: '#1e3a8a', fontSize: '20px', marginBottom: '15px' }}>{item.title}</h3>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 💡 SEZIONE DETTAGLIO - L'ESCLUSIVA ROMANA */}
        <section style={{ backgroundColor: '#eff6ff', padding: '60px', borderRadius: '40px', border: '1px solid #dbeafe', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '15px' }}>Perché scegliere ServiziSalute Roma?</h2>
            <p style={{ color: '#475569', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
              Valorizziamo la tua presenza sul territorio romano, combattendo la dispersione dei grandi portali nazionali.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '20px' }}>
            {[
              'Profilo Base Sempre Gratuito',
              'Caricamento in 2 minuti',
              'Badge "Vicino Metro" automatico',
              'Nessuna carta di credito richiesta',
              'Supporto dedicato via WhatsApp',
              'Promozioni stagionali attivabili'
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e40af', fontWeight: '600', fontSize: '15px' }}>
                <span style={{ color: '#22c55e', fontSize: '20px' }}>✓</span> {text}
              </div>
            ))}
          </div>
        </section>

        {/* ❓ FAQ RAPIDE */}
        <section style={{ marginTop: '100px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', textAlign: 'center', marginBottom: '40px' }}>Domande Frequenti</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              { q: 'È davvero gratuito?', a: 'Sì, l\'inserimento base su ServiziSalute Roma è gratuito. Potrai essere trovato dai pazienti senza alcun costo fisso o commissione.' },
              { q: 'Come ricevo le prenotazioni?', a: 'I pazienti ti contattano direttamente tramite i pulsanti "Chiama" o "WhatsApp" presenti sulla tua scheda. Sei tu a gestire la tua agenda.' },
              { q: 'Posso modificare il mio profilo?', a: 'Certamente. Potrai aggiornare orari, descrizione e servizi in qualsiasi momento contattando il nostro supporto.' }
            ].map((faq, i) => (
              <div key={i} style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
                <h4 style={{ color: '#1e3a8a', marginBottom: '10px' }}>{faq.q}</h4>
                <p style={{ color: '#64748b', fontSize: '15px' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 📢 CALL TO ACTION FINALE */}
        <div style={{ textAlign: 'center', marginTop: '100px', padding: '60px 20px', backgroundColor: '#1e40af', borderRadius: '40px', color: 'white' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Pronto a ricevere nuovi pazienti?</h2>
          <p style={{ marginBottom: '40px', opacity: '0.9', fontSize: '18px' }}>Unisciti oggi a centinaia di professionisti che hanno già scelto la prossimità.</p>
          <a href="/pubblica-annuncio" style={{ 
            backgroundColor: 'white', color: '#1e40af', fontWeight: 'bold', fontSize: '20px', textDecoration: 'none',
            padding: '20px 45px', borderRadius: '15px', display: 'inline-block'
          }}>
            Inizia Ora Gratis →
          </a>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontSize: '14px', borderTop: '1px solid #f1f5f9' }}>
        <p>© 2026 <strong>ServiziSalute Roma</strong> - Il network dell'eccellenza sanitaria locale.</p>
        <p style={{ marginTop: '10px' }}>
          <a href="/termini" style={{ color: '#94a3b8', marginRight: '15px' }}>Termini e Condizioni</a>
          <a href="/privacy" style={{ color: '#94a3b8' }}>Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}
