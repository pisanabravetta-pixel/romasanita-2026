import React from 'react';
import Head from 'next/head';

export default function DentistiRomaSanGiovanni() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista a Roma San Giovanni | Studi Odontoiatrici</title>
        <meta name="description" content="Trova un dentista a Roma zona San Giovanni. Studi dentistici per cure, igiene orale e ortodonzia vicino a Piazza San Giovanni." />
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Dentisti Roma</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Dentista a Roma San Giovanni</h1>

      <p>
        Cerchi uno studio <strong>dentistico a Roma San Giovanni</strong>? In questo storico quartiere romano sono presenti eccellenze nel campo dell'odontoiatria per adulti e bambini.
      </p>

      <h2>Cure Dentistiche a San Giovanni</h2>
      <ul>
        <li>Igiene dentale e ablazione tartaro</li>
        <li>Cura della carie e conservativa</li>
        <li>Protesi fisse e mobili</li>
        <li>Ortodonzia invisibile</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Sei un Dentista a San Giovanni?</h3>
        <p>Fatti trovare dai pazienti che vivono nel quartiere. Registra il tuo studio su ServiziSalute in pochi secondi.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Inserisci Annuncio Gratis
        </a>
      </div>
    </main>
  );
}
