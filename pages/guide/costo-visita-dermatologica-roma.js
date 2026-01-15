import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCostoDermatologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita dermatologica a Roma? | Prezzi 2026</title>
        <meta name="description" content="Guida ai prezzi medi per una visita dermatologica e mappatura dei nei a Roma. Scopri i costi nei diversi quartieri e come scegliere lo specialista." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-visita-dermatologica-roma.png" 
            alt="Visita dermatologica Roma" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '20px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#164e63' }}>Costo Visita Dermatologica</span>
        </div>

        <article>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una visita dermatologica a Roma?
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Dalla mappatura dei nei al trattamento dell'acne, la dermatologia è una branca fondamentale della medicina a Roma. Scopriamo i costi medi nelle strutture private della capitale.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Prezzi medi 2026</h2>
            <p>
              A Roma, una visita dermatologica specialistica ha un costo che varia a seconda dell'esperienza del medico e della zona dello studio.
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Visita Dermatologica Base:</strong> 80€ - 130€</li>
              <li><strong>Mappatura Nei (Epiluminescenza):</strong> 100€ - 160€</li>
              <li><strong>Crioterapia/Trattamenti:</strong> +50€ rispetto alla visita base</li>
            </ul>

            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Differenze tra i Quartieri</h2>
            <p>
              Mentre nei quartieri storici come Prati e Parioli i prezzi tendono verso la fascia alta (120-150€), nei quartieri più residenziali come Appio o Tuscolano è possibile trovare ottimi specialisti con tariffe intorno ai 90-100€.
            </p>
          </section>

          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#164e63', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Cerchi un Dermatologo a Roma?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Trova i migliori dermatologi nei quartieri di Roma.</p>
            <a href="/dermatologi-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              VEDI DERMATOLOGI A ROMA
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
