import React from 'react';
import Head from 'next/head';

export default function CookiePolicy() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <Head>
        <title>Informativa sui Cookie | ServiziSalute Roma</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: '#334155' }}>
        <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
          ← Torna alla Home
        </a>
        
        <header style={{ marginTop: '40px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '900' }}>Informativa sui Cookie</h1>
          <p style={{ color: '#64748b' }}>Ultimo aggiornamento: 6 Gennaio 2026</p>
        </header>

        <section style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <p style={{ marginBottom: '25px' }}>
            Per rendere la tua esperienza di navigazione su <strong>ServiziSalute Roma</strong> più efficiente e sicura, utilizziamo i cookie. Questa informativa spiega cosa sono, come li utilizziamo e come puoi gestirli.
          </p>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>1. Cosa sono i cookie?</h3>
          <p>
            I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo browser, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. Ci aiutano a ricordare le tue preferenze di ricerca o a mantenere attiva la tua sessione.
          </p>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>2. Tipologie di cookie utilizzate</h3>
          <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
              <p><strong>🔹 Cookie Tecnici (Necessari)</strong></p>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Essenziali per la navigazione, per il caricamento delle mappe e per l'invio dei moduli di pubblicazione annunci.</p>
            </div>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
              <p><strong>🔹 Cookie Analitici (Statistici)</strong></p>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Utilizzati per capire come gli utenti interagiscono con il sito (pagine più visitate, tempi di permanenza) in forma totalmente anonima.</p>
            </div>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
              <p><strong>🔹 Cookie di Terze Parti</strong></p>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Potrebbero essere impostati da servizi esterni integrati, come le mappe di Google o i pulsanti di condivisione social.</p>
            </div>
          </div>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>3. Gestione e Disabilitazione</h3>
          <p>
            Puoi decidere in ogni momento di bloccare i cookie tramite le impostazioni del tuo browser (Chrome, Safari, Firefox, Edge). 
            Tuttavia, ti informiamo che la disattivazione dei cookie tecnici potrebbe impedirti di visualizzare correttamente la mappa degli studi medici o di pubblicare il tuo annuncio.
          </p>

          <div style={{ marginTop: '40px', padding: '25px', backgroundColor: '#eff6ff', borderRadius: '20px', border: '1px solid #dbeafe' }}>
            <p style={{ fontSize: '15px', color: '#1e40af', margin: 0 }}>
              Per una panoramica completa sul trattamento dei tuoi dati, ti invitiamo a leggere la nostra <a href="/privacy-policy" style={{ color: '#2563eb', fontWeight: 'bold' }}>Privacy Policy</a>.
            </p>
          </div>
        </section>

        <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          © 2026 ServiziSalute Roma – Portale per la Sanità Professionale
        </footer>
      </main>
    </div>
  );
}
