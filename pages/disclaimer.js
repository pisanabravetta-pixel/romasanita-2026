import React from 'react';
import Head from 'next/head';

export default function Disclaimer() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Disclaimer Legale | ServiziSalute Roma</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Torna alla Home</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <h1 style={{ fontSize: '32px', color: '#dc2626', marginBottom: '20px', borderBottom: '4px solid #fecaca', paddingBottom: '10px', display: 'inline-block' }}>
          Disclaimer Legale
        </h1>
        
        <div style={{ color: '#475569', fontSize: '16px' }}>
          <p><strong>ServiziSalute</strong> è un portale di annunci e informazione dedicato esclusivamente alla visibilità dei servizi sanitari privati e locali nella città di Roma.</p>
          
          <p>È importante sottolineare che:</p>
          
          <ul style={{ paddingLeft: '20px', marginBottom: '30px' }}>
            <li><strong>Non è un servizio medico:</strong> Le informazioni contenute non costituiscono consulenza medica, diagnosi o piani terapeutici.</li>
            <li><strong>Responsabilità dei dati:</strong> I dati riportati negli annunci (orari, tariffe, specializzazioni) sono forniti dai rispettivi inserzionisti. Non garantiamo l'assoluta precisione o l'aggiornamento in tempo reale.</li>
            <li><strong>Emergenze:</strong> In caso di emergenza sanitaria, chiamare immediatamente il 112 o il 118 o recarsi al Pronto Soccorso più vicino. Non utilizzare questo portale per situazioni critiche.</li>
            <li><strong>Rapporto Medico-Paziente:</strong> Il portale facilita solo il contatto. Ogni rapporto professionale avviene al di fuori della nostra piattaforma e sotto la responsabilità del professionista e del paziente.</li>
          </ul>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px 20px', fontSize: '12px', color: '#94a3b8' }}>
        Ultimo aggiornamento: Gennaio 2026
      </footer>
    </div>
  );
}
