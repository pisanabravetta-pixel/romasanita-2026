import React from 'react';

export default function ComeFunziona() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      
      <h1 style={{ marginTop: '30px', color: '#2c5282' }}>Come funziona ServiziSalute</h1>
      <p style={{ fontSize: '18px', color: '#4a5568' }}>Il modo più semplice per dare visibilità alla tua attività sanitaria a Roma.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
        <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: '#3182ce' }}>1. Crea l'annuncio</h3>
          <p>Inserisci i dati della tua farmacia o del tuo studio medico. Bastano 2 minuti e non serve registrazione.</p>
        </div>
        <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: '#3182ce' }}>2. Diventa visibile</h3>
          <p>Il tuo annuncio viene indicizzato per la tua zona di Roma (es. "Dentista Prati" o "Farmacia EUR").</p>
        </div>
      </div>

      <h3 style={{ marginTop: '40px', borderLeft: '4px solid #48bb78', paddingLeft: '15px' }}>Perché pubblicare su ServiziSalute?</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>✅ <strong>Target Mirato:</strong> Solo utenti di Roma che cercano servizi sanitari.</li>
        <li style={{ marginBottom: '10px' }}>✅ <strong>Contatto Diretto:</strong> Gli utenti ti contattano direttamente su WhatsApp o telefono.</li>
        <li style={{ marginBottom: '10px' }}>✅ <strong>Gratuito:</strong> La pubblicazione base è e rimarrà gratuita per i professionisti locali.</li>
      </ul>

      <div style={{ textAlign: 'center', marginTop: '50px', padding: '30px', background: '#ebf8ff', borderRadius: '15px' }}>
        <h2>Pronto a iniziare?</h2>
        <a href="/pubblica-annuncio" style={{ display: 'inline-block', background: '#48bb78', color: 'white', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', marginTop: '10px' }}>
          Pubblica il tuo primo annuncio
        </a>
      </div>
    </div>
  );
}
