import Head from 'next/head'

export default function Home() {
  const zoneRoma = [
    "Centro Storico", "Testaccio", "Trastevere", "Monti", "San Lorenzo", "Pigneto", "Garbatella", 
    "Ostiense", "Tiburtino", "San Giovanni", "Prati", "Villa Borghese", "Nomentano", "Parioli", 
    "Portuense", "Gianicolense", "Trionfale", "Popolo", "Eur", "Monteverde", "Flaminio"
  ];

  return (
    <div>
      <Head>
        <title>ServiziSalute Roma - Farmacie, Dentisti e Specialistica</title>
        <meta name="description" content="Il portale degli annunci sanitari a Roma. Trova farmacie, dentisti e specialisti nel tuo quartiere." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      {/* TOP BAR */}
      <div className="top-bar">
        SERVIZI SANITARI A ROMA E PROVINCIA - CONTATTO DIRETTO SENZA COMMISSIONI
      </div>

      {/* HEADER */}
      <header className="header" style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0070f3', cursor: 'pointer' }}>ServiziSalute</div>
          
          <ul className="nav-links" style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#" style={{ textDecoration: 'none', color: '#555', fontSize: '14px', fontWeight: '600' }}>Farmacie</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#555', fontSize: '14px', fontWeight: '600' }}>Dentisti</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#555', fontSize: '14px', fontWeight: '600' }}>Diagnostica</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#555', fontSize: '14px', fontWeight: '600' }}>Specialisti</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#555', fontSize: '14px', fontWeight: '600' }}>Domicilio</a></li>
          </ul>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#333', fontWeight: '500', fontSize: '14px' }}>Accedi</a>
            <a href="/pubblica-annuncio" className="btn-search" style={{ 
              padding: '10px 22px', 
              borderRadius: '20px', 
              textDecoration: 'none', 
              fontSize: '14px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              fontWeight: 'bold' 
            }}>
              Pubblica annuncio
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1 style={{ fontWeight: '800', marginBottom: '15px' }}>Sanità a Roma: semplice, rapida, vicina.</h1>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '700px', margin: '0 auto', marginBottom: '30px' }}>
            Trova il servizio sanitario di cui hai bisogno nel tuo quartiere. Contatto diretto con i professionisti.
          </p>

          <div className="search-box-container">
            <div className="search-input-group">
              <label>COSA CERCHI?</label>
              <select style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px' }}>
                <option>Farmacie</option>
                <option>Dentisti</option>
                <option>Centri Diagnostici</option>
                <option>Visite Specialistiche</option>
                <option>Servizi a Domicilio</option>
              </select>
            </div>
            <div style={{ width: '1px', background: '#ddd', margin: '10px 0' }}></div>
            <div className="search-input-group">
              <label>DOVE? (QUARTIERE)</label>
              <select style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px' }}>
                {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
              </select>
            </div>
            <button className="btn-search">CERCA ORA</button>
          </div>

          <div className="stat-box" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '50px' }}>
            <div className="stat-item">
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#28a745' }}>1.250+</div>
              <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>STRUTTURE</div>
            </div>
            <div className="stat-item">
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#28a745' }}>450+</div>
              <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>MEDICI SPECIALISTI</div>
            </div>
            <div className="stat-item">
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#28a745' }}>H24</div>
              <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>SUPPORTO</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIE ICONE (STILE SUBITO) */}
      <section className="container" style={{ marginTop: '60px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="cat-item-bordered">
            <div className="icon-circle" style={{borderColor: '#0070f3'}}><i className="fas fa-pills" style={{color: '#0070f3'}}></i></div>
            <span>Farmacie</span>
          </div>
          <div className="cat-item-bordered">
            <div className="icon-circle" style={{borderColor: '#e91e63'}}><i className="fas fa-tooth" style={{color: '#e91e63'}}></i></div>
            <span>Dentisti</span>
          </div>
          <div className="cat-item-bordered">
            <div className="icon-circle" style={{borderColor: '#ff9800'}}><i className="fas fa-microscope" style={{color: '#ff9800'}}></i></div>
            <span>Diagnostica</span>
          </div>
          <div className="cat-item-bordered">
            <div className="icon-circle" style={{borderColor: '#4caf50'}}><i className="fas fa-user-md" style={{color: '#4caf50'}}></i></div>
            <span>Specialisti</span>
          </div>
          <div className="cat-item-bordered">
            <div className="icon-circle" style={{borderColor: '#9c27b0'}}><i className="fas fa-ambulance" style={{color: '#9c27b0'}}></i></div>
            <span>Domicilio</span>
          </div>
        </div>
      </section>

      {/* ULTIMI ANNUNCI */}
      <section className="container" style={{padding: '40px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          {/* Card Farmacia */}
          <div className="ann-card">
            <img className="ann-img" src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400" alt="Farmacia" />
            <div className="ann-info">
              <small>FARMACIE</small>
              <h4 style={{fontSize: '14px', margin: '5px 0'}}>Farmacia H24 Centro</h4>
              <div style={{display: 'flex', gap: '5px', marginTop: '10px'}}>
                <a href="tel:061234567" style={{flex: 1, textAlign: 'center', background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold'}}>Chiama</a>
                <a href="https://wa.me/39" style={{background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px', fontSize: '11px'}}><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
          {/* (Ripetere card simili o rimettere quelle precedenti qui) */}
        </div>
      </section>

      {/* PERCHÉ SCEGLIERE NOI */}
      <section style={{ background: 'white', padding: '60px 0', marginTop: '40px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Perché pubblicare su ServiziSalute?</h2>
          <div className="grid-3-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <i className="fas fa-bullseye" style={{ fontSize: '40px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4>Visibilità Locale</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Raggiungi i pazienti del tuo quartiere proprio quando cercano il tuo servizio.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <i className="fas fa-handshake" style={{ fontSize: '40px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4>Contatto Diretto</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Nessun intermediario. Ricevi telefonate e messaggi WhatsApp direttamente.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <i className="fas fa-chart-line" style={{ fontSize: '40px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4>Crescita Costante</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Aumenta il numero dei tuoi pazienti grazie al posizionamento SEO su Roma.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#0070f3', color: 'white', padding: '18px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '18px', display: 'inline-block' 
            }}>
              Pubblica il tuo annuncio gratis
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#333', color: 'white', padding: '60px 0 30px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
            <div><h4>ServiziSalute</h4><p style={{fontSize: '13px', color: '#ccc'}}>Sanità a Roma e provincia.</p></div>
            <div>
              <h4>Link Rapidi</h4>
              <ul style={{listStyle: 'none', padding: 0, fontSize: '13px', color: '#ccc', lineHeight: '2.2'}}>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Farmacie</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Dentisti</a></li>
                <li><a href="/pubblica-annuncio" style={{color: '#ccc', textDecoration: 'none'}}>Pubblica Annuncio</a></li>
              </ul>
            </div>
            <div><h4>Supporto</h4><ul style={{listStyle: 'none', padding: 0, fontSize: '13px', color: '#ccc', lineHeight: '2'}}><li>Contatti</li><li>Privacy</li></ul></div>
            <div><h4>Contatti</h4><p style={{fontSize: '13px', color: '#ccc'}}>Email: info@servizisalute.it<br/>Roma, Italia</p></div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
            &copy; 2024 ServiziSalute - Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  )
}
