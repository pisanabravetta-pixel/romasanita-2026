import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCostoDenti() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
      <title>Quanto costa una pulizia dei denti a Roma? | Prezzi {dataCorrente}</title>
        <meta name="description" content="Scopri i prezzi medi per l'igiene dentale professionale nei vari quartieri di Roma. Guida completa ai costi e alla scelta del dentista." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-pulizia-denti-roma.png" 
             alt="Seduta di igiene orale professionale e pulizia denti presso studio dentistico moderno a Roma"
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
          <span style={{ color: '#1e3a8a' }}>Costo Pulizia Denti</span>
        </div>

        <article>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una pulizia dei denti professionale a Roma?
          </h1>

          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #2563eb', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#1e40af', fontSize: '18px', lineHeight: '1.6' }}>
              L'igiene dentale è l'intervento più richiesto negli studi odontoiatrici della Capitale. Ma quali sono le tariffe medie nei vari quartieri?
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>I prezzi medi a Roma</h2>
            <p>
              A Roma, il costo di una seduta di igiene dentale professionale (detartrasi) varia generalmente tra i <strong>70€ e i 120€</strong>. 
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Roma Centro/Prati:</strong> 90€ - 130€</li>
              <li><strong>Roma Nord (Parioli/Fleming):</strong> 100€ - 150€</li>
              <li><strong>Zone Periferiche:</strong> 60€ - 90€</li>
            </ul>

            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa include la seduta</h2>
            <p>
              Una seduta professionale corretta non comprende solo la rimozione del tartaro, ma anche la lucidatura (polishing), l'eventuale rimozione di macchie con air-flow e un controllo generale della salute gengivale.
            </p>
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Disponibilità nei quartieri di Roma</h2>
            <p>
              La rete di professionisti copre capillarmente la città. Se cerchi uno studio dentistico nelle zone di 
              <strong> <a href="/dentisti-roma?quartiere=Centro%20Storico" style={{ color: '#2563eb', textDecoration: 'none' }}>Centro Storico</a></strong>, 
              <strong> <a href="/dentisti-roma?quartiere=Prati" style={{ color: '#2563eb', textDecoration: 'none' }}>Prati</a></strong> o 
              <strong> <a href="/dentisti-roma?quartiere=Parioli" style={{ color: '#2563eb', textDecoration: 'none' }}>Parioli</a></strong>, i prezzi possono essere leggermente superiori alla media. 
            </p>
            
           <p>
              Opzioni con ottimo rapporto qualità-prezzo si trovano spesso a 
              <strong> <a href="/dentisti-roma?quartiere=San%20Giovanni" style={{ color: '#2563eb', textDecoration: 'none' }}>San Giovanni</a></strong>, 
              <strong> <a href="/dentisti-roma?quartiere=Monteverde" style={{ color: '#2563eb', textDecoration: 'none' }}>Monteverde</a></strong>, 
              <strong> <a href="/dentisti-roma?quartiere=Aurelio" style={{ color: '#2563eb', textDecoration: 'none' }}>Aurelio</a></strong> e 
              <strong> <a href="/dentisti-roma?quartiere=Montesacro" style={{ color: '#2563eb', textDecoration: 'none' }}>Montesacro</a></strong>. 
              Per chi si trova fuori dal centro o vicino al GRA, sono disponibili ottimi centri anche a 
              <strong> <a href="/dentisti-roma?quartiere=Ostia" style={{ color: '#2563eb', textDecoration: 'none' }}>Ostia</a></strong>, 
              <strong> <a href="/dentisti-roma?quartiere=Tiburtina" style={{ color: '#2563eb', textDecoration: 'none' }}>Tiburtina</a></strong> ed 
              <strong> <a href="/dentisti-roma?quartiere=EUR" style={{ color: '#2563eb', textDecoration: 'none' }}>EUR</a></strong>.
            </p>
          </section>

          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Cerchi un dentista nel tuo quartiere?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Trova i migliori studi dentistici di Roma vicino a te.</p>
            <a href="/dentisti-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              VEDI DENTISTI A ROMA
            </a>
          </div>
        </article>
      </main>
{/* DISCLAIMER STANDARD */}
          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
<strong>Nota Informativa:</strong> I prezzi indicati in questa guida sono frutto di una media di mercato rilevata a Roma nel {dataCorrente} e hanno scopo puramente informativo. Le tariffe possono variare in base alla clinica e ai trattamenti accessori necessari.
          </div>
      <Footer />
    </div>
  );
}
