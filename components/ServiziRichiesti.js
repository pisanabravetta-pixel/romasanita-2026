import React, { useState } from 'react';

export default function ServiziRichiesti() {
  const servizi = [
    { titolo: "Fisioterapia", desc: "Riabilitazione e massoterapia", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" },
    { titolo: "Oculista", desc: "Esame della vista completo", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400" },
    { titolo: "Psicologo", desc: "Consulenza e supporto", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400" },
    { titolo: "Cardiologo", desc: "ECG e controllo pressione", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400" }
  ];
  const [idx, setIdx] = useState(0);

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '15px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    paddingBottom: '20px'
  };

  return (
    <section style={{ padding: '40px 0', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Servizi più richiesti</h2>
        
        {/* MOBILE */}
        <div className="mobile-only">
          <div style={cardStyle}>
            <div style={{ position: 'relative' }}>
              <img src={servizi[idx].img} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <button onClick={() => setIdx(idx === 0 ? 3 : idx - 1)} className="arrow">‹</button>
              <button onClick={() => setIdx(idx === 3 ? 0 : idx + 1)} className="arrow" style={{ right: '10px' }}>›</button>
            </div>
            <div style={{ padding: '0 15px' }}>
              <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#065f46', marginTop: '15px' }}>{servizi[idx].titolo}</h4>
              <p style={{ color: '#64748b', margin: '5px 0' }}>{servizi[idx].desc}</p>
            </div>
          </div>
        </div>

        {/* PC */}
        <div className="pc-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {servizi.map((s, i) => (
            <div key={i} style={cardStyle}>
              <img src={s.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <h4 style={{ marginTop: '12px', fontWeight: '800', color: '#065f46' }}>{s.titolo}</h4>
              <p style={{ fontSize: '14px', color: '#64748b', padding: '0 10px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(6, 95, 70, 0.8); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; left: 10px; cursor: pointer; }
        @media (min-width: 769px) { .mobile-only { display: none; } }
        @media (max-width: 768px) { .pc-only { display: none; } }
      `}</style>
    </section>
  );
}
