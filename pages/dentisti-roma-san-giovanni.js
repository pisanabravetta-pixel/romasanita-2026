import React from 'react';

export default function DentistiSanGiovanni() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
      </nav>
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '30px', fontWeight: '800' }}>Dentisti a Roma San Giovanni</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Studi dentistici d'eccellenza in zona San Giovanni, Re di Roma e Appia Nuova.</p>
        
        <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <p>Trova il tuo <strong>dentista a San Giovanni</strong>. La zona è ricca di studi specializzati in igiene orale, apparecchi invisibili per adulti e bambini, e interventi di implantologia a prezzi competitivi.</p>
        </div>

        <div style={{ marginTop: '30px', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ color: '#2563eb' }}>Studio Odontoiatrico Appio</h3>
          <p>📍 Via Appia Nuova - Vicino Metro San Giovanni.</p>
          <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold' }}>Vedi Telefono</button>
        </div>
      </div>
    </div>
  );
}
