import React from 'react';
import Head from 'next/head';
import { DENTISTI } from '../database'; 

export default function DentistiRomaSanGiovanni() {
  const dentistiZona = DENTISTI.filter(studio => studio.zona === "San Giovanni");

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista Roma San Giovanni | Studi e Visite</title>
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Torna a Dentisti Roma</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a", marginBottom: '10px' }}>Dentista a Roma San Giovanni</h1>
      
      {dentistiZona.length > 0 ? (
        dentistiZona.map((studio) => (
          <section key={studio.id} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '25px', marginBottom: '20px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '20px' }}>{studio.nome}</h2>
            <p>📍 {studio.indirizzo}</p>
            <a href="https://wa.me/39" style={{ display: 'inline-block', marginTop: '10px', backgroundColor: '#25D366', color: 'white', padding: '8px 16px', borderRadius: '5px', textDecoration: 'none' }}>Contatta ora</a>
          </section>
        ))
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px dashed #cbd5e1' }}>
          <p style={{ color: '#64748b' }}>Stiamo selezionando i migliori studi odontoiatrici a San Giovanni.</p>
        </div>
      )}

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#fff7ed", borderRadius: "12px", textAlign: "center" }}>
        <h3 style={{ color: "#9a3412" }}>Lavori a San Giovanni?</h3>
        <a href="/pubblica-annuncio" style={{ color: "#ea580c", fontWeight: "bold" }}>Aggiungi il tuo studio gratis</a>
      </div>
    </main>
  );
}
