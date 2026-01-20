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
        
        {/* TITOLO SEMPRE CENTRATO */}
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '900', marginBottom: '40px', color: '#0f172a' }}>
          Servizi più richiesti
        </h2>

        {/* --- VERSIONE MOBILE: 1 FOTO + FRECCE --- */}
        <div className="mobile-view" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <button onClick={indietro} style={{ background: '#065f46', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div style={{ textAlign: 'center', width: '100%' }}>
            <img src={servizi[index].img} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '15px' }} alt="servizio" />
            <h4 style={{ margin: '15px 0 5px 0', fontSize: '22px', fontWeight: '800', color: '#065f46' }}>{servizi[index].titolo}</h4>
            <p style={{ margin: 0, color: '#64748b' }}>{servizi[index].desc}</p>
          </div>

          <button onClick={avanti} style={{ background: '#065f46', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* --- VERSIONE PC: 4 COLONNE CENTRATE --- */}
        <div className="pc-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
          {servizi.map((s) => (
            <div key={s.id} style={{ textAlign: 'center' }}> {/* CENTRA LE SCRITTE */}
              <img src={s.img} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px', marginBottom: '15px' }} alt={s.titolo} />
              <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '800', color: '#065f46' }}>{s.titolo}</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pc-view { display: none !important; }
          .mobile-view { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
