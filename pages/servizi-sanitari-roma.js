import React from 'react';
import Head from 'next/head';

export default function ServiziSanitariRoma() {
  const categorie = [
    { nome: "Farmacie", slug: "farmacie-roma", icon: "💊", desc: "Farmacie di turno e parafarmacie." },
    { nome: "Dentisti", slug: "dentisti-roma", icon: "🦷", desc: "Studi dentistici e pronto soccorso odontoiatrico." },
    { nome: "Cardiologi", slug: "cardiologi-roma", icon: "❤️", desc: "Specialisti in cardiologia ed ECG." },
    { nome: "Diagnostica", slug: "diagnostica-roma", icon: "🔬", desc: "Centri analisi, TAC e risonanze." },
    { nome: "Visite Specialistiche", slug: "visite-specialistiche-roma", icon: "👨‍⚕️", desc: "Dermatologi, Oculisti e altri specialisti." },
    { nome: "Servizi a Domicilio", slug: "servizi-domicilio-roma", icon: "🏠", desc: "Infermieri e fisioterapia a domicilio." }
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Servizi Sanitari a Roma per Quartiere | Mappa Completa | ServiziSalute</title>
        <meta name="description" content="Esplora tutti i servizi sanitari disponibili a Roma suddivisi per categoria e quartiere. Trova rapidamente il professionista di cui hai bisogno vicino a te." />
      </Head>

      {/* HEADER */}
      <div style={{ backgroundColor: '#3182ce', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        📍 MAPPA COMPLETA DEI SERVIZI SANITARI A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#3182ce', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#2c5282', fontSize: '36px', fontWeight: '800', marginBottom: '15px' }}>Servizi Sanitari a Roma</h1>
          <p style={{ color: '#4a5568', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Seleziona una categoria per visualizzare i professionisti e le strutture disponibili nei vari quartieri della Capitale.
          </p>
        </div>

        {/* GRID CATEGORIE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
          {categorie.map((cat, i) => (
            <a key={i} href={`/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', transition: 'transform 0.2s', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{cat.icon}</div>
                <h2 style={{ color: '#2c5282', fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>{cat.nome}</h2>
                <p style={{ color: '#718096', fontSize: '15px' }}>{cat.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* INFO EXTRA */}
        <div style={{ backgroundColor: '#ebf8ff', padding: '35px', borderRadius: '24px', border: '1px solid #bee3f8', textAlign: 'center' }}>
          <h3 style={{ color: '#2b6cb0', marginBottom: '10px' }}>Sei un professionista sanitario?</h3>
          <p style={{ color: '#2c5282', marginBottom: '20px' }}>Aumenta la tua visibilità a Roma e ricevi contatti diretti dai pazienti.</p>
          <a href="/per-i-professionisti" style={{ color: '#3182ce', fontWeight: 'bold', textDecoration: 'underline' }}>Scopri i vantaggi dell'iscrizione</a>
        </div>
      </main>

      {/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
