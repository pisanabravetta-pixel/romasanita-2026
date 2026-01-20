import React, { useState } from 'react';

export default function UltimiAnnunci() {
  const annunci = [
    { cat: 'FARMACIE', title: 'Farmacia H24 Centro', img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400' },
    { cat: 'DIAGNOSTICA', title: 'Centro RX Prati', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' },
    { cat: 'DENTISTI', title: 'Studio Dentistico Eur', img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400' },
    { cat: 'SPECIALISTI', title: 'Dermatologo Roma', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
    { cat: 'DOMICILIO', title: 'Infermiere a Casa', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400' }
  ];

  const [index, setIndex] = useState(0);
  const avanti = () => setIndex((prev) => (prev === annunci.length - 1 ? 0 : prev + 1));
  const indietro = () => setIndex((prev) => (prev === 0 ? annunci.length - 1 : prev - 1));

  return (
    <section style={{ padding: '50px 0', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: '900', marginBottom: '35px' }}>Ultimi annunci pubblicati</h2>

        {/* MOBILE SLIDER */}
        <div className="mobile-only" style={{ display: 'none', position: 'relative', textAlign: 'center' }}>
          <img src={annunci[index].img} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '15px' }} />
          <button onClick={indietro} className="nav-arrow" style={{ left: '10px' }}><i className="fas fa-chevron-left"></i></button>
          <button onClick={avanti} className="nav-arrow" style={{ right: '10px' }}><i className="fas fa-chevron-right"></i></button>
          <div style={{ padding: '15px' }}>
            <small style={{ color: '#065f46', fontWeight: 'bold' }}>{annunci[index].cat}</small>
            <h4 style={{ fontSize: '20px', margin: '5px 0' }}>{annunci[index].title}</h4>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
               <a href="tel:061234567" style={{ background: '#eef6ff', color: '#0070f3', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
               <a href="https://wa.me/39" style={{ background: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px' }}><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>

        {/* PC GRID */}
        <div className="pc-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
          {annunci.map((ann, idx) => (
            <div key={idx} style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', textAlign: 'center', paddingBottom: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <img src={ann.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '10px' }}>
                <small style={{ color: '#065f46', fontWeight: 'bold' }}>{ann.cat}</small>
                <h4 style={{ fontSize: '14px', margin: '5px 0' }}>{ann.title}</h4>
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                  <a href="tel:061234567" style={{ flex: 1, background: '#eef6ff', color: '#0070f3', padding: '6px', borderRadius: '4px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                  <a href="https://wa.me/39" style={{ background: '#25D366', color: 'white', padding: '6px 10px', borderRadius: '4px', fontSize: '11px' }}><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .nav-arrow { position: absolute; top: 110px; background: rgba(6, 95, 70, 0.8); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; }
        @media (max-width: 768px) { .pc-only { display: none !important; } .mobile-only { display: block !important; } }
      `}</style>
    </section>
  );
}
