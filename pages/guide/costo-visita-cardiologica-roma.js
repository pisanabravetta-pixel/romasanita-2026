import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCardiologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Costo Visita Cardiologica Roma: Tariffe Private 2026</title>
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-visita-cardiologica-roma.png" 
            alt="Tablet che mostra un tracciato elettrocardiografico ECG con panorama di Roma sullo sfondo"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}> {/* SPAZIO PRIMA DEL FOOTER */}
        <article>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', marginBottom: '25px' }}>
            Costi Visita Cardiologica a Roma: Guida 2026
          </h1>
          <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>Una visita cardiologica privata a Roma ha un prezzo medio tra <strong>80€ e 150€</strong>.</p>
          </div>

          {/* CTA AGGIUNTA */}
          <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Cerchi un Cardiologo a Roma?</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Confronta i professionisti e prenota un appuntamento nel tuo quartiere.</p>
            <a href="/cardiologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
              VEDI CARDIOLOGI
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
