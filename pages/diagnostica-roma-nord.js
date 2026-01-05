import React from 'react';
import Head from 'next/head';

export default function DiagnosticaRomaNord() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Diagnostica Roma Nord | Centri Analisi e Radiologia</title>
        <meta name="description" content="Centri diagnostici a Roma Nord. Trova dove effettuare analisi del sangue, ecografie, TAC e risonanze magnetiche in zona Roma Nord." />
      </Head>

      <a href="/diagnostica-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Diagnostica Roma</a>
      
      <h1 style={{ color: "#1e3a8a", marginTop: "20px" }}>Diagnostica a Roma Nord</h1>

      <p>
        Hai bisogno di esami clinici o strumentali? Trova un centro di <strong>diagnostica a Roma Nord</strong> specializzato in analisi del sangue, radiologia e diagnostica per immagini.
      </p>

      <h2>Centri Convenzionati e Privati a Roma Nord</h2>
      <p>Nella zona Nord di Roma sono disponibili centri per:</p>
      <ul>
        <li>Risonanza Magnetica e TAC</li>
        <li>Ecografie e Doppler</li>
        <li>Analisi Cliniche e check-up completi</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Gestisci un centro a Roma Nord?</h3>
        <p>Aggiungi la tua struttura su ServiziSalute. Migliora il posizionamento locale e raggiungi nuovi pazienti nella tua zona.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Aggiungi Centro Gratis
        </a>
      </div>
    </main>
  );
}
