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
      titolo: "🏠 Servizi a Domicilio",
      linkCategoria: "/servizi-domicilio-roma",
      quartieri: [
        { nome: "Roma Sud", link: "/servizi-domicilio-roma-sud" }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Head>
        <title>Mappa Servizi Sanitari Roma | ServiziSalute</title>
        <meta name="description" content="Indice completo dei servizi sanitari a Roma divisi per quartiere: dentisti, farmacie e centri diagnostici." />
      </Head>

      {/* HEADER SEMPLICE */}
      <header style={{ background: 'white', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: '800', color: '#0070f3', textDecoration: 'none' }}>ServiziSalute</a>
          <a href="/" style={{ textDecoration: 'none', color: '#666', fontSize: '14px' }}>← Torna alla Home</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
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

      {/* FOOTER PROFESSIONALE */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                Il portale di annunci dedicato ai servizi sanitari a Roma. Trova professionisti vicino a te.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '15px' }}>Link Utili</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: '15px' }}>Professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica Annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: '15px' }}>Legale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
              </ul>
            </div>

          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Roma Sanità Locale
          </div>
        </div>
      </footer>
    </div>
  );
}
