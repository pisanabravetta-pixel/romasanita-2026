import React from 'react';

export default function Home() {
  return (
    <div className="main-wrapper">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container-custom">
          <span><i className="fas fa-map-marker-alt"></i> Roma e Provincia</span>
          <span><i className="fas fa-phone"></i> Emergenze: 118</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="header-main">
        <div className="container-custom header-flex">
          <a href="#" className="logo">
            <i className="fas fa-heartbeat"></i> Roma<span>Sanità</span>
          </a>
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Cerca farmacie, dentisti, medici..." />
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="stats-strip">
        <div className="container-custom stats-grid">
          <div className="stat-item"><h3>+1.250</h3><p>Annunci Attivi</p></div>
          <div className="stat-item"><h3>+850</h3><p>Professionisti</p></div>
          <div className="stat-item"><h3>15k</h3><p>Visitatori / Mese</p></div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="container-custom">
          <h2 className="section-title">Esplora le categorie</h2>
          <div className="cat-grid">
            {['Farmacie', 'Dentisti', 'Diagnostica', 'Specialisti', 'Emergenze'].map((cat) => (
              <div key={cat} className="cat-card">
                <div className="cat-circle">
                  <i className={`fas ${cat === 'Farmacie' ? 'fa-pills' : 'fa-user-md'}`}></i>
                </div>
                <h4>{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNUNCI (5 BOX) */}
      <section className="announcements">
        <div className="container-custom">
          <h2 className="section-title">Ultimi Annunci pubblicati</h2>
          <div className="grid-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="card">
                <div className="card-img"></div>
                <div className="card-content">
                  <div className="card-price">{i === 1 ? 'H24' : '€ 50'}</div>
                  <div className="card-title">Servizio Sanitario {i}</div>
                  <div className="card-loc">Roma Centro</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
