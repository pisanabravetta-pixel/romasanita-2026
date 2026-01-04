import React from 'react';

export default function CookiePolicy() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      
      <h1 style={{ marginTop: '30px', color: '#1a365d' }}>Informativa sui Cookie</h1>
      <p style={{ color: '#64748b', fontSize: '14px' }}>Ultimo aggiornamento: Gennaio 2026</p>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '20px', color: '#2d3748' }}>1. Cosa sono i cookie?</h2>
        <p>
          I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '20px', color: '#2d3748' }}>2. Cookie utilizzati da ServiziSalute</h2>
        <p>Il nostro sito utilizza diverse tipologie di cookie:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>Cookie Tecnici:</strong> Necessari per il corretto funzionamento del sito e per permetterti di navigare e utilizzare i servizi (es. la ricerca degli annunci).
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Cookie Analitici:</strong> Utilizzati per raccogliere informazioni in forma aggregata sul numero degli utenti e su come questi visitano il sito (es. Google Analytics) al fine di migliorare il servizio.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Cookie di Terze Parti:</strong> Potrebbero essere impostati da servizi esterni come mappe, video o social plugin per migliorare l'esperienza utente.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '20px', color: '#2d3748' }}>3. Come disabilitare i cookie</h2>
        <p>
          Puoi scegliere di disabilitare o bloccare i cookie attraverso le impostazioni del tuo browser. Ti ricordiamo però che disabilitare i cookie tecnici potrebbe compromettere alcune funzionalità del sito.
        </p>
      </section>

      <div style={{ marginTop: '50px', padding: '20px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
        <p>Per maggiori informazioni sul trattamento dei tuoi dati personali, consulta anche la nostra <strong>Privacy Policy</strong>.</p>
        <p>Contatti: info@servizisalute.it</p>
      </div>
    </div>
  );
}
