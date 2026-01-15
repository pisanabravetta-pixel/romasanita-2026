import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

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
        <meta name="description" content="Diventa visibile per chi cerca servizi sanitari a Roma. Pubblica gratuitamente il tuo profilo medico o la tua struttura sanitaria." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>
      
      {/* BARRA SUPERIORE - BLU BUSINESS */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        🚀 PORTA IL TUO STUDIO NEL CUORE DEI QUARTIERI DI ROMA — EDIZIONE 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0f172a' }}>Per i Professionisti</span>
        </div>

        {/* TITOLO MASTER H1 - COORDINATO CON IL NUOVO TESTO */}
        <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '35px', borderRadius: '20px', borderLeft: '8px solid #2563eb', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#0f172a', fontSize: '38px', fontWeight: '900', margin: '0 0 15px 0', lineHeight: '1.1' }}>
            Diventa visibile per chi cerca <span style={{ color: '#2563eb' }}>servizi sanitari a Roma</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '19px', fontWeight: '500', margin: 0, lineHeight: '1.5' }}>
            ServiziSalute aiuta i cittadini a trovare professionisti nel proprio quartiere. 
            <strong> Pubblica il tuo spazio gratuito in 2 minuti.</strong>
          </p>
        </div>

        {/* SEZIONE PERCHÉ ESSERCI (IL TUO NUOVO TESTO) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', border: '2px solid #e2e8f0' }}>
            <h3 style={{ color: '#065f46', fontWeight: '900', marginBottom: '15px' }}>📍 Focus Roma e Quartieri</h3>
            <p style={{ color: '#64748b', fontSize: '15px' }}>A differenza dei grandi portali, siamo focalizzati solo sulla Capitale. Valorizziamo la vicinanza tra medico e paziente.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', border: '2px solid #2563eb' }}>
            <h3 style={{ color: '#2563eb', fontWeight: '900', marginBottom: '15px' }}>✅ Nessun Costo o Vincolo</h3>
            <p style={{ color: '#64748b', fontSize: '15px' }}>La pubblicazione è gratuita. Nessuna intermediazione, nessuna commissione sulle visite. Contatto diretto via WhatsApp o Tel.</p>
          </div>
        </div>

        {/* TABELLA COMPARATIVA - PIÙ PULITA */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '25px', color: '#0f172a', textAlign: 'center' }}>Vantaggi di ServiziSalute Roma</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', color: '#475569' }}>Costi di iscrizione</td>
                <td style={{ padding: '15px', fontWeight: '900', color: '#059669', textAlign: 'right' }}>GRATIS</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontWeight: '600', color: '#475569' }}>Commissioni su visite</td>
                <td style={{ padding: '15px', fontWeight: '900', color: '#059669', textAlign: 'right' }}>ZERO</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontWeight: '600', color: '#475569' }}>Contatto con il paziente</td>
                <td style={{ padding: '15px', fontWeight: '900', color: '#2563eb', textAlign: 'right' }}>DIRETTO</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA PRINCIPALE - BLU BUSINESS */}
        <div style={{ backgroundColor: '#2563eb', padding: '45px 30px', borderRadius: '25px', textAlign: 'center', color: 'white', marginBottom: '60px', boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '15px' }}>Sei un professionista sanitario a Roma?</h2>
          <p style={{ fontSize: '17px', opacity: '0.9', marginBottom: '30px', fontWeight: '500' }}>Aggiungi gratuitamente il tuo servizio e rendilo visibile a chi lo sta già cercando.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: 'white', color: '#2563eb', padding: '18px 45px', borderRadius: '12px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', fontSize: '18px', transition: 'transform 0.2s' }}>
            PUBBLICA ORA IL TUO ANNUNCIO
          </a>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#0f172a', textAlign: 'center' }}>Domande Frequenti</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {schemas.faq.mainEntity.map((item, i) => (
              <div key={i} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}><strong>{item.name}</strong></p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '15px', lineHeight: '1.5' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER - LASCIO IL TUO MA COORDINATO CON IL BLU */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #2563eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
                Il portale di riferimento per la sanità locale a Roma. Aiutiamo i cittadini a trovare il professionista giusto, quartiere per quartiere.
              </p>
            </div>
            {/* ... Le altre colonne del tuo footer rimangono uguali ... */}
          </div>
        </div>
      </footer>
    </div>
  );
}
