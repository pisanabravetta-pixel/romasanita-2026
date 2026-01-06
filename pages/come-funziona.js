import React from 'react';
import Head from 'next/head';

export default function ComeFunziona() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Come Funziona ServiziSalute | Visibilità per Medici a Roma</title>
        <meta name="description" content="Scopri come pubblicare il tuo annuncio sanitario su ServiziSalute Roma. Tre semplici passi per trovare nuovi pazienti nel tuo quartiere." />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/pubblica-annuncio" style={{ fontSize: '13px', backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Inizia Ora</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.7' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/per-i-professionisti" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Area Professionisti</a>
        </nav>
        
        <h1 style={{ fontSize: '36px', color: '#1e3a8a', marginBottom: '10px' }}>Come funziona ServiziSalute</h1>
        <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>Il modo più semplice e veloce per dare visibilità alla tua attività sanitaria a Roma.</p>

        {/* STEP A GRIGLIA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ backgroundColor: '#2563eb', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '15px' }}>1</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Crea l'annuncio</h3>
            <p style={{ fontSize: '15px', color: '#475569' }}>Inserisci i dati del tuo studio, i servizi offerti e la zona di Roma. Bastano 2 minuti.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ backgroundColor: '#2563eb', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '15px' }}>2</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Revisione Rapida</h3>
            <p style={{ fontSize: '15px', color: '#475569' }}>Il nostro team verifica i dati per garantire la massima qualità agli utenti del portale.</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <div style={{ backgroundColor: '#2563eb', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '15px' }}>3</div>
            <h3 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Ricevi Contatti</h3>
            <p style={{ fontSize: '15px', color: '#475569' }}>L'annuncio diventa pubblico e indicizzato. I pazienti ti contattano direttamente.</p>
          </div>
        </div>

        {/* PERCHÉ NOI */}
        <section style={{ marginTop: '60px', padding: '30px', borderLeft: '5px solid #10b981', backgroundColor: '#f0fdf4', borderRadius: '0 20px 20px 0' }}>
          <h3 style={{ color: '#065f46', marginTop: 0 }}>Perché scegliere ServiziSalute Roma?</h3>
          <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'start', gap: '10px' }}>
              <span>✅</span> <div><strong>Target Iper-Locale:</strong> Raggiungi solo chi cerca assistenza a Roma e nei quartieri specifici.</div>
            </li>
            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'start', gap: '10px' }}>
              <span>✅</span> <div><strong>Nessun Intermediario:</strong> Non gestiamo pagamenti. Il rapporto con il paziente resta tuo al 100%.</div>
            </li>
            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'start', gap: '10px' }}>
              <span>✅</span> <div><strong>Ottimizzazione SEO:</strong> Sfrutta la forza del nostro portale per apparire su Google senza costi pubblicitari.</div>
            </li>
          </ul>
        </section>

        {/* CTA FINALE */}
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '50px 30px', background: '#1e3a8a', borderRadius: '24px', color: 'white' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>Pronto a far crescere il tuo studio?</h2>
          <p style={{ marginBottom: '30px', opacity: 0.9 }}>Unisciti a decine di professionisti sanitari già presenti su Roma.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', background: '#10b981', color: 'white', padding: '16px 40px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', transition: '0.3s', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
            Pubblica Annuncio Gratis
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '80px' }}>
        <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>© 2026 ServiziSalute Roma – Supporto alla Sanità di Prossimità</p>
      </footer>
    </div>
  );
}
