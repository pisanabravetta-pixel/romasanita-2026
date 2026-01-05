import React from 'react';
import Head from 'next/head';

export default function DiagnosticaNord() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Centri Diagnostici Roma Nord | Esami e RX | 2026</title>
        <meta name="description" content="Centri di diagnostica a Roma Nord. Analisi del sangue, RX, Risonanze e screening nel quadrante Nord di Roma." />
      </Head>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/diagnostica-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Tutta la Diagnostica</a>
        <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold', backgroundColor: '#eff6ff', padding: '5px 10px', borderRadius: '15px' }}>
          ● Nuove Convenzioni
        </span>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Diagnostica a Roma Nord</h1>
      <p>I migliori centri diagnostici per esami strumentali e analisi cliniche nei quartieri di Roma Nord.</p>

      {/* RECLUTAMENTO CENTRI */}
      <div style={{ padding: "30px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
        <h3 style={{ color: "#1e3a8a", marginTop: 0 }}>Sei un Centro Diagnostico a Roma Nord?</h3>
        <p>Migliaia di utenti cercano "Risonanza" o "Analisi sangue" in questa zona ogni mese. Entra nel network.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#1e3a8a", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Aggiungi il Centro</a>
      </div>
    </main>
  );
}
