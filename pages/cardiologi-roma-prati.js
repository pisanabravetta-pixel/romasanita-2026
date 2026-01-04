import React from 'react';

export default function CardiologiRomaPrati() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '30px', marginBottom: '10px', fontWeight: '800' }}>Cardiologi a Roma Prati: Visite ed ECG</h1>
        
        <div style={{ backgroundColor: '#ebf8ff', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #bee3f8' }}>
          <p>Cerchi un <strong>cardiologo nel quartiere Prati o zona Vaticano</strong>? In questa zona si concentrano i migliori centri per la prevenzione cardiaca, ecocardiogrammi e check-up completi per sportivi e anziani.</p>
        </div>

        <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#2b6cb0' }}>Centro Cuore Prati</h3>
          <p>📍 Via Cola di Rienzo, Roma (Prati) - Dr. Rossi e associati.</p>
          <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px' }}>Prenota Ora</button>
        </div>
      </div>
    </div>
  );
}
