import React, { useState } from 'react';

export default function UltimiAnnunci() {
  const annunci = [
    { cat: 'FARMACIE', title: 'Farmacia H24 Centro', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400' },
    { cat: 'DIAGNOSTICA', title: 'Centro RX Prati', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' },
    { cat: 'DENTISTI', title: 'Studio Dentistico Eur', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
    { cat: 'SPECIALISTI', title: 'Dermatologo Roma', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
    { cat: 'DOMICILIO', title: 'Infermiere a Casa', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400' }
  ];
  const [idx, setIdx] = useState(0);

  return (
    <section style={{ padding: '40px 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Ultimi annunci pubblicati</h2>
        
        {/* MOBILE SLIDER */}
        <div className="solo-mobile-slider">
          <div className="box-unico-annuncio">
            <div style={{ position: 'relative', height: '240px' }}>
              <img src={annunci[idx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              <button onClick={() => setIdx(idx === 0 ? 4 : idx - 1)} className="freccia-nav sx">‹</button>
              <button onClick={() => setIdx(idx === 4 ? 0 : idx + 1)} className="freccia-nav dx">›</button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <small style={{ color: '#065f46', fontWeight: '900', display: 'block' }}>{annunci[idx].cat}</small>
              <h4 style={{ fontSize: '19px', margin: '5px 0 15px 0', fontWeight: '800' }}>{annunci[idx].title}</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="tel:061234567" className="btn-chiama">Chiama</a>
                <a href="#" className="btn-whatsapp"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>

        {/* PC GRID */}
        <div className="solo-pc-grid">
          {annunci.map((ann, i) => (
            <div key={i} className="card-pc-pulita">
              <img src={ann.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} alt="" />
              <div style={{ padding: '12px', textAlign: 'center' }}>
                <small style={{ color: '#065f46', fontWeight: '900', fontSize: '10px' }}>{ann.cat}</small>
                <h4 style={{ fontSize: '14px', margin: '5px 0', fontWeight: '800' }}>{ann.title}</h4>
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                  <a href="tel:061234567" className="btn-chiama-small">Chiama</a>
                  <a href="#" className="btn-whatsapp-small"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .box-unico-annuncio { border: 1px solid #eee; border-radius: 15px; overflow: hidden; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .card-pc-pulita { border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden; }
        .freccia-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 25px; cursor: pointer; z-index: 5; }
        .sx { left: 10px; } .dx { right: 10px; }
        .btn-chiama { flex: 1; background: #eef6ff; color: '#0070f3'; padding: 12px; border-radius: 8px; font-weight: bold; text-decoration: none; }
        .btn-whatsapp { background: #25D366; color: white; padding: 12px 20px; border-radius: 8px; }
        .btn-chiama-small { flex: 1; background: #eef6ff; color: #0070f3; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: bold; text-decoration: none; }
        .btn-whatsapp-small { background: #25D366; color: white; padding: 6px 10px; border-radius: 4px; font-size: 11px; }
        
        .solo-pc-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
        .solo-mobile-slider { display: none; }

        @media (max-width: 768px) {
          .solo-pc-grid { display: none; }
          .solo-mobile-slider { display: block; }
        }
      `}</style>
    </section>
  );
}
