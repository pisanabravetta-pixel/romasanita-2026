import React from 'react';
import Head from 'next/head';

export default function FarmacieRomaCentro() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Farmacia Roma Centro | Servizi e Prodotti Farmaceutici</title>
        <meta name="description" content="Trova una farmacia a Roma Centro. Elenco delle farmacie nel centro storico di Roma con servizi di autoanalisi e prodotti sanitari." />
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/farmacie-roma" style={{ color: "#2563eb", textDecoration: "none" }}>← Torna a Farmacie Roma</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Farmacia a Roma Centro</h1>

      <p>
        Cerchi una <strong>farmacia a Roma Centro</strong>? Nel cuore della Capitale, le farmacie offrono non solo medicinali, ma una vasta gamma di servizi per la salute e il benessere del cittadino e del turista.
      </p>

      <h2>Cosa offrono le farmacie in Centro Storico</h2>
      <ul>
        <li>Autoanalisi del sangue (Glicemia, Colesterolo)</li>
        <li>Misurazione della pressione arteriosa</li>
        <li>Prodotti omeopatici e fitoterapici</li>
        <li>Consulenze dermocosmetiche</li>
      </ul>

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0f7ff", borderRadius: "12px", border: "1px solid #dbeafe", textAlign: "center" }}>
        <h3 style={{ color: "#1e3e8a", marginTop: 0 }}>Gestisci una Farmacia in Centro?</h3>
        <p>Rendi visibili i tuoi servizi ai residenti e ai visitatori del Centro Storico di Roma. Pubblica il tuo profilo gratuitamente.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Iscriviti Ora
        </a>
      </div>
    </main>
  );
}
