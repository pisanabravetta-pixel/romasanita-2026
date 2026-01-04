import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      
      <h1 style={{ marginTop: '30px', borderBottom: '2px solid #3182ce', paddingBottom: '10px' }}>Privacy Policy</h1>
      
      <p>La presente informativa descrive come <strong>ServiziSalute</strong> raccoglie e utilizza i dati personali degli utenti, nel rispetto del Regolamento UE 2016/679 (GDPR).</p>

      <h3>1. Tipologia di dati raccolti</h3>
      <p>ServiziSalute può raccogliere:</p>
      <ul>
        <li>Dati di navigazione (indirizzo IP, tipo di browser, pagine visitate)</li>
        <li>Dati forniti volontariamente dall’utente tramite moduli di contatto o pubblicazione annunci (nome, email, telefono)</li>
      </ul>

      <h3>2. Finalità del trattamento</h3>
      <p>I dati vengono utilizzati esclusivamente per:</p>
      <ul>
        <li>Permettere il funzionamento del sito</li>
        <li>Consentire la pubblicazione e la gestione degli annunci</li>
        <li>Rispondere a richieste di contatto</li>
        <li>Migliorare l’esperienza di navigazione</li>
      </ul>

      <h3>3. Conservazione dei dati</h3>
      <p>I dati personali vengono conservati solo per il tempo necessario alle finalità sopra indicate e non vengono ceduti a terzi per scopi commerciali.</p>

      <h3>4. Diritti dell’utente</h3>
      <p>L’utente ha il diritto di accedere ai propri dati, richiederne la modifica o la cancellazione, oppure opporsi al trattamento.</p>
      
      <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#777' }}>
        © 2026 ServiziSalute – Roma
      </footer>
    </div>
  );
}
