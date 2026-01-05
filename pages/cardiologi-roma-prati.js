import React from 'react';
import Head from 'next/head';

export default function CardiologiRomaPrati() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Cardiologo Roma Prati | Visite Cardiologiche Private</title>
        <meta name="description" content="Cerchi un cardiologo a Roma Prati? Trova specialisti per visite cardiologiche, ECG ed ecocardiogramma nel quartiere Prati." />
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/cardiologi-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Cardiologi Roma</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Cardiologo a Roma Prati</h1>

      <p>
        Hai bisogno di una visita specialistica al cuore? Trovare un <strong>cardiologo a Roma Prati</strong> è fondamentale per la prevenzione e la cura delle patologie cardiovascolari. Su ServiziSalute elenchiamo i professionisti che operano negli studi privati di zona.
      </p>

      <h2>Servizi Cardiologici in zona Prati</h2>
      <ul>
        <li>Visita cardiologica con ECG (Elettrocardiogramma)</li>
        <li>Ecocardiogramma color doppler</li>
        <li>Monitoraggio Holter h24</li>
        <li>Controllo della pressione arteriosa</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Sei un Cardiologo a Roma Prati?</h3>
        <p>Inserisci il tuo studio su ServiziSalute. Ricevi contatti da pazienti che cercano uno specialista nel quartiere Prati.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Pubblica Annuncio Gratis
        </a>
      </div>

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>Cerca anche in altre zone: 
          <a href="/cardiologi-roma" style={{ marginLeft: '10px', color: '#2563eb' }}>Tutta Roma</a>
        </p>
      </div>
    </main>
  );
}
