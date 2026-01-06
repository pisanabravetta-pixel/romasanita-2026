import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <Head>
        <title>Privacy Policy | ServiziSalute Roma</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: '#334155' }}>
        <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
          ← Torna alla Home
        </a>
        
        <header style={{ marginTop: '40px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '900' }}>Privacy Policy</h1>
          <p style={{ color: '#64748b' }}>Ultimo aggiornamento: 6 Gennaio 2026</p>
        </header>

        <section style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <p style={{ marginBottom: '25px' }}>
            La presente informativa descrive come <strong>ServiziSalute</strong> raccoglie e utilizza i dati personali degli utenti nel rispetto del <strong>Regolamento UE 2016/679 (GDPR)</strong>. La trasparenza è alla base del nostro rapporto con i cittadini e i medici di Roma.
          </p>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>1. Titolare del Trattamento</h3>
          <p>
            Il titolare del trattamento è il team di gestione di <strong>ServiziSalute Roma</strong>. Per qualsiasi richiesta relativa alla privacy o per esercitare i propri diritti, è possibile scrivere a: <code style={{ color: '#2563eb' }}>info@servizisalute.it</code>.
          </p>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>2. Tipologia di dati raccolti</h3>
          <p>Raccogliamo solo i dati strettamente necessari per il funzionamento del servizio:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Dati di navigazione:</strong> Indirizzo IP, dati statistici anonimi sull'uso del sito (tramite tecnologie server-side).</li>
            <li><strong>Dati per la pubblicazione:</strong> Nome, cognome, email, numero di telefono e dettagli della struttura sanitaria forniti volontariamente dai professionisti in fase di registrazione.</li>
          </ul>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>3. Finalità e Base Giuridica</h3>
          <p>I dati vengono trattati esclusivamente per:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>L'erogazione del servizio di ricerca (base giuridica: esecuzione di un contratto).</li>
            <li>La gestione e pubblicazione degli annunci dei professionisti sanitari.</li>
            <li>La sicurezza del sito (prevenzione di spam o attività illecite).</li>
          </ul>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>4. Conservazione e Sicurezza (Supabase)</h3>
          <p>
            I dati sono conservati in modo sicuro su server protetti tramite l'infrastruttura di <strong>Supabase</strong>. Adottiamo misure di crittografia e controllo degli accessi (RLS) per impedire accessi non autorizzati. I dati restano nei nostri sistemi finché l'annuncio è attivo o finché l'utente non ne richiede la cancellazione.
          </p>

          <h3 style={{ color: '#1e3a8a', marginTop: '30px' }}>5. Diritti dell’utente</h3>
          <p>In ogni momento puoi richiedere di:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Accedere ai tuoi dati personali.</li>
            <li>Rettificare informazioni inesatte o aggiornare il tuo profilo.</li>
            <li>Cancellare definitivamente i tuoi dati dai nostri database.</li>
          </ul>
        </section>

        <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
          © 2026 ServiziSalute – Portale Indipendente per la Sanità di Roma
        </footer>
      </main>
    </div>
  );
}
