import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute</title>
        <meta name="description" content="Sei un medico, una farmacia o un centro diagnostico a Roma? Scopri come aumentare la tua visibilità locale e ricevere contatti diretti dai pazienti." />
      </Head>

      {/* 🔹 NAVBAR SEMPLIFICATA */}
      <nav style={{ backgroundColor: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: '800', color: '#065f46', textDecoration: 'none' }}>ServiziSalute <span style={{fontSize: '12px', color: '#64748b'}}>Business</span></a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}>Inizia ora</a>
      </nav>

      {/* 🔹 HERO BUSINESS */}
      <header style={{ backgroundColor: '#065f46', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
            Porta la tua attività sanitaria <br/> nel cuore dei quartieri di Roma
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: '0.9', lineHeight: '1.6' }}>
            ServiziSalute è il portale che connette specialisti e strutture sanitarie con migliaia di pazienti che cercano servizi specifici nella propria zona di residenza.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '20px 40px', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
              Pubblica il tuo profilo
            </a>
            <a href="#vantaggi" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '20px 40px', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
              Scopri di più
            </a>
          </div>
        </div>
      </header>

      <main id="vantaggi" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 20px' }}>
        
        {/* 🔹 SEZIONE STATISTICHE RAPIDE */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '80px', flexWrap: 'wrap', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#065f46' }}>15k+</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Ricerche mensili a Roma</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#065f46' }}>100%</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Contatto diretto</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#065f46' }}>0€</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Commissioni sulle visite</div>
          </div>
        </div>
        
        {/* 🔹 I VANTAGGI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📍</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46', fontWeight: '700' }}>Iper-Targeting Geografico</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Sia che tu sia a Prati, all'EUR o in Centro, ti posizioniamo esattamente davanti agli utenti che cercano servizi sanitari nel tuo quartiere specifico.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📱</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46', fontWeight: '700' }}>Disintermediazione Totale</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>A differenza di altri portali, non tratteniamo commissioni. I pazienti ti chiamano o ti scrivono direttamente su WhatsApp o telefono.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚀</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46', fontWeight: '700' }}>Autorità SEO</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Sfrutta il nostro posizionamento organico per query come "Dermatologo Roma Prati" senza dover gestire complessi siti web personali.</p>
          </div>
        </div>

        {/* 🔹 COME FUNZIONA */}
        <section style={{ marginBottom: '100px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '50px', fontWeight: '800' }}>Attiva il tuo profilo in 3 minuti</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
            <div style={{ flex: '1', minWidth: '280px', padding: '30px', backgroundColor: '#ecfdf5', borderRadius: '20px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', display: 'block', marginBottom: '15px' }}>01.</span>
              <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>Inserisci i Dati</h4>
              <p style={{ fontSize: '15px', color: '#475569' }}>Compila il form con specializzazione, zona e recapiti professionali.</p>
            </div>
            <div style={{ flex: '1', minWidth: '280px', padding: '30px', backgroundColor: '#ecfdf5', borderRadius: '20px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', display: 'block', marginBottom: '15px' }}>02.</span>
              <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>Verifica e SEO</h4>
              <p style={{ fontSize: '15px', color: '#475569' }}>Il nostro team revisiona l'annuncio e lo ottimizza per la massima visibilità locale.</p>
            </div>
            <div style={{ flex: '1', minWidth: '280px', padding: '30px', backgroundColor: '#ecfdf5', borderRadius: '20px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', display: 'block', marginBottom: '15px' }}>03.</span>
              <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>Ricevi Contatti</h4>
              <p style={{ fontSize: '15px', color: '#475569' }}>Il tuo profilo appare nelle ricerche dei quartieri di Roma e ricevi lead diretti.</p>
            </div>
          </div>
        </section>

        {/* 🔹 FAQ PROFESSIONISTI */}
        <section style={{ backgroundColor: 'white', padding: '50px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '40px', textAlign: 'center', fontWeight: '800' }}>Domande per i Professionisti</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#0f172a' }}>Quanto costa pubblicare un annuncio?</p>
              <p style={{ color: '#64748b', fontSize: '16px' }}>La pubblicazione standard è gratuita per il primo periodo. Offriamo opzioni "Premium" per i professionisti che desiderano apparire in cima alle liste di quartiere.</p>
            </div>
            <div style={{ marginBottom: '30px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#0f172a' }}>Posso modificare i miei dati in seguito?</p>
              <p style={{ color: '#64748b', fontSize: '16px' }}>Certamente. Potrai aggiornare i tuoi orari, i recapiti o le zone di competenza contattando il nostro supporto dedicato.</p>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#0f172a' }}>Chi gestisce le prenotazioni?</p>
              <p style={{ color: '#64748b', fontSize: '16px' }}>Le prenotazioni vengono gestite interamente da te o dalla tua segreteria. Noi forniamo solo il ponte di collegamento tecnologico tra il paziente e il tuo studio.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER INTEGRALE DELLA HOME */}
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
