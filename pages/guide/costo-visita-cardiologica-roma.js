import React from 'react';
import Head from 'next/head';

export default function GuidaCardiologia() {
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.8', color: '#333' }}>
      <Head>
        <title>Costo Visita Cardiologica a Roma: Prezzi Medi 2026</title>
      </Head>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Quanto costa una Visita Cardiologica a Roma?</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>Aggiornato: Gennaio 2026</p>
      </header>

      <section style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #2563eb', marginBottom: '30px' }}>
        <p><strong>Prezzo Medio:</strong> A Roma una visita cardiologica privata costa tra <strong>80€ e 150€</strong>.</p>
      </section>

      <h2 style={{ color: '#1e3a8a' }}>Cosa influenza il prezzo?</h2>
      <ul>
        <li>Presenza di elettrocardiogramma (ECG).</li>
        <li>Fama dello specialista.</li>
        <li>Ubicazione dello studio (es. Roma Nord vs Periferia).</li>
      </ul>

      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '15px', textAlign: 'center' }}>
        <h3>Trova un Cardiologo a Roma</h3>
        <p>Contatta direttamente gli specialisti della tua zona.</p>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', padding: '12px 25px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Vedi Cardiologi
        </a>
      </div>
    </article>
  );
}
