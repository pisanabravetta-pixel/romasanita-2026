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
    <section style={{ padding: '60px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '900', marginBottom: '30px', color: '#0f172a' }}>
          Servizi più richiesti
        </h2>

        {/* MOBILE VIEW */}
        <div className="mobile-slider" style={{ display: 'none', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <img src={servizi[index].img} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '15px' }} alt="servizio" />
            
            {/* Frecce sovrapposte per non rubare spazio */}
            <button onClick={indietro} className="btn-circle-nav" style={{ left: '10px' }}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={avanti} className="btn-circle-nav" style={{ right: '10px' }}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <h4 style={{ margin: '0', fontSize: '20px', fontWeight: '800', color: '#065f46' }}>{servizi[index].titolo}</h4>
            <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>{servizi[index].desc}</p>
          </div>
        </div>

        {/* PC VIEW */}
        <div className="pc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
          {servizi.map((s) => (
            <div key={s.id} style={{ textAlign: 'center' }}>
              <img src={s.img} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '15px', marginBottom: '15px' }} alt={s.titolo} />
              <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '800', color: '#065f46' }}>{s.titolo}</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .btn-circle-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(6, 95, 70, 0.9);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .pc-grid { display: none !important; }
          .mobile-slider { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
