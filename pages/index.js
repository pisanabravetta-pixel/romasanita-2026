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

      {/* HEADER */}
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

      {/* HERO SECTION */}
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

          {/* STATISTICHE IN VERDE */}
          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '25px', fontWeight: '700', color: '#28a745', fontSize: '15px' }}>
            <span>+ 1500 annunci attivi</span>
            <span>+ 850 professionisti</span>
            <span>15k visitatori/mese</span>
          </div>
        </div>
      </section>

      {/* ESPLORA LE CATEGORIE */}
      <section className="container" style={{padding: '40px 0 20px', textAlign: 'center'}}>
        <h2 style={{fontSize: '28px', fontWeight: '700'}}>Esplora le Categorie</h2>
        <p style={{color: '#666'}}>Trova il servizio sanitario di cui hai bisogno</p>
      </section>

      {/* ICONE CON BORDO STILE SUBITO */}
      <div className="categories-subito" style={{paddingBottom: '40px'}}>
        <div className="container" style={{display: 'flex', justifyContent: 'center', gap: '35px'}}>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#e91e63'}}><i className="fas fa-pills" style={{color: '#e91e63'}}></i></div>
              <span>Farmacie</span>
            </a>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#2196f3'}}><div className="fas fa-tooth" style={{color: '#2196f3'}}></div></div>
              <span>Dentisti</span>
            </a>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#9c27b0'}}><i className="fas fa-microscope" style={{color: '#9c27b0'}}></i></div>
              <span>Diagnostica</span>
            </a>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#4caf50'}}><i className="fas fa-user-md" style={{color: '#4caf50'}}></i></div>
              <span>Specialisti</span>
            </a>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#ff9800'}}><i className="fas fa-home" style={{color: '#ff9800'}}></i></div>
              <span>Domicilio</span>
            </a>
        </div>
      </div>

      {/* ULTIMI ANNUNCI PUBBLICATI */}
      <section className="container" style={{padding: '40px 0'}}>
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

      {/* SERVIZI PIÙ RICHIESTI (LAYOUT A BOX) */}
      <section className="container" style={{padding: '40px 0', borderTop: '1px solid #eee'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Servizi più richiesti</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" alt="Fisioterapia" />
            <div className="ann-info"><h4>Fisioterapia</h4><p style={{fontSize: '12px', color: '#777'}}>Riabilitazione e massoterapia</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400" alt="Oculista" />
            <div className="ann-info"><h4>Oculista</h4><p style={{fontSize: '12px', color: '#777'}}>Esame della vista e fondo oculare</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400" alt="Psicologo" />
            <div className="ann-info"><h4>Psicologo</h4><p style={{fontSize: '12px', color: '#777'}}>Consulenza e supporto psicologico</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1505751172107-573225a943d0?w=400" alt="Cardiologo" />
            <div className="ann-info"><h4>Cardiologo</h4><p style={{fontSize: '12px', color: '#777'}}>ECG e controllo pressione</p></div>
          </div>
        </div>
      </section>

      {/* SEZIONI PERCHÉ (VERTICALI) */}
      <section style={{ background: '#f9f9f9', padding: '60px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '6px solid #0070f3' }}>
            <h3 style={{marginBottom: '15px'}}>Perché scegliere ServiziSalute?</h3>
            <p style={{fontSize: '15px', color: '#666'}}>Mettiamo in contatto diretto pazienti e strutture senza alcuna commissione. La nostra piattaforma è ottimizzata per trovare il servizio più vicino a te in pochi secondi, garantendo trasparenza e velocità di contatto.</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '6px solid #28a745' }}>
            <h3 style={{marginBottom: '15px'}}>Perché pubblicare su ServiziSalute?</h3>
            <p style={{fontSize: '15px', color: '#666'}}>Se sei un professionista o gestisci una struttura sanitaria a Roma, ServiziSalute ti offre la massima visibilità locale. Pubblicare è gratuito, veloce e ti permette di ricevere contatti diretti senza intermediari.</p>
          </div>
        </div>
      </section>

      {/* TESTO SEO ROMA */}
      <section className="container" style={{padding: '50px 0', textAlign: 'justify', fontSize: '14px', lineHeight: '1.8', color: '#444'}}>
        <p>
          <strong>ServiziSalute Roma</strong> è il portale di riferimento per trovare <strong>farmacie</strong>, <strong>dentisti</strong>, <strong>centri diagnostici</strong> e <strong>visite specialistiche</strong> nella capitale. Il nostro motore di ricerca ti permette di individuare rapidamente i migliori <strong>servizi sanitari Roma</strong> in base alla zona e alla categoria di tuo interesse. Che tu stia cercando una farmacia di turno, un dentista di fiducia o un centro per <strong>visite specialistiche Roma</strong>, il nostro portale ti mette in contatto diretto con i professionisti sanitari della tua zona. <strong>Farmacie Roma</strong>, studi dentistici, laboratori di analisi e specialisti: tutto in un unico posto, gratuito e sempre aggiornato.
        </p>
      </section>

      {/* FOOTER */}
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
                <li>Farmacie</li><li>Dentisti</li><li>Diagnostica</li>
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Supporto</h4>
              <ul style={{listStyle: 'none', fontSize: '13px', color: '#ccc', lineHeight: '2'}}>
                <li>Contatti</li><li>Privacy Policy</li><li>Termini</li>
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

      {/* CSS AGGIUNTIVO PER ICONE BORDO */}
      <style jsx>{`
        .icon-circle {
          width: 70px;
          height: 70px;
          border: 2px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          font-size: 28px;
          transition: transform 0.2s;
          background: white;
        }
        .cat-item-bordered {
          text-decoration: none;
          color: #333;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }
        .cat-item-bordered:hover .icon-circle {
          transform: scale(1.1);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
