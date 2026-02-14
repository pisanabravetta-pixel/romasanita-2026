import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaDermatologia() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita dermatologica a Roma? | Prezzi {dataCorrente}</title>
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
  Quanto costa una visita dermatologica a Roma? (Aggiornato {dataCorrente})
</h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
           <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
  Analizziamo i costi medi a <strong>{dataCorrente}</strong> per le prestazioni dermatologiche nei principali quartieri di Roma...
</p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>
              A Roma, il prezzo di una visita dermatologica varia mediamente tra gli <strong>80€ e i 150€</strong> per una consulenza specialistica privata.
            </p>
            
           <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Tabella Prezzi Medi {dataCorrente}</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Visita Specialistica:</strong> 90€ - 130€</li>
              <li><strong>Mappatura Nei (Dermatoscopia):</strong> 110€ - 160€</li>
              <li><strong>Crioterapia:</strong> 60€ - 100€</li>
              <li><strong>Visita Dermatologica Pediatrica:</strong> 100€ - 140€</li>
            </ul>
                <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Disponibilità per zona</h2>
            <p>
              I dermatologi a Roma ricevono in studi distribuiti su tutto il territorio. Se cerchi uno specialista in zone centrali come 
              <strong> <a href="/dermatologi-roma?quartiere=Centro%20Storico" style={{ color: '#0891b2', textDecoration: 'none' }}>Centro Storico</a></strong>, 
              <strong> <a href="/dermatologi-roma?quartiere=Prati" style={{ color: '#0891b2', textDecoration: 'none' }}>Prati</a></strong> o 
              <strong> <a href="/dermatologi-roma?quartiere=Parioli" style={{ color: '#0891b2', textDecoration: 'none' }}>Parioli</a></strong>, troverai un'ampia scelta di cliniche private. 
            </p>
            
            <p>
              Per chi risiede in zone più residenziali o periferiche, sono presenti ottimi professionisti a 
              <strong> <a href="/dermatologi-roma?quartiere=San%20Giovanni" style={{ color: '#0891b2', textDecoration: 'none' }}>San Giovanni</a></strong>, 
              <strong> <a href="/dermatologi-roma?quartiere=Monteverde" style={{ color: '#0891b2', textDecoration: 'none' }}>Monteverde</a></strong>, 
              <strong> <a href="/dermatologi-roma?quartiere=Aurelio" style={{ color: '#0891b2', textDecoration: 'none' }}>Aurelio</a></strong> e 
              <strong> <a href="/dermatologi-roma?quartiere=Montesacro" style={{ color: '#0891b2', textDecoration: 'none' }}>Montesacro</a></strong>. 
              Inoltre, puoi trovare studi dermatologici facilmente raggiungibili anche a 
              <strong> <a href="/dermatologi-roma?quartiere=Ostia" style={{ color: '#0891b2', textDecoration: 'none' }}>Ostia</a></strong>, 
              <strong> <a href="/dermatologi-roma?quartiere=Tiburtina" style={{ color: '#0891b2', textDecoration: 'none' }}>Tiburtina</a></strong> ed 
              <strong> <a href="/dermatologi-roma?quartiere=EUR" style={{ color: '#0891b2', textDecoration: 'none' }}>EUR</a></strong>.
            </p>
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
{/* DISCLAIMER STANDARD */}
          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
            <strong>Nota Informativa:</strong> I prezzi indicati in questa guida sono frutto di una media di mercato rilevata a Roma nel {dataCorrente} e hanno scopo puramente informativo. Le tariffe possono variare in base alla complessità del caso clinico e alla strumentazione utilizzata. Questo contenuto non costituisce in alcun modo parere medico o diagnosi.
          </div>
      <Footer />
    </div>
  );
}
