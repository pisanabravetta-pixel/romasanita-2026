import React from 'react';
import Head from 'next/head';

export default function CardiologiPrati() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Cardiologo Roma Prati | Visita ed ECG | Gennaio 2026</title>
        <meta name="description" content="Cerca un cardiologo a Roma Prati. Visite cardiologiche, ECG e controllo pressione nel quartiere Prati. Dati aggiornati." />
      </Head>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/cardiologi-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Tutti i Cardiologi</a>
        <span style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold', backgroundColor: '#ecfdf5', padding: '5px 10px', borderRadius: '15px' }}>
          ● Aggiornato: Gennaio 2026
        </span>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Cardiologo a Roma Prati</h1>
      <p>Trova specialisti in cardiologia nel quartiere Prati per visite specialistiche, elettrocardiogramma (ECG) ed ecocardiografia.</p>

      {/* ESEMPIO PROFESSIONISTA */}
      <section style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '25px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '20px' }}>Studio Cardiologico Prati</h2>
        <p>📍 Via Cola di Rienzo, Roma (Prati)</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <a href="https://wa.me/39" style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
          <a href="https://maps.google.com" target="_blank" style={{ border: '1px solid #cbd5e1', color: '#64748b', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>📍 Vedi su Maps</a>
        </div>
      </section>

      {/* BOX RECLUTAMENTO */}
      <div style={{ padding: "30px", backgroundColor: "#fff7ed", borderRadius: "12px", border: "1px solid #ffedd5", textAlign: "center" }}>
        <h3 style={{ color: "#9a3412", marginTop: 0 }}>Sei un Cardiologo a Prati?</h3>
        <p>Oltre <strong>210 pazienti</strong> hanno cercato un cardiologo in questa zona nell'ultimo mese. Non perdere la tua posizione.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#ea580c", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Pubblica Gratis</a>
      </div>

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>Altre zone:</p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/cardiologi-roma" style={{ color: "#2563eb", textDecoration: 'none' }}>• Roma Centro</a>
        </div>
      </div>
    </main>
  );
}
