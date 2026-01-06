import React from 'react';
import Head from 'next/head';

export default function Contatti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Contatti | ServiziSalute Roma - Supporto Utenti e Professionisti</title>
        <meta name="description" content="Contatta il team di ServiziSalute Roma. Siamo a disposizione per supporto tecnico, segnalazioni o informazioni sulla pubblicazione degli annunci sanitari." />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <nav>
             <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
           </nav>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.7' }}>
        <nav style={{ marginBottom: '30px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            ← Torna alla Home
          </a>
        </nav>
        
        <header style={{ marginBottom: '50px' }}>
          <h1 style={{ fontSize: '42px', color: '#1e3a8a', marginBottom: '15px', fontWeight: '900', letterSpacing: '-1px' }}>Contatti</h1>
          <p style={{ fontSize: '19px', color: '#64748b' }}>Hai domande o suggerimenti? Il nostro team dedicato a Roma è qui per aiutarti.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          
          {/* BOX EMAIL */}
          <div style={{ padding: '35px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '32px', marginBottom: '20px' }}>✉️</div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '20px' }}>Supporto Utenti</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '15px', color: '#64748b' }}>Per segnalazioni su annunci o informazioni generali:</p>
            <a href="mailto:info@servizisalute.it" style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb', textDecoration: 'none', borderBottom: '2px solid #dbeafe' }}>
              info@servizisalute.it
            </a>
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
              Tempo medio di risposta: 24 ore.
            </p>
          </div>

          {/* BOX PROFESSIONISTI */}
          <div style={{ padding: '35px', background: '#eff6ff', borderRadius: '24px', border: '1px solid #dbeafe' }}>
            <div style={{ fontSize: '32px', marginBottom: '20px' }}>👨‍⚕️</div>
            <h3 style={{ color: '#1e40af', margin: '0 0 10px 0', fontSize: '20px' }}>Area Professionisti</h3>
            <p style={{ fontSize: '15px', color: '#1e40af', opacity: 0.9 }}>
              Hai bisogno di assistenza per il tuo profilo? Indica il nome del tuo studio nell'oggetto della mail per una gestione prioritaria.
            </p>
            <div style={{ marginTop: '25px' }}>
               <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}>Gestisci il tuo annuncio →</a>
            </div>
          </div>

        </div>

        {/* FAQ VELOCE CON DESIGN PULITO */}
        <section style={{ marginTop: '80px', padding: '40px', backgroundColor: '#f8fafc', borderRadius: '32px' }}>
          <h2 style={{ fontSize: '26px', color: '#1e3a8a', marginBottom: '30px', textAlign: 'center' }}>Domande Frequenti (FAQ)</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '8px', fontSize: '16px' }}>Posso modificare un annuncio già pubblicato?</p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>Certamente. Inviaci una mail con i nuovi dati (orari, indirizzo o descrizione) e aggiorneremo il tuo profilo entro poche ore.</p>
            </div>

            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '8px', fontSize: '16px' }}>Il servizio rimarrà gratuito?</p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>Sì, la missione di ServiziSalute Roma è promuovere la sanità di prossimità. La pubblicazione base non prevede alcun canone o commissione.</p>
            </div>

            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '8px', fontSize: '16px' }}>Come vengono verificati gli annunci?</p>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>Ogni inserzione viene revisionata manualmente dal nostro team per garantire che le informazioni siano veritiere e utili per i cittadini.</p>
            </div>
          </div>
        </section>

        {/* MESSAGGIO FINALE */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            ServiziSalute Roma è un progetto tecnologico indipendente.<br/>
            Sede Operativa: Roma, Italia.
          </p>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '60px 20px', fontSize: '13px', color: '#94a3b8', borderTop: '1px solid #f1f5f9', marginTop: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p>© 2026 ServiziSalute Roma - Supporto alla Sanità Locale.</p>
          <div style={{ marginTop: '15px' }}>
            <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 10px' }}>Privacy</a>
            <a href="/chi-siamo" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 10px' }}>Chi Siamo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
