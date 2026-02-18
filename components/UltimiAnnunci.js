import React, { useState } from 'react';

export default function UltimiAnnunci() {
const annunci = [
    { 
      cat: 'DENTISTI', 
      title: 'Studio Odontoiatrico Eur', 
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=450&fm=webp&q=80',
      tel: '065924567',
      wa: '393478899000' 
    },
    { 
      cat: 'DOMICILIO', 
      title: 'PrivatAssistenza Roma Domicilio', 
      img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=450&fm=webp&q=80',
      tel: '0687750841',
      wa: '393481234567' 
    },
    { 
      cat: 'SPECIALISTI', 
      title: 'Fisiosport Roma (Prati/Centro)', 
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=450&fm=webp&q=80',
      tel: '063234567',
      wa: '393921234567'
    },
    { 
      cat: 'DIAGNOSTICA', 
      title: 'Gruppo Sant\'Andrea Diagnostica', 
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=450&fm=webp&q=80',
      tel: '0612345678',
      wa: '393451234567'
    },
    { 
      cat: 'FARMACIE', 
      title: 'Farmacia Trionfale (Prenotazioni)', 
      img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=450&fm=webp&q=80',
      tel: '0639737151',
      wa: '393284567890' 
    }
  ];

  const [idx, setIdx] = useState(0);

  const getWaLink = (ann) => {
    const messaggio = encodeURIComponent(`Salve, la contatto perché ho visto il suo annuncio su ServiziSalute.com: ${ann.title}`);
    return `https://wa.me/${ann.wa}?text=${messaggio}`;
  };

  return (
    <section style={{ padding: '40px 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Ultimi annunci pubblicati</h2>
        
        {/* MOBILE SLIDER */}
        <div className="solo-mobile-slider">
          <div className="box-rinforzato">
            <div style={{ position: 'relative', height: '240px' }}>
             <img 
  src={annunci[idx].img} 
  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
  alt={annunci[idx].title}
  loading="eager" 
/>
              <button onClick={() => setIdx(idx === 0 ? 4 : idx - 1)} className="freccia-nav sx">‹</button>
              <button onClick={() => setIdx(idx === 4 ? 0 : idx + 1)} className="freccia-nav dx">›</button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <small style={{ color: '#065f46', fontWeight: '900', display: 'block' }}>{annunci[idx].cat}</small>
              <h3 className="titolo-card-mobile">{annunci[idx].title}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
<a href={'tel:' + annunci[idx].tel} className="btn-chiama-mobile" aria-label={'Chiama ' + annunci[idx].title}>Chiama</a>
    <a 
  href={getWaLink(annunci[idx])} 
  target="_blank" 
  rel="noreferrer" 
  aria-label="Contatta su WhatsApp"
  className="btn-wa-mobile"
>
  <svg 
    viewBox="0 0 448 512" 
    width="24" 
    height="24" 
    fill="currentColor" 
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.7 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 445.9c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
</a>
              </div>
            </div>
          </div>
        </div>

        {/* PC GRID */}
        <div className="solo-pc-grid">
          {annunci.map((ann, i) => (
            <div key={i} className="box-rinforzato">
           <img 
  src={ann.img} 
  style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
  alt={ann.title} 
  loading="lazy"
/>
              <div style={{ padding: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', height: '160px' }}>
                <small style={{ color: '#065f46', fontWeight: '900', fontSize: '10px' }}>{ann.cat}</small>
               <h3 className="titolo-card-pc">{ann.title}</h3>
                <div style={{ display: 'flex', gap: '5px', marginTop: 'auto' }}>
<a href={'tel:' + ann.tel} className="btn-chiama-pc" aria-label={'Chiama ' + ann.title}>Chiama</a>
            <a 
  href={getWaLink(ann)} 
  target="_blank" 
  rel="noreferrer" 
  aria-label="Contatta su WhatsApp"
  className="btn-wa-pc"
>
  <svg 
    viewBox="0 0 448 512" 
    width="18" 
    height="18" 
    fill="currentColor" 
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.7 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 445.9c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .box-rinforzato { border: 2px solid #cbd5e1; border-radius: 12px; overflow: hidden; background: #fff; height: 100%; display: flex; flex-direction: column; }
        .titolo-card-mobile { font-size: 19px; margin: 5px 0 15px 0; font-weight: 800; min-height: 50px; }
        .titolo-card-pc { font-size: 14px; margin: 5px 0; font-weight: 800; min-height: 40px; display: flex; align-items: center; justify-content: center; }
        
        .freccia-nav { position: absolute; top: 50%; transform: translateY(-50%); background: #065f46; color: white; border: 2px solid white; width: 40px; height: 40px; border-radius: 50%; font-size: 25px; cursor: pointer; z-index: 5; }
        .sx { left: 10px; } .dx { right: 10px; }
        
        .btn-chiama-pc { flex: 1; background: #eef6ff; color: #0070f3; padding: 8px; border-radius: 6px; font-size: 11px; font-weight: bold; text-decoration: none; display: flex; align-items: center; justify-content: center; }
        .btn-wa-pc { background: #25D366; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; display: flex; align-items: center; }
        
        .btn-chiama-mobile { flex: 1; background: #0070f3; color: white; padding: 15px; border-radius: 10px; font-weight: bold; text-decoration: none; text-align: center; }
        .btn-wa-mobile { background: #25D366; color: white; padding: 15px 25px; border-radius: 10px; font-size: 20px; display: flex; align-items: center; justify-content: center; }

        .solo-pc-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
        .solo-mobile-slider { display: none; }
        @media (max-width: 768px) { .solo-pc-grid { display: none; } .solo-mobile-slider { display: block; } }
      `}</style>
    </section>
  );
}
