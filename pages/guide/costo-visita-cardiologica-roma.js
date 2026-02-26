import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCardiologia() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  // Esempio dati annunci cardiologi
  const cardiologi = [
    { nome: "Dr. Mario Rossi", quartiere: "Prati", link: "/scheda/cardiologi-roma-prati-mario-rossi", telefono: "06-1234567" },
    { nome: "Dott.ssa Lucia Bianchi", quartiere: "Monteverde", link: "/scheda/cardiologi-roma-monteverde-lucia-bianchi", telefono: "06-2345678" },
    { nome: "Dr. Andrea Verdi", quartiere: "San Giovanni", link: "/scheda/cardiologi-roma-san-giovanni-andrea-verdi", telefono: "06-3456789" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto Costa una Visita Cardiologica a Roma? Tariffe {dataCorrente}</title>
        <meta name="description" content="Scopri i costi medi di una visita cardiologica privata a Roma. Leggi la guida completa e prenota uno specialista vicino a te." />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-visita-cardiologica-roma.png" 
            alt="Elettrocardiogramma ECG su tablet con panorama di Roma" 
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
            Quanto Costa una Visita Cardiologica a Roma? Guida {dataCorrente}
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Una visita cardiologica privata a Roma ha un prezzo medio tra <strong>80€ e 150€</strong>. Scopri cosa incide sulla tariffa finale e come scegliere lo specialista giusto.
            </p>
          </div>

          {/* SEZIONE COSTI */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa determina il costo della visita?</h2>
            <p>Il prezzo può variare in base a diversi fattori:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Elettrocardiogramma (ECG):</strong> spesso incluso nella visita (100-120€).</li>
              <li><strong>Ecocardiogramma:</strong> se richiesto, può portare il totale a 150-200€.</li>
              <li><strong>Esperienza dello specialista:</strong> cardiologi con più anni di esperienza possono avere tariffe più alte.</li>
              <li><strong>Zona di Roma:</strong> Prati, Parioli e Centro Storico spesso più costosi rispetto a quartieri periferici.</li>
            </ul>

            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Dove trovare cardiologi a Roma</h2>
            <p>
              Puoi scegliere uno specialista vicino a te nei principali quartieri:
              <strong> <a href="/cardiologi-roma?quartiere=Prati" style={{ color: '#0891b2', textDecoration: 'none' }}>Prati</a></strong>, 
              <strong> <a href="/cardiologi-roma?quartiere=Monteverde" style={{ color: '#0891b2', textDecoration: 'none' }}>Monteverde</a></strong>, 
              <strong> <a href="/cardiologi-roma?quartiere=San Giovanni" style={{ color: '#0891b2', textDecoration: 'none' }}>San Giovanni</a></strong>.
            </p>

            {/* BOX ANNUNCI CARDIOLOGI */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '30px' }}>
              {cardiologi.map((doc, index) => (
                <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '15px', padding: '20px', backgroundColor: '#f8fafc' }}>
                  <h3 style={{ margin: 0, color: '#164e63' }}>{doc.nome}</h3>
                  <p style={{ margin: '5px 0', color: '#334155' }}>Quartiere: {doc.quartiere}</p>
                  <p style={{ margin: '5px 0', color: '#334155' }}>Tel: {doc.telefono}</p>
                  <a href={doc.link} style={{ display: 'inline-block', marginTop: '10px', backgroundColor: '#0891b2', color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '12px' }}>
                    Vedi Scheda
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Cerchi un Cardiologo a Roma?</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova i migliori specialisti nei quartieri della Capitale e prenota la tua visita.</p>
            <a href="/cardiologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
              VEDI CARDIOLOGI A ROMA
            </a>
          </div>

          {/* DISCLAIMER */}
          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
           <strong>Nota Informativa:</strong> I prezzi indicati in questa guida sono una media rilevata a Roma nel {dataCorrente} e hanno scopo puramente informativo. Questo contenuto non costituisce parere medico o diagnosi.
          </div>

        </article>
      </main>
      <Footer />
    </div>
  );
}
