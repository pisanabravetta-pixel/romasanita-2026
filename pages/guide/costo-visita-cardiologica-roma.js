import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCardiologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Costo Visita Cardiologica Roma: Tariffe Private 2026</title>
        <meta name="description" content="Guida completa ai prezzi per una visita cardiologica a Roma. Scopri i costi medi di ECG e controlli specialistici." />
      </Head>

      <Navbar />

      {/* IMMAGINE CON ALT CORRETTO (TABLET + ROMA) */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ 
          width: '100%', 
          height: '400px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="/images/costo-visita-cardiologica-roma.png" 
            alt="Tablet che mostra un tracciato elettrocardiografico ECG con panorama di Roma sullo sfondo" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>
        
        {/* BREADCRUMB */}
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#164e63' }}>Costo Cardiologia</span>
        </div>

        <article>
          <div style={{ backgroundColor: '#fff4f4', border: '1px solid #feb2b2', padding: '15px', borderRadius: '15px', marginBottom: '30px', fontSize: '14px', color: '#9b2c2c' }}>
            <strong>AVVERTENZA LEGALE:</strong> Analisi dei costi medi. <strong>Non è un consulto medico.</strong> In caso di emergenza contattare il 118.
          </div>

          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Costi Visita Cardiologica a Roma: Guida ai Prezzi 2026
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Una visita cardiologica privata a Roma ha un prezzo medio tra <strong>80€ e 150€</strong>. Scopriamo cosa incide sulla tariffa finale.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa determina il costo?</h2>
            <p>Il prezzo può variare in base ad alcuni fattori chiave:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Elettrocardiogramma (ECG):</strong> Spesso incluso nella visita (100-120€ totali).</li>
              <li><strong>Ecocardiogramma:</strong> Se richiesto, il costo totale può salire a 150-200€.</li>
              <li><strong>Livello di specializzazione:</strong> Tariffe diverse in base all'esperienza del cardiologo.</li>
              <li><strong>Zona di Roma:</strong> Gli studi in centro (Prati, Parioli) possono avere costi superiori.</li>
            </ul>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Cerchi un Cardiologo a Roma?</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova i migliori specialisti nei quartieri della Capitale e prenota la tua visita.</p>
            <a href="/cardiologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
              VEDI CARDIOLOGI A ROMA
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
