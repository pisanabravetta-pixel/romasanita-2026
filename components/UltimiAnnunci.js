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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Ultimi annunci pubblicati</h2>
        
        {/* MOBILE */}
        <div className="mobile-only">
          <div style={{ border: '2px solid #065f46', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff', paddingBottom: '15px' }}>
            <div style={{ position: 'relative' }}>
              <img src={annunci[idx].img} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <button onClick={() => setIdx(idx === 0 ? 4 : idx - 1)} className="arrow">‹</button>
              <button onClick={() => setIdx(idx === 4 ? 0 : idx + 1)} className="arrow" style={{ right: '10px' }}>›</button>
            </div>
            <small style={{ color: '#065f46', fontWeight: '900', display: 'block', marginTop: '15px' }}>{annunci[idx].cat}</small>
            <h4 style={{ fontSize: '20px', margin: '5px 0 15px 0', fontWeight: '800' }}>{annunci[idx].title}</h4>
            <div style={{ display: 'flex', gap: '10px', padding: '0 15px' }}>
              <a href="tel:061234567" style={{ flex: 1, background: '#eef6ff', color: '#0070f3', padding: '12px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              <a href="#" style={{ background: '#25D366', color: 'white', padding: '12px 20px', borderRadius: '8px' }}><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>

        {/* PC */}
        <div className="pc-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          {annunci.map((ann, i) => (
            <div key={i} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', textAlign: 'center' }}>
              <img src={ann.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '10px' }}>
                <small style={{ color: '#065f46', fontWeight: '900', fontSize: '10px' }}>{ann.cat}</small>
                <h4 style={{ fontSize: '14px', margin: '5px 0' }}>{ann.title}</h4>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <a href="tel:061234567" style={{ flex: 1, background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                  <a href="#" style={{ background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px' }}><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(6,95,70,0.8); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; left: 10px; cursor: pointer; }
        @media (min-width: 769px) { .mobile-only { display: none; } }
        @media (max-width: 768px) { .pc-only { display: none; } }
      `}</style>
    </section>
  );
}
