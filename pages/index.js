import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

    if (cosa.includes("dent") || cosa.includes("odont") || cosa.includes("carie") || cosa.includes("pulizia") || cosa.includes("apparecch")) {
      if (["prati", "eur", "san-giovanni"].includes(zonaKebab)) {
        window.location.href = "/dentisti-roma-" + zonaKebab;
      } else {
        window.location.href = "/dentisti-roma" + parametri;
      }
    } 
    else if (cosa.includes("cardiol")) {
      if (zonaKebab === "prati") {
        window.location.href = "/cardiologi-roma-prati";
      } else {
        window.location.href = "/visite-specialistiche-roma" + parametri;
      }
    }
    else if (cosa.includes("tac") || cosa.includes("risonanza") || cosa.includes("analisi") || cosa.includes("ecograf")) {
      if (zonaKebab === "parioli" || zonaKebab === "flaminio") {
        window.location.href = "/diagnostica-roma-nord";
      } else {
        window.location.href = "/diagnostica-roma" + parametri;
      }
    }
    else if (cosa.includes("farmac") || cosa.includes("holter") || cosa.includes("pressio")) {
      if (zonaKebab === "centro-storico") {
        window.location.href = "/farmacie-roma-centro";
      } else {
        window.location.href = "/farmacie-roma" + parametri;
      }
    }
    else if (cosa.includes("domicilio") || cosa.includes("infermier") || cosa.includes("fisio")) {
      if (["eur", "ostiense", "magliana"].includes(zonaKebab)) {
        window.location.href = "/servizi-domicilio-roma-sud";
      } else {
        window.location.href = "/servizi-domicilio-roma" + parametri;
      }
    }
    else {
      window.location.href = "/visite-specialistiche-roma" + parametri;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>ServiziSalute - Il Portale della Sanità a Roma</title>
        <meta name="description" content="Trova farmacie, dentisti e specialisti a Roma nel tuo quartiere." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ServiziSalute Roma",
          "url": "https://servizisalute.it",
          "logo": "https://servizisalute.it/favicon.ico"
        })}} />
      </Head> 

      {/* TOP BAR BLU BRAND */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
        🚀 PORTA IL TUO STUDIO NEL CUORE DI ROMA — EDIZIONE 2026
      </div>

      <Navbar />

      {/* HERO SECTION MODERNA */}
      <section style={{ background: 'linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)', padding: '80px 20px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ color: '#0f172a', fontWeight: '900', fontSize: '48px', marginBottom: '20px', letterSpacing: '-2px', lineHeight: '1.1' }}>
            La salute a Roma, <br/><span style={{ color: '#2563eb' }}>nel tuo quartiere.</span>
          </h1>
          <p style={{ marginBottom: '40px', color: '#475569', fontSize: '18px', fontWeight: '500', maxWidth: '600px', margin: '0 auto 40px' }}>
            Trova farmacie, dentisti e specialisti vicini a te. Contatto diretto, zero commissioni, massima velocità.
          </p>

          {/* BARRA DI RICERCA PULITA */}
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', display: 'flex', flexWrap: 'wrap', gap: '10px', border: '1px solid #e2e8f0', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ flex: '1.5', minWidth: '200px', textAlign: 'left', padding: '10px 15px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>COSA CERCHI</label>
              <input type="text" placeholder="Es: Pulizia denti, Dermatologo..." value={ricerca} onChange={(e) => setRicerca(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600' }} />
            </div>
            <div style={{ flex: '1', minWidth: '150px', textAlign: 'left', padding: '10px 15px', borderLeft: '1px solid #f1f5f9' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>DOVE (QUARTIERE)</label>
              <select value={zonaScelta} onChange={(e) => setZonaScelta(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '16px', fontWeight: '600', backgroundColor: 'transparent', cursor: 'pointer' }}>
                <option>Tutta Roma</option>
                {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
              </select>
            </div>
            <button onClick={eseguiRicerca} style={{ backgroundColor: '#0f172a', color: 'white', padding: '0 40px', borderRadius: '18px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
              CERCA ORA
            </button>
          </div>
        </div>
      </section>

      {/* STATS RAPIDE */}
      <section style={{ padding: '20px 0 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { label: 'ANNUNCI ONLINE', val: '+1.500', icon: '📢' },
            { label: 'PROFESSIONISTI', val: '+850', icon: '👨‍⚕️' },
            { label: 'UTENTI / MESE', val: '15K', icon: '📈' }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', padding: '15px 25px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#2563eb' }}>{stat.val}</div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIE (Stile Apple/Moderno) */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 80px', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '40px' }}>Esplora per categoria</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { name: 'Farmacie', icon: '💊', link: '/farmacie-roma', bg: '#fdf2f8', border: '#fbcfe8' },
            { name: 'Dentisti', icon: '🦷', link: '/dentisti-roma', bg: '#eff6ff', border: '#bfdbfe' },
            { name: 'Diagnostica', icon: '🔬', link: '/diagnostica-roma', bg: '#f5f3ff', border: '#ddd6fe' },
            { name: 'Specialisti', icon: '👨‍⚕️', link: '/visite-specialistiche-roma', bg: '#f0fdf4', border: '#bbf7d0' },
            { name: 'Domicilio', icon: '🏠', link: '/servizi-domicilio-roma', bg: '#fffbeb', border: '#fef3c7' }
          ].map((cat, i) => (
            <a href={cat.link} key={i} style={{ textDecoration: 'none', padding: '30px 20px', borderRadius: '24px', backgroundColor: 'white', border: '1px solid #e2e8f0', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{cat.icon}</div>
              <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '17px' }}>{cat.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
