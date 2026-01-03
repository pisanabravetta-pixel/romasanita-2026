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
            <a href="/pubblica-annuncio" className="btn-search" style={{padding: '10px 22px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px'}}>Pubblica annuncio</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero" style={{ backgroundColor: '#d0e3ff', paddingBottom: '0' }}>
        <div className="container">
          <h1>Trova servizi sanitari a Roma, vicino a te</h1>
          <p style={{marginBottom: '40px'}}>Farmacie, dentisti, diagnostica e visite specialistiche in un unico posto</p>

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

          {/* STATISTICHE IMPILATE IN VERDE */}
          <div style={{ 
            marginTop: '50px', 
            background: 'rgba(255,255,255,0.5)', 
            padding: '20px', 
            borderRadius: '15px 15px 0 0',
            display: 'flex', 
            justifyContent: 'center', 
            gap: '80px',
            border: '1px solid rgba(255,255,255,0.8)',
            borderBottom: 'none'
          }}>
            <div style={{ textAlign: 'center', color: '#28a745' }}>
              <div style={{ fontSize: '28px', fontWeight: '800' }}>+ 1500</div>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#155724' }}>Annunci</div>
            </div>
            <div style={{ textAlign: 'center', color: '#28a745' }}>
              <div style={{ fontSize: '28px', fontWeight: '800' }}>+ 850</div>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#155724' }}>Professionisti</div>
            </div>
            <div style={{ textAlign: 'center', color: '#28a745' }}>
              <div style={{ fontSize: '28px', fontWeight: '800' }}>15k</div>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#155724' }}>Visitatori/Mese</div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPLORA LE CATEGORIE */}
      <section className="container" style={{padding: '50px 0 20px', textAlign: 'center'}}>
        <h2 style={{fontSize: '28px', fontWeight: '700'}}>Esplora le Categorie</h2>
        <p style={{color: '#666'}}>Trova il servizio sanitario di cui hai bisogno</p>
      </section>

      <div className="categories-subito" style={{paddingBottom: '50px'}}>
        <div className="container" style={{display: 'flex', justifyContent: 'center', gap: '35px'}}>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#e91e63'}}><i className="fas fa-pills" style={{color: '#e91e63'}}></i></div>
              <span>Farmacie</span>
            </a>
            <a href="#" className="cat-item-bordered">
              <div className="icon-circle" style={{borderColor: '#2196f3'}}><i className="fas fa-tooth" style={{color: '#2196f3'}}></i></div>
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

      {/* ULTIMI ANNUNCI CON TASTI CONTATTO AGGIUNTI */}
      <section className="container" style={{padding: '40px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          {[
            { cat: 'FARMACIE', title: 'Farmacia H24 Centro', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400' },
            { cat: 'DIAGNOSTICA', title: 'Centro RX Prati', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' },
            { cat: 'DENTISTI', title: 'Studio Dentistico Eur', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
            { cat: 'SPECIALISTI', title: 'Dermatologo Roma', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
            { cat: 'DOMICILIO', title: 'Infermiere a Casa', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400' }
          ].map((ann, idx) => (
            <div className="ann-card" key={idx}>
              <img className="ann-img" src={ann.img} alt={ann.title} />
              <div className="ann-info">
                <small>{ann.cat}</small>
                <h4 style={{fontSize: '14px', margin: '5px 0'}}>{ann.title}</h4>
                <div style={{display: 'flex', gap: '5px', marginTop: '10px'}}>
                  <a href="tel:061234567" style={{flex: 1, textAlign: 'center', background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold'}}>Chiama</a>
                  <a href="https://wa.me/39" style={{background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px', fontSize: '11px'}}><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIZI PIÙ RICHIESTI - BOX CON FOTO */}
      <section className="container" style={{padding: '40px 0', borderTop: '1px solid #eee'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Servizi più richiesti</h2>
        <div className="announcements-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" alt="Fisioterapia" />
            <div className="ann-info"><h4>Fisioterapia</h4><p>Riabilitazione e massoterapia</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400" alt="Oculista" />
            <div className="ann-info"><h4>Oculista</h4><p>Esame della vista completo</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400" alt="Psicologo" />
            <div className="ann-info"><h4>Psicologo</h4><p>Consulenza e supporto</p></div>
          </div>
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400" alt="Cardiologo" />
            <div className="ann-info"><h4>Cardiologo</h4><p>ECG e controllo pressione</p></div>
          </div>
        </div>
      </section>

      {/* SEZIONE PERCHÉ SCEGLIERE NOI */}
      <section style={{ background: '#f4f7f6', padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#333' }}>Perché scegliere ServiziSalute?</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>Trovi i migliori servizi sanitari a Roma in pochi click</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-search-location" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Trovi subito ciò che ti serve</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Ricerca per zona, categoria e servizio specifico. Trovi i professionisti sanitari più vicini a casa tua.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-user-check" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Solo professionisti verificati</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Tutti i servizi sono offerti da professionisti qualificati e strutture sanitarie autorizzate.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <i className="fas fa-hand-holding-usd" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Gratuito e senza commissioni</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Il portale è completamente gratuito per gli utenti. Nessuna intermediazione, contatti diretti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE PERCHÉ PUBBLICARE */}
      <section style={{ background: 'white', padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#333' }}>Perché pubblicare su ServiziSalute?</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>Raggiungi nuovi pazienti nella tua zona</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
              <i className="fas fa-bullhorn" style={{ fontSize: '30px', color: '#28a745', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Pubblicazione gratuita</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Pubblica i tuoi servizi senza costi iniziali. Nessuna commissione sulle prenotazioni ricevute.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
              <i className="fas fa-map-marked-alt" style={{ fontSize: '30px', color: '#28a745', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Visibilità su Roma</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Raggiungi migliaia di utenti che cercano servizi sanitari ogni giorno nella capitale.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>
              <i className="fas fa-chart-line" style={{ fontSize: '30px', color: '#28a745', marginBottom: '20px' }}></i>
              <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>Cresci la Tua Visibilità</h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>Con più contatti puoi far crescere il tuo business sanitario a Roma.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#0070f3', color: 'white', padding: '18px 40px', borderRadius: '50px', 
              textDecoration: 'none', fontWeight: '700', fontSize: '18px', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,112,243,0.3)' 
            }}>
              Pubblica il tuo annuncio gratis
            </a>
          </div>
        </div>
      </section>

      {/* SEZIONE SEO ROMA */}
      <section style={{ padding: '60px 0', background: '#f8fbff' }}>
        <div className="container" style={{ 
          background: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #e1e8f0',
          textAlign: 'justify', fontSize: '15px', lineHeight: '1.8', color: '#444'
        }}>
          <p>
            <span style={{fontSize: '18px', fontWeight: 'bold', color: '#0070f3', display: 'block', marginBottom: '10px'}}>ServiziSalute Roma</span>
            <strong>ServiziSalute Roma</strong> è il portale di riferimento per trovare <strong>farmacie</strong>, <strong>dentisti</strong>, <strong>centri diagnostici</strong> e <strong>visite specialistiche</strong> nella capitale. Il nostro motore di ricerca ti permette di individuare rapidamente i migliori <strong>servizi sanitari Roma</strong> in base alla zona e alla categoria di tuo interesse. Che tu stia cercando una farmacia di turno, un dentista di fiducia o un centro per <strong>visite specialistiche Roma</strong>, il nostro portale ti mette in contatto diretto con i professionisti sanitari della tua zona. <strong>Farmacie Roma</strong>, studi dentistici, laboratori di analisi e specialisti: tutto in un unico posto, gratuito e sempre aggiornato.
          </p>
        </div>
      </section>

    <footer style={{ background: '#333', color: 'white', padding: '60px 0 30px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
            {/* PRIMA COLONNA */}
            <div>
              <h4>ServiziSalute</h4>
              <p style={{fontSize: '13px', color: '#ccc', marginTop: '10px'}}>Il punto di riferimento per la sanità a Roma.</p>
            </div>

            {/* SECONDA COLONNA - QUELLA CHE STAVI MODIFICANDO */}
            <div>
              <h4>Link Rapidi</h4>
              <ul style={{listStyle: 'none', padding: 0, fontSize: '13px', color: '#ccc', lineHeight: '2.2'}}>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Farmacie</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Dentisti</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Diagnostica</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Specialisti</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Servizi a Domicilio</a></li>
              </ul>
            </div>

            {/* TERZA COLONNA */}
            <div>
              <h4>Supporto</h4>
              <ul style={{listStyle: 'none', padding: 0, fontSize: '13px', color: '#ccc', lineHeight: '2'}}>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Contatti</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Privacy</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Termini</a></li>
              </ul>
            </div>

            {/* QUARTA COLONNA */}
            <div>
              <h4>Contatti</h4>
              <p style={{fontSize: '13px', color: '#ccc'}}>Email: info@servizisalute.it<br/>Roma, Italia</p>
            </div>
          </div>

          {/* RIGA FINALE COPYRIGHT */}
          <div style={{ marginTop: '50px', borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
            &copy; 2024 ServiziSalute - Tutti i diritti riservati.
          </div>
        </div>
      </footer>
      <style jsx>{`
        .icon-circle { width: 70px; height: 70px; border: 2px solid; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 28px; background: white; transition: all 0.3s ease; }
        .cat-item-bordered { text-decoration: none; color: #333; font-size: 14px; font-weight: 600; text-align: center; }
        .cat-item-bordered:hover .icon-circle { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
}
