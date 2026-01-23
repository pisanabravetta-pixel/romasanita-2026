import React from 'react';

export default function ServiziRichiesti() {
  const servizi = [
    { titolo: "Fisioterapia", desc: "Riabilitazione e massoterapia", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400", link: "/fisioterapisti-roma" },
    { titolo: "Oculista", desc: "Esame della vista completo", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400", link: "/oculisti-roma" },
    { titolo: "Psicologo", desc: "Consulenza e supporto", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400", link: "/psicologi-roma" },
    { titolo: "Cardiologo", desc: "ECG e controllo pressione", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400", link: "/cardiologi-roma" }
  ];

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>
          Servizi più richiesti
        </h2>
        
        <div className="griglia-servizi-clean">
          {servizi.map((s, i) => (
            <a key={i} href={s.link} className="card-servizio-link">
              <div className="card-servizio-inner">
                <img src={s.img} alt={s.titolo} />
                <div className="card-servizio-testo">
                  <h4>{s.titolo}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .griglia-servizi-clean {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* FORZA 4 COLONNE */
          gap: 20px;
        }
        .card-servizio-link {
          text-decoration: none;
          color: inherit;
        }
        .card-servizio-inner {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          background: white;
        }
        .card-servizio-inner:hover {
          border-color: #065f46;
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .card-servizio-inner img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        .card-servizio-testo {
          padding: 15px;
          text-align: center;
        }
        .card-servizio-testo h4 {
          margin: 0;
          color: #065f46;
          font-weight: 800;
        }
        .card-servizio-testo p {
          margin: 5px 0 0;
          font-size: 13px;
          color: #64748b;
        }

        /* GESTIONE MOBILE */
        @media (max-width: 992px) {
          .griglia-servizi-clean {
            grid-template-columns: repeat(2, 1fr); /* 2 sopra e 2 sotto su tablet */
          }
        }
        @media (max-width: 600px) {
          .griglia-servizi-clean {
            grid-template-columns: 1fr; /* 1 alla volta su cellulare */
          }
        }
      `}</style>
    </section>
  );
}
