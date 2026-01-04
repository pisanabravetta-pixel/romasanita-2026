import React from 'react';

export default function DentistiPrati() {
  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px', borderBottom: '1px solid #eee' }}><a href="/">← Home</a></nav>
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d' }}>Dentisti a Roma Prati: Studi e Professionisti</h1>
        <p>Cerchi un <strong>dentista a Roma Prati</strong>? Il quartiere Prati offre eccellenze odontoiatriche a pochi passi dal Vaticano e da Via Cola di Rienzo.</p>
        
        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
          <h2 style={{ fontSize: '18px' }}>Perché scegliere un dentista in zona Prati?</h2>
          <p>La zona è servita ottimamente dalla Metro A (Ottaviano e Lepanto), rendendo facile raggiungere il proprio studio dentistico anche per chi lavora in centro. Qui si trovano specialisti in implantologia, estetica dentale e ortodonzia per bambini.</p>
        </div>

        {/* LISTA ANNUNCI LOCALIZZATI */}
        <div style={{ borderLeft: '4px solid #2563eb', paddingLeft: '20px', margin: '30px 0' }}>
          <h3>Studio Odontoiatrico Prati Centro</h3>
          <p>📍 Via Crescenzio, Roma (Prati) - Specializzati in protesi e pulizia denti.</p>
          <button style={{ background: '#48bb78', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>Chiama Ora</button>
        </div>

        <div style={{ marginTop: '50px', padding: '30px', background: '#1a365d', color: '#fff', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Sei un dentista in zona Prati?</h3>
          <p>Inserisci il tuo studio nella nostra guida locale.</p>
          <a href="/pubblica-annuncio" style={{ color: '#fff', fontWeight: 'bold' }}>PUBBLICA GRATIS</a>
        </div>
      </div>
    </div>
  );
}
