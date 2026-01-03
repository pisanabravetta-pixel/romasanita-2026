import './globals.css';

export default function Home() {
  const categories = [
    { name: 'Farmacie', icon: 'fa-pills' },
    { name: 'Dentisti', icon: 'fa-tooth' },
    { name: 'Diagnostica', icon: 'fa-microscope' },
    { name: 'Specialisti', icon: 'fa-user-md' },
    { name: 'Emergenze', icon: 'fa-ambulance' }
  ];

  return (
    <div>
      <div className="top-bar">
        <div className="container top-bar-content">
          <span><i className="fas fa-map-marker-alt"></i> Roma e Provincia</span>
          <span><i className="fas fa-phone"></i> Emergenze: 118</span>
        </div>
      </div>

      <header className="header-main">
        <div className="container header-flex">
          <a href="#" className="logo">Roma<span>Sanità</span></a>
          <input type="text" className="search-input" placeholder="Cerca farmacie, specialisti, cliniche..." />
        </div>
      </header>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-item"><h3>+1.250</h3><p>Annunci Attivi</p></div>
          <div className="stat-item"><h3>+850</h3><p>Professionisti</p></div>
          <div className="stat-item"><h3>15k</h3><p>Visitatori / Mese</p></div>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">Esplora le categorie</h2>
        <div className="cat-grid">
          {categories.map((cat) => (
            <div key={cat.name} className="cat-card">
              <div className="cat-circle"><i className={`fas ${cat.icon}`}></i></div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title">Ultimi Annunci pubblicati</h2>
        <div className="grid-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="card">
              <div className="card-img"><i className="fas fa-image"></i></div>
              <div className="card-body">
                <div className="price-tag">{n === 1 ? 'H24' : '€ 50'}</div>
                <div className="card-title">Servizio Sanitario Professionale {n}</div>
                <div className="card-loc"><i className="fas fa-location-dot"></i> Roma Centro</div>
              </div>
            </div>
          ))}
        </div>

        <div className="features-grid">
          <div className="box box-scelta">
            <h2>Perché sceglierci</h2>
            <p>Trova rapidamente i migliori professionisti sanitari a Roma, con recensioni verificate e prenotazione immediata.</p>
          </div>
          <div className="box box-pubblica">
            <h2>Perché pubblicare</h2>
            <p>Aumenta la tua visibilità nella Capitale. Raggiungi migliaia di potenziali pazienti ogni giorno con un profilo dedicato.</p>
          </div>
        </div>
      </div>

      <footer style={{background: '#111827', color: 'white', padding: '50px 0', textAlign: 'center'}}>
        <p style={{opacity: 0.6}}>© 2026 RomaSanità - Il portale della salute a Roma</p>
      </footer>
    </div>
  );
}
