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
  const zoneRoma = [
    "Appio Latino", "Cassia", "Centro Storico", "EUR", "Flaminio", 
    "Magliana", "Monteverde", "Nomentano", "Ostiense", "Parioli", 
    "Prati", "San Giovanni", "Tiburtina", "Trastevere"
  ];
const eseguiRicerca = () => {
    if(!ricerca) {
      alert("Per favore, scrivi cosa stai cercando.");
      return;
    }

    const cosa = ricerca.toLowerCase();
    const zonaKebab = zonaScelta.toLowerCase().replace(/\s+/g, '-');
    const parametri = "?zona=" + encodeURIComponent(zonaScelta) + "&cerca=" + encodeURIComponent(cosa);

    // --- AREA DENTISTI ---
    if (cosa.includes("dent") || cosa.includes("odont") || cosa.includes("carie") || cosa.includes("pulizia") || cosa.includes("apparecch")) {
      if (["prati", "eur", "san-giovanni"].includes(zonaKebab)) {
        window.location.href = "/dentisti-roma-" + zonaKebab;
      } else {
        window.location.href = "/dentisti-roma" + parametri;
      }
    } 

    // --- AREA CARDIOLOGI ---
    else if (cosa.includes("cardiol")) {
      if (zonaKebab === "prati") {
        window.location.href = "/cardiologi-roma-prati";
      } else {
        window.location.href = "/visite-specialistiche-roma" + parametri;
      }
    }

    // --- AREA DIAGNOSTICA (Aggiunto Roma Nord per Parioli/Flaminio) ---
    else if (cosa.includes("tac") || cosa.includes("risonanza") || cosa.includes("analisi") || cosa.includes("ecograf")) {
      if (zonaKebab === "parioli" || zonaKebab === "flaminio") {
        window.location.href = "/diagnostica-roma-nord";
      } else {
        window.location.href = "/diagnostica-roma" + parametri;
      }
    }

    // --- AREA FARMACIE ---
    else if (cosa.includes("farmac") || cosa.includes("holter") || cosa.includes("pressio")) {
      if (zonaKebab === "centro-storico") {
        window.location.href = "/farmacie-roma-centro";
      } else {
        window.location.href = "/farmacie-roma" + parametri;
      }
    }

    // --- SERVIZI A DOMICILIO (Aggiunto Roma Sud per Magliana/Ostiense) ---
    else if (cosa.includes("domicilio") || cosa.includes("infermier") || cosa.includes("fisio")) {
      if (["eur", "ostiense", "magliana"].includes(zonaKebab)) {
        window.location.href = "/servizi-domicilio-roma-sud";
      } else {
        window.location.href = "/servizi-domicilio-roma" + parametri;
      }
    }

    // --- TUTTO IL RESTO ---
    else {
      window.location.href = "/visite-specialistiche-roma" + parametri;
    }
  };
return (
  <>
  <Head>
  <title key="title">Sanità Roma: Farmacie, Medici e Diagnostica | Gennaio 2026 - ServiziSalute</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <meta name="description" content="Trova farmacie di turno, dentisti e centri diagnostici a Roma. Cerca per quartiere (Prati, EUR, Parioli) e contatta direttamente i migliori specialisti sanitari a Roma aggiornati a Gennaio 2026." />
  <meta name="google-site-verification" content="JOLNAhLCBewaxp5pArcbUGUa6QheB4wDR6TkuOghgzU" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  {/* --- SCHEMA SEO INTEGRATO: ORGANIZATION + SEARCH + FAQ --- */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ServiziSalute Roma",
          "url": "https://servizisalute.com",
          "logo": "https://servizisalute.com/favicon.ico",
          "sameAs": [
            "https://www.facebook.com/servizisaluteroma", // Aggiungi i tuoi social se li hai
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
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://servizisalute.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://servizisalute.com/visite-specialistiche-roma?cerca={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
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
                "text": "Puoi filtrare per branca medica (Oculista, Cardiologo, Psicologo) e quartiere di Roma. Una volta scelto il medico, trovi il link all'agenda digitale o il contatto telefonico per fissare l'appuntamento."
              }
            }
          ]
        }
      ]),
    }}
  />
</Head>
    <div style={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
       
{/* HERO SECTION - AGGIORNATA V2 */}
<section className="hero" style={{ backgroundColor: '#f0fdf4', paddingBottom: '50px', borderBottom: '1px solid #dcfce7' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    
    {/* TITOLO PRINCIPALE (H1) */}
    <h1 style={{ color: '#065f46', fontWeight: '900', fontSize: '38px', marginBottom: '10px' }}>
      Servizi Sanitari Roma: Trova il meglio vicino a te
    </h1>
    
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
    <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '14px', boxSizing: 'border-box' }}>
      <option>Tutte le categorie</option>
      <option>Farmacie</option>
      <option>Dentisti</option>
      <option>Diagnostica</option>
      <option>Visite Specialistiche</option>
      <option>Servizi a Domicilio</option>
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
     <div className="container" style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
  <p style={{ fontSize: '14px', color: '#1e3a8a', fontStyle: 'italic' }}>
    🔹 <strong>Focus Roma:</strong> Oltre 500 pazienti hanno cercato uno specialista nelle ultime 24 ore
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

    {/* BOX 3 - VISITE */}
    <div className="s-box">
      <div className="s-icon">📈</div>
      <div className="s-text">
        <div className="s-num">+15K</div>
        <div className="s-lab">Accessi Gennaio 2026</div>
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
    // Usiamo nomi unici per lo stato per evitare conflitti nel build
    const [idCat, setIdCat] = useState(0); 
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
              <div className="cat-circle-big" style={{ backgroundColor: elencoCategorie[idCat].bg, border: '2px solid ' + elencoCategorie[elencoCategorie[idCat].bc] || elencoCategorie[idCat].bc }}>
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
     {/* SEZIONE ANNUNCI E SERVIZI - ORDINE CORRETTO */}
      <UltimiAnnunci />
      
      <ServiziRichiesti />
  {/* SEZIONE PERCHÉ SCEGLIERE NOI */}
      <section style={{ background: '#f4f7f6', padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#333' }}>Perché scegliere ServiziSalute?</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>Trovi i migliori servizi sanitari a Roma in pochi click</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-search-location" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Trovi subito ciò che ti serve</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Ricerca per zona, categoria e servizio specifico. Trovi i professionisti sanitari più vicini a casa tua.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-user-check" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Solo professionisti verificati</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Tutti i servizi sono offerti da professionisti qualificati e strutture sanitarie autorizzate.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-hand-holding-usd" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Gratuito e senza commissioni</h4>
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
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
              <i className="fas fa-bullhorn" style={{ fontSize: '30px', color: '#28a745', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Pubblicazione gratuita</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Pubblica i tuoi servizi senza costi iniziali. Nessuna commissione sulle prenotazioni ricevute.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
              <i className="fas fa-map-marked-alt" style={{ fontSize: '30px', color: '#28a745', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Visibilità su Roma</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Raggiungi migliaia di utenti che cercano servizi sanitari ogni giorno nella capitale.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
              <i className="fas fa-chart-line" style={{ fontSize: '30px', color: '#28a745', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Cresci la Tua Visibilità</h4>
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
            <strong>ServiziSalute Roma</strong> è il portale di riferimento progettato per semplificare la ricerca di <a href="/farmacie-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>farmacie a Roma</a>, <a href="/dentisti-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>dentisti</a>, <a href="/diagnostica-roma" style={{color: '#065f46', fontWeight: 'bold', textDecoration: 'none'}}>centri diagnostici</a> e visite specialistiche nella Capitale. Grazie al nostro motore di ricerca ottimizzato, puoi individuare in pochi secondi i migliori <strong>servizi sanitari a Roma</strong>, filtrando i risultati per quartiere e categoria di appartenenza.
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
            Domande Frequenti sui Servizi Sanitari a Roma
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#065f46', marginBottom: '10px' }}>Come trovo una farmacia di turno a Roma su ServiziSalute?</h4>
              <p style={{ color: '#64748b' }}>Basta inserire "Farmacia" e il tuo quartiere nella barra di ricerca in alto. Ti mostreremo le strutture più vicine con i riferimenti diretti.</p>
            </div>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#065f46', marginBottom: '10px' }}>I contatti dei medici sono diretti?</h4>
              <p style={{ color: '#64748b' }}>Certamente. ServiziSalute non fa intermediazione. Troverai i pulsanti per chiamare direttamente lo studio medico o prenotare sul loro sito ufficiale.</p>
            </div>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#065f46', marginBottom: '10px' }}>È possibile prenotare una visita specialistica online?</h4>
              <p style={{ color: '#64748b' }}>Sì, molti professionisti presenti sul portale offrono il link diretto alla loro agenda digitale o permettono la prenotazione rapida tramite WhatsApp.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 📧 SEZIONE NEWSLETTER SOFT */}
      <section style={{ backgroundColor: '#f8fafc', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '45px 30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #edf2f7' }}>
            <h3 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '800' }}>
              Resta informato sulla salute nel tuo quartiere
            </h3>
            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
              Ricevi ogni 15 giorni le nuove aperture e i turni delle farmacie aggiornati a Roma.
            </p>
            
            <form style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input 
                type="email" 
                placeholder="La tua email migliore..." 
                style={{ padding: '16px 22px', borderRadius: '12px', border: '2px solid #edf2f7', width: '340px', fontSize: '16px', backgroundColor: '#f1f5f9' }} 
              />
              <button 
                type="button"
                onClick={() => alert('Ottimo! Ti abbiamo inserito nella lista aggiornamenti di ServiziSalute Roma.')}
                style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 30px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
              >
                Iscrivimi Gratis
              </button>
            </form>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '20px' }}>📍 Servizio dedicato ai cittadini di Roma. Zero Spam.</p>
          </div>
        </div>
      </section>

      <Footer />
</div>
</>
  );

}
