import React from 'react';
import Head from 'next/head';

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Chi Siamo | ServiziSalute Roma - Il Portale della Sanità Locale</title>
        <meta name="description" content="Scopri la missione di ServiziSalute: connettere i cittadini di Roma con i migliori professionisti sanitari della Capitale in modo semplice e gratuito." />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <nav>
             <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
           </nav>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.7' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <h1 style={{ fontSize: '36px', color: '#1e3a8a', marginBottom: '20px', borderBottom: '4px solid #3b82f6', paddingBottom: '10px', display: 'inline-block' }}>
          Chi Siamo
        </h1>
        
        <p style={{ fontSize: '19px', color: '#475569', marginBottom: '30px', fontWeight: '500' }}>
          <strong>ServiziSalute</strong> è il primo portale di annunci indipendente dedicato interamente al settore sanitario nella città di <strong>Roma</strong>.
        </p>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#1e40af', fontSize: '22px', marginTop: '30px' }}>La nostra missione</h3>
          <p>
            Nasciamo con un obiettivo chiaro: semplificare l'incontro tra i cittadini romani e i professionisti della salute. 
            In una metropoli come Roma, trovare una farmacia di turno, un dentista specializzato o un centro diagnostico nel proprio quartiere può essere dispersivo. 
            ServiziSalute centralizza queste informazioni in un'unica piattaforma intuitiva e veloce.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#1e40af', fontSize: '22px', marginTop: '30px' }}>Cosa offriamo</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '15px' }}>
              <strong>Per i cittadini:</strong> Uno strumento completamente gratuito per individuare velocemente presidi sanitari e medici vicino a casa (Prati, EUR, Trastevere, Roma Nord, ecc.), con contatti diretti via WhatsApp o telefono.
            </li>
            <li style={{ marginBottom: '15px' }}>
              <strong>Per i professionisti:</strong> Una vetrina specializzata e gratuita per migliorare il proprio posizionamento locale (Local SEO) e connettersi con nuovi pazienti nella propria zona di operatività.
            </li>
          </ul>
        </section>

        {/* BOX NOTA LEGALE / DISCLAIMER */}
        <div style={{ backgroundColor: '#f0f9ff', padding: '30px', borderRadius: '16px', marginTop: '50px', border: '1px solid #bae6fd' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>ℹ️</span> Nota Importante
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#0c4a6e' }}>
            ServiziSalute è una piattaforma di annunci informativi. Non siamo una struttura sanitaria, non eroghiamo prestazioni mediche e non sostituiamo il parere del medico curante o dei servizi di emergenza (118). 
            Il nostro compito è puramente tecnologico: connettere chi cerca un servizio con chi lo offre, promuovendo la trasparenza e la prossimità dei servizi sul territorio romano.
          </p>
        </div>
      </main>

      {/* FOOTER COERENTE */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '80px' }}>
        <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>© 2026 ServiziSalute – Il portale della sanità a Roma</p>
        <div style={{ marginTop: '10px' }}>
          <a href="/privacy-policy" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a>
          <a href="/pubblica-annuncio" style={{ color: '#4ade80', fontSize: '12px', textDecoration: 'none', margin: '0 10px', fontWeight: 'bold' }}>Iscriviti come Medico</a>
        </div>
      </footer>
    </div>
  );
}
