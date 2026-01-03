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
      <div className="top-bar" style={{ background: '#0070f3', color: 'white', textAlign: 'center', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>
        🚀 PUBBLICA ANNUNCI SENZA COSTI - IL PORTALE DELLA SANITÀ A ROMA
      </div>

      {/* HEADER */}
      <header className="header" style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{fontSize: '24px', fontWeight: '800', color: '#0070f3'}}>ServiziSalute</div>
          
          <ul className="nav-links" style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Farmacie</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Dentisti</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Diagnostica</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Specialisti</a></li>
            <li><a href="#" style={{textDecoration: 'none', color: '#555', fontWeight: '600', fontSize: '14px'}}>Domicilio</a></li>
          </ul>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <a href="#" style={{textDecoration: 'none', color: '#333', fontWeight: '500', fontSize: '14px'}}>Accedi</a>
            <a href="/pubblica-annuncio" style={{ 
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
      <section className="hero" style={{ backgroundColor: '#d0e3ff', padding: '60px 0 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>Trova servizi sanitari a Roma, vicino a te</h1>
          <p style={{marginBottom: '40px', fontSize: '18px', color: '#444'}}>Farmacie, dentisti, diagnostica e visite specialistiche in un unico posto</p>

          <div className="search-box-container" style={{ 
            display: 'flex', background: 'white', borderRadius: '50px', padding: '10px 20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '900px', margin: '0 auto', border: '1px solid #ddd' 
          }}>
            <div className="search-input-group" style={{ flex: 1, textAlign: 'left', padding: '0 15px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888', display: 'block' }}>COSA CERCHI</label>
              <input type="text" placeholder="Es: Pulizia denti..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
            </div>
            <div className="search-input-group" style={{ flex: 1, textAlign: 'left', padding: '0 15px', borderLeft: '1px solid #eee' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888', display: 'block' }}>ZONA / QUARTIERE</label>
              <select style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }}>
                <option>Tutta Roma</option>
                {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
              </select>
            </div>
            <button style={{ backgroundColor: '#ff5a5f', color: 'white', border: 'none', padding: '12px 35px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>CERCA</button>
          </div>

          {/* STATISTICHE VERDI */}
          <div style={{ 
            marginTop: '50px', background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '15px 15px 0 0',
            display: 'flex', justifyContent: 'center', gap: '80px', border: '1px solid rgba(255,255,255,0.8)', borderBottom: 'none'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#28a745' }}>+ 1500</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#155724', textTransform: 'uppercase' }}>Annunci</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#28a745' }}>+ 850</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#155724', textTransform: 'uppercase' }}>Professionisti</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#28a745' }}>15k</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#155724', textTransform: 'uppercase' }}>Visitatori/Mese</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIE ESPLORA */}
      <section style={{ padding: '50px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{fontSize: '28px', fontWeight: '700', marginBottom: '10px'}}>Esplora le Categorie</h2>
          <p style={{color: '#666', marginBottom: '40px'}}>Trova il servizio sanitario di cui hai bisogno</p>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap'}}>
            {[
              { icon: 'fa-pills', label: 'Farmacie', color: '#e91e63' },
              { icon: 'fa-tooth', label: 'Dentisti', color: '#2196f3' },
              { icon: 'fa-microscope', label: 'Diagnostica', color: '#9c27b0' },
              { icon: 'fa-user-md', label: 'Specialisti', color: '#4caf50' },
              { icon: 'fa-home', label: 'Domicilio', color: '#ff9800' }
            ].map((cat, i) => (
              <div key={i} className="cat-item-bordered" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div className="icon-circle" style={{ 
                  width: '70px', height: '70px', border: '2px solid ' + cat.color, borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 10px',
                  fontSize: '24px', color: cat.color, background: 'white', justifyContent: 'center'
                }}>
                  <i className={"fas " + cat.icon}></i>
                </div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULTIMI ANNUNCI CON TASTI */}
      <section style={{ padding: '40px 0', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ marginBottom: '25px', fontSize: '24px' }}>Ultimi annunci pubblicati</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
            {[
              { cat: 'FARMACIE', title: 'Farmacia H24 Centro', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400' },
              { cat: 'DIAGNOSTICA', title: 'Centro RX Prati', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' },
              { cat: 'DENTISTI', title: 'Studio Dentistico Eur', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
              { cat: 'SPECIALISTI', title: 'Dermatologo Roma', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
              { cat: 'DOMICILIO', title: 'Infermiere a Casa', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400' }
            ].map((ann, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
                <img src={ann.img} style={{ width: '100%', height: '130px', objectFit: 'cover' }} alt={ann.title} />
                <div style={{ padding: '12px' }}>
                  <small style={{ color: '#0070f3', fontWeight: 'bold', fontSize: '10px' }}>{ann.cat}</small>
                  <h4 style={{ fontSize: '14px', margin: '5px 0' }}>{ann.title}</h4>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                    <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                    <a href="#" style={{ background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px', textDecoration: 'none' }}><i className="fab fa-whatsapp"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI PIÙ RICHIESTI */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ marginBottom: '25px', fontSize: '24px' }}>Servizi più richiesti</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { title: 'Fisioterapia', desc: 'Riabilitazione e massoterapia', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
              { title: 'Oculista', desc: 'Esame della vista completo', img: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400' },
              { title: 'Psicologo', desc: 'Consulenza e supporto', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400' },
              { title: 'Cardiologo', desc: 'ECG e controllo pressione', img: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400' }
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                <img src={s.img} style={{ width: '100%', height: '150px', objectFit: 'cover' }} alt={s.title} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{s.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERCHÉ SCEGLIERE NOI */}
      <section style={{ background: '#f4f7f6', padding: '70px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Perché scegliere ServiziSalute?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <i className="fas fa-search-location" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4>Trovi subito ciò che ti serve</h4>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Ricerca per zona e categoria. Professionisti sanitari vicino a te.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <i className="fas fa-user-check" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4>Professionisti verificati</h4>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Solo strutture autorizzate e medici qualificati su Roma.</p>
            </div>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
              <i className="fas fa-hand-holding-usd" style={{ fontSize: '30px', color: '#0070f3', marginBottom: '20px' }}></i>
              <h4>Senza commissioni</h4>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Contatto diretto tra paziente e professionista, senza costi extra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PERCHÉ PUBBLICARE + TASTO BLU */}
      <section style={{ background: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '40px' }}>Vuoi far crescere la tua attività sanitaria?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px', textAlign: 'center' }}>
            <div><i className="fas fa-bullhorn" style={{fontSize: '30px', color: '#28a745'}}></i><h4>Gratis</h4></div>
            <div><i className="fas fa-map-marked-alt" style={{fontSize: '30px', color: '#28a745'}}></i><h4>Visibilità Roma</h4></div>
            <div><i className="fas fa-chart-line" style={{fontSize: '30px', color: '#28a745'}}></i><h4>Più Pazienti</h4></div>
          </div>
          <a href="/pubblica-annuncio" style={{ 
            backgroundColor: '#0070f3', color: 'white', padding: '20px 50px', borderRadius: '50px', 
            textDecoration: 'none', fontWeight: '800', fontSize: '18px', boxShadow: '0 5px 20px rgba(0,112,243,0.3)' 
          }}>
            Pubblica il tuo annuncio gratis
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#333', color: 'white', padding: '60px 0 30px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
          <div><h4>ServiziSalute</h4><p style={{fontSize: '13px', color: '#ccc', marginTop: '10px'}}>Il punto di riferimento per la sanità a Roma.</p></div>
          <div><h4>Link</h4><ul style={{listStyle: 'none', padding: 0, fontSize: '13px', color: '#ccc', lineHeight: '2'}}><li>Farmacie</li><li>Dentisti</li><li>Specialisti</li></ul></div>
          <div><h4>Legale</h4><ul style={{listStyle: 'none', padding: 0, fontSize: '13px', color: '#ccc', lineHeight: '2'}}><li>Privacy</li><li>Termini</li></ul></div>
          <div><h4>Contatti</h4><p style={{fontSize: '13px', color: '#ccc'}}>info@servizisalute.it<br/>Roma, Italia</p></div>
        </div>
      </footer>
    </div>
  );
}
