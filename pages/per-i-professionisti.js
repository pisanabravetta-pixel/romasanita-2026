import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute</title>
        <meta name="description" content="Sei un medico, una farmacia o un centro diagnostico a Roma? Scopri come aumentare la tua visibilità e ricevere contatti diretti dai pazienti." />
      </Head>

      {/* 🔹 HERO BUSINESS */}
      <header style={{ backgroundColor: '#065f46', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Porta la tua attività sanitaria <br/> nel cuore dei quartieri di Roma
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '40px', opacity: '0.9', maxWidth: '800px', margin: '0 auto 40px' }}>
          ServiziSalute è il portale che connette specialisti e strutture sanitarie con migliaia di pazienti che cercano servizi nel proprio quartiere.
        </p>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '20px 40px', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
          Inizia Ora - È Gratis
        </a>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 🔹 I VANTAGGI (GRIGLIA) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📍</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46' }}>Visibilità Locale</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Sia che tu sia a Prati, all'EUR o in Centro, ti posizioniamo esattamente davanti agli utenti che cercano nel tuo quartiere.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📱</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46' }}>Contatto Diretto</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Nessun intermediario o commissione sulle prenotazioni. I pazienti ti chiamano o ti scrivono direttamente su WhatsApp.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚀</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46' }}>SEO Ottimizzato</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Sfrutta il nostro posizionamento su Google per apparire nelle ricerche locali senza dover investire migliaia di euro in pubblicità.</p>
          </div>
        </div>

        {/* 🔹 COME FUNZIONA */}
        <section style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>Come funziona in 3 step</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', display: 'block', marginBottom: '10px' }}>1. Crea</span>
              <p>Inserisci i dati della tua attività, specializzazione e contatti.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', display: 'block', marginBottom: '10px' }}>2. Pubblica</span>
              <p>Il nostro team approva l'annuncio e lo ottimizza per i motori di ricerca.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', padding: '20px' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', display: 'block', marginBottom: '10px' }}>3. Ricevi</span>
              <p>Inizia a ricevere contatti diretti da pazienti interessati ai tuoi servizi.</p>
            </div>
          </div>
        </section>

        {/* 🔹 FAQ PROFESSIONISTI */}
        <section style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>Domande Frequenti</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Quanto costa pubblicare un annuncio?</p>
              <p style={{ color: '#64748b' }}>La pubblicazione base è attualmente gratuita. Offriamo piani "TOP" per chi desidera il massimo della visibilità in cima ai risultati.</p>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Devo pagare commissioni sulle visite?</p>
              <p style={{ color: '#64748b' }}>Assolutamente no. Il rapporto tra te e il paziente è diretto al 100%.</p>
            </div>
          </div>
        </section>
      </main>
{/* FOOTER IDENTICO ALLA HOME */}
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
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
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
              <p style={{ fontSize: '11px', color: '#718096', marginTop: '15px', fontStyle: 'italic', lineHeight: '1.4' }}>
                🔍 Oltre 15.000 ricerche mensili di pazienti registrate a Roma.
              </p>
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
              <p style={{ fontSize: '12px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>
                ServiziSalute è un portale di annunci e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.
              </p>
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
