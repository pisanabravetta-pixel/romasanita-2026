import React, { useState } from 'react';

export default function ServiziRichiesti() {
  const servizi = [
    { 
      titolo: "Fisioterapia", 
      desc: "Riabilitazione e massoterapia", 
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
      link: "/fisioterapisti-roma" // O "/servizi-a-domicilio-roma" come preferisci
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

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Servizi più richiesti</h2>
        
        {/* MOBILE */}
        <div className="solo-mobile-servizi">
          <a href={servizi[idx].link} style={{ textDecoration: 'none' }}>
            <div className="box-rinforzato-servizi">
              <div style={{ position: 'relative', height: '240px' }}>
                <img src={servizi[idx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={servizi[idx].titolo} />
                {/* Nota: le frecce sono fuori dal link o gestite per non interferire */}
              </div>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#065f46', margin: '0' }}>{servizi[idx].titolo}</h4>
                <p style={{ color: '#64748b', fontSize: '15px', marginTop: '5px' }}>{servizi[idx].desc}</p>
                <span style={{ color: '#065f46', fontWeight: '700', fontSize: '14px', marginTop: '10px', display: 'inline-block' }}>Scopri di più →</span>
              </div>
            </div>
          </a>
          <button onClick={(e) => { e.preventDefault(); setIdx(idx === 0 ? 3 : idx - 1); }} className="freccia-nav sx">‹</button>
          <button onClick={(e) => { e.preventDefault(); setIdx(idx === 3 ? 0 : idx + 1); }} className="freccia-nav dx">›</button>
        </div>

        {/* PC */}
        <div className="solo-pc-servizi">
          {servizi.map((s, i) => (
            <a key={i} href={s.link} style={{ textDecoration: 'none' }}>
              <div className="box-rinforzato-servizi" style={{ textAlign: 'center', transition: 'transform 0.2s' }}>
                <img src={s.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt={s.titolo} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontWeight: '800', color: '#065f46', margin: '0' }}>{s.titolo}</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>{s.desc}</p>
                  <p style={{ color: '#065f46', fontWeight: 'bold', fontSize: '13px', marginTop: '8px' }}>Vedi specialisti</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .box-rinforzato-servizi { border: 2px solid #cbd5e1; border-radius: 12px; overflow: hidden; background: #fff; height: 100%; cursor: pointer; }
        .box-rinforzato-servizi:hover { border-color: #065f46; transform: translateY(-5px); }
        .freccia-nav { position: absolute; top: 120px; background: #065f46; color: white; border: 2px solid white; width: 40px; height: 40px; border-radius: 50%; font-size: 25px; cursor: pointer; z-index: 10; }
        .sx { left: 5px; } .dx { right: 5px; }
        .solo-pc-servizi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .solo-mobile-servizi { display: none; position: relative; }
        @media (max-width: 768px) { .solo-pc-servizi { display: none; } .solo-mobile-servizi { display: block; } }
      `}</style>
    </section>
  );
}
