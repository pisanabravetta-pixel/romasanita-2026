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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Mappa Servizi Sanitari Roma | ServiziSalute</title>
        <meta name="description" content="Indice completo dei servizi sanitari a Roma divisi per quartiere: dentisti, farmacie, laboratori e visite specialistiche." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute</a>
          <a href="/" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 'bold' }}>← Torna alla Home</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', borderBottom: '3px solid #3b82f6', paddingBottom: '15px', display: 'inline-block' }}>
          Indice Servizi Sanitari Roma
        </h1>
        <p style={{ color: '#64748b', marginTop: '15px', fontSize: '18px', maxWidth: '700px' }}>
          Esplora la mappa completa della sanità locale. Trova studi medici, laboratori e farmacie organizzati per categoria e quartiere.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '40px' }}>
          {sezioni.map((sez, i) => (
            <div key={i} style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
                <a href={sez.linkCategoria} style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800' }}>{sez.titolo}</a>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {sez.quartieri.map((q, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', borderBottom: '1px solid #edf2f7', paddingBottom: '8px' }}>
                    <a href={q.link} style={{ color: '#2563eb', textDecoration: 'none', fontSize: '15px', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{q.nome}</span>
                      <span>→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BANNER PROFESSIONISTI */}
        <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#eff6ff', borderRadius: '20px', textAlign: 'center', border: '1px solid #dbeafe' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a', fontSize: '24px' }}>Sei un professionista sanitario?</h3>
          <p style={{ margin: '0 0 25px 0', fontSize: '16px', color: '#1e40af' }}>
            Aggiungi la tua attività medica o il tuo servizio a domicilio gratuitamente per essere trovato dai pazienti di Roma.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)' }}>
            Pubblica il tuo annuncio gratis
          </a>
        </div>
      </main>

      {/* FOOTER PROFESSIONALE (Reutilizzabile in tutte le pagine) */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 0 30px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            
            <div>
              <h4 style={{ color: '#3b82f6', marginBottom: '20px', fontSize: '18px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
                Il punto di riferimento per la ricerca di servizi sanitari nella Capitale. Annunci diretti, senza intermediari, organizzati per zona.
              </p>
            </div>

            <div>
              <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Navigazione</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home Page</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Assistenza Casa</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Per i Medici</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold' }}>Inserisci Studio</a></li>
                <li><a href="/contatti" style={{ color: '#94a3b8', textDecoration: 'none' }}>Supporto Clienti</a></li>
                <li><a href="/linee-guida" style={{ color: '#94a3b8', textDecoration: 'none' }}>Linee Guida Annunci</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Info Legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/disclaimer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Disclaimer Medico</a></li>
              </ul>
            </div>

          </div>
          <div style={{ marginTop: '60px', borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Sanità Locale di Prossimità
          </div>
        </div>
      </footer>
    </div>
  );
}
