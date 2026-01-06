import React from 'react';
import Head from 'next/head';

export default function Disclaimer() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Disclaimer Legale | ServiziSalute Roma</title>
        {/* Impediamo l'indicizzazione per evitare che questa pagina rubi traffico a quelle principali */}
        <meta name="robots" content="noindex, follow" />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Chiudi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <div style={{ padding: '40px', backgroundColor: '#fef2f2', borderRadius: '24px', border: '1px solid #fee2e2' }}>
          <h1 style={{ fontSize: '32px', color: '#991b1b', marginBottom: '20px', fontWeight: '900' }}>
            Disclaimer Legale
          </h1>
          
          <div style={{ color: '#7f1d1d', fontSize: '16px' }}>
            <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              L'utilizzo del portale ServiziSalute Roma comporta l'accettazione dei seguenti termini e limitazioni di responsabilità.
            </p>

            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>1. Natura del Servizio</h3>
              <p>
                <strong>ServiziSalute</strong> è una piattaforma tecnologica indipendente di annunci e informazione. Non siamo una struttura sanitaria, non eroghiamo prestazioni mediche, non siamo un servizio di prenotazione medica e non percepiamo commissioni sulle prestazioni sanitarie.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>2. Assenza di Consulenza Medica</h3>
              <p>
                Nessuna informazione presente sul sito deve essere interpretata come consulenza medica, diagnosi o suggerimento terapeutico. Le schede professionali hanno scopo puramente informativo e pubblicitario per conto terzi. Consultare sempre il proprio medico curante.
              </p>
            </section>

            <section style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '15px', border: '2px solid #ef4444', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', color: '#dc2626', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🚨</span> EMERGENZE
              </h3>
              <p style={{ fontWeight: 'bold', color: '#991b1b', margin: 0 }}>
                In caso di emergenza o situazioni critiche, NON utilizzare questo portale. Chiamare immediatamente il Numero Unico di Emergenza 112, il 118 o recarsi al Pronto Soccorso più vicino.
              </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>3. Veridicità dei Dati</h3>
              <p>
                I dati pubblicati (specializzazioni, indirizzi, contatti, orari) sono forniti direttamente dai professionisti o reperiti da fonti pubbliche. Sebbene il nostro team effettui verifiche periodiche, non garantiamo la totale assenza di errori o l'aggiornamento in tempo reale delle informazioni.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>4. Rapporto Professionale</h3>
              <p>
                Qualsiasi contatto o rapporto professionale instaurato tra l'utente e il professionista sanitario avviene al di fuori del portale e sotto l'esclusiva responsabilità delle parti coinvolte. ServiziSalute non risponde di eventuali controversie, danni o inadempienze derivanti da tali rapporti.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '60px 20px', fontSize: '13px', color: '#94a3b8' }}>
        <p>Versione 1.0 — Ultimo aggiornamento: 6 Gennaio 2026</p>
        <p style={{ marginTop: '10px' }}>ServiziSalute Roma — Portale Indipendente</p>
      </footer>
    </div>
  );
}
