import React from 'react';

export default function FarmacieRomaCentro() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '30px', marginBottom: '10px', fontWeight: '800' }}>Farmacie a Roma Centro: Orari e Turni</h1>
        
        <div style={{ backgroundColor: '#fff5f5', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #feb2b2' }}>
          <p>Trova la <strong>farmacia aperta in Centro Storico a Roma</strong>. Copertura zone: Pantheon, Piazza Navona, Via del Corso e Trastevere. Consulta gli orari delle farmacie di turno e i servizi di consegna farmaci a domicilio.</p>
        </div>

        <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', backgroundColor: '#fff' }}>
          <h3 style={{ color: '#c53030' }}>Antica Farmacia del Corso</h3>
          <p>📍 Via del Corso, Roma (Centro) - Aperta 24h per emergenze.</p>
          <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px' }}>Vedi Posizione</button>
        </div>
      </div>
    </div>
  );
}
