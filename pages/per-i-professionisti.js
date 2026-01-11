import React from 'react';
import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Per i Professionisti della Salute a Roma | ServiziSalute</title>
        <meta name="description" content="Sei un medico o un professionista a Roma? Aumenta la tua visibilità locale a costo zero e ricevi contatti diretti dai pazienti del tuo quartiere." />
      </Head>

      {/* 🔹 NAVBAR SEMPLIFICATA */}
      <nav style={{ backgroundColor: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: '800', color: '#065f46', textDecoration: 'none' }}>
          ServiziSalute <span style={{fontSize: '12px', color: '#64748b'}}>Business</span>
        </a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}>Inizia ora</a>
      </nav>

      {/* 🔹 HERO BUSINESS */}
      <header style={{ backgroundColor: '#065f46', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
            Porta il tuo studio <br/> nel cuore dei quartieri di Roma
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: '0.9', lineHeight: '1.6' }}>
            Ricevi richieste dirette dai pazienti della tua zona. **Senza intermediari, senza commissioni e totalmente gratuito.**
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '20px 40px', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
              Pubblica il tuo profilo Gratis
            </a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 20px' }}>
        
        {/* 🔹 SEZIONE STATISTICHE RAPIDE */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '80px', flexWrap: 'wrap', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#065f46' }}>15k+</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Ricerche mensili a Roma</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#065f46' }}>100%</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Contatto diretto (WhatsApp/Tel)</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#065f46' }}>0€</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Nessun costo di iscrizione</div>
          </div>
        </div>

        {/* 🔹 TABELLA COMPARATIVA (RICHIESTA) */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '800', marginBottom: '30px' }}>Perché scegliere ServiziSalute?</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={{ padding: '20px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Caratteristica</th>
                  <th style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Grandi Portali</th>
                  <th style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#059669', fontWeight: '800' }}>ServiziSalute Roma</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>Costi di iscrizione</td>
                  <td style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', color: '#dc2626' }}>Abbonamenti elevati</td>
                  <td style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', fontWeight: '700' }}>GRATIS</td>
                </tr>
                <tr>
                  <td style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>Commissioni su visite</td>
                  <td style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>Spesso presenti</td>
                  <td style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', fontWeight: '700' }}>ZERO</td>
                </tr>
                <tr>
                  <td style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>Focus geografico</td>
                  <td style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>Nazionale</td>
                  <td style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', fontWeight: '700' }}>Quartieri di Roma</td>
                </tr>
                <tr>
                  <td style={{ padding: '20px' }}>Prenotazioni</td>
                  <td style={{ padding: '20px', textAlign: 'center' }}>Tramite software esterno</td>
                  <td style={{ padding: '20px', textAlign: 'center', fontWeight: '700' }}>Dirette (WhatsApp/Tel)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 🔹 SOCIAL PROOF */}
        <section style={{ marginBottom: '80px', textAlign: 'center' }}>
          <p style={{ fontStyle: 'italic', fontSize: '18px', color: '#475569', maxWidth: '700px', margin: '0 auto' }}>
            "Finalmente un portale che non si mette in mezzo tra me e il paziente. Ricevo chiamate dirette da persone che abitano a pochi isolati dal mio studio."
          </p>
          <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#065f46' }}>— Dr. S. Martini, Psicologa a Roma Prati</p>
        </section>

        {/* 🔹 I VANTAGGI */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📍</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46', fontWeight: '700' }}>Targeting di Quartiere</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Appari esattamente quando un paziente cerca uno specialista nel tuo quartiere (Eur, Parioli, San Giovanni, ecc.).</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📱</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46', fontWeight: '700' }}>Zero Intermediari</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Niente percentuali sulle tue parcelle. Il rapporto con il paziente resta privato e diretto fin dal primo contatto.</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚀</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#065f46', fontWeight: '700' }}>Pronto per il SEO</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>Ottimizziamo noi il tuo profilo per Google. Non hai bisogno di un sito web costoso per essere visibile localmente.</p>
          </div>
        </div>

        {/* 🔹 FINAL CTA */}
        <section style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#065f46', borderRadius: '32px', color: 'white' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '15px' }}>Unisciti alla rete sanitaria di Roma</h2>
          <p style={{ fontSize: '18px', opacity: '0.9', marginBottom: '30px' }}>Inizia a ricevere nuovi contatti oggi stesso. La pubblicazione è gratuita.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '20px 45px', borderRadius: '16px', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>
            Pubblica il tuo annuncio ora
          </a>
        </section>
      </main>

      {/* FOOTER INTEGRALE (Come da tue istruzioni) */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Specialisti</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
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
