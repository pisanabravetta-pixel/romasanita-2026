import './globals.css';

export default function Home() {
  return (
    <div>
      {/* 1. TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <span>Roma e Provincia</span>
          <span>Emergenze: 118</span>
        </div>
      </div>

      {/* 2. HEADER CON RICERCA */}
      <header className="header-main">
        <div className="container header-flex">
          <h1 style={{color: '#0066CC'}}>RomaSanità</h1>
          <input type="text" className="search-input" placeholder="Cerca farmacie, medici..." />
        </div>
      </header>

      {/* 3. STATISTICHE */}
      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat-item"><h3>+1250</h3><p>Annunci attivi</p></div>
          <div className="stat-item"><h3>+850</h3><p>Professionisti</p></div>
          <div className="stat-item"><h3>15k</h3><p>Visitatori al mese</p></div>
        </div>
      </section>

      {/* 4. CATEGORIE (Stile Subito) */}
      <div className="container">
        <h2 style={{marginTop: '40px'}}>Esplora le categorie</h2>
        <div className="cat-grid">
          {['Farmacie', 'Dentisti', 'Medici', 'Esami', 'Cliniche'].map(cat => (
            <div key={cat} className="cat-card">
              <div className="cat-circle"></div>
              <p>{cat}</p>
            </div>
          ))}
        </div>

        {/* 5. ULTIMI ANNUNCI (5 BOX) */}
        <h2>Ultimi annunci pubblicati</h2>
        <div className="grid-5" style={{marginTop: '20px'}}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className="card">
              <div className="card-img"></div>
              <div className="card-body">
                <p style={{fontWeight: 'bold'}}>Servizio {n}</p>
                <p style={{fontSize: '12px'}}>Roma Centro</p>
              </div>
            </div>
          ))}
        </div>

        {/* 6. PERCHÉ SCEGLIERE / PUBBLICARE */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '50px'}}>
          <div className="box-scelta">
            <h3>Perché sceglierci</h3>
            <p>Sicurezza e velocità nel trovare il medico giusto.</p>
          </div>
          <div className="box-pubblica">
            <h3>Perché pubblicare</h3>
            <p>Raggiungi migliaia di pazienti ogni giorno.</p>
          </div>
        </div>
      </div>

      {/* 7. FOOTER */}
      <footer style={{background: '#111827', color: 'white', padding: '40px 0', textAlign: 'center'}}>
        <p>© 2026 RomaSanità - Portale Sanitario</p>
      </footer>
    </div>
  );
}
