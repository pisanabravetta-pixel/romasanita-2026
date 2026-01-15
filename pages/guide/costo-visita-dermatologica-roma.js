import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaDermatologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita dermatologica a Roma? | Prezzi 2026</title>
        <meta name="description" content="Guida completa ai prezzi della dermatologia a Roma. Scopri i costi medi per mappatura nei e visite specialistiche." />
      </Head>

      <Navbar />

      {/* BOX IMMAGINE - SEO OPTIMIZED */}
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
            alt="Dermatologa a Roma mentre prescrive una terapia durante una visita specialistica della pelle" 
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
          <span style={{ color: '#164e63' }}>Costo Dermatologia</span>
        </div>

        <article>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una visita dermatologica a Roma?
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Analizziamo i costi medi del 2026 per le prestazioni dermatologiche nei principali quartieri di Roma, dalla visita di controllo alla mappatura nei.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>
              A Roma, il prezzo di una visita dermatologica varia mediamente tra gli <strong>80€ e i 150€</strong> per una consulenza specialistica privata.
            </p>
            
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Tabella Prezzi Medi 2026</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Visita Specialistica:</strong> 90€ - 130€</li>
              <li><strong>Mappatura Nei (Dermatoscopia):</strong> 110€ - 160€</li>
              <li><strong>Crioterapia:</strong> 60€ - 100€</li>
              <li><strong>Visita Dermatologica Pediatrica:</strong> 100€ - 140€</li>
            </ul>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Hai bisogno di un Dermatologo?</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova i migliori specialisti nei quartieri di Roma e prenota la tua visita online.</p>
            <a href="/dermatologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
              CERCA DERMATOLOGO A ROMA
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
