import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCostoGinecologia() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita ginecologica a Roma? | Prezzi {dataCorrente}</title>
        <meta name="description" content="Guida ai prezzi medi per una visita ginecologica e pap-test a Roma. Scopri i costi nei vari quartieri e come scegliere lo specialista." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
         <img 
  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200" 
  alt="Studio medico ginecologico moderno e accogliente a Roma"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
/>
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '20px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#2563eb', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#1e3a8a' }}>Costo Visita Ginecologica</span>
        </div>

        <article>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una visita ginecologica privata a Roma?
          </h1>

          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #2563eb', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#1e40af', fontSize: '18px', lineHeight: '1.6' }}>
              La visita ginecologica è un appuntamento essenziale per la prevenzione. A Roma l'offerta è vastissima, dai grandi centri multispecialistici ai piccoli studi privati.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>I prezzi medi a Roma</h2>
            <p>
              Nella Capitale, il costo di una visita ginecologica con ecografia transvaginale inclusa varia mediamente tra i <strong>90€ e i 160€</strong>.
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Roma Centro / Prati / Parioli:</strong> 120€ - 200€</li>
              <li><strong>Roma Sud (EUR / Ostiense):</strong> 100€ - 150€</li>
              <li><strong>Zone Periferiche:</strong> 80€ - 120€</li>
              <li><strong>Pap-test (aggiuntivo):</strong> +25€ - 40€</li>
            </ul>

            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa include solitamente il controllo</h2>
            <p>
              Una visita ginecologica di controllo completa a Roma comprende l'anamnesi, l'esame obiettivo, l'ecografia pelvica o transvaginale e, su richiesta, la visita senologica.
            </p>
            
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Trovare una ginecologa nei quartieri</h2>
            <p>
              Se cerchi una specialista vicino a te, puoi consultare le nostre liste dedicate per i principali quartieri di Roma:
              <strong> <a href="/ginecologi-roma?quartiere=Centro%20Storico" style={{ color: '#2563eb', textDecoration: 'none' }}>Centro Storico</a></strong>, 
              <strong> <a href="/ginecologi-roma?quartiere=Prati" style={{ color: '#2563eb', textDecoration: 'none' }}>Prati</a></strong>, 
              <strong> <a href="/ginecologi-roma?quartiere=Parioli" style={{ color: '#2563eb', textDecoration: 'none' }}>Parioli</a></strong> e 
              <strong> <a href="/ginecologi-roma?quartiere=EUR" style={{ color: '#2563eb', textDecoration: 'none' }}>EUR</a></strong>.
            </p>
            
            <p>
              Ottime professioniste con tempi di attesa brevi sono disponibili anche a 
              <strong> <a href="/ginecologi-roma?quartiere=San%20Giovanni" style={{ color: '#2563eb', textDecoration: 'none' }}>San Giovanni</a></strong>, 
              <strong> <a href="/ginecologi-roma?quartiere=Monteverde" style={{ color: '#2563eb', textDecoration: 'none' }}>Monteverde</a></strong> e 
              <strong> <a href="/ginecologi-roma?quartiere=Tiburtina" style={{ color: '#2563eb', textDecoration: 'none' }}>Tiburtina</a></strong>.
            </p>
          </section>

          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Cerchi una ginecologa a Roma?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Visualizza le schede delle migliori professioniste vicino a te.</p>
            <a href="/ginecologi-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              VEDI GINECOLOGI A ROMA
            </a>
          </div>
        </article>
      </main>

      <div style={{ maxWidth: '850px', margin: '0 auto 40px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota Informativa:</strong> I prezzi indicati sono medie di mercato basate sui listini degli studi privati a Roma nel {dataCorrente}.
        </div>
      </div>

      <Footer />
    </div>
  );
}
