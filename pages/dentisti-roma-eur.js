import React from 'react';
import Head from 'next/head';
import { DENTISTI } from '../database';

export default function DentistiRomaEur() {
  const dentistiZona = DENTISTI.filter(s => s.zona === "Eur");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <Head><title>Dentista Roma EUR | Studi Odontoiatrici</title></Head>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/dentisti-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Tutti i Dentisti Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a' }}>Dentista a Roma EUR</h1>

        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Altre zone:</span>
          <a href="/dentisti-roma-prati" style={{ color: '#2563eb', fontSize: '14px' }}>Prati</a>
          <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', fontSize: '14px' }}>San Giovanni</a>
        </div>

        {dentistiZona.map((s) => (
          <div key={s.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>{s.nome}</h3>
            <p>📍 {s.indirizzo} (EUR)</p>
            <a href="https://wa.me/39" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Contatta su WhatsApp</a>
          </div>
        ))}
      </div>
    </div>
  );
}
