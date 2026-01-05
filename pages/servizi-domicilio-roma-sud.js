import React from 'react';
import Head from 'next/head';

export default function DomicilioSud() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Servizi Sanitari a Domicilio Roma Sud | Infermieri e Fisioterapia</title>
        <meta name="description" content="Assistenza sanitaria a domicilio a Roma Sud. Infermieri, fisioterapisti e medici pronti ad intervenire a casa tua." />
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/servizi-domicilio-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Tutti i Servizi a Domicilio</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Servizi a Domicilio Roma Sud</h1>
      <p>Assistenza medica e infermieristica professionale direttamente a casa tua nei quartieri di Roma Sud (Eur, Ostiense, Laurentina).</p>

      <div style={{ padding: "30px", backgroundColor: "#fff7ed", borderRadius: "12px", border: "1px solid #ffedd5", textAlign: "center" }}>
        <h3 style={{ color: "#9a3412", marginTop: 0 }}>Offri servizi a domicilio a Roma Sud?</h3>
        <p>La richiesta di assistenza domiciliare è cresciuta del 40% in questa zona. Ricevi nuove chiamate oggi.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#ea580c", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Inizia Ora</a>
      </div>
    </main>
  );
}
