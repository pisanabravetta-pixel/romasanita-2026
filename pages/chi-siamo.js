import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ChiSiamo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Chi Siamo | ServiziSalute Roma - La tua salute nel tuo quartiere</title>
        <meta name="description" content="Scopri la missione di ServiziSalute Roma: connettere pazienti e professionisti sanitari nei quartieri della Capitale in modo semplice e diretto." />
      </Head>

      {/* BARRA SUPERIORE COERENTE */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
        🇮🇹 IL PORTALE DELLA SANITÀ LOCALE A ROMA — EDIZIONE 2026
      </div>

      <Navbar />

      {/* NAVIGAZIONE DI RITORNO */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '14px', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
          <span style={{ color: '#64748b' }}>Chi Siamo</span>
        </div>
      </div>

      <main style={{ flex: '1', maxWidth: '800px', margin: '40px auto', padding: '0 20px', width: '100%' }}>
        
        <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '32px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#0f172a', fontSize: '36px', fontWeight: '900', marginBottom: '30px', lineHeight: '1.2' }}>
            La salute a portata <br/><span style={{ color: '#2563eb' }}>di quartiere</span>
          </h1>

          <section style={{ lineHeight: '1.8', color: '#475569', fontSize: '18px' }}>
            <p style={{ marginBottom: '20px' }}>
              <strong>ServiziSalute.com Roma</strong> nasce nel 2026 da un'idea fondamentale: rendere la sanità locale più accessibile, trasparente e vicina ai cittadini.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              In una metropoli come Roma, trovare il professionista giusto vicino casa può essere frustrante. Spesso ci si perde tra grandi portali nazionali o centralini infiniti. Noi abbiamo scelto di focalizzarci esclusivamente sulla <strong>Capitale e sui suoi quartieri</strong>.
            </p>

            <h2 style={{ color: '#0f172a', marginTop: '40px', fontSize: '24px', fontWeight: '900' }}>La nostra Mission</h2>
            <p style={{ marginBottom: '20px' }}>
              Vogliamo che ogni romano, che si trovi a <strong>Prati, all'EUR o a San Giovanni</strong>, possa trovare uno specialista in pochi clic, con la possibilità di <strong>contattare direttamente lo studio</strong> via telefono o WhatsApp, senza filtri.
            </p>

            <div style={{ backgroundColor: '#eff6ff', padding: '30px', borderRadius: '24px', borderLeft: '6px solid #2563eb', margin: '40px 0' }}>
              <h3 style={{ color: '#1e40af', margin: '0 0 10px 0', fontSize: '20px', fontWeight: '800' }}>Cosa NON siamo</h3>
              <p style={{ margin: 0, fontSize: '16px', color: '#1e40af', opacity: 0.9 }}>
                Non siamo uno studio medico, non siamo un intermediario di prenotazioni e non percepiamo commissioni sulle visite. Siamo un <strong>portale informativo indipendente</strong> che promuove le eccellenze sanitarie del territorio romano.
              </p>
            </div>

            <h2 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '900' }}>Perché usare ServiziSalute?</h2>
            <ul style={{ paddingLeft: '20px', marginTop: '15px', color: '#475569' }}>
              <li style={{ marginBottom: '12px' }}><strong>Ricerca Geografica:</strong> Risultati filtrati per il tuo specifico quartiere o zona.</li>
              <li style={{ marginBottom: '12px' }}><strong>Contatto Diretto:</strong> Parli subito con la segreteria o il medico senza attese.</li>
              <li style={{ marginBottom: '12px' }}><strong>Gratuito per i cittadini:</strong> Il servizio di ricerca è e sarà sempre gratuito.</li>
            </ul>
          </section>

          <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px 0 0', borderTop: '1px solid #f1f5f9' }}>
            <p style={{ color: '#64748b', marginBottom: '15px', fontWeight: '500' }}>Hai domande o vuoi collaborare con noi?</p>
            <a href="/contatti" style={{ color: '#2563eb', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>Vai alla pagina Contatti →</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
