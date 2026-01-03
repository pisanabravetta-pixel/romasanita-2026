import Head from 'next/head';

export default function Home() {
  const zone = ["Centro Storico", "Testaccio", "Trastevere", "Monti", "San Lorenzo", "Pigneto", "Garbatella", "Ostiense", "Tiburtino", "San Giovanni", "Prati", "Parioli"];
  const categorie = ["Farmacie", "Dentisti", "Diagnostica", "Visite Specialistiche", "Servizi a Domicilio"];

  return (
    <div>
      <Head>
        <title>ServiziSalute - Portale Sanità Roma</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <div className="top-bar">
        🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
      </div>

      <header className="header">
        <div className="container">
          <div style={{fontSize: '22px', fontWeight: '800', color: '#0070f3'}}>ServiziSalute</div>
          <ul className="nav-links">
            <li><a href="#">Farmacie</a></li>
            <li><a href="#">Dentisti</a></li>
            <li><a href="#">Diagnostica</a></li>
            <li><a href="#">Specialisti</a></li>
            <li><a href="#">Domicilio</a></li>
          </ul>
          <div className="nav-right">
            <a href="#" style={{textDecoration: 'none', color: '#333'}}>Accedi</a>
            <a href="#" className="btn-search" style={{padding: '10px 20px', borderRadius: '20px', textDecoration: 'none'}}>Pubblica annuncio</a>
          </div>
        </div>
      </header>

      <section className="hero">
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
                {zone.map(z => <option key={z}>{z}</option>)}
              </select>
            </div>
            <div className="search-input-group">
              <label>CATEGORIA</label>
              <select>
                <option>Tutte le categorie</option>
                {categorie.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button className="btn-search">CERCA</button>
          </div>

          <div className="hero-stats">
            + 1500 annunci attivi a Roma
          </div>
        </div>
      </section>

      {/* ICONE STILE SUBITO */}
      <div className="categories-subito">
        <a href="#" className="cat-item"><i className="fas fa-pills"></i><span>Farmacie</span></a>
        <a href="#" className="cat-item"><i className="fas fa-tooth"></i><span>Dentisti</span></a>
        <a href="#" className="cat-item"><i className="fas fa-microscope"></i><span>Diagnostica</span></a>
        <a href="#" className="cat-item"><i className="fas fa-user-md"></i><span>Specialisti</span></a>
        <a href="#" className="cat-item"><i className="fas fa-home"></i><span>Domicilio</span></a>
      </div>

      <section className="container" style={{padding: '40px 0'}}>
        <h2 style={{marginBottom: '20px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid">
          {/* Annuncio 1 */}
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400" alt="Farmacia" />
            <div className="ann-info">
              <small>FARMACIE</small>
              <h4 style={{marginTop: '5px'}}>Farmacia Trastevere</h4>
              <p style={{fontSize: '12px', color: '#777'}}>Aperta H24, test streptococco...</p>
            </div>
          </div>
          {/* Annuncio 2 */}
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400" alt="Diagnostica" />
            <div className="ann-info">
              <small>DIAGNOSTICA</small>
              <h4 style={{marginTop: '5px'}}>Centro RX Eur</h4>
              <p style={{fontSize: '12px', color: '#777'}}>Risonanza magnetica aperta...</p>
            </div>
          </div>
          {/* Annuncio 3 */}
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1445527815219-ecbfec67492e?w=400" alt="Dentisti" />
            <div className="ann-info">
              <small>DENTISTI</small>
              <h4 style={{marginTop: '5px'}}>Studio Dentistico Parioli</h4>
              <p style={{fontSize: '12px', color: '#777'}}>Sbiancamento e igiene orale...</p>
            </div>
          </div>
          {/* Annuncio 4 */}
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400" alt="Visita" />
            <div className="ann-info">
              <small>SPECIALISTI</small>
              <h4 style={{marginTop: '5px'}}>Dermatologo Centro</h4>
              <p style={{fontSize: '12px', color: '#777'}}>Mappatura nei e visite...</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{padding: '40px 0', borderTop: '1px solid #eee'}}>
        <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Servizi più richiesti</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center'}}>
          {['Fisioterapista', 'Oculista', 'Psicologo', 'Cardiologo', 'Ortopedico', 'Ginecologo', 'Urologo', 'Pediatra'].map(s => (
            <span key={s} style={{background: '#eee', padding: '8px 15px', borderRadius: '4px', fontSize: '14px'}}>{s}</span>
          ))}
        </div>
      </section>

      <section style={{background: '#f4f4f4', padding: '50px 0'}}>
        <div className="container" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
          <div style={{background: 'white', padding: '30px', borderRadius: '8px'}}>
            <h4>Perché scegliere ServiziSalute?</h4>
            <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>Trovi solo strutture verificate a Roma, con contatto diretto senza intermediari o costi aggiuntivi per il paziente.</p>
          </div>
          <div style={{background: 'white', padding: '30px', borderRadius: '8px'}}>
            <h4>Perché pubblicare su ServiziSalute?</h4>
            <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>Migliora la tua visibilità locale a Roma. Ricevi contatti qualificati da pazienti che cercano i tuoi servizi nella tua zona.</p>
          </div>
        </div>
      </section>

      <footer style={{background: '#333', color: 'white', padding: '40px 0', textAlign: 'center'}}>
        <p>&copy; 2024 ServiziSalute - Il portale della sanità di Roma</p>
      </footer>
    </div>
  );
}
