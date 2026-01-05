import React from 'react';
import Head from 'next/head';

export default function MappaServizi() {
  const sezioni = [
    {
      titolo: "🦷 Dentisti e Odontoiatria",
      linkCategoria: "/dentisti-roma",
      quartieri: [
        { nome: "Roma Prati", link: "/dentisti-roma-prati" },
        { nome: "Roma EUR", link: "/dentisti-roma-eur" },
        { nome: "Roma San Giovanni", link: "/dentisti-roma-san-giovanni" }
      ]
    },
    {
      titolo: "🔬 Diagnostica e Analisi",
      linkCategoria: "/diagnostica-roma",
      quartieri: [
        { nome: "Roma Nord", link: "/diagnostica-roma-nord" }
      ]
    },
    {
      titolo: "⚕️ Farmacie",
      linkCategoria: "/farmacie-roma",
      quartieri: [
        { nome: "Roma Centro", link: "/farmacie-roma-centro" }
      ]
    },
    {
      titolo: "👨‍⚕️ Specialisti",
      linkCategoria: "/visite-specialistiche-roma",
      quartieri: [
        { nome: "Cardiologia Prati", link: "/cardiologi-roma-prati" }
      ]
    },
    {
      titolo: "🏠 Servizi a Domicilio", // AGGIUNTO
      linkCategoria: "/servizi-domicilio-roma",
      quartieri: [
        { nome: "Roma Sud", link: "/servizi-domicilio-roma-sud" }
      ]
    }
  ];

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <Head>
        <title>Mappa Servizi Sanitari Roma | ServiziSalute</title>
        <meta name="description" content="Indice completo dei servizi sanitari a Roma divisi per quartiere: dentisti, farmacie e centri diagnostici." />
      </Head>

      <div style={{ marginBottom: '20px' }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Torna alla Home</a>
      </div>

      <h1 style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>Indice Servizi Sanitari Roma</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Esplora tutti i servizi disponibili nei quartieri di Roma. Trova lo studio medico o la farmacia più vicina a te.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        {sezioni.map((sez, i) => (
          <div key={i} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>
              <a href={sez.linkCategoria} style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>{sez.titolo}</a>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {sez.quartieri.map((q, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>
                  <a href={q.link} style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>• {q.nome}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Sei un professionista sanitario?</h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '14px' }}>
          Se la tua zona o specializzazione non è ancora presente, pubblica il tuo annuncio gratuitamente.
        </p>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
          Pubblica il tuo annuncio gratis
        </a>
      </div>
    </main>
  );
}
