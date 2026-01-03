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

      {/* HEADER - SISTEMATO ALLINEAMENTO */}
      <header className="header" style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{fontSize: '24px', fontWeight: '800', color: '#0070f3'}}>ServiziSalute</div>
          <ul className="nav-links" style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0 }}>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Farmacie</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Dentisti</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Diagnostica</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Specialisti</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Domicilio</a></li>
          </ul>
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <a href="#" style={{textDecoration: 'none', color: '#333', fontWeight: '500', fontSize: '14px'}}>Accedi</a>
            <a href="/pubblica-annuncio" className="btn-search" style={{padding: '10px 22px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', backgroundColor: '#0070f3', color: 'white', fontWeight: 'bold'}}>Pubblica annuncio</a>
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

      {/* ULTIMI ANNUNCI CON TASTI CONTATTO */}
      <section className="container" style={{padding: '40px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci pubblicati</h2>
        <div className="announcements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          
          {/* Card Esempio con Tasti */}
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

      {/* SEZIONI PERCHÉ SCEGLIERE E PERCHÉ PUBBLICARE (RESTANTI) */}
      {/* ... qui seguono le tue sezioni che avevi nel codice (Perché scegliere, SEO, Footer) ... */}
      {/* Per brevità non le incollo tutte, ma assicurati di non sovrascrivere il footer aggiornato prima */}
      
      <footer style={{ background: '#333', color: 'white', padding: '60px 0 30px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'left' }}>
            <div><h4 style={{marginBottom: '20px'}}>ServiziSalute</h4><p style={{fontSize: '13px', color: '#ccc'}}>Sanità a Roma e provincia.</p></div>
            <div>
              <h4 style={{marginBottom: '20px'}}>Link Rapidi</h4>
              <ul style={{listStyle: 'none', fontSize: '13px', color: '#ccc', lineHeight: '2.2', padding: 0}}>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Farmacie</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Dentisti</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Diagnostica</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Visite Specialistiche</a></li>
                <li><a href="#" style={{color: '#ccc', textDecoration: 'none'}}>Servizi a Domicilio</a></li>
              </ul>
            </div>
            <div><h4 style={{marginBottom: '20px'}}>Supporto</h4><ul style={{listStyle: 'none', fontSize: '13px', color: '#ccc', lineHeight: '2', padding: 0}}><li>Contatti</li><li>Privacy</li><li>Termini</li></ul></div>
            <div><h4 style={{marginBottom: '20px'}}>Contatti</h4><p style={{fontSize: '13px', color: '#ccc'}}>Email: info@servizisalute.it<br/>Roma, Italia</p></div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
            &copy; 2024 ServiziSalute - Tutti i diritti riservati.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .icon-circle { width: 70px; height: 70px; border: 2px solid; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 28px; background: white; transition: all 0.3s ease; }
        .cat-item-bordered { text-decoration: none; color: #333; font-size: 14px; font-weight: 600; text-align: center; }
        .cat-item-bordered:hover .icon-circle { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .header .container { display: flex; justify-content: space-between; alignItems: center; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      `}</style>
    </div>
  );
}
