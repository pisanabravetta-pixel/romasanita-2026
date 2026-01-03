import React from 'react';

export default function RomaSanita() {
  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Import dei font e icone direttamente nel componente per velocità */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      {/* --- TOP BAR --- */}
      <div style={{ background: '#111827', color: 'white', padding: '10px 0', fontSize: '13px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between' }}>
          <span><i className="fas fa-map-marker-alt"></i> Roma e Provincia</span>
          <span><i className="fas fa-phone"></i> Emergenze: 118</span>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header style={{ background: 'white', padding: '20px 0', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, z-index: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '30px' }}>
          <a href="#" style={{ fontSize: '24px', fontWeight: '800', color: '#0066CC', textDecoration: 'none' }}>
            <i className="fas fa-heartbeat"></i> Roma<span style={{ color: '#111827' }}>Sanità</span>
          </a>
          <div style={{ flex: 1, position: 'relative', maxWidth: '600px' }}>
            <input 
              type="text" 
              placeholder="Cerca farmacie, dentisti, medici..." 
              style={{ width: '100%', padding: '12px 20px 12px 45px', border: '2px solid #E5E7EB', borderRadius: '50px' }}
            />
            <i className="fas fa-search" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}></i>
          </div>
        </div>
      </header>

      {/* --- STATS STRIP --- */}
      <section style={{ background: '#1F2937', color: 'white', padding: '30px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center' }}>
          <div><h3 style={{ color: '#00A86B', fontSize: '28px' }}>+1.250</h3><p style={{ fontSize: '14px', opacity: 0.8 }}>Annunci Attivi</p></div>
          <div><h3 style={{ color: '#00A86B', fontSize: '28px' }}>+850</h3><p style={{ fontSize: '14px', opacity: 0.8 }}>Professionisti</p></div>
          <div><h3 style={{ color: '#00A86B', fontSize: '28px' }}>15k</h3><p style={{ fontSize: '14px', opacity: 0.8 }}>Visitatori / Mese</p></div>
        </div>
      </section>

      {/* --- CATEGORIES (STYLE SUBITO) --- */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Esplora le categorie</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {['Farmacie', 'Dentisti', 'Diagnostica', 'Specialisti', 'Emergenze'].map((cat) => (
              <div key={cat} style={{ background: '#F3F4F6', borderRadius: '12px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: '#0066CC', fontSize: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <i className={`fas ${cat === 'Farmacie' ? 'fa-pills' : 'fa-user-md'}`}></i>
                </div>
                <h4 style={{ fontSize: '15px' }}>{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GRID 5 ANNUNCI --- */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ marginBottom: '30px' }}>Ultimi Annunci pubblicati</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                <div style={{ height: '140px', background: '#ddd' }}></div>
                <div style={{ padding: '15px' }}>
                  <div style={{ color: '#00A86B', fontWeight: 'bold' }}>{i === 1 ? 'H24' : '€ 50'}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', margin: '5px 0' }}>Servizio Sanitario {i}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Roma Centro</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES DIFFERENZIATE --- */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ padding: '40px', borderRadius: '20px', background: '#0066CC', color: 'white' }}>
          <h2>Perché scegliere noi</h2>
          <p style={{ marginTop: '10px' }}>• Professionisti verificati</p>
          <p style={{ marginTop: '10px' }}>• Prenotazione rapida</p>
        </div>
        <div style={{ padding: '40px', borderRadius: '20px', background: '#00A86B', color: 'white' }}>
          <h2>Perché pubblicare qui</h2>
          <p style={{ marginTop: '10px' }}>• Visibilità su Roma</p>
          <p style={{ marginTop: '10px' }}>• Gestione annunci semplice</p>
        </div>
      </section>
    </div>
  );
}
