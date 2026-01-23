import React, { useState } from 'react';

export default function ServiziRichiesti() {
 const servizi = [
    { 
      titolo: "Fisioterapia", 
      desc: "Riabilitazione e massoterapia", 
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=75",
      link: "/fisioterapisti-roma" 
    },
    { 
      titolo: "Oculista", 
      desc: "Esame della vista completo", 
      img: "https://images.unsplash.com/photo-1574689049868-e94ed5301745?auto=format&fit=crop&w=400&q=75",
      link: "/oculisti-roma" 
    },
    { 
      titolo: "Psicologo", 
      desc: "Consulenza e supporto", 
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=75",
      link: "/psicologi-roma" 
    },
    { 
      titolo: "Cardiologo", 
      desc: "ECG e controllo pressione", 
      img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=400&q=75",
      link: "/cardiologi-roma" 
    }
  ];
  
  const [idx, setIdx] = useState(0);

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Servizi più richiesti</h2>
        
        {/* MOBILE - RIPRISTINATO ORIGINALE CON LINK */}
        <div className="solo-mobile-servizi">
          <div className="box-rinforzato-servizi">
            <div style={{ position: 'relative', height: '240px' }}>
              <a href={servizi[idx].link}>
                <img src={servizi[idx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={servizi[idx].titolo} />
              </a>
              <button onClick={() => setIdx(idx === 0 ? 3 : idx - 1)} className="freccia-nav sx">‹</button>
              <button onClick={() => setIdx(idx === 3 ? 0 : idx + 1)} className="freccia-nav dx">›</button>
            </div>
            <a href={servizi[idx].link} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#065f46', margin: '0' }}>{servizi[idx].titolo}</h4>
                <p style={{ color: '#64748b', fontSize: '15px', marginTop: '5px' }}>{servizi[idx].desc}</p>
              </div>
            </a>
          </div>
        </div>

        {/* PC - RIPRISTINATO ORIGINALE CON LINK */}
        <div className="solo-pc-servizi">
          {servizi.map((s, i) => (
            <a key={i} href={s.link} style={{ textDecoration: 'none' }}>
              <div className="box-rinforzato-servizi" style={{ textAlign: 'center' }}>
                <img src={s.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt={s.titolo} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontWeight: '800', color: '#065f46', margin: '0' }}>{s.titolo}</h4>
                  <p style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>{s.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .box-rinforzato-servizi { border: 2px solid #cbd5e1; border-radius: 12px; overflow: hidden; background: #fff; height: 100%; }
        .freccia-nav { position: absolute; top: 50%; transform: translateY(-50%); background: #065f46; color: white; border: 2px solid white; width: 40px; height: 40px; border-radius: 50%; font-size: 25px; cursor: pointer; z-index: 5; }
        .sx { left: 10px; } .dx { right: 10px; }
        
        .solo-pc-servizi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .solo-mobile-servizi { display: none; }
        @media (max-width: 768px) { .solo-pc-servizi { display: none; } .solo-mobile-servizi { display: block; } }
      `}</style>
    </section>
  );
}
