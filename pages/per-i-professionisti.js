import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function PerIProfessionistiRoma() {
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute Business</title>
        <meta name="description" content="Sei un medico o uno specialista a Roma? Aumenta la tua visibilità locale e ricevi contatti diretti dai pazienti del tuo quartiere. Aggiornato 2026." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>
      
      {/* BARRA SUPERIORE BLINDATA */}
      <div style={{ backgroundColor: '#065f46', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '100%' }}>
        🚀 PORTA IL TUO STUDIO NEL CUORE DEI QUARTIERI DI ROMA — EDIZIONE 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
        <div style={{ margin: '10px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#065f46' }}>Per i Professionisti</span>
        </div>

        {/* TITOLO MASTER H1 BOXATO (STILE DIAGNOSTICA ROMA) */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #10b981', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Sei un Professionista a Roma?
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Visibilità Locale <span style={{ color: '#10b981' }}>Gratuita e Diretta</span> nel tuo quartiere
          </p>
        </div>

        {/* CONTENUTO INFORMATIVO */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', color: '#065f46' }}>Perché scegliere ServiziSalute Roma:</h2>
          <ul style={{ lineHeight: '2', fontSize: '16px', color: '#475569', paddingLeft: '20px' }}>
            <li>✅ <strong>Zero Intermediari:</strong> Il paziente chiama te, non noi.</li>
            <li>✅ <strong>Zero Commissioni:</strong> Non tratteniamo nulla sulle tue parcelle.</li>
            <li>✅ <strong>Focus Territoriale:</strong> Compari nelle ricerche per il tuo quartiere (Prati, Eur, ecc.).</li>
            <li>✅ <strong>SEO Pronta:</strong> Pensiamo noi a farti trovare su Google.</li>
          </ul>
        </div>

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Inizia a ricevere nuovi contatti oggi</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>La pubblicazione del profilo è rapida e totalmente gratuita.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '15px 35px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>PUBBLICA IL TUO ANNUNCIO</a>
        </div>

        {/* FAQ (3 DOMANDE) */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#065f46' }}>Domande Frequenti</h3>
          {schemas.faq.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: '0 0 5px 0' }}><strong>{item.name}</strong></p>
              <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

      </main>

      {/* FOOTER MASTER INTEGRALE A 4 COLONNE (STRICTLY REQUIRED) */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>
                ● Disponibilità aggiornate: Gennaio 2026
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                  ⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.
                </p>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
