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

      {/* HERO SECTION (Codice 1 con sfondo leggermente scuro) */}
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

          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '25px', fontWeight: '700', color: '#0056b3', fontSize: '15px' }}>
            <span>+ 1500 annunci attivi</span>
            <span>+ 850 professionisti</span>
            <span>15k visitatori/mese</span>
          </div>
        </div>
      </section>

      {/* ICONE (Codice 1 con colori diversi) */}
      <div className="categories-subito">
        <div className="container" style={{display: 'flex', justifyContent: 'center', gap: '45px'}}>
            <a href="#" className="cat-item"><i className="fas fa-pills" style={{color: '#e91e63'}}></i><span>Farmacie</span></a>
            <a href="#" className="cat-item"><i className="fas fa-tooth" style={{color: '#2196f3'}}></i><span>Dentisti</span></a>
            <a href="#" className="cat-item"><i className="fas fa-microscope" style={{color: '#9c27b0'}}></i><span>Diagnostica</span></a>
            <a href="#" className="cat-item"><i className="fas fa-user-md" style={{color: '#4caf50'}}></i><span>Specialisti</span></a>
            <a href="#" className="cat-item"><i className="fas fa-home" style={{color: '#ff9800'}}></i><span>Domicilio</span></a>
        </div>
      </div>

      {/* ULTIMI ANNUNCI (5 card con foto corretta) */}
      <section className="container" style={{padding: '50px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400" alt="Farmacia" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>FARMACIE</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Farmacia H24 Centro</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400" alt="Diagnostica" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>DIAGNOSTICA</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Centro RX Prati</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400" alt="Dentisti" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>DENTISTI</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Studio Dentistico Eur</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" alt="Visita" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>SPECIALISTI</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Dermatologo Roma</h4>
            </div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400" alt="Domicilio" />
            <div className="ann-info">
              <small style={{color: '#0070f3', fontWeight: 'bold'}}>DOMICILIO</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Infermiere a Casa</h4>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIZI PIÙ RICHIESTI (Struttura Codice 1) */}
      <section className="container" style={{ padding: '40px 0', borderTop: '1px solid #eee' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '20px' }}>Servizi più richiesti</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {['Fisioterapista', 'Oculista', 'Psicologo', 'Cardiologo', 'Ortopedico', 'Ginecologo', 'Urologo', 'Pediatra', 'Dermatologo', 'Nutrizionista'].map(s => (
            <span key={s} style={{ background: '#eee', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: '500' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* PERCHÉ SCEGLIERE / PUBBLICARE (Struttura Codice 1 con colori differenziati) */}
      <section style={{ background: '#f9f9f9', padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderTop: '4px solid #0070f3' }}>
            <h3 style={{marginBottom: '15px'}}>Perché scegliere ServiziSalute?</h3>
            <p style={{fontSize: '15px', color: '#666'}}>Mettiamo in contatto diretto pazienti e strutture senza alcuna commissione. La nostra piattaforma è ottimizzata per trovare il servizio più vicino a te in pochi secondi, garantendo trasparenza e velocità di contatto.</p>
          </div>
          <div style={{ background: '#eef6ff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderTop: '4px solid #00a86b' }}>
            <h3 style={{marginBottom: '15px'}}>Perché pubblicare su ServiziSalute?</h3>
            <p style={{fontSize: '15px', color: '#666'}}>Se sei un professionista o gestisci una struttura sanitaria a Roma, ServiziSalute ti offre la massima visibilità locale. Pubblicare è gratuito, veloce e ti permette di ricevere contatti diretti senza intermediari.</p>
          </div>
        </div>
      </section>

      {/* FOOTER (Struttura Codice 1) */}
      <footer style={{ background: '#333', color: 'white', padding: '60px 0 30px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'left' }}>
            <div>
              <h4 style={{marginBottom: '20px'}}>ServiziSalute</h4>
              <p style={{fontSize: '13px', color: '#ccc'}}>Il portale di riferimento per la sanità a Roma e provincia.</p>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Link Rapidi</h4>
              <ul style={{listStyle: 'none', fontSize: '13px', color: '#ccc', lineHeight: '2'}}>
                <li>Farmacie</li>
                <li>Dentisti</li>
                <li>Diagnostica</li>
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Supporto</h4>
              <ul style={{listStyle: 'none', fontSize: '13px', color: '#ccc', lineHeight: '2'}}>
                <li>Contatti</li>
                <li>Privacy Policy</li>
                <li>Termini e Condizioni</li>
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Contatti</h4>
              <p style={{fontSize: '13px', color: '#ccc'}}>Email: info@servizisalute.it<br/>Roma, Italia</p>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
            &copy; 2024 ServiziSalute - Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
