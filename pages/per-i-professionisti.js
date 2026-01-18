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
      
      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>
        🚀 PORTA IL TUO STUDIO NEL CUORE DEI QUARTIERI DI ROMA — EDIZIONE 2026
      </div>

      <Navbar />

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', fontSize: '14px', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
          <span style={{ color: '#64748b' }}>Area Professionisti</span>
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        
        {/* HERO SECTION CON TASTO COME FUNZIONA */}
        <div style={{ marginBottom: '40px', backgroundColor: 'white', padding: '40px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 15px 30px rgba(0,0,0,0.03)', textAlign: 'center' }}>
          <h1 style={{ color: '#0f172a', fontSize: '36px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>
            Diventa visibile per chi cerca <br/><span style={{ color: '#2563eb' }}>servizi sanitari a Roma</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px', fontWeight: '500' }}>
            ServiziSalute aiuta i cittadini a trovare specialisti nel proprio quartiere. <strong>Offriamo uno spazio gratuito per posizionare il tuo studio medico nei risultati di ricerca a Roma.</strong>
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '18px 35px', borderRadius: '14px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', fontSize: '18px' }}>
              REGISTRA IL TUO PROFILO ORA
            </a>
            
            {/* ECCO IL TASTO MANCANTE */}
            <a href="/come-funziona" style={{ backgroundColor: 'white', color: '#2563eb', padding: '16px 35px', borderRadius: '14px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', fontSize: '18px', border: '2px solid #2563eb' }}>
              SCOPRI COME FUNZIONA
            </a>
          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '25px', borderRadius: '24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '32px' }}>📊</div>
          <div>
            <h3 style={{ margin: 0, color: '#1e40af', fontSize: '18px', fontWeight: '800' }}>Cresce la richiesta di specialisti di zona</h3>
            <p style={{ margin: '5px 0 0', color: '#1e40af', fontSize: '14px', lineHeight: '1.4' }}>
              Pazienti a <strong>Prati, EUR, Parioli e Roma Centro</strong> cercano ogni giorno professionisti vicini. Non lasciare che trovino solo i tuoi competitor.
            </p>
          </div>
        </div>

        {/* CARATTERISTICHE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '50px' }}>
          <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#0f172a', fontWeight: '900', marginBottom: '12px', fontSize: '18px' }}>📍 Hyper-Local Roma</h4>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6' }}>Siamo l'unico portale focalizzato esclusivamente sui quartieri della Capitale. Valorizziamo la tua presenza territoriale.</p>
          </div>
          <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#0f172a', fontWeight: '900', marginBottom: '12px', fontSize: '18px' }}>💰 Zero Commissioni</h4>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6' }}>Nessun costo nascosto o percentuale sulle prestazioni. Il fatturato delle tue visite resta interamente a te.</p>
          </div>
          <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: '#0f172a', fontWeight: '900', marginBottom: '12px', fontSize: '18px' }}>📱 Contatto Diretto</h4>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6' }}>Nessuna barriera. Ricevi chiamate e messaggi WhatsApp direttamente sul cellulare o al numero del tuo studio.</p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '30px', color: '#0f172a', textAlign: 'center' }}>Domande Frequenti</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {schemas.faq.mainEntity.map((item, i) => (
              <div key={i} style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: '900', color: '#1e293b', fontSize: '17px' }}>{item.name}</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2 style={{ fontWeight: '900', color: '#0f172a', marginBottom: '20px' }}>Pronto ad aumentare i tuoi contatti?</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#0f172a', color: 'white', padding: '18px 40px', borderRadius: '14px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', fontSize: '18px' }}>
            ISCRIVITI GRATIS
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
