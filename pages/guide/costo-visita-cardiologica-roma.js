import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCardiologia() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Costo Visita Cardiologica Roma: Tariffe Private {dataCorrente}</title>
        <meta name="description" content="Guida completa ai prezzi per una visita cardiologica a Roma. Scopri i costi medi di ECG, ecocardiogramma e controlli specialistici." />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
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
            alt="ECG e panorama di Roma sullo sfondo" 
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
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Costi Visita Cardiologica a Roma: Guida ai Prezzi {dataCorrente}
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Una visita cardiologica privata a Roma ha un prezzo medio tra <strong>80€ e 150€</strong>. Scopriamo cosa incide sulla tariffa finale e come scegliere lo specialista giusto.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa determina il costo?</h2>
            <p>Il prezzo può variare in base ad alcuni fattori chiave:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Elettrocardiogramma (ECG):</strong> Spesso incluso nella visita (100-120€ totali).</li>
              <li><strong>Ecocardiogramma:</strong> Se richiesto, il costo totale può salire a 150-200€.</li>
              <li><strong>Livello di specializzazione:</strong> Tariffe in base all'esperienza dello specialista.</li>
              <li><strong>Zona di Roma:</strong> Gli studi in centro (Prati, Parioli) possono avere costi superiori.</li>
            </ul>

            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Dove trovare studi cardiologici</h2>
            <p>
              A Roma puoi filtrare i cardiologi per zona. Ecco alcune aree principali:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Centro Storico:</strong> <a href="/cardiologi-roma?zona=Centro%20Storico" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Centro Storico</a></li>
              <li><strong>Prati:</strong> <a href="/cardiologi-roma?zona=Prati" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Prati</a></li>
              <li><strong>Parioli:</strong> <a href="/cardiologi-roma?zona=Parioli" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Parioli</a></li>
              <li><strong>San Giovanni:</strong> <a href="/cardiologi-roma?zona=San%20Giovanni" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi San Giovanni</a></li>
              <li><strong>Monteverde:</strong> <a href="/cardiologi-roma?zona=Monteverde" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Monteverde</a></li>
              <li><strong>Aurelio:</strong> <a href="/cardiologi-roma?zona=Aurelio" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Aurelio</a></li>
              <li><strong>Montesacro:</strong> <a href="/cardiologi-roma?zona=Montesacro" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Montesacro</a></li>
              <li><strong>Ostia:</strong> <a href="/cardiologi-roma?zona=Ostia" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Ostia</a></li>
              <li><strong>Tiburtina:</strong> <a href="/cardiologi-roma?zona=Tiburtina" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi Tiburtina</a></li>
              <li><strong>EUR:</strong> <a href="/cardiologi-roma?zona=EUR" style={{ color: '#0891b2', textDecoration: 'none' }}>Cardiologi EUR</a></li>
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

      {/* DISCLAIMER */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
        <strong>Nota Informativa:</strong> I prezzi indicati in questa guida sono frutto di una media di mercato rilevata a Roma nel {dataCorrente} e hanno scopo puramente informativo. Le tariffe possono variare in base alla complessità del caso clinico e alla strumentazione utilizzata. Questo contenuto non costituisce in alcun modo parere medico o diagnosi.
      </div>

      <Footer />
    </div>
  );
}
