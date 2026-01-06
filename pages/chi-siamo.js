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
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <nav>
             <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
           </nav>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '40px', color: '#1e3a8a', marginBottom: '10px', fontWeight: '900', letterSpacing: '-1px' }}>
            Chi Siamo
          </h1>
          <div style={{ width: '60px', height: '5px', backgroundColor: '#3b82f6', borderRadius: '10px' }}></div>
        </header>
        
        <p style={{ fontSize: '20px', color: '#475569', marginBottom: '35px', fontWeight: '400', lineHeight: '1.6' }}>
          <strong>ServiziSalute</strong> è il portale indipendente nato per mappare l'eccellenza sanitaria e la capillarità dei servizi medici nella città di <strong>Roma</strong>.
        </p>

        <section style={{ marginBottom: '50px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '15px', fontWeight: '700' }}>La nostra visione</h3>
          <p style={{ color: '#4b5563' }}>
            In una metropoli vasta e complessa come la Capitale, l'accesso alle informazioni sanitarie può risultare frammentato. Spesso il professionista di cui abbiamo bisogno si trova a pochi isolati da noi, ma è difficile da individuare rapidamente. 
          </p>
          <p style={{ color: '#4b5563', marginTop: '15px' }}>
            La nostra missione è **abbattere la distanza tra medico e paziente**, centralizzando i dati di studi medici, farmacie e centri diagnostici in un'unica piattaforma intuitiva, geolocalizzata e gratuita.
          </p>
        </section>

        <section style={{ marginBottom: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '25px', backgroundColor: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#2563eb', margin: '0 0 10px 0' }}>Per i Cittadini</h4>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
              Offriamo uno strumento rapido per trovare assistenza immediata nel proprio quartiere, con la possibilità di contattare i professionisti direttamente su WhatsApp per ridurre i tempi di attesa.
            </p>
          </div>
          <div style={{ padding: '25px', backgroundColor: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#2563eb', margin: '0 0 10px 0' }}>Per i Professionisti</h4>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
              Forniamo una vetrina digitale ad alto impatto locale (Local SEO), aiutando medici e strutture a farsi conoscere dai residenti della propria zona (Prati, EUR, Roma Nord, ecc.).
            </p>
          </div>
        </section>

        {/* BOX NOTA LEGALE / DISCLAIMER */}
        <div style={{ backgroundColor: '#fff7ed', padding: '30px', borderRadius: '20px', marginTop: '60px', border: '1px solid #ffedd5' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#9a3412', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px' }}>
            <span>⚠️</span> Disclaimer Legale
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#7c2d12', opacity: 0.9 }}>
            ServiziSalute è un aggregatore informativo di annunci. Non costituisce una struttura sanitaria, non eroga direttamente prestazioni mediche e non si assume responsabilità sulla qualità delle prestazioni fornite dai terzi inserzionisti. 
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#7c2d12', opacity: 0.9, fontWeight: 'bold' }}>
            In caso di emergenza, contattare sempre il Numero Unico di Emergenza 112 o il 118.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', textAlign: 'center', marginTop: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#3b82f6' }}>ServiziSalute Roma</p>
          <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '25px' }}>Il network tecnologico per la sanità di prossimità nella Capitale.</p>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '25px' }}>
            <a href="/privacy-policy" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'none', margin: '0 15px' }}>Privacy Policy</a>
            <a href="/pubblica-annuncio" style={{ color: '#4ade80', fontSize: '12px', textDecoration: 'none', margin: '0 15px', fontWeight: 'bold' }}>Iscrivi il tuo Studio</a>
          </div>
          <p style={{ marginTop: '30px', fontSize: '11px', color: '#475569' }}>© 2026 Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
