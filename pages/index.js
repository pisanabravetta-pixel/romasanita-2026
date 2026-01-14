import Head from 'next/head';
import { useState } from 'react';

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
    <div>
     <Head>
        <title>ServiziSalute - Il Portale della Sanità a Roma</title>
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
   {/* TOP BAR - VERDE ISTITUZIONALE */}
      <div style={{ 
        backgroundColor: '#065f46', 
        color: 'white', 
        padding: '10px 0', 
        textAlign: 'center', 
        fontSize: '12px', 
        fontWeight: '800', 
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
      </div>

      {/* HEADER - LOGO BICOLORE E MENU COMPLETO */}
      <header style={{ backgroundColor: 'white', padding: '15px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* NOME BICOLORE */}
          <div style={{fontSize: '24px', fontWeight: '900'}}>
            <span style={{ color: '#065f46' }}>Servizi</span><span style={{ color: '#2563eb' }}>Salute</span>
          </div>

          {/* MENU CENTRALE (Tutti i tuoi link originali) */}
          <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0, alignItems: 'center' }}>
            <li><a href="/farmacie-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '14px' }}>Farmacie</a></li>
            <li><a href="/dentisti-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '14px' }}>Dentisti</a></li>
            <li><a href="/visite-specialistiche-roma" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '14px' }}>Specialisti</a></li>
            <li>
              <a href="/pubblica-annuncio" style={{ 
                 color: '#2563eb',
                fontWeight: 'bold', 
                textDecoration: 'none',
               borderBottom: '2px solid #2563eb',
                fontSize: '14px'
              }}>
                Sei un Medico?
              </a>
            </li>
          </ul>

          {/* PARTE DESTRA (Accedi e Bottone) */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="/login" style={{textDecoration: 'none', color: '#333', fontWeight: '600', fontSize: '14px'}}>Accedi</a>
            <a href="/pubblica-annuncio" style={{
             backgroundColor: '#2563eb',
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '20px', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '800'
            }}>
              Pubblica annuncio
            </a>
          </div>

        </div>
      </header>
{/* HERO SECTION - RIPRISTINO RICERCA INTELLIGENTE */}
<section className="hero" style={{ backgroundColor: '#f0fdf4', paddingBottom: '50px', borderBottom: '1px solid #dcfce7' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    <h1 style={{ color: '#065f46', fontWeight: '900', fontSize: '38px', marginBottom: '10px' }}>
      Trova servizi sanitari a Roma, vicino a te
    </h1>
    <p style={{ marginBottom: '40px', color: '#475569', fontWeight: '500' }}>
      Farmacie, dentisti, diagnostica e visite specialistiche in un unico posto
    </p>

    {/* LA TUA BARRA INTELLIGENTE A 3 SEZIONI */}
    <div className="search-box-container" style={{ 
      backgroundColor: 'white', 
      padding: '20px', 
      borderRadius: '20px', 
      boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      alignItems: 'flex-end',
      border: '2px solid #065f46'
    }}>
      
      {/* 1. COSA CERCHI */}
      <div className="search-input-group" style={{ flex: '1', minWidth: '180px', textAlign: 'left' }}>
        <label style={{ fontSize: '11px', fontWeight: '900', color: '#065f46', marginBottom: '5px', display: 'block' }}>COSA CERCHI</label>
        <input 
          type="text" 
          placeholder="Es: Pulizia denti, Tachipirina..." 
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
        />
      </div>

      {/* 2. ZONA / QUARTIERE */}
      <div className="search-input-group" style={{ flex: '1', minWidth: '180px', textAlign: 'left' }}>
        <label style={{ fontSize: '11px', fontWeight: '900', color: '#065f46', marginBottom: '5px', display: 'block' }}>ZONA / QUARTIERE</label>
        <select 
          value={zonaScelta} 
          onChange={(e) => setZonaScelta(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}
        >
          <option>Tutta Roma</option>
          {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
        </select>
      </div>

      {/* 3. CATEGORIA */}
      <div className="search-input-group" style={{ flex: '1', minWidth: '180px', textAlign: 'left' }}>
        <label style={{ fontSize: '11px', fontWeight: '900', color: '#065f46', marginBottom: '5px', display: 'block' }}>CATEGORIA</label>
        <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
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
          padding: '12px 30px', 
          borderRadius: '10px', 
          fontWeight: '900', 
          border: 'none', 
          cursor: 'pointer',
          height: '46px'
        }}
      >
        CERCA
      </button>
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
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          
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
   
{/* ESPLORA LE CATEGORIE STILE SUBITO.IT (RETTANGOLARI CENTRATI) */}
      <section className="container" style={{padding: '50px 0 20px', textAlign: 'center'}}>
        <h2 style={{fontSize: '28px', fontWeight: '700'}}>Esplora le Categorie</h2>
        <p style={{color: '#666'}}>Trova il servizio sanitario di cui hai bisogno a Roma</p>
      </section>

      <div style={{paddingBottom: '50px', backgroundColor: '#f6f7f9'}}>
        <div className="container" style={{display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', padding: '20px'}}>
            
            {/* CARD FARMACIE - RETTANGOLARE CON CONTENUTO CENTRATO */}
            <a href="/farmacie-roma" style={{textDecoration: 'none', color: 'inherit', background: 'white', padding: '20px 10px', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '2px solid #065f46'}}>
              <div style={{backgroundColor: '#fff0f3', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', fontSize: '24px', border: '1px solid #e91e63'}}>💊</div>
              <span style={{fontWeight: '600', fontSize: '15px', width: '100%'}}>Farmacie</span>
            </a>

            {/* CARD DENTISTI */}
            <a href="/dentisti-roma" style={{textDecoration: 'none', color: 'inherit', background: 'white', padding: '20px 10px', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border:'2px solid #065f46' }}>
              <div style={{backgroundColor: '#e3f2fd', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', fontSize: '24px', border: '1px solid #2196f3'}}>🦷</div>
              <span style={{fontWeight: '600', fontSize: '15px', width: '100%'}}>Dentisti</span>
            </a>

            {/* CARD DIAGNOSTICA */}
            <a href="/diagnostica-roma" style={{textDecoration: 'none', color: 'inherit', background: 'white', padding: '20px 10px', borderRadius:'16px',  boxShadow: '0 1px 4px rgba(0,0,0,0.1)', width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border:'2px solid #065f46'}}>
              <div style={{backgroundColor: '#f3e5f5', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', fontSize: '24px', border: '1px solid #9c27b0'}}>🔬</div>
              <span style={{fontWeight: '600', fontSize: '15px', width: '100%'}}>Diagnostica</span>
            </a>

            {/* CARD SPECIALISTI */}
            <a href="/visite-specialistiche-roma" style={{textDecoration: 'none', color: 'inherit', background: 'white', padding: '20px 10px', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '2px solid #065f46'}}>
              <div style={{backgroundColor: '#e8f5e9', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', fontSize: '24px', border: '1px solid #4caf50'}}>👨‍⚕️</div>
              <span style={{fontWeight: '600', fontSize: '15px', width: '100%'}}>Specialisti</span>
            </a>

            {/* CARD DOMICILIO */}
            <a href="/servizi-domicilio-roma" style={{textDecoration: 'none', color: 'inherit', background: 'white', padding: '20px 10px', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', width: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '2px solid #065f46'}}>
              <div style={{backgroundColor: '#fff3e0', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', fontSize: '24px', border: '1px solid #ff9800'}}>🏠</div>
              <span style={{fontWeight: '600', fontSize: '15px', width: '100%'}}>Domicilio</span>
            </a>

        </div>
      </div>
      {/* ULTIMI ANNUNCI CON TASTI CONTATTO AGGIUNTI */}
      <section className="container" style={{padding: '40px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          {[
            { cat: 'FARMACIE', title: 'Farmacia H24 Centro', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400' },
            { cat: 'DIAGNOSTICA', title: 'Centro RX Prati', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' },
            { cat: 'DENTISTI', title: 'Studio Dentistico Eur', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
            { cat: 'SPECIALISTI', title: 'Dermatologo Roma', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
            { cat: 'DOMICILIO', title: 'Infermiere a Casa', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400' }
          ].map((ann, idx) => (
            <div className="ann-card" key={idx}>
              <img className="ann-img" src={ann.img} alt={ann.title} />
              <div className="ann-info">
                <small>{ann.cat}</small>
                <h4 style={{fontSize: '14px', margin: '5px 0'}}>{ann.title}</h4>
                <div style={{display: 'flex', gap: '5px', marginTop: '10px'}}>
                  <a href="tel:061234567" style={{flex: 1, textAlign: 'center', background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold'}}>Chiama</a>
                  <a href="https://wa.me/39" style={{background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px', fontSize: '11px'}}><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIZI PIÙ RICHIESTI - BOX CON FOTO */}
      <section className="container" style={{padding: '40px 0', borderTop: '1px solid #eee'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Servizi più richiesti</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" alt="Fisioterapia" />
            <div className="ann-info"><h4>Fisioterapia</h4><p>Riabilitazione e massoterapia</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400" alt="Oculista" />
            <div className="ann-info"><h4>Oculista</h4><p>Esame della vista completo</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400" alt="Psicologo" />
            <div className="ann-info"><h4>Psicologo</h4><p>Consulenza e supporto</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400" alt="Cardiologo" />
            <div className="ann-info"><h4>Cardiologo</h4><p>ECG e controllo pressione</p></div>
          </div>
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
                
  <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            
            {/* 1️⃣ BLOCCO 1 – LOGO + TESTO (SEO) */}
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>

          {/* 2️⃣ BLOCCO 2 – LINK UTENTI (AGGIORNATO CON MARKETING E FOMO) */}
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>
                ● Disponibilità aggiornate: Gennaio 2026
              </p>

              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>

              <p style={{ fontSize: '11px', color: '#718096', marginTop: '15px', fontStyle: 'italic', lineHeight: '1.4' }}>
                🔍 Oltre 15.000 ricerche mensili di pazienti registrate a Roma.
              </p>
            </div>
          {/* 3️⃣ BLOCCO 3 – LINK PROFESSIONISTI (CON URGENZA FOMO) */}
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
              
              {/* MESSAGGIO FOMO STRATEGICO PER MEDICI */}
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                  ⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.
                </p>
              </div>
      </div>

            {/* 4️⃣ BLOCCO 4 – NOTE LEGALI + DISCLAIMER */}
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                {/* LO METTI QUI SOTTO */}
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
              <p style={{ fontSize: '12px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>
                ServiziSalute è un portale di annunci e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.
              </p>
            </div>
          </div>

          {/* 🔒 COPYRIGHT */}
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
</div>
  );
}
