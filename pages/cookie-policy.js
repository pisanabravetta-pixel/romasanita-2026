import React from 'react';

export default function CookiePolicy() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      <h1 style={{ marginTop: '30px', borderBottom: '2px solid #3182ce', paddingBottom: '10px' }}>Cookie Policy</h1>
      <p>ServiziSalute utilizza cookie per garantire il corretto funzionamento del sito e migliorare l’esperienza di navigazione.</p>
      <h3>Cosa sono i cookie</h3>
      <p>I cookie sono piccoli file di testo che vengono salvati sul dispositivo dell’utente durante la navigazione.</p>
      <h3>Tipologia di cookie utilizzati</h3>
      <ul>
        <li><strong>Cookie tecnici:</strong> necessari per il funzionamento del sito.</li>
        <li><strong>Cookie di analisi (anonimizzati):</strong> utilizzati per raccogliere dati statistici sul traffico del sito.</li>
      </ul>
      <p>ServiziSalute non utilizza cookie di profilazione per fini pubblicitari.</p>
      <h3>Gestione dei cookie</h3>
      <p>L’utente può gestire o disabilitare i cookie direttamente dalle impostazioni del proprio browser. La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.</p>
      <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#777' }}>
        © 2026 ServiziSalute – Roma
      </footer>
    </div>
  );
}
