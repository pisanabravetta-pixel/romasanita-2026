import React from 'react';

export default function DentistiRomaEur() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/visite-specialistiche-roma" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px' }}>← Torna a Roma</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '30px', marginBottom: '10px', fontWeight: '800' }}>Dentisti a Roma EUR: Studi e Pronto Soccorso Dentistico</h1>
        
        <div style={{ backgroundColor: '#edf2f7', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
          <p>Cerchi un <strong>dentista in zona EUR</strong>? Che tu sia vicino al Laghetto, alla nuvola di Fuksas o in zona Viale Europa, trovi specialisti per implantologia, pulizia dei denti e ortodonzia invisibile con tecnologie all'avanguardia.</p>
        </div>

        <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#2563eb' }}>Studio Odontoiatrico EUR Center</h3>
          <p>📍 Viale America, Roma (EUR) - Specializzato in estetica dentale.</p>
          <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px' }}>Chiama Ora</button>
        </div>
      </div>
    </div>
  );
}
