import React from 'react';

export default function Disclaimer() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      <h1 style={{ marginTop: '30px', borderBottom: '2px solid #e53e3e', paddingBottom: '10px', color: '#e53e3e' }}>Disclaimer</h1>
      <p><strong>ServiziSalute</strong> è un portale di annunci e informazione dedicato ai servizi sanitari privati.</p>
      <p>Il sito non fornisce prestazioni sanitarie, non effettua diagnosi, non rilascia consulenze mediche e non sostituisce il parere di un medico.</p>
      <p>Tutti i contenuti, gli annunci e le informazioni presenti sul sito sono pubblicati direttamente dai professionisti, dalle strutture sanitarie o dalle farmacie inserzioniste, che ne sono unici responsabili.</p>
      <p>ServiziSalute non verifica né garantisce l’accuratezza, la completezza o l’aggiornamento delle informazioni fornite dagli inserzionisti.</p>
      <p style={{ backgroundColor: '#fff5f5', padding: '15px', borderLeft: '5px solid #e53e3e' }}>
        Per qualsiasi decisione relativa alla salute, si invita l’utente a rivolgersi sempre a un medico qualificato.
      </p>
      <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#777' }}>
        © 2026 ServiziSalute – Roma
      </footer>
    </div>
  );
}
