import React from 'react';
import Head from 'next/head';

export default function ServiziDomicilioRomaSud() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Servizi a Domicilio Roma Sud | Assistenza Infermieristica</title>
        <meta name="description" content="Assistenza sanitaria a domicilio a Roma Sud. Infermieri, fisioterapisti e operatori socio-sanitari direttamente a casa tua." />
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/servizi-domicilio-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Servizi a Domicilio</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Servizi a Domicilio Roma Sud</h1>

      <p>
        Necessiti di <strong>assistenza a domicilio a Roma Sud</strong>? Che si tratti di cure infermieristiche post-operatorie o di fisioterapia riabilitativa, trovare professionisti che raggiungono la tua abitazione nella zona Sud di Roma è oggi più semplice.
      </p>

      <h2>Assistenza Privata a Roma Sud</h2>
      <ul>
        <li>Infermieri per medicazioni e iniezioni</li>
        <li>Fisioterapia domiciliare</li>
        <li>Prelievi del sangue a casa</li>
        <li>Assistenza anziani e malati</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Offri servizi sanitari a Roma Sud?</h3>
        <p>Entra nel network di ServiziSalute. Molti pazienti a Roma Sud cercano assistenza domiciliare qualificata.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Pubblica Profilo Gratis
        </a>
      </div>
    </main>
  );
}
