import React from 'react';
import Head from 'next/head';

export default function FarmacieCentro() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Farmacie Roma Centro | Orari e Turni | Gennaio 2026</title>
        <meta name="description" content="Cerca farmacie a Roma Centro. Orari di apertura, farmacie di turno e servizi sanitari nel centro storico." />
      </Head>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/farmacie-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Tutte le Farmacie</a>
        <span style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold', backgroundColor: '#ecfdf5', padding: '5px 10px', borderRadius: '15px' }}>
          ● Orari verificati
        </span>
      </div>
      
      <h1 style={{ color: "#1e3a8a" }}>Farmacie a Roma Centro</h1>
      <p>Elenco delle farmacie nel centro storico di Roma. Verifica servizi come autoanalisi, tamponi e consegna a domicilio.</p>

      {/* BOX RECLUTAMENTO FARMACIE */}
      <div style={{ padding: "30px", backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #dcfce7", textAlign: "center", marginBottom: '30px' }}>
        <h3 style={{ color: "#166534", marginTop: 0 }}>Gestisci una Farmacia in Centro?</h3>
        <p>Aggiorna i tuoi orari e segnala i tuoi servizi ai cittadini. Posizionati sopra i tuoi competitor.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#22c55e", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Aggiorna Dati Farmacia</a>
      </div>

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>Cerca in altre zone:</p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/farmacie-roma" style={{ color: "#2563eb", textDecoration: 'none' }}>• Altre zone Roma</a>
        </div>
      </div>
    </main>
  );
}
