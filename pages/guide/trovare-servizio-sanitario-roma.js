import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; // 1. IMPORT PRECISO

export default function GuidaRicercaSanitaria() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Come trovare il servizio sanitario giusto a Roma | ServiziSalute</title>
        <meta name="description" content="Guida pratica su come trovare farmacie, dentisti e specialisti nei quartieri di Roma. Scopri come semplificare la tua ricerca sanitaria locale." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      {/* 2. PRIMA LA NAVBAR */}
      <Navbar />

      {/* 3. POI L'IMMAGINE BILANCIATA (SOTTO LA NAVBAR) */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ 
          width: '100%', 
          height: '400px', 
          overflow: 'hidden', 
          borderRadius: '24px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
        }}>
          <img 
            src="/images/guida-roma-salute.png" 
            alt="Mappa concettuale dei servizi sanitari e studi medici nei quartieri di Roma" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '20px auto', padding: '0 20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
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

          {/* CTA PROFESSIONISTI */}
          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#0f172a', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Sei un professionista sanitario a Roma?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Renditi visibile ai pazienti del tuo quartiere in pochi click.</p>
            <a href="/per-i-professionisti" style={{ color: '#10b981', fontWeight: '800', textDecoration: 'none', border: '2px solid #10b981', padding: '10px 20px', borderRadius: '10px' }}>
              SCOPRI COME FUNZIONA
            </a>
          </div>
        </article>
      </main>

      {/* 4. FOOTER MASTER AUTOMATICO (PULIZIA CHIRURGICA) */}
      <Footer />
    </div>
  );
}
