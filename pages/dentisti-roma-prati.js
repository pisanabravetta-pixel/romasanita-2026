import React from 'react';
import Head from 'next/head';

export default function DentistiRomaPrati() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista a Roma Prati | Studi e Visite Odontoiatriche</title>
        <meta name="description" content="Trova un dentista a Roma Prati. Studi dentistici, visite private e urgenze odontoiatriche vicino a te nel quartiere Prati." />
      </Head>

      <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Dentisti Roma</a>
      
      <h1 style={{ color: "#1e3a8a", marginTop: "20px" }}>Dentista a Roma Prati</h1>

      <p>
        Cerchi un <strong>dentista a Roma Prati</strong>? Su ServiziSalute trovi studi dentistici privati nel quartiere che offrono visite, igiene dentale, implantologia e urgenze senza lunghe attese.
      </p>

      <h2>Servizi odontoiatrici in zona Prati</h2>
      <p>Gli studi presenti in questa zona della Capitale sono specializzati in:</p>
      <ul>
        <li>Implantologia e Protesi dentarie</li>
        <li>Ortodonzia invisibile per adulti</li>
        <li>Odontoiatria pediatrica (bambini)</li>
        <li>Urgenze e pronto soccorso dentistico</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Sei un dentista a Roma Prati?</h3>
        <p>Aumenta la visibilità del tuo studio nel quartiere. Pubblica il tuo annuncio gratuitamente e ricevi contatti diretti dai pazienti.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Pubblica Annuncio Gratis
        </a>
      </div>
    </main>
  );
}
