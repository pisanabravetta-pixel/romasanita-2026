import React from 'react';
import Head from 'next/head';

export default function GuidaCardiologia() {
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.8', color: '#333' }}>
      <Head>
        <title>Costo Visita Cardiologica Roma: Tariffe Private 2026</title>
      </Head>

      <div style={{ backgroundColor: '#fff4f4', border: '1px solid #feb2b2', padding: '15px', borderRadius: '8px', marginBottom: '30px', fontSize: '14px', color: '#9b2c2c' }}>
        <strong>AVVERTENZA LEGALE:</strong> Questo contenuto analizza esclusivamente i costi medi delle prestazioni. <strong>Non è un consulto medico.</strong> In caso di sintomi o necessità cliniche, contattare immediatamente un medico o il 118.
      </div>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Costi Visita Cardiologica a Roma: Guida ai Prezzi</h1>
        <p style={{ color: '#666' }}>Rilevazione tariffe specialisti privati - Gennaio 2026</p>
      </header>

      <section style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #2563eb', marginBottom: '30px' }}>
        <p>Una visita cardiologica privata a Roma ha un prezzo medio che oscilla tra <strong>80€ e 150€</strong>, a seconda della complessità del controllo.</p>
      </section>

      <h2 style={{ color: '#1e3a8a' }}>Cosa determina il costo finale?</h2>
      <ul>
        <li>Esecuzione contestuale dell'elettrocardiogramma (ECG).</li>
        <li>Livello di specializzazione del cardiologo.</li>
        <li>Zona della città (centro vs hinterland).</li>
      </ul>

      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '15px', textAlign: 'center' }}>
        <h3>Specialisti in Cardiologia a Roma</h3>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', padding: '12px 25px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Trova uno studio vicino a te
        </a>
      </div>

      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '2px solid #eee', fontSize: '12px', color: '#666' }}>
        <p><strong>Disclaimer:</strong> ServiziSalute Roma non si assume responsabilità per le tariffe applicate dai singoli professionisti o per l'esito delle visite.</p>
        <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>← Torna alla Home</a>
      </footer>
    </article>
  );
}
