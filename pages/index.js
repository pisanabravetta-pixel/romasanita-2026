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
          <div className="search-box-container">
            <div className="search-input-group">
              <label>COSA CERCHI?</label>
              <select style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', width: '100%' }}>
                <option>Farmacie</option>
                <option>Dentisti</option>
                <option>Centri Diagnostici</option>
                <option>Visite Specialistiche</option>
                <option>Servizi a Domicilio</option>
              </select>
            </div>
            <div className="search-input-group">
              <label>DOVE?</label>
              <select style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', width: '100%' }}>
                {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
              </select>
            </div>
            <button className="btn-search">CERCA</button>
          </div>
        </div>
      </section>

      {/* CATEGORIE ICONE */}
      <section className="container" style={{ marginTop: '40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {["Farmacie", "Dentisti", "Diagnostica", "Specialisti", "Domicilio"].map((cat) => (
            <div key={cat} className="cat-item-bordered">
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ULTIMI ANNUNCI */}
      <section className="container" style={{padding: '40px 0'}}>
        <h2 style={{marginBottom: '25px', fontSize: '24px'}}>Ultimi annunci</h2>
        <div className="announcements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="ann-card" style={{ background: 'white', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <div style={{ height: '120px', background: '#eee', borderRadius: '5px', marginBottom: '10px' }}></div>
              <h4 style={{ fontSize: '14px' }}>Esempio Servizio {i}</h4>
              <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                <a href="#" style={{ background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px', textDecoration: 'none' }}><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA PUBBLICAZIONE */}
      <section style={{ background: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Vuoi inserire la tua attività?</h2>
          <p style={{ marginBottom: '30px' }}>Unisciti a centinaia di professionisti a Roma.</p>
          <a href="/pubblica-annuncio" style={{ 
            backgroundColor: '#0070f3', color: 'white', padding: '18px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' 
          }}>
            Pubblica il tuo annuncio gratis
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#333', color: 'white', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <div><h4>ServiziSalute</h4><p style={{ color: '#ccc', fontSize: '13px' }}>Roma e Provincia.</p></div>
            <div>
              <h4>Link Rapidi</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#ccc', textDecoration: 'none' }}>Pubblica Annuncio</a></li>
                <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Farmacie</a></li>
                <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Specialisti</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
