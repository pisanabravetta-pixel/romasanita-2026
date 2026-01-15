import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Chi Siamo | ServiziSalute Roma - La tua salute nel tuo quartiere</title>
        <meta name="description" content="Scopri la missione di ServiziSalute Roma: connettere pazienti e professionisti sanitari nei quartieri della Capitale in modo semplice e diretto." />
      </Head>

      {/* HEADER COERENTE */}
      <div style={{ backgroundColor: '#3182ce', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🇮🇹 IL PORTALE DELLA SANITÀ LOCALE A ROMA
      </div>

      <main style={{ flex: '1', maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#3182ce', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#2d3748', fontSize: '36px', fontWeight: '800', marginBottom: '30px', lineHeight: '1.2' }}>
            La salute a portata di quartiere
          </h1>

          <section style={{ lineHeight: '1.8', color: '#4a5568', fontSize: '18px' }}>
            <p style={{ marginBottom: '20px' }}>
              <strong>ServiziSalute Roma</strong> nasce nel 2026 da un'idea semplice ma fondamentale: rendere la sanità locale più accessibile, trasparente e vicina ai cittadini.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              In una metropoli come Roma, trovare il professionista giusto vicino casa può essere frustrante. Spesso ci si perde tra grandi portali nazionali o recensioni poco chiare. Noi abbiamo scelto di focalizzarci esclusivamente sulla <strong>Capitale e sui suoi quartieri</strong>.
            </p>

            <h2 style={{ color: '#2c5282', marginTop: '40px', fontSize: '24px', fontWeight: '700' }}>La nostra Mission</h2>
            <p style={{ marginBottom: '20px' }}>
              Vogliamo che ogni romano, che si trovi a Prati, all'EUR o a Roma Nord, possa trovare un dentista, un cardiologo o una farmacia in pochi clic, con la possibilità di <strong>contattare direttamente lo studio</strong> via telefono o WhatsApp, senza filtri e senza costi aggiuntivi.
            </p>

            <div style={{ backgroundColor: '#ebf8ff', padding: '30px', borderRadius: '20px', borderLeft: '6px solid #3182ce', margin: '40px 0' }}>
              <h3 style={{ color: '#2c5282', margin: '0 0 10px 0', fontSize: '20px' }}>Cosa NON siamo</h3>
              <p style={{ margin: 0, fontSize: '16px', color: '#2a4365' }}>
                Non siamo uno studio medico, non siamo un intermediario di prenotazioni e non percepiamo commissioni sulle tue visite. Siamo un <strong>portale informativo indipendente</strong> che promuove le eccellenze sanitarie del territorio romano.
              </p>
            </div>

            <h2 style={{ color: '#2c5282', fontSize: '24px', fontWeight: '700' }}>Perché usare ServiziSalute?</h2>
            <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Ricerca Geografica:</strong> Risultati filtrati per il tuo specifico quartiere o zona postale.</li>
              <li style={{ marginBottom: '12px' }}><strong>Contatto Diretto:</strong> Parli subito con la segreteria o il medico senza attese al centralino.</li>
              <li style={{ marginBottom: '12px' }}><strong>Gratuito:</strong> Il servizio è completamente gratuito per i pazienti.</li>
            </ul>
          </section>

          <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px 0 0', borderTop: '1px solid #edf2f7' }}>
            <p style={{ color: '#718096', marginBottom: '15px' }}>Hai domande o vuoi collaborare con noi?</p>
            <a href="/contatti" style={{ color: '#3182ce', fontWeight: 'bold', textDecoration: 'none', fontSize: '18px' }}>Vai alla pagina Contatti →</a>
          </div>
        </div>
      </main>

   <Footer />
    </div>
  );
}
