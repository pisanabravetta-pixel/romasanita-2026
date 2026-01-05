import React from 'react';
import Head from 'next/head';
import { DENTISTI } from '../database'; 

export default function DentistiRomaEur() {
  // FILTRO: Solo EUR
  const dentistiEur = DENTISTI.filter(studio => studio.zona === "Eur");

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista a Roma EUR | Studi e Visite | 2026</title>
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Torna a Dentisti Roma</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a", marginBottom: '10px' }}>Dentista a Roma EUR</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>
        I migliori studi odontoiatrici selezionati nel quartiere EUR.
      </p>

      {dentistiEur.map((studio) => (
        <section key={studio.id} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '25px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '20px' }}>{studio.nome}</h2>
          <p style={{ margin: '5px 0' }}>📍 {studio.indirizzo} (EUR)</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <a href={`https://wa.me/39?text=Salve,%20ho%20visto%20il%20vostro%20studio%20su%20ServiziSalute%20Roma`} style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>WhatsApp</a>
            <a href="#" style={{ border: '1px solid #cbd5e1', color: '#64748b', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>Mappa</a>
          </div>
        </section>
      ))}

      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#f0fdf4", borderRadius: "12px", textAlign: "center", border: "1px solid #dcfce7" }}>
        <h3 style={{ color: "#166534" }}>Lavori all'EUR?</h3>
        <p>Entra nel database dei professionisti di Roma Sud.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#22c55e", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Iscriviti Gratis</a>
      </div>
    </main>
  );
}
