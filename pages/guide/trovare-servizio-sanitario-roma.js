import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';

export default function GuidaRicercaSanitaria() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Come trovare il servizio sanitario giusto a Roma | ServiziSalute</title>
        <meta name="description" content="Guida pratica su come trovare farmacie, dentisti e specialisti nei quartieri di Roma. Scopri come semplificare la tua ricerca sanitaria locale." />
        
        {/* QUESTO TAG COMUNICA A GOOGLE DI MOSTRARE L'IMMAGINE GRANDE IN DISCOVER */}
        <meta name="robots" content="max-image-preview:large" />
      </Head>
<div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
  <img 
    src="/images/guida-roma-salute.png" 
    alt="Guida Servizi Sanitari Roma" 
    style={{ 
      width: '100%', 
      height: 'auto', 
      borderRadius: '24px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
    }} 
  />
</div>
      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '40px auto', padding: '0 20px', width: '100%' }}>
        
        {/* BREADCRUMB: AIUTA L'UTENTE A CAPIRE DOVE SI TROVA */}
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#059669', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#065f46' }}>Trovare Servizi a Roma</span>
        </div>

        <article>
          <h1 style={{ color: '#065f46', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Come trovare il servizio sanitario giusto a Roma, nel proprio quartiere
          </h1>

          <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #10b981', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#166534', fontSize: '18px', lineHeight: '1.6' }}>
              Roma è una città grande e complessa. Quando si ha bisogno di un servizio sanitario, sapere dove cercare e a chi rivolgersi fa la differenza tra risolvere un problema o perdere ore nel traffico.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>
              Farmacie, dentisti, centri diagnostici e specialisti sono distribuiti in tutti i quartieri, ma spesso le informazioni online sono frammentate o poco chiare. 
              <strong> Cercare per quartiere</strong> è la scelta migliore per ridurre i tempi di spostamento e avere continuità nel tempo.
            </p>

            <h2 style={{ color: '#065f46', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Perché la vicinanza conta</h2>
            <p>
              Trovare uno specialista vicino casa non è solo una comodità. Significa poter contare su strutture di zona in caso di necessità e creare un rapporto di fiducia con i professionisti del territorio. 
              Sempre più cittadini oggi cercano online combinando il servizio desiderato con la zona di residenza.
            </p>

            <h2 style={{ color: '#065f46', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Un portale per semplificare tutto</h2>
            <p>
              ServiziSalute nasce proprio per questo: raccogliere e organizzare i servizi sanitari presenti a Roma, suddividendoli per categoria e quartiere. 
              In questo modo l’utente può trovare rapidamente ciò che cerca, visualizzando subito i contatti diretti dei professionisti.
            </p>
          </section>

          {/* CTA PER I PROFESSIONISTI - COME DA APPUNTI */}
          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#0f172a', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Sei un professionista sanitario a Roma?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Renditi visibile ai pazienti del tuo quartiere in pochi click.</p>
            <a href="/per-i-professionisti" style={{ color: '#10b981', fontWeight: '800', textDecoration: 'none', border: '2px solid #10b981', padding: '10px 20px', borderRadius: '10px' }}>
              SCOPRI COME FUNZIONA
            </a>
          </div>
        </article>
      </main>

      {/* FOOTER MASTER INTEGRALE E IDENTICO ALLA HOME CON DISCLAIMER */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            
            {/* COLONNA 1: DESCRIZIONE PULITA */}
<div>
  <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
  <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
    ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
    Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
  </p>
</div>

            {/* COLONNA 2: UTENTI */}
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

            {/* COLONNA 3: PROFESSIONISTI */}
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

            {/* COLONNA 4: LEGALE + DISCLAIMER (COME IN HOME) */}
<div>
  <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
  <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
    <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
    <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
    <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
    <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
  </ul>
  {/* DISCLAIMER SOTTO I LINK LEGALI */}
  <p style={{ fontSize: '11px', color: '#718096', lineHeight: '1.4', fontStyle: 'italic', borderTop: '1px solid #2d3748', paddingTop: '10px' }}>
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
