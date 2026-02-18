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
              <h4 className="titolo-card-mobile">{annunci[idx].title}</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${annunci[idx].tel}`} className="btn-chiama-mobile">Chiama</a>
               <a href={getWaLink(annunci[idx])} target="_blank" rel="noreferrer" className="btn-wa-mobile">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
                  <i className="fab fa-whatsapp"></i>
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
                <h4 className="titolo-card-pc">{ann.title}</h4>
                <div style={{ display: 'flex', gap: '5px', marginTop: 'auto' }}>
                  <a href={`tel:${ann.tel}`} className="btn-chiama-pc">Chiama</a>
                 <a href={getWaLink(ann)} target="_blank" rel="noreferrer" className="btn-wa-pc">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
                    <i className="fab fa-whatsapp"></i>
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
