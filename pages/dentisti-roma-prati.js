import React from 'react';
import Head from 'next/head';
import { DENTISTI } from '../database'; // Importiamo il database

export default function DentistiRomaPrati() {
  // FILTRO: Prendo solo i dentisti di Prati
  const dentistiPrati = DENTISTI.filter(studio => studio.zona === "Prati");

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista a Roma Prati | Studi e Visite | 2026</title>
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Torna a Dentisti Roma</a>
      </div>
      
      <h1 style={{ color: "#1e3a8a", marginBottom: '10px' }}>Dentista a Roma Prati</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>
        Elenco aggiornato dei professionisti e studi dentistici nel quartiere Prati.
      </p>

      {/* CICLO AUTOMATICO: Mostra solo i dentisti filtrati sopra */}
      {dentistiPrati.map((studio) => (
        <section key={studio.id} style={{ 
          backgroundColor: 'white', 
          border: '1px solid #e2e8f0', 
          borderRadius: '15px', 
          padding: '25px', 
          marginBottom: '20px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
        }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '20px' }}>{studio.nome}</h2>
          <p style={{ margin: '5px 0' }}>📍 {studio.indirizzo} (Prati)</p>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <a href={`https://wa.me/39?text=Salve,%20ho%20visto%20il%20vostro%20studio%20su%20ServiziSalute%20Roma`} 
               style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
               WhatsApp
            </a>
            <a href="#" style={{ border: '1px solid #cbd5e1', color: '#64748b', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
               Mappa
            </a>
          </div>
        </section>
      ))}

      {/* BOX RECLUTAMENTO SEMPRE PRESENTE */}
      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#fff7ed", borderRadius: "12px", textAlign: "center" }}>
        <h3 style={{ color: "#9a3412" }}>Lavori a Prati?</h3>
        <p>Aggiungi il tuo studio al database in pochi secondi.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", padding: "12px 25px", backgroundColor: "#ea580c", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Iscriviti Gratis
        </a>
      </div>
    </main>
  );
}
