import React from 'react';
import Head from 'next/head';

export default function DentistiRomaEur() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista a Roma EUR | Studi Dentistici zona EUR</title>
        <meta name="description" content="Trova il tuo dentista a Roma EUR. Studi professionali per cure dentali, implantologia e igiene orale nel quartiere EUR." />
      </Head>

      <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Dentisti Roma</a>
      
      <h1 style={{ color: "#1e3a8a", marginTop: "20px" }}>Dentista a Roma EUR</h1>

      <p>
        Stai cercando uno studio <strong>dentistico a Roma EUR</strong>? ServiziSalute ti aiuta a trovare i migliori professionisti dell'odontoiatria attivi nella zona Sud di Roma per visite di controllo e trattamenti specialistici.
      </p>

      <h2>Cure Dentali all'EUR</h2>
      <p>I professionisti che pubblicano su questo portale offrono servizi di:</p>
      <ul>
        <li>Estetica dentale e sbiancamento</li>
        <li>Chirurgia orale e implantologia</li>
        <li>Prevenzione e igiene orale</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Sei un dentista a Roma EUR?</h3>
        <p>Il tuo studio non è ancora presente? Inserisci subito il tuo annuncio gratuito per essere trovato dai cittadini dell'EUR.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Inizia Ora - È Gratis
        </a>
      </div>
    </main>
  );
}
