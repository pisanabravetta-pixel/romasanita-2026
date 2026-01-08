import React from 'react';
import Head from 'next/head';

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Head>
        <title>Chi Siamo | ServiziSalute Roma - La tua salute nel tuo quartiere</title>
        <meta name="description" content="Scopri la missione di ServiziSalute Roma: connettere pazienti e professionisti sanitari nei quartieri della Capitale in modo semplice e diretto." />
      </Head>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '36px', fontWeight: '800', marginBottom: '30px' }}>
          La salute a portata di quartiere
        </h1>

        <section style={{ lineHeight: '1.8', color: '#475569', fontSize: '18px' }}>
          <p style={{ marginBottom: '20px' }}>
            <strong>ServiziSalute Roma</strong> nasce da un'idea semplice ma fondamentale: rendere la sanità locale più accessibile, trasparente e vicina ai cittadini.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            In una metropoli come Roma, trovare il professionista giusto vicino casa può essere frustrante. Spesso ci si perde tra grandi portali nazionali o recensioni poco chiare. Noi abbiamo scelto di focalizzarci esclusivamente sulla <strong>Capitale e sui suoi quartieri</strong>.
          </p>

          <h2 style={{ color: '#1e3a8a', marginTop: '40px', fontSize: '24px' }}>La nostra Mission</h2>
          <p style={{ marginBottom: '20px' }}>
            Vogliamo che ogni romano, che si trovi a Prati, all'EUR o a Roma Nord, possa trovare un dentista, un cardiologo o una farmacia in pochi clic, con la possibilità di <strong>contattare direttamente lo studio</strong> via telefono o WhatsApp, senza filtri e senza costi aggiuntivi.
          </p>

          <div style={{ backgroundColor: '#f0f9ff', padding: '30px', borderRadius: '16px', borderLeft: '5px solid #3b82f6', margin: '40px 0' }}>
            <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Cosa NON siamo</h3>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Non siamo uno studio medico, non siamo un intermediario di prenotazioni e non percepiamo commissioni sulle tue visite. Siamo un <strong>portale informativo indipendente</strong> che promuove le eccellenze sanitarie del territorio.
            </p>
          </div>

          <h2 style={{ color: '#1e3a8a', fontSize: '24px' }}>Perché usarlo?</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ricerca Geografica:</strong> Risultati filtrati per il tuo specifico quartiere.</li>
            <li style={{ marginBottom: '10px' }}><strong>Contatto Diretto:</strong> Parli subito con la segreteria o il medico.</li>
            <li style={{ marginBottom: '10px' }}><strong>Gratuito:</strong> Il servizio è completamente gratuito per i pazienti.</li>
          </ul>
        </section>

        <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', borderTop: '1px solid #eee' }}>
          <p style={{ color: '#64748b' }}>Hai domande o vuoi collaborare con noi?</p>
          <a href="/contatti" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Vai alla pagina Contatti →</a>
        </div>
      </main>
    </div>
  );
}
