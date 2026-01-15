import React from 'react';
import Head from 'next/head'; // Corretto: prima c'era un errore qui
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaDermatologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita dermatologica a Roma? | Prezzi 2026</title>
        <meta name="description" content="Guida completa ai prezzi della dermatologia a Roma." />
      </Head>

      <Navbar />

      {/* IMMAGINE A TUTTA LARGHEZZA (Layout originale che preferisci) */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ 
          width: '100%', 
          height: '400px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="/images/costo-visita-dermatologica-roma.png" 
            alt="Dermatologia Roma Prezzi" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        {/* BREADCRUMB */}
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#164e63' }}>Costo Dermatologia</span>
        </div>

        <article>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una visita dermatologica a Roma?
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Analizziamo i costi medi del 2026 per le prestazioni dermatologiche nei principali quartieri di Roma, dalla mappatura dei nei ai trattamenti laser.
            </p>
          </div>

          <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>
              A Roma, il prezzo di una visita dermatologica varia significativamente tra strutture convenzionate e studi privati d'eccellenza. 
              In media, aspettatevi di pagare tra gli <strong>80€ e i 150€</strong> per una consulenza specialistica.
            </p>
            
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Tabella Prezzi Medi</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Visita Specialistica:</strong> 90€ - 130€</li>
              <li><strong>Mappatura Nei (Dermatoscopia):</strong> 110€ - 160€</li>
              <li><strong>Crioterapia (per seduta):</strong> 60€ - 100€</li>
            </ul>
          </div>

          {/* CTA BOX */}
          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#164e63', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Cerchi un Dermatologo a Roma?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Trova i migliori specialisti nei quartieri di Roma.</p>
            <a href="/dermatologi-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              SCOPRI I MEDICI
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
