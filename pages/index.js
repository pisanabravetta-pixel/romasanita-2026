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
    <div style={{ width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <Head>
        <title>ServiziSalute - Il Portale della Sanità a Roma</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="google-site-verification" content="JOLNAhLCBewaxp5pArcbUGUa6QheB4wDR6TkuOghgzU" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

        {/* --- INIZIO SCHEMA ORGANIZATION --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ServiziSalute",
              "url": typeof window !== 'undefined' ? window.location.origin : "https://servizisalute.it",
              "logo": typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : "",
              "description": "Portale informativo di servizi sanitari privati e professionisti della salute a Roma.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Roma",
                "addressRegion": "RM",
                "addressCountry": "IT"
              }
            }),
          }}
        />
        {/* --- FINE SCHEMA ORGANIZATION --- */}
      </Head> 
<Navbar />
       
{/* HERO SECTION - RIPRISTINO RICERCA INTELLIGENTE */}
<section className="hero" style={{ backgroundColor: '#f0fdf4', paddingBottom: '50px', borderBottom: '1px solid #dcfce7' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    <h1 style={{ color: '#065f46', fontWeight: '900', fontSize: '38px', marginBottom: '10px' }}>
      Trova servizi sanitari a Roma, vicino a te
    </h1>
    <p style={{ marginBottom: '40px', color: '#475569', fontWeight: '500' }}>
      Farmacie, dentisti, diagnostica e visite specialistiche in un unico posto
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

{/* SEZIONE STATISTICHE - DATI CORRETTI E STILE COMPATTO */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap',width: '100%',maxWidth: '1100px',boxSizing: 'border-box',margin: '0 auto',padding: '0 15px' }}>
          
          {/* BOX 1 - ANNUNCI */}
          <div style={{ backgroundColor: '#fff', border:'2px solid #065f46', padding: '15px 20px', borderRadius: '12px', width: '200px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px' }}>📢</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', lineHeight: '1' }}>+1.500</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Annunci Online</div>
            </div>
          </div>

          {/* BOX 2 - PROFESSIONISTI (CORRETTO) */}
          <div style={{ backgroundColor: '#fff', border:'2px solid #065f46', padding: '15px 20px', borderRadius: '12px', width: '200px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px' }}>👨‍⚕️</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', lineHeight: '1' }}>+850</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Professionisti</div>
            </div>
          </div>

         {/* BOX 3 - VISITE (AGGIORNATO) */}
<div style={{ backgroundColor: '#fff', border:'2px solid #065f46',  padding: '15px 20px', borderRadius: '12px', width: '200px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
  <div style={{ fontSize: '24px' }}>📈</div>
  <div style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', lineHeight: '1' }}>+15K</div>
    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Accessi Gennaio 2026</div>
  </div>
</div>

        </div>
      </section>
   
{/* --- SEZIONE CATEGORIE - CODICE CORRETTO --- */}
<CategoriaSemplificata />

{/* ... qui sotto ti metto il componente da incollare ... */}
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

      {/* SEZIONE SEO ROMA */}
      <section style={{ padding: '60px 0', background: '#f8fbff' }}>
        <div className="container" style={{ 
          background: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #e1e8f0',
          textAlign: 'justify', fontSize: '15px', lineHeight: '1.8', color: '#444'
        }}>
          <p>
            <span style={{fontSize: '18px', fontWeight: 'bold', color: '#0070f3', display: 'block', marginBottom: '10px'}}>ServiziSalute Roma</span>
            <strong>ServiziSalute Roma</strong> è il portale di riferimento per trovare <strong>farmacie</strong>, <strong>dentisti</strong>, <strong>centri diagnostici</strong> e <strong>visite specialistiche</strong> nella capitale. Il nostro motore di ricerca ti permette di individuare rapidamente i migliori <strong>servizi sanitari Roma</strong> in base alla zona e alla categoria di tuo interesse. Che tu stia cercando una farmacia di turno, un dentista di fiducia o un centro per <strong>visite specialistiche Roma</strong>, il nostro portale ti mette in contatto diretto con i professionisti sanitari della tua zona. <strong>Farmacie Roma</strong>, studi dentistici, laboratori di analisi e specialisti: tutto in un unico posto, gratuito e sempre aggiornato.
          </p>
        </div>
      </section>
{/* 📧 SEZIONE NEWSLETTER SOFT - POSIZIONATA PRIMA DEL FOOTER */}
      <section style={{ backgroundColor: '#f8fafc', padding: '60px 20px', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '45px 30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #edf2f7' }}>
            <h3 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '800' }}>
              Resta informato sulla salute nel tuo quartiere
            </h3>
            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '30px', lineHeight: '1.6' }}>
              Ricevi ogni 15 giorni le nuove aperture, i turni delle farmacie e le guide ai prezzi aggiornate a Roma.
            </p>
            
            <form style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input 
                type="email" 
                placeholder="La tua email migliore..." 
                style={{ 
                  padding: '16px 22px', 
                  borderRadius: '12px', 
                  border: '2px solid #edf2f7', 
                  width: '340px', 
                  outline: 'none',
                  fontSize: '16px',
                  backgroundColor: '#f1f5f9'
                }} 
              />
              <button 
                type="button"
                onClick={() => alert('Ottimo! Ti abbiamo inserito nella lista aggiornamenti di ServiziSalute Roma.')}
                style={{ 
                  backgroundColor: '#2563eb', 
                  color: 'white', 
                  padding: '16px 30px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                }}
              >
                Iscrivimi Gratis
              </button>
            </form>
            
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '20px' }}>
              📍 Servizio dedicato ai cittadini di Roma. Zero Spam.
            </p>
          </div>
        </div>
      </section>
                
<Footer />
    </div>
  );
}
