import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCostoCardiologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita cardiologica a Roma? | Tariffe 2026</title>
        <meta name="description" content="Guida ai costi medi per una visita cardiologica con ECG nei principali quartieri di Roma. Scopri dove prenotare e i prezzi medi." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-visita-cardiologica-roma.png" 
            alt="Visita cardiologica Roma" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '20px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#dc2626', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#dc2626', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#991b1b' }}>Costo Visita Cardiologica</span>
        </div>

        <article>
          <h1 style={{ color: '#991b1b', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Visita Cardiologica a Roma: Quali sono i costi medi?
          </h1>

          <div style={{ backgroundColor: '#fef2f2', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #dc2626', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#991b1b', fontSize: '18px', lineHeight: '1.6' }}>
              La prevenzione cardiovascolare è fondamentale. A Roma l'offerta è ampia, ma i prezzi possono variare sensibilmente tra strutture private e convenzionate.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#991b1b', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Tariffe medie per zona</h2>
            <p>
              In media, una visita cardiologica completa di Elettrocardiogramma (ECG) a Roma ha un costo che oscilla tra i <strong>100€ e i 180€</strong>.
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Roma Centro/Eur:</strong> 130€ - 200€</li>
              <li><strong>Centri Polispecialistici:</strong> 90€ - 140€</li>
              <li><strong>Servizi a Domicilio:</strong> 150€ - 250€</li>
            </ul>
          </section>

          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#dc2626', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Hai bisogno di un Cardiologo?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Trova i migliori specialisti del cuore nel tuo quartiere di Roma.</p>
            <a href="/cardiologi-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              VEDI CARDIOLOGI A ROMA
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
