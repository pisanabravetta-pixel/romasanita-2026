import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function PerIProfessionisti() {
  const schemas = {
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto costa pubblicare un annuncio su ServiziSalute?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La pubblicazione del profilo standard è totalmente gratuita. Non applichiamo costi di iscrizione né commissioni sulle visite che riceverai dai pazienti."
          }
        },
        {
          "@type": "Question",
          "name": "Come avviene il contatto con il paziente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il contatto è diretto. Il paziente utilizza i tasti Chiama o WhatsApp per parlare direttamente con te o la tua segreteria, senza intermediari."
          }
        },
        {
          "@type": "Question",
          "name": "Il portale è specifico per Roma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sì, il nostro portale è focalizzato esclusivamente sui quartieri di Roma, permettendoti di raggiungere pazienti che vivono realmente vicino al tuo studio."
          }
        }
      ]
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Perché essere presenti su ServiziSalute Roma | Area Professionisti</title>
        <meta name="description" content="Aumenta la visibilità del tuo studio medico a Roma. Pubblica gratuitamente il tuo profilo e ricevi contatti diretti dai pazienti del tuo quartiere." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>
      
      {/* BARRA SUPERIORE BLU BUSINESS */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>
        🚀 PORTA IL TUO STUDIO NEL CUORE DEI QUARTIERI DI ROMA — EDIZIONE 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        
        {/* HERO SECTION - TESTO APPUNTI */}
        <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '40px', borderRadius: '25px', border: '2px solid #2563eb', boxShadow: '0 15px 30px rgba(37,99,235,0.05)', textAlign: 'center' }}>
          <h1 style={{ color: '#0f172a', fontSize: '36px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>
            Diventa visibile per chi cerca <br/><span style={{ color: '#2563eb' }}>servizi sanitari a Roma</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px' }}>
            ServiziSalute nasce per aiutare i cittadini a trovare farmacie, studi medici e professionisti nel proprio quartiere. <strong>Offriamo uno spazio gratuito per farsi trovare online in modo semplice.</strong>
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '18px 35px', borderRadius: '12px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', fontSize: '18px' }}>
            INSERISCI ORA IL TUO SERVIZIO
          </a>
        </div>

        {/* PUNTO 7 - EFFETTO SPECCHIO (SOCIAL PROOF) */}
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '25px', borderRadius: '20px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '40px' }}>📈</div>
          <div>
            <h3 style={{ margin: 0, color: '#1e40af', fontSize: '18px', fontWeight: '800' }}>Cresce la richiesta nei quartieri</h3>
            <p style={{ margin: '5px 0 0', color: '#1e40af', fontSize: '14px', opacity: 0.8 }}>
              Molti professionisti a <strong>Prati, EUR e San Giovanni</strong> sono già attivi. Non lasciare che i pazienti del tuo quartiere trovino solo i tuoi colleghi.
            </p>
          </div>
        </div>

        {/* GRIGLIA CARATTERISTICHE (PUNTI APPUNTI) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '50px' }}>
          <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#065f46', fontWeight: '800', marginBottom: '10px' }}>Un portale per Roma</h4>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Siamo focalizzati esclusivamente sui quartieri della Capitale. Valorizziamo la vicinanza reale.</p>
          </div>
          <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#065f46', fontWeight: '800', marginBottom: '10px' }}>Nessun costo o vincolo</h4>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Nessuna commissione sulle visite. Il rapporto con il paziente resta tuo, al 100%.</p>
          </div>
          <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#065f46', fontWeight: '800', marginBottom: '10px' }}>Semplice e diretto</h4>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Inserisci il servizio e ricevi chiamate o messaggi WhatsApp direttamente sul tuo numero.</p>
          </div>
        </div>

        {/* TABELLA COMPARATIVA */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '50px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: '900', color: '#0f172a' }}>Perché scegliere ServiziSalute?</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '15px' }}>Caratteristica</th>
                <th style={{ padding: '15px', color: '#2563eb' }}>ServiziSalute Roma</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px' }}>Costo iscrizione</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#059669' }}>GRATUITO</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px' }}>Commissioni visite</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#059669' }}>ZERO</td>
              </tr>
              <tr>
                <td style={{ padding: '15px' }}>Contatto paziente</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#2563eb' }}>DIRETTO</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQ SECTION */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#0f172a' }}>Domande Frequenti</h3>
          {schemas.faq.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '20px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: '800' }}>{item.name}</p>
              <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

      </main>

    <Footer />
    </div>
  );
}
