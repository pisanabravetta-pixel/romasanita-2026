// Versione 1.0.1 - Aggiornamento titoli 2026-01-21

import Head from 'next/head';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UltimiAnnunci from '../components/UltimiAnnunci';
import ServiziRichiesti from '../components/ServiziRichiesti';

export default function Home() {
  const [ricerca, setRicerca] = useState(""); 
  const [zonaScelta, setZonaScelta] = useState("Tutta Roma");
  const [catScelta, setCatScelta] = useState(""); // <-- SPOSTATO QUI IN ALTO
  const [idCat, setIdCat] = useState(0);
const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataAttuale = new Date();
  const meseCorrente = mesi[dataAttuale.getMonth()];
  const annoCorrente = dataAttuale.getFullYear();
  const dataStringa = `${meseCorrente} ${annoCorrente}`;
  const zoneRoma = [
    "Appio Latino", "Cassia", "Centro Storico", "EUR", "Flaminio", 
    "Magliana", "Monteverde", "Nomentano", "Ostiense", "Parioli", 
    "Prati", "San Giovanni", "Tiburtina", "Trastevere"
  ];

 const eseguiRicerca = () => {
  let termineDaCercare = ricerca.trim();
  
  if (!termineDaCercare && catScelta) {
    termineDaCercare = catScelta;
  }

  if (!termineDaCercare) {
    alert("Per favore, scrivi cosa stai cercando o seleziona una categoria.");
    return;
  }

  const cosa = termineDaCercare.toLowerCase();
  const zonaKebab = zonaScelta.toLowerCase().replace(/\s+/g, '-');
  const parametri = "?zona=" + encodeURIComponent(zonaScelta) + "&cerca=" + encodeURIComponent(cosa);

  // I tuoi 10 quartieri ufficiali
  const quartieriValidi = [
    "prati", "eur", "parioli", "centro-storico", "san-giovanni", 
    "monteverde", "ostia", "tiburtina", "aurelio", "montesacro"
  ];

  // Funzione per decidere la destinazione
  const vaiAPagina = (slugBase) => {
    if (quartieriValidi.includes(zonaKebab)) {
      window.location.href = `/${slugBase}-${zonaKebab}`;
    } else {
      window.location.href = `/${slugBase}` + parametri;
    }
  };

  // --- LOGICA DI REINDIRIZZAMENTO ---
  if (cosa.includes("dermatol")) {
    vaiAPagina("dermatologi-roma");
  } 
  else if (cosa.includes("cardiol")) {
    vaiAPagina("cardiologi-roma");
  } 
  else if (cosa.includes("psicol") || cosa.includes("terapia") || cosa.includes("psicoterap")) {
    vaiAPagina("psicologi-roma");
  } 
  else if (cosa.includes("ginecol") || cosa.includes("ostetr")) {
    vaiAPagina("ginecologi-roma");
  } 
  else if (cosa.includes("oculist") || cosa.includes("vista")) {
    vaiAPagina("oculisti-roma");
  } 
  else if (cosa.includes("ortoped")) {
    vaiAPagina("ortopedici-roma");
  } 
  else if (cosa.includes("nutrizion") || cosa.includes("diet")) {
    vaiAPagina("nutrizionisti-roma");
  } 
  else if (cosa.includes("dent") || cosa.includes("odont")) {
    vaiAPagina("dentisti-roma");
  }
  // Diagnostica e Farmacie vanno alle loro hub (non hanno pagine quartiere specifiche per ora)
  else if (cosa.includes("tac") || cosa.includes("risonanza") || cosa.includes("analisi") || cosa.includes("ecograf")) {
    window.location.href = "/diagnostica-roma" + parametri;
  } 
  else if (cosa.includes("farmac")) {
    window.location.href = "/farmacie-roma" + parametri;
  } 
  // FALLBACK: Se non è nulla di quanto sopra, vai alla hub generale
  else {
    window.location.href = "/servizi-sanitari-roma" + parametri;
  }
};

  // --- ORA SCENDI NEL RETURN E CERCA IL SELECT DELLA CATEGORIA ---

return (
  <>
<Head>
  <title key="title">{`ServiziSalute.com | Portale Sanità Roma (${dataStringa}) - Strutture e Specialisti`}</title>
  <link rel="canonical" href="https://www.servizisalute.com/" />
  
<meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Il network di riferimento per la sanità a Roma. Trova rapidamente medici, farmacie e centri diagnostici suddivisi per quartiere. Contatti diretti, mappe e orari aggiornati." />
  
  {/* OTTIMIZZAZIONE VELOCITÀ */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
 <link rel="preconnect" href="https://images.unsplash.com" />

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

 
  <meta name="google-site-verification" content="JOLNAhLCBewaxp5pArcbUGUa6QheB4wDR6TkuOghgzU" />
  <link rel="icon" href="/favicon.ico" />

  {/* --- SCHEMA SEO INTEGRATO: ORGANIZATION + SEARCH + FAQ --- */}
 <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://www.servizisalute.com/#organization",
          "name": "ServiziSalute Roma",
          "url": "https://www.servizisalute.com",
          "logo": "https://www.servizisalute.com/favicon.ico",
          "sameAs": [
            "https://www.facebook.com/servizisaluteroma",
            "https://www.instagram.com/servizisaluteroma"
          ],
          "description": "Il portale della sanità romana per trovare farmacie, dentisti e specialisti.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Roma",
            "addressRegion": "RM",
            "addressCountry": "IT"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://www.servizisalute.com/#website",
          "url": "https://www.servizisalute.com",
          "name": "ServiziSalute",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.servizisalute.com/visite-specialistiche-roma?cerca={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.servizisalute.com/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Come trovo una farmacia di turno a Roma su ServiziSalute?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Basta inserire 'Farmacia' e il tuo quartiere (es. Prati o EUR) nella barra di ricerca su ServiziSalute. Ti mostreremo le strutture più vicine con orari e riferimenti diretti."
              }
            },
            {
              "@type": "Question",
              "name": "I contatti dei medici a Roma sono diretti?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sì, ServiziSalute non è un intermediario. Puoi chiamare direttamente lo studio medico a Roma o cliccare sul tasto WhatsApp per parlare con la segreteria del professionista."
              }
            },
            {
              "@type": "Question",
              "name": "Come prenotare una visita specialistica a Roma?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Puoi filtrare per branca medica e quartiere di Roma. Una volta scelto il medico, trovi il link all'agenda digitale o il contatto telefonico diretto per fissare l'appuntamento."
              }
            }
          ]
        }
      ]
    }),
  }}
/>
</Head>
    <div style={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
       <main>
{/* HERO SECTION - AGGIORNATA V2 */}
<section className="hero" style={{ backgroundColor: '#f0fdf4', paddingBottom: '50px', borderBottom: '1px solid #dcfce7' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    
    {/* TITOLO PRINCIPALE (H1) */}
<div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>
  {/* Nome Brand - Grande e VERDE SCURO */}
  <h1 style={{ 
    fontSize: '44px', 
    fontWeight: '900', 
    color: '#064e3b', // Verde scuro profondo (molto autorevole)
    letterSpacing: '-1.5px',
    marginBottom: '8px',
    lineHeight: '1'
  }}>
    ServiziSalute.com
  </h1>
  
  {/* Slogan - In VERDE SCURO coordinato (più sottile) */}
  <p style={{ 
    fontSize: '19px', 
    fontWeight: '600', 
    color: '#065f46', // Verde scuro leggermente più chiaro per staccare
    maxWidth: '600px', 
    margin: '0 auto',
    letterSpacing: '-0.2px'
  }}>
    Trova strutture e professionisti sanitari a Roma
  </p>
</div>
    
    {/* SOTTOTITOLO (P) - rimosso "verificati" */}
    <p style={{ marginBottom: '40px', color: '#475569', fontWeight: '500', fontSize: '18px' }}>
      Il portale della sanità romana: Farmacie, Dentisti, Centri Diagnostici e Specialisti.
    </p>

 {/* LA TUA BARRA INTELLIGENTE - VERSIONE DEFINITIVA CENTRATA */}
<div className="search-box-container" style={{ 
  backgroundColor: 'white', 
  padding: '20px', 
  borderRadius: '20px', 
  boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'flex-end',
  justifyContent: 'center',
  border: '2px solid #065f46',
  maxWidth: '850px', 
  margin: '0 auto', // Centra su PC
  width: '90%', // Ridotto leggermente per dare aria ai lati su mobile
  boxSizing: 'border-box'
}}>
  
  {/* 1. COSA CERCHI */}
  <div className="search-input-group" style={{ flex: '1', minWidth: '200px', textAlign: 'left', boxSizing: 'border-box' }}>
    <label style={{ fontSize: '11px', fontWeight: '900', color: '#065f46', marginBottom: '5px', display: 'block' }}>COSA CERCHI</label>
    <input 
      type="text" 
      placeholder="Es: Farmacia, Cardiologo..." 
      value={ricerca}
      onChange={(e) => setRicerca(e.target.value)}
      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
    />
  </div>

  {/* 2. ZONA / QUARTIERE */}
  <div className="search-input-group" style={{ flex: '1', minWidth: '180px', textAlign: 'left', boxSizing: 'border-box' }}>
    <label style={{ fontSize: '11px', fontWeight: '900', color: '#065f46', marginBottom: '5px', display: 'block' }}>ZONA / QUARTIERE</label>
    <select 
  aria-label="Seleziona Quartiere"
  value={zonaScelta} 
  onChange={(e) => setZonaScelta(e.target.value)}
  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '14px', boxSizing: 'border-box' }}
>
  <option>Tutta Roma</option>
  {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
</select>
  </div>

{/* 3. CATEGORIA */}
<div className="search-input-group" style={{ flex: '1', minWidth: '180px', textAlign: 'left', boxSizing: 'border-box' }}>
  <label style={{ fontSize: '11px', fontWeight: '900', color: '#065f46', marginBottom: '5px', display: 'block' }}>CATEGORIA</label>
 <select 
  aria-label="Seleziona Categoria"
  value={catScelta} // <-- Collegato al nuovo stato
  onChange={(e) => setCatScelta(e.target.value)} // <-- Cambia catScelta e NON ricerca
  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '14px', boxSizing: 'border-box' }}
>
  <option value="">Tutte le categorie</option>
  <option value="Farmacie">Farmacie</option>
  <option value="Dentisti">Dentisti</option>
  <option value="Diagnostica">Diagnostica</option>
  <option value="Specialisti">Visite Specialistiche</option>
  <option value="Domicilio">Servizi a Domicilio</option>
</select>
</div>
  {/* BOTTONE CERCA */}
  <button 
    className="btn-search" 
    onClick={eseguiRicerca}
    style={{ 
      backgroundColor: '#065f46', 
      color: 'white', 
      padding: '12px 25px', 
      borderRadius: '10px', 
      fontWeight: '900', 
      border: 'none', 
      cursor: 'pointer',
      height: '46px',
      minWidth: '100px',
      boxSizing: 'border-box'
    }}
  >
    CERCA
  </button>

  <style jsx>{`
    @media (max-width: 768px) {
      .search-box-container {
        width: 92% !important; /* Forza la larghezza centrata */
        margin: 0 auto !important;
        padding: 15px !important;
        gap: 15px !important;
      }
      .search-input-group {
        min-width: 100% !important;
        flex: none !important;
      }
      .btn-search {
        width: 100% !important;
        margin-top: 5px;
      }
    }
  `}</style>
</div>
    {/* LINK HUB STRATEGICO */}
    <div style={{ marginTop: '30px' }}>
      <a href="/servizi-sanitari-roma" style={{ 
        color: '#2563eb', 
        fontWeight: '800', 
        textDecoration: 'none', 
        borderBottom: '2px solid #2563eb',
        fontSize: '15px'
      }}>
        👉 VEDI TUTTI I SERVIZI DISPONIBILI A ROMA
      </a>
    </div>

  </div>
</section>
  {/* TESTO SEO DI TRANSIZIONE (SPOSTATO PRIMA DELLE STATISTICHE) */}
<div className="container" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '10px', padding: '0 20px' }}>
  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', fontWeight: '500', maxWidth: '850px', margin: '0 auto' }}>
    ServiziSalute ti aiuta a trovare farmacie, medici e centri diagnostici nei quartieri di Roma: un sistema veloce e gratuito per contattare direttamente i migliori professionisti sanitari della Capitale.
  </p>
</div>

{/* SEZIONE STATISTICHE - PC ORIGINALE / MOBILE: 3 BOX QUADRATI IN RIGA */}
<section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
  <div className="stats-wrapper">
    
    {/* BOX 1 - ANNUNCI */}
    <div className="s-box">
      <div className="s-icon">📢</div>
      <div className="s-text">
        <div className="s-num">+1.500</div>
        <div className="s-lab">Annunci Online</div>
      </div>
    </div>

    {/* BOX 2 - PROFESSIONISTI */}
    <div className="s-box">
      <div className="s-icon">👨‍⚕️</div>
      <div className="s-text">
        <div className="s-num">+850</div>
        <div className="s-lab">Professionisti</div>
      </div>
    </div>

   {/* BOX 3 - VISITE (TESTO NORMALIZZATO) */}
<div className="s-box">
  <div className="s-icon">📈</div>
  <div className="s-text">
    <div className="s-num">MIGLIAIA</div>
    <div className="s-lab">Ricerche mensili</div>
  </div>
</div>

  </div>

  <style jsx>{`
    .stats-wrapper {
      display: flex;
      justify-content: center;
      gap: 15px;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .s-box {
      background-color: #fff;
      border: 2px solid #065f46;
      padding: 15px 20px;
      border-radius: 12px;
      width: 200px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      box-sizing: border-box;
    }

    .s-icon { font-size: 24px; flex-shrink: 0; }
    .s-text { text-align: left; }
    .s-num { font-size: 18px; font-weight: bold; color: #2563eb; line-height: 1; }
    .s-lab { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }

    @media (max-width: 768px) {
      .stats-wrapper {
        gap: 5px; /* Spazio minimo per farli stare tutti */
        padding: 0 10px;
        justify-content: space-between;
      }

      .s-box {
        flex-direction: column;
        padding: 10px 2px;
        width: 32%; /* Forza i tre box a dividersi lo spazio */
        min-width: 0; /* Impedisce al contenuto di allargare il box */
        gap: 5px;
        text-align: center;
        aspect-ratio: 1 / 1;
        justify-content: center;
        border-radius: 8px;
      }

      .s-text { text-align: center; width: 100%; }
      .s-icon { font-size: 20px; }
      .s-num { font-size: 15px; } /* Leggermente ridotto per non far uscire il testo */
      .s-lab { 
        font-size: 8px; 
        white-space: normal; /* Permette al testo di andare a capo se troppo lungo */
        line-height: 1.1;
      }
    }
  `}</style>
</section>
{/* --- SEZIONE CATEGORIE - RETTANGOLO GRANDE MOBILE CON FRECCE INTERNE --- */}
<section style={{ padding: '50px 0 20px', textAlign: 'center' }}>
  <div className="container">
    <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Esplora le Categorie</h2>
    <p style={{ color: '#666' }}>Trova il servizio sanitario di cui hai bisogno a Roma</p>
  </div>
</section>

<div style={{ paddingBottom: '50px', backgroundColor: '#f6f7f9' }}>
  {(() => {
    
     const elencoCategorie = [
      { n: 'Farmacie', i: '💊', l: '/farmacie-roma', bg: '#fff0f3', bc: '#e91e63' },
      { n: 'Dentisti', i: '🦷', l: '/dentisti-roma', bg: '#e3f2fd', bc: '#2196f3' },
      { n: 'Diagnostica', i: '🔬', l: '/diagnostica-roma', bg: '#f3e5f5', bc: '#9c27b0' },
      { n: 'Specialisti', i: '👨‍⚕️', l: '/visite-specialistiche-roma', bg: '#e8f5e9', bc: '#4caf50' },
      { n: 'Domicilio', i: '🏠', l: '/servizi-domicilio-roma', bg: '#fff3e0', bc: '#ff9800' }
    ];

    return (
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        
        {/* MOBILE: RETTANGOLO LARGO CON FRECCE DENTRO */}
        <div className="cat-mobile-layout">
          <div className="cat-rect-box">
            {/* Freccia SX dentro il box */}
            <button onClick={() => setIdCat(idCat === 0 ? 4 : idCat - 1)} className="btn-in sx">‹</button>
            
            <a href={elencoCategorie[idCat].l} className="cat-content">
<div className="cat-circle-big" style={{ backgroundColor: elencoCategorie[idCat].bg, border: `2px solid ${elencoCategorie[idCat].bc}` }}>
  {elencoCategorie[idCat].i}
</div>
              <span className="cat-title-big">{elencoCategorie[idCat].n}</span>
            </a>

            {/* Freccia DX dentro il box */}
            <button onClick={() => setIdCat(idCat === 4 ? 0 : idCat + 1)} className="btn-in dx">›</button>
          </div>
        </div>

        {/* PC: GRID ORIGINALE (5 BOX RETTANGOLARI) */}
        <div className="cat-pc-layout">
          {elencoCategorie.map((item, idx) => (
            <a key={idx} href={item.l} className="box-pc-original">
              <div className="icon-pc-circle" style={{ backgroundColor: item.bg, border: `1px solid ${item.bc}` }}>{item.i}</div>
              <span className="label-pc-text">{item.n}</span>
            </a>
          ))}
        </div>

        <style jsx>{`
          /* PC STYLE */
          .cat-pc-layout { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
          .box-pc-original {
            text-decoration: none; color: inherit; background: white; padding: 20px 10px;
            border-radius: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); width: 180px;
            display: flex; flex-direction: column; align-items: center; text-align: center; border: 2px solid #065f46;
          }
          .icon-pc-circle { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; font-size: 24px; }
          .label-pc-text { font-weight: 600; font-size: 15px; }

          /* MOBILE STYLE - RETTANGOLO LARGO */
          .cat-mobile-layout { display: none; width: 100%; justify-content: center; padding: 10px 0; }
          .cat-rect-box {
            position: relative;
            background: white;
            width: 100%;
            max-width: 400px; /* Larghezza massima su cellulari grandi */
            height: 140px;    /* Altezza rettangolare */
            border: 2px solid #065f46;
            border-radius: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .cat-content {
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          .cat-circle-big {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin-bottom: 8px;
          }
          .cat-title-big { font-weight: 800; font-size: 20px; color: #333; }

          /* FRECCE DENTRO IL BOX */
          .btn-in {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50px;
            background: rgba(6, 95, 70, 0.05); /* Sfondo leggerissimo per farle vedere */
            border: none;
            color: #065f46;
            font-size: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
          }
          .btn-in:active { background: rgba(6, 95, 70, 0.1); }
          .sx { left: 0; border-right: 1px solid #eee; }
          .dx { right: 0; border-left: 1px solid #eee; }

          @media (max-width: 768px) {
            .cat-pc-layout { display: none; }
            .cat-mobile-layout { display: flex; }
          }
        `}</style>
      </div>
    );
  })()}
</div>
{/* MICRO CTA PROFESSIONISTI - B2B CONVERSION */}
<div style={{ backgroundColor: '#065f46', padding: '15px 0', textAlign: 'center' }}>
  <div className="container">
    <p style={{ color: 'white', margin: 0, fontWeight: '700', fontSize: '15px' }}>
      Sei un medico o gestisci una struttura a Roma? 
      <a href="/pubblica-annuncio" style={{ color: '#fbbf24', marginLeft: '10px', textDecoration: 'underline' }}>
        Inserisci la tua attività gratis →
      </a>
    </p>
  </div>
</div>

     {/* SEZIONE ANNUNCI E SERVIZI - ORDINE CORRETTO */}
      <UltimiAnnunci />
      
      <ServiziRichiesti />
       
   <section style={{ padding: '40px 0', backgroundColor: '#f8fafc', borderBottom: '1px solid #eee' }}>
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
    <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#0f172a' }}>
      Servizi sanitari a Roma per quartiere
    </h3>
    
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
      {/* Link strutturati per il tuo file [slug].js (categoria-roma-quartiere) */}
      <a href="/farmacie-roma-prati" style={{ color: '#065f46', textDecoration: 'none', fontWeight: '700' }}>Farmacie Prati</a>
      <span style={{ color: '#cbd5e1' }}>•</span>
      <a href="/dentisti-roma-parioli" style={{ color: '#065f46', textDecoration: 'none', fontWeight: '700' }}>Dentisti Parioli</a>
      <span style={{ color: '#cbd5e1' }}>•</span>
      <a href="/farmacie-roma-eur" style={{ color: '#065f46', textDecoration: 'none', fontWeight: '700' }}>Farmacie EUR</a>
      <span style={{ color: '#cbd5e1' }}>•</span>
      <a href="/dermatologi-roma-san-giovanni" style={{ color: '#065f46', textDecoration: 'none', fontWeight: '700' }}>Dermatologi San Giovanni</a>
    </div>

    {/* Link alla pagina hub dei quartieri */}
    <a href="/quartieri-roma" style={{ 
      display: 'inline-block',
      padding: '12px 24px', 
      backgroundColor: '#0d7a71',
      color: 'white', 
      borderRadius: '50px', 
      textDecoration: 'none', 
      fontWeight: '800',
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)'
    }}>
      Visualizza tutti i quartieri →
    </a>
  </div>
</section>
  {/* SEZIONE PERCHÉ SCEGLIERE NOI */}
<section style={{ background: '#f4f7f6', padding: '70px 0' }}>
  <div className="container">
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#333' }}>Perché scegliere ServiziSalute?</h2>
      <p style={{ fontSize: '18px', color: '#666' }}>Trovi i migliori servizi sanitari a Roma in pochi click</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
      
      {/* Box 1 */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <svg viewBox="0 0 512 512" width="40" height="40" fill="#0070f3" style={{ marginBottom: '20px' }}>
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>Trovi subito ciò che ti serve</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Ricerca per zona, categoria e servizio specifico. Trovi i professionisti sanitari più vicini a casa tua.</p>
      </div>

      {/* Box 2 */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <svg viewBox="0 0 448 512" width="40" height="40" fill="#0070f3" style={{ marginBottom: '20px' }}>
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
        </svg>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>Solo professionisti verificati</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Tutti i servizi sono offerti da professionisti qualificati e strutture sanitarie autorizzate.</p>
      </div>

      {/* Box 3 - Sostituisci questo pezzo */}
<div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
  <svg viewBox="0 0 576 512" width="40" height="40" fill="#0070f3" style={{ marginBottom: '20px' }}>
    <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM160 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h96c13.3 0 24-10.7 24-24s-10.7-24-24-24H160z"/>
  </svg>
  <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>Gratuito e senza commissioni</h3>
  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Il portale è completamente gratuito per gli utenti. Nessuna intermediazione, contatti diretti.</p>
</div>

    </div>
  </div>
</section>
      {/* SEZIONE PERCHÉ PUBBLICARE */}
<section style={{ background: 'white', padding: '70px 0' }}>
  <div className="container">
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#333' }}>Perché pubblicare su ServiziSalute?</h2>
      <p style={{ fontSize: '18px', color: '#666' }}>Raggiungi nuovi pazienti nella tua zona</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px' }}>
      
      {/* Box 1 - Pubblicazione gratuita */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
        <svg viewBox="0 0 512 512" width="40" height="40" fill="#28a745" style={{ marginBottom: '20px' }}>
          <path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352h8.7c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.1V341.9c-43.7-39.5-100.2-61.9-158.3-61.9H256V168h1.7c58.1 0 114.6-22.4 158.3-61.9z"/>
        </svg>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>Pubblicazione gratuita</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Pubblica i tuoi servizi senza costi iniziali. Nessuna commissione sulle prenotazioni ricevute.</p>
      </div>

      {/* Box 2 - Visibilità su Roma */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
        <svg viewBox="0 0 576 512" width="40" height="40" fill="#28a745" style={{ marginBottom: '20px' }}>
          <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.9zM15.1 95.1L160 37.1V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"/>
        </svg>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>Visibilità su Roma</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Raggiungi migliaia di utenti che cercano servizi sanitari ogni giorno nella capitale.</p>
      </div>

      {/* Box 3 - Crescita Visibilità */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
        <svg viewBox="0 0 448 512" width="40" height="40" fill="#28a745" style={{ marginBottom: '20px' }}>
          <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 176c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H416c-26.5 0-48-21.5-48-48V176z"/>
        </svg>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '700' }}>Cresci la Tua Visibilità</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Con più contatti puoi far crescere il tuo business sanitario a Roma.</p>
      </div>

    </div>
    <div style={{ textAlign: 'center' }}>
      <a href="/pubblica-annuncio" style={{ 
        backgroundColor: '#0070f3', color: 'white', padding: '18px 40px', borderRadius: '50px', 
        textDecoration: 'none', fontWeight: '700', fontSize: '18px', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,112,243,0.3)' 
      }}>
        Pubblica il tuo annuncio gratis
      </a>
    </div>
  </div>
</section>

  {/* SEZIONE SEO ROMA - OTTIMIZZATA CON TITOLI E PAROLE CHIAVE */}
      <section style={{ padding: '60px 0', background: '#f8fbff' }}>
        <div className="container" style={{ 
          background: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #e1e8f0',
          textAlign: 'left', fontSize: '15px', lineHeight: '1.8', color: '#444', maxWidth: '1100px', margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46', marginBottom: '15px' }}>
            ServiziSalute Roma: Il tuo punto di riferimento per la sanità locale
          </h2>
         <p style={{ marginBottom: '20px' }}>
  <strong>ServiziSalute Roma</strong> è il portale di riferimento progettato per semplificare la ricerca di <a href="/farmacie-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>farmacie a Roma</a>, <a href="/dentisti-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>dentisti</a>, <a href="/diagnostica-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>centri diagnostici</a> e <a href="/dermatologi-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>visite specialistiche</a> nella Capitale. Grazie al nostro motore di ricerca ottimizzato, puoi individuare in pochi secondi i migliori <strong>servizi sanitari a Roma</strong>, filtrando i risultati per quartiere e categoria di appartenenza.
</p>
          
          <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '10px' }}>
            Trova Farmacie e Specialisti nei quartieri di Roma
          </h3>
          <p style={{ marginBottom: '20px' }}>
            Che tu stia cercando una <strong>farmacia di turno a <a href="/farmacie-roma-prati" style={{color: '#1e3a8a', textDecoration: 'none'}}>Roma Prati</a></strong>, un <strong>dentista all'<a href="/dentisti-roma-eur" style={{color: '#1e3a8a', textDecoration: 'none'}}>EUR</a></strong> o un centro per <strong>analisi cliniche a Roma Nord</strong>, ServiziSalute ti mette in contatto diretto con le strutture, senza intermediari. La nostra missione è rendere la salute accessibile e veloce per tutti i cittadini romani, aggregando in un unico posto laboratori di analisi, studi medici e parafarmacie sempre aggiornati.
          </p>
          
          <p style={{ fontSize: '14px', borderTop: '1px solid #eee', paddingTop: '15px', color: '#64748b' }}>
            Esplora le nostre categorie principali: <a href="/farmacie-roma" style={{color: '#065f46', fontWeight: '600', textDecoration: 'none'}}>Farmacie Roma</a>, 
            studi dentistici specializzati, laboratori di diagnostica e le migliori <strong>visite specialistiche Roma</strong> per ogni branca medica.
          </p>
        </div>
      </section>

     {/* SEZIONE FAQ - AGGIORNATA A 3 DOMANDE PER COERENZA V2 */}
 <section style={{ padding: '40px 0', background: 'white' }}>
   <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
     <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a8a', textAlign: 'center', marginBottom: '40px' }}>
       Domande Frequenti sui Servizi Sanitari a Roma — {dataStringa}
     </h2>
     <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
       
       <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
         <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#065f46', marginBottom: '10px' }}>Come trovo una farmacia di turno a Roma su ServiziSalute?</h3>
         <p style={{ color: '#64748b' }}>Basta inserire "Farmacia" e il tuo quartiere nella barra di ricerca in alto. Ti mostreremo le strutture più vicine con i riferimenti diretti.</p>
       </div>

       <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
         <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#065f46', marginBottom: '10px' }}>I contatti dei medici sono diretti?</h3>
         <p style={{ color: '#64748b' }}>Certamente. ServiziSalute non fa intermediazione. Troverai i pulsanti per chiamare direttamente lo studio medico o prenotare sul loro sito ufficiale.</p>
       </div>

       <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
         <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#065f46', marginBottom: '10px' }}>
           Come prenotare una visita specialistica a Roma a {meseCorrente}?
         </h3>
         <p style={{ color: '#64748b', lineHeight: '1.6' }}>
           Puoi filtrare per branca medica e quartiere. Una volta scelto il medico, trovi i contatti aggiornati a <strong>{dataStringa}</strong> per fissare l'appuntamento tramite agenda digitale o telefono.
         </p>
       </div>
     </div>
   </div>
 </section>
{/* 📧 SEZIONE NEWSLETTER FUNZIONANTE - ID: maqbgzzl */}
<section style={{ backgroundColor: '#f8fafc', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
  <div className="container" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
    <div style={{ backgroundColor: '#ffffff', padding: '45px 30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #edf2f7' }}>
      <h3 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '800' }}>
        Resta informato sulla salute nel tuo quartiere
      </h3>
      <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
        Ricevi ogni 15 giorni le nuove aperture e i turni delle farmacie aggiornati a Roma.
      </p>
      
      {/* FORM COLLEGATO A FORMSPREE */}
      <form 
        action="https://formspree.io/f/maqbgzzl" 
        method="POST"
        style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <input 
          type="email" 
          name="email" // Obbligatorio per Formspree
          required
          placeholder="La tua email migliore..." 
          style={{ padding: '16px 22px', borderRadius: '12px', border: '2px solid #edf2f7', width: '340px', fontSize: '16px', backgroundColor: '#f1f5f9' }} 
        />
        <button 
          type="submit"
          style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 30px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
        >
          Iscrivimi Gratis
        </button>
      </form>
      
      <p style={{ fontSize: '12px', color: '#475569', marginTop: '20px' }}>📍 Servizio dedicato ai cittadini di Roma. Zero Spam.</p>
    </div>
  </div>
</section>
</main>
      <Footer />
    </div>
  </>
  );
}
