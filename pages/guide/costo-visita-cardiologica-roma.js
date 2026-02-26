import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCardiologia() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  const quartieri = [
    { slug: 'prati', nome: 'Prati' },
    { slug: 'eur', nome: 'EUR' },
    { slug: 'ostia', nome: 'Ostia' },
    { slug: 'trastevere', nome: 'Trastevere' },
    { slug: 'monti', nome: 'Monti' },
    { slug: 'garbatella', nome: 'Garbatella' },
    { slug: 'testaccio', nome: 'Testaccio' },
    { slug: 'tiburtina', nome: 'Tiburtina' },
    { slug: 'balduina', nome: 'Balduina' },
    { slug: 'eur-torrino', nome: 'EUR Torrino' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Costo Visita Cardiologica Roma: Tariffe Private {dataCorrente}</title>
        <meta name="description" content={`Guida completa ai prezzi delle visite cardiologiche a Roma aggiornata a ${dataCorrente}. Trova cardiologi nei principali quartieri della città.`} />
        <link rel="canonical" href="https://www.tuosito.com/guide/costo-visita-cardiologica-roma" />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-visita-cardiologica-roma.png" 
            alt="Tracciato elettrocardiografico ECG con panorama di Roma sullo sfondo" 
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
              Una visita cardiologica privata a Roma ha un prezzo medio tra <strong>80€ e 150€</strong>. Analizziamo i fattori che influenzano il costo e dove trovare i migliori specialisti.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa determina il costo di una visita cardiologica</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Elettrocardiogramma (ECG):</strong> spesso incluso nella visita (100-120€ totali).</li>
              <li><strong>Ecocardiogramma:</strong> se richiesto, il costo può arrivare a 150-200€.</li>
              <li><strong>Esperienza del medico:</strong> specialisti con lunga carriera o fama nazionale possono avere tariffe più alte.</li>
              <li><strong>Zona di Roma:</strong> centri storici e quartieri centrali come Prati e Parioli tendono ad avere costi superiori.</li>
            </ul>
          </section>

          <section style={{ marginTop: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800' }}>Cardiologi nei principali quartieri di Roma</h2>
            <p>Seleziona il quartiere di tuo interesse per consultare i professionisti disponibili:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {quartieri.map(q => (
                <a 
                  key={q.slug} 
                  href={`/cardiologi-roma-${q.slug}`} 
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: '#f0f9ff', 
                    color: '#0369a1', 
                    borderRadius: '8px', 
                    textDecoration: 'none', 
                    fontWeight: '700', 
                    fontSize: '14px' 
                  }}
                >
                  {q.nome}
                </a>
              ))}
            </div>
          </section>

          <section style={{ marginTop: '40px', lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800' }}>Come prenotare una visita cardiologica a Roma</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Contatta direttamente lo specialista o la struttura tramite telefono o WhatsApp.</li>
              <li>Verifica eventuali prenotazioni online se la struttura offre servizi digitali.</li>
              <li>Consulta la mappa dei quartieri per individuare la struttura più comoda da raggiungere.</li>
            </ul>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Cerchi un Cardiologo a Roma?</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova i migliori specialisti nei quartieri della Capitale e prenota la tua visita direttamente online o telefonicamente.</p>
            <a href="/cardiologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
              VEDI CARDIOLOGI A ROMA
            </a>
          </div>
        </article>
      </main>

      {/* DISCLAIMER STANDARD */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic', maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto' }}>
        <strong>Nota Informativa:</strong> I prezzi indicati in questa guida sono frutto di una media di mercato rilevata a Roma nel {dataCorrente} e hanno scopo puramente informativo. Le tariffe possono variare in base alla complessità del caso clinico e alla strumentazione utilizzata. Questo contenuto non costituisce in alcun modo parere medico o diagnosi.
      </div>

      <Footer />
    </div>
  );
}
