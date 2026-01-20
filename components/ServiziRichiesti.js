import React, { useState } from 'react';

export default function ServiziRichiesti() {
  const servizi = [
    { id: 1, titolo: "Fisioterapia", desc: "Riabilitazione e massoterapia", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400" },
    { id: 2, titolo: "Oculista", desc: "Esame della vista completo", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400" },
    { id: 3, titolo: "Psicologo", desc: "Consulenza e supporto", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400" },
    { id: 4, titolo: "Cardiologo", desc: "ECG e controllo pressione", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400" }
  ];

  const [index, setIndex] = useState(0);
  const avanti = () => setIndex((prev) => (prev === servizi.length - 1 ? 0 : prev + 1));
  const indietro = () => setIndex((prev) => (prev === 0 ? servizi.length - 1 : prev - 1));

  return (
    <section style={{ padding: '50px 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: '900', marginBottom: '35px' }}>Servizi più richiesti</h2>

        {/* MOBILE SLIDER */}
        <div className="mobile-only" style={{ display: 'none' }}>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <img src={servizi[index].img} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '15px' }} />
            <button onClick={indietro} className="nav-arrow" style={{ left: '10px' }}><i className="fas fa-chevron-left"></i></button>
            <button onClick={avanti} className="nav-arrow" style={{ right: '10px' }}><i className="fas fa-chevron-right"></i></button>
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ margin: '0', fontSize: '22px', color: '#065f46', fontWeight: '800' }}>{servizi[index].titolo}</h4>
              <p style={{ color: '#64748b', marginTop: '5px' }}>{servizi[index].desc}</p>
            </div>
          </div>
        </div>

        {/* PC GRID */}
        <div className="pc-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
          {servizi.map(s => (
            <div key={s.id} style={{ textAlign: 'center' }}>
              <img src={s.img} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '15px' }} />
              <h4 style={{ marginTop: '15px', color: '#065f46', fontWeight: '800' }}>{s.titolo}</h4>
              <p style={{ color: '#64748b', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .nav-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(6, 95, 70, 0.8); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; }
        @media (max-width: 768px) { .pc-only { display: none !important; } .mobile-only { display: block !important; } }
      `}</style>
    </section>
  );
}
