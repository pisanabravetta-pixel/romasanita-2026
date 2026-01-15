import React from 'react';
import Head from 'next/head';
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

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/visita-dermatologica-roma.png" 
            alt="Dermatologa a Roma mentre prescrive una terapia durante una visita specialistica della pelle" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}> {/* SPAZIO PRIMA DEL FOOTER */}
        <article>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', marginBottom: '25px' }}>
            Quanto costa una visita dermatologica a Roma?
          </h1>
          <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>A Roma, il prezzo di una visita dermatologica privata varia tra gli <strong>80€ e i 150€</strong>.</p>
            {/* ... resto del testo ... */}
          </div>

          {/* CTA AGGIUNTA */}
          <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Hai bisogno di un Dermatologo?</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova i migliori specialisti nei quartieri di Roma e prenota la tua visita.</p>
            <a href="/dermatologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
              CERCA DERMATOLOGO
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
