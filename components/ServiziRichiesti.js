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
    <section className="servizi-section">
      <div className="container-servizi">
        
        <h2 className="titolo-sezione">Servizi più richiesti</h2>

        {/* --- MOBILE: SLIDER (1 FOTO ALLA VOLTA + FRECCE) --- */}
        <div className="mobile-slider-container">
          <button onClick={indietro} className="arrow-nav left">
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="card-singola">
            <img src={servizi[index].img} alt={servizi[index].titolo} className="img-servizio" />
            <div className="info-servizio">
              <h4>{servizi[index].titolo}</h4>
              <p>{servizi[index].desc}</p>
            </div>
          </div>

          <button onClick={avanti} className="arrow-nav right">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* --- PC: GRIGLIA NORMALE (4 COLONNE) --- */}
        <div className="pc-grid-container">
          {servizi.map((s) => (
            <div key={s.id} className="card-singola">
              <img src={s.img} alt={s.titolo} className="img-servizio" />
              <div className="info-servizio">
                <h4>{s.titolo}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .servizi-section {
          padding: 60px 0;
          border-top: 1px solid #eee;
          background: #fff;
        }
        .container-servizi {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .titolo-sezione {
          text-align: center; /* CENTRA IL TITOLO H2 */
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 40px;
          color: #0f172a;
        }

        /* CARD STYLE CON CENTRATURA */
        .card-singola {
          background: #fff;
          text-align: center; /* CENTRA LE SCRITTE SOTTO LE FOTO */
          display: flex;
          flex-direction: column;
          align-items: center; /* CENTRA GLI ELEMENTI INTERNI */
        }
        .img-servizio {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 15px;
          margin-bottom: 15px;
        }
        .info-servizio h4 {
          margin: 0 0 5px 0;
          font-size: 20px;
          font-weight: 800;
          color: #065f46;
        }
        .info-servizio p {
          margin: 0;
          color: #64748b;
          font-size: 15px;
        }

        /* VISUALIZZAZIONE PC */
        .pc-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }
        .mobile-slider-container { display: none; }

        /* VISUALIZZAZIONE MOBILE */
        @media (max-width: 768px) {
          .pc-grid-container { display: none; }
          .mobile-slider-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }
          .card-singola {
            width: 100%;
          }
          .arrow-nav {
            background: #065f46;
            color: white;
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(6, 95, 70, 0.3);
          }
        }
      `}</style>
    </section>
  );
}
