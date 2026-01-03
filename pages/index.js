import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ServiziSalute - Il Portale della Sanità a Roma</title>
        <meta name="description" content="Trova i migliori servizi sanitari a Roma" />
        {/* Importiamo i font e le icone direttamente nell'Head */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      {/* 1. TOP BAR */}
      <div className="top-bar">
        🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
      </div>

      {/* 2. HEADER */}
      <header className="header">
        <div className="header-main">
          <div className="container">
            <a href="#" className="logo">
              <i className="fas fa-hand-holding-medical"></i>
              Servizi<span>Salute</span>
            </a>
            <div className="nav-buttons">
              <a href="#" className="btn-primary">
                <i className="fas fa-plus"></i> Pubblica Annuncio
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1>Il Portale degli <span>Annunci Sanitari</span> per Roma</h1>
          <p style={{ marginBottom: '30px', opacity: 0.9 }}>
            Trova e contatta direttamente professionisti e strutture sanitarie nella capitale.
          </p>
          
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Cerca farmacie, dentisti, visite a domicilio..." />
          </div>

          <div className="hero-stats-inline">
            <div><span>+1250</span> annunci attivi</div>
            <div><span>850+</span> professionisti</div>
            <div><span>15K+</span> visite/mese</div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Esplora le Categorie</h2>
            <p>Trova il servizio sanitario di cui hai bisogno</p>
          </div>
          <div className="categories-grid">
            <a href="#" className="cat-card"><i className="fas fa-pills"></i><h4>Farmacie</h4></a>
            <a href="#" className="cat-card"><i className="fas fa-microscope"></i><h4>Diagnostica</h4></a>
            <a href="#" className="cat-card"><i className="fas fa-home"></i><h4>Servizi a Domicilio</h4></a>
            <a href="#" className="cat-card"><i className="fas fa-user-md"></i><h4>Visite Specialistiche</h4></a>
            <a href="#" className="cat-card"><i className="fas fa-tooth"></i><h4>Dentisti</h4></a>
          </div>
        </div>
      </section>

      {/* 5. ULTIMI ANNUNCI */}
      <section className="section-padding" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <div className="section-title">
            <h2>Ultimi annunci pubblicati</h2>
          </div>
          <div className="announcements-grid">
            {/* Esempio 1: Farmacia */}
            <div className="ann-card">
              <div className="ann-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=400')" }}></div>
              <div className="ann-content">
                <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>FARMACIE</small>
                <h4 style={{ margin: '5px 0' }}>Farmacia H24 Centro</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>Servizio notturno e consegna farmaci a domicilio in tutta Roma centro.</p>
              </div>
            </div>
            {/* Esempio 2: Diagnostica */}
            <div className="ann-card">
              <div className="ann-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579152276506-448c37c67126?auto=format&fit=crop&w=400')" }}></div>
              <div className="ann-content">
                <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>DIAGNOSTICA</small>
                <h4 style={{ margin: '5px 0' }}>Centro Radiologico Nord</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>Ecografie e RX con referto immediato. Convenzionato SSN.</p>
              </div>
            </div>
            {/* Esempio 3: Visite */}
            <div className="ann-card">
              <div className="ann-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400')" }}></div>
              <div className="ann-content">
                <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>VISITE SPECIALISTICHE</small>
                <h4 style={{ margin: '5px 0' }}>Studio Cardiologico</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>Check-up completo del cuore con ECG e visita specialistica.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVIZI PIÙ RICHIESTI */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title">
            <h2>Servizi più richiesti</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {['Tamponi Rapidi', 'Fisioterapia', 'Pulizia Denti', 'Certificati Sportivi', 'Nutrizionista', 'Osteopatia'].map((tag) => (
              <span key={tag} style={{ background: '#e2e8f0', padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INFO SECTION (SEO) */}
      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Perché scegliere ServiziSalute?</h3>
              <p style={{ color: '#64748b' }}>
                Mettiamo in contatto diretto pazienti e strutture senza alcuna commissione. 
                La nostra piattaforma è ottimizzata per trovare il servizio più vicino a te in pochi secondi, 
                garantendo trasparenza e velocità di contatto diretto.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Perché pubblicare su ServiziSalute?</h3>
              <p style={{ color: '#64748b' }}>
                Se sei un professionista o gestisci una struttura sanitaria a Roma, ServiziSalute ti offre 
                la massima visibilità locale. Pubblicare è gratuito, veloce e ti permette di ricevere 
                contatti diretti via telefono o email senza intermediari.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>ServiziSalute</h4>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
                Il portale di riferimento per la sanità a Roma e provincia.
              </p>
            </div>
            <div className="footer-col">
              <h4>Contatti</h4>
              <ul style={{ listStyle: 'none', color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
                <li>Email: info@servizisalute.it</li>
                <li>Roma, Italia</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #334155', paddingTop: '20px', fontSize: '13px', color: '#94a3b8' }}>
            &copy; 2024 ServiziSalute - Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
