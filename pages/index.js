import Head from 'next/head';

export default function Home() {
  const zoneRoma = [
    "Centro Storico", "Testaccio", "Trastevere", "Monti", "San Lorenzo", "Pigneto", "Garbatella", 
    "Ostiense", "Tiburtino", "San Giovanni", "Prati", "Villa Borghese", "Nomentano", "Parioli", 
    "Portuense", "Gianicolense", "Trionfale", "Popolo", "Eur", "Monteverde", "Flaminio"
  ];

  return (
    <div>
      <Head>
        <title>ServiziSalute - Il Portale della Sanità a Roma</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      {/* TOP BAR */}
      <div className="top-bar">
        🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
      </div>

      {/* HEADER (Codice 1) */}
      <header className="header">
        <div className="container">
          <div style={{fontSize: '24px', fontWeight: '800', color: '#0070f3'}}>ServiziSalute</div>
          <ul className="nav-links">
            <li><a href="#">Farmacie</a></li>
            <li><a href="#">Dentisti</a></li>
            <li><a href="#">Diagnostica</a></li>
            <li><a href="#">Specialisti</a></li>
            <li><a href="#">Domicilio</a></li>
          </ul>
          <div className="nav-right">
            <a href="#" style={{textDecoration: 'none', color: '#333', fontWeight: '500'}}>Accedi</a>
            <a href="#" className="btn-search" style={{padding: '10px 22px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px'}}>Pubblica annuncio</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Sfondo leggermente più scuro + Barra Codice 1) */}
      <section className="hero" style={{ backgroundColor: '#d0e3ff' }}>
        <div className="container">
          <h1>Trova servizi sanitari a Roma, vicino a te</h1>
          <p>Farmacie, dentisti, diagnostica e visite specialistiche in un unico posto</p>

          <div className="search-box-container">
            <div className="search-input-group">
              <label>COSA CERCHI</label>
              <input type="text" placeholder="Es: Pulizia denti, Tachipirina..." />
            </div>
            <div className="search-input-group">
              <label>ZONA / QUARTIERE</label>
              <select>
                <option>Tutta Roma</option>
                {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
              </select>
            </div>
            <div className="search-input-group">
              <label>CATEGORIA</label>
              <select>
                <option>Tutte le categorie</option>
                <option>Farmacie</option>
                <option>Dentisti</option>
                <option>Diagnostica</option>
                <option>Visite Specialistiche</option>
                <option>Servizi a Domicilio</option>
              </select>
            </div>
            <button className="btn-search">CERCA</button>
          </div>

          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '20px', fontWeight: '700', color: '#0056b3', fontSize: '15px' }}>
            <span><i className="fas fa-check-circle"></i> +1500 annunci attivi</span>
            <span><i className="fas fa-user-md"></i> +850 professionisti</span>
            <span><i className="fas fa-chart-line"></i> 15k visitatori/mese</span>
          </div>
        </div>
      </section>

      {/* CATEGORIE (Stile Codice 1) */}
      <div className="categories-subito">
        <div className="container" style={{display: 'flex', justifyContent: 'center', gap: '40px'}}>
            <a href="#" className="cat-item"><i className="fas fa-pills"></i><span>Farmacie</span></a>
            <a href="#" className="cat-item"><i className="fas fa-tooth"></i><span>Dentisti</span></a>
            <a href="#" className="cat-item"><i className="fas fa-microscope"></i><span>Diagnostica</span></a>
            <a href="#" className="cat-item"><i className="fas fa-user-md"></i><span>Specialisti</span></a>
            <a href="#" className="cat-item"><i className="fas fa-home"></i><span>Domicilio</span></a>
        </div>
      </div>

      {/* ULTIMI ANNUNCI (5 Annunci su una riga) */}
      <section className="container" style={{padding: '50px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=300" alt="Farmacia" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>FARMACIE</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Farmacia H24 Centro</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1579152276506-448c37c67126?w=300" alt="Diagnostica" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>DIAGNOSTICA</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Centro RX Prati</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300" alt="Dentisti" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>DENTISTI</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Studio Dentistico Eur</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300" alt="Visita" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>SPECIALISTI</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Dermatologo Roma</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300" alt="Domicilio" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>DOMICILIO</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Infermiere a Casa</h4>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIZI PIÙ RICHIESTI (Codice 1) */}
      <section className="container" style={{ padding: '40px 0', borderTop: '1px solid #eee' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '20px' }}>Servizi più richiesti</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {['Tamponi Rapidi', 'Fisioterapia', 'Pulizia Denti', 'Certificati Sportivi', 'Oculista', 'Psicologo', 'Cardiologo', 'Ortopedico', 'Ginecologo', 'Nutrizionista'].map(s => (
            <span key={s} style={{ background: '#eee', padding: '8px 18px', borderRadius: '4px', fontSize: '13px', fontWeight: '500' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* SEZIONI PERCHÉ SCEGLIERE / PUBBLICARE (Codice 1 con colori diversi) */}
      <section style={{ background: '#f8fbff', padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', borderLeft: '5px solid #0070f3', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{fontSize: '22px', marginBottom: '15px', color: '#0070f3'}}>Perché scegliere ServiziSalute?</h3>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7' }}>
              Mettiamo in contatto diretto pazienti e strutture senza alcuna commissione. 
              La nostra piattaforma è ottimizzata per trovare il servizio più vicino a te in pochi secondi, 
              garantendo trasparenza e velocità di contatto.
            </p>
          </div>
          <div style={{ background: '#eef6ff', padding: '40px', borderRadius: '12px', borderLeft: '5px solid #00a86b', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{fontSize: '22px', marginBottom: '15px', color: '#00a86b'}}>Perché pubblicare su ServiziSalute?</h3>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7' }}>
              Se sei un professionista o gestisci una struttura sanitaria a Roma, ServiziSalute ti offre 
              la massima visibilità locale. Pubblicare è gratuito, veloce e ti permette di ricevere 
              contatti diretti via telefono o email senza intermediari.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#222', color: 'white', padding: '50px 0 20px', textAlign: 'center' }}>
        <div className="container">
          <p style={{fontSize: '16px', fontWeight: 'bold'}}>ServiziSalute.it</p>
          <p style={{color: '#888', fontSize: '14px', marginTop: '10px'}}>Il punto di riferimento per la sanità a Roma</p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px', fontSize: '12px', color: '#666' }}>
            &copy; 2024 ServiziSalute - Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
