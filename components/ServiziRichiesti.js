import React, { useState } from 'react';

export default function ServiziRichiesti() {
  // Ho preso esattamente i tuoi dati dal codice che mi hai passato
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
    <section style={{ padding: '40px 0', borderTop: '1px solid #eee', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <h2 style={{ marginBottom: '25px', fontSize: '24px', textAlign: 'center', fontWeight: '800' }}>
          Servizi più richiesti
        </h2>

        {/* VERSIONE MOBILE: SLIDER CON FRECCE */}
        <div className="mobile-only-slider">
          <button onClick={indietro} className="slide-btn"><i className="fas fa-chevron-left"></i></button>
          
          <div className="card-centrata">
            <img src={servizi[index].img} alt={servizi[index].titolo} className="img-centrata" />
            <div className="info-centrata">
              <h4 style={{ margin: '10px 0 5px 0', fontSize: '18px' }}>{servizi[index].titolo}</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{servizi[index].desc}</p>
            </div>
          </div>

          <button onClick={avanti} className="slide-btn"><i className="fas fa-chevron-right"></i></button>
        </div>

        {/* VERSIONE PC: GRIGLIA NORMALE (4 COLONNE) */}
        <div className="pc-only-grid">
          {servizi.map((s) => (
            <div key={s.id} className="card-centrata">
              <img src={s.img} alt={s.titolo} className="img-centrata" />
              <div className="info-centrata">
                <h4 style={{ margin: '10px 0 5px 0' }}>{s.titolo}</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .card-centrata {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          text-align: center; /* CENTRA IL TESTO */
          display: flex;
          flex-direction: column;
          align-items: center; /* CENTRA GLI ELEMENTI NEL FLEX */
        }
        .img-centrata {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
        }
        .info-centrata {
            padding: 15px;
            width: 100%;
        }
        
        .pc-only-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .mobile-only-slider { display: none; }

        @media (max-width: 768px) {
          .pc-only-grid { display: none; }
          .mobile-only-slider {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .slide-btn {
            background: #065f46;
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      `}</style>
    </section>
  );
}
