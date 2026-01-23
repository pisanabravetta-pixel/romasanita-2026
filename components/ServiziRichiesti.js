import React, { useState } from 'react';

export default function ServiziRichiesti() {
  const servizi = [
    { 
      titolo: "Fisioterapia", 
      desc: "Riabilitazione e massoterapia", 
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
      link: "/fisioterapisti-roma"
    },
    { 
      titolo: "Oculista", 
      desc: "Esame della vista completo", 
      img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400",
      link: "/oculisti-roma" 
    },
    { 
      titolo: "Psicologo", 
      desc: "Consulenza e supporto", 
      img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
      link: "/psicologi-roma" 
    },
    { 
      titolo: "Cardiologo", 
      desc: "ECG e controllo pressione", 
      img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400",
      link: "/cardiologi-roma" 
    }
  ];
  const [idx, setIdx] = useState(0);

  const boxStyle = {
    border: '2px solid #cbd5e1',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#fff',
    height: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block'
  };

  const frecciaStyle = {
    position: 'absolute',
    top: '100px',
    background: '#065f46',
    color: 'white',
    border: '2px solid white',
    width: '40px',
    height: '40px',
    border-radius: '50%',
    fontSize: '25px',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>
          Servizi più richiesti
        </h2>
        
        {/* MOBILE CONTAINER */}
        <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }} className="mobile-only-display">
          <a href={servizi[idx].link} style={boxStyle}>
            <div style={{ height: '200px' }}>
              <img src={servizi[idx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={servizi[idx].titolo} />
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#065f46', margin: '0' }}>{servizi[idx].titolo}</h4>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>{servizi[idx].desc}</p>
              <span style={{ color: '#065f46', fontWeight: 'bold', fontSize: '14px', marginTop: '10px', display: 'inline-block' }}>Vedi Specialisti →</span>
            </div>
          </a>
          <button onClick={() => setIdx(idx === 0 ? 3 : idx - 1)} style={{ ...frecciaStyle, left: '-15px' }}>‹</button>
          <button onClick={() => setIdx(idx === 3 ? 0 : idx + 1)} style={{ ...frecciaStyle, right: '-15px' }}>›</button>
        </div>

        {/* PC GRID */}
        <div className="pc-only-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {servizi.map((s, i) => (
            <a key={i} href={s.link} style={boxStyle} className="box-hover-effect">
              <img src={s.img} style={{ width: '100%', height: '160px', objectFit: 'cover' }} alt={s.titolo} />
              <div style={{ padding: '15px', textAlign: 'center' }}>
                <h4 style={{ fontWeight: '800', color: '#065f46', margin: '0' }}>{s.titolo}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '5px' }}>{s.desc}</p>
                <p style={{ color: '#065f46', fontWeight: 'bold', fontSize: '12px', marginTop: '8px' }}>Scopri di più</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 769px) { .mobile-only-display { display: none !important; } }
        @media (max-width: 768px) { .pc-only-grid { display: none !important; } }
        .box-hover-effect:hover { border-color: #065f46 !important; transform: translateY(-5px); transition: all 0.3s; }
      `}</style>
    </section>
  );
}
