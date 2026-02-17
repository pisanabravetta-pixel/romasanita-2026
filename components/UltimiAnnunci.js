import React, { useState } from 'react';

export default function UltimiAnnunci() {
  // Ho aggiornato i numeri WA con prefissi da cellulare (3) perché i fissi (06) spesso non hanno WA.
  const annunci = [
    { 
      cat: 'FARMACIE', 
      title: 'Farmacia Cola di Rienzo (Prati)', 
      img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400',
      tel: '063243172',
      wa: '393281234567' // Numero cellulare fittizio (i fissi 06 non vanno su WA)
    },
    { 
      cat: 'DIAGNOSTICA', 
      title: 'Centro RX Eur - Analisi', 
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400',
      tel: '065912345',
      wa: '393334455666'
    },
    { 
      cat: 'DENTISTI', 
      title: 'Studio Odontoiatrico Eur', 
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
      tel: '065924567',
      wa: '393478899000'
    },
    { 
      cat: 'SPECIALISTI', 
      title: 'Dermatologo Prati - Dott. Bianchi', 
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
      tel: '063214567',
      wa: '393491122333'
    },
    { 
      cat: 'DOMICILIO', 
      title: 'Infermiere a Domicilio - Prati/Centro', 
      img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400',
      tel: '3335554433',
      wa: '393335554433'
    }
  ];

  const [idx, setIdx] = useState(0);

  const getWaLink = (ann) => {
    // Assicuriamoci che non ci siano spazi o simboli nel numero
    const cleanNumber = ann.wa.replace(/\D/g, '');
    const messaggio = encodeURIComponent(`Ciao, ti contatto da ServiziSalute.com per l'annuncio: ${ann.title}`);
    return `https://wa.me/${cleanNumber}?text=${messaggio}`;
  };

  return (
    <section style={{ padding: '40px 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Ultimi annunci pubblicati</h2>
        
        {/* MOBILE SLIDER */}
        <div className="solo-mobile-slider">
          <div className="box-rinforzato">
            <div style={{ position: 'relative', height: '240px' }}>
              <img src={annunci[idx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={annunci[idx].title} />
              <button onClick={() => setIdx(idx === 0 ? 4 : idx - 1)} className="freccia-nav sx">‹</button>
              <button onClick={() => setIdx(idx === 4 ? 0 : idx + 1)} className="freccia-nav dx">›</button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <small style={{ color: '#065f46', fontWeight: '900', display: 'block' }}>{annunci[idx].cat}</small>
              <h4 style={{ fontSize: '19px', margin: '5px 0 15px 0', fontWeight: '800' }}>{annunci[idx].title}</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${annunci[idx].tel}`} className="btn-chiama-mobile">Chiama</a>
                <a href={getWaLink(annunci[idx])} target="_blank" rel="noopener noreferrer" className="btn-wa-mobile">
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
              <img src={ann.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} alt={ann.title} />
              <div style={{ padding: '12px', textAlign: 'center' }}>
                <small style={{ color: '#065f46', fontWeight: '900', fontSize: '10px' }}>{ann.cat}</small>
                <h4 style={{ fontSize: '14px', margin: '5px 0', fontWeight: '800' }}>{ann.title}</h4>
                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                  <a href={`tel:${ann.tel}`} className="btn-chiama-pc">Chiama</a>
                  <a href={getWaLink(ann)} target="_blank" rel="noopener noreferrer" className="btn-wa-pc">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .box-rinforzato { border: 2px solid #cbd5e1; border-radius: 12px; overflow: hidden; background: #fff; }
        .freccia-nav { position: absolute; top: 50%; transform: translateY(-50%); background: #065f46; color: white; border: 2px solid white; width: 40px; height: 40px; border-radius: 50%; font-size: 25px; cursor: pointer; z-index: 5; }
        .sx { left: 10px; } .dx { right: 10px; }
        .btn-chiama-pc { flex: 1; background: #eef6ff; color: #0070f3; padding: 6px; border-radius: 4px; font-size: 11px; font-weight: bold; text-decoration: none; text-align: center; }
        .btn-wa-pc { background: #25D366; color: white; padding: 6px 10px; border-radius: 4px; font-size: 11px; }
        .btn-chiama-mobile { flex: 1; background: #0070f3; color: white; padding: 12px; border-radius: 8px; font-weight: bold; text-decoration: none; text-align: center; }
        .btn-wa-mobile { background: #25D366; color: white; padding: 12px 20px; border-radius: 8px; font-size: 18px; display: flex; align-items: center; justify-content: center; }
        .solo-pc-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
        .solo-mobile-slider { display: none; }
        @media (max-width: 768px) { .solo-pc-grid { display: none; } .solo-mobile-slider { display: block; } }
      `}</style>
    </section>
  );
}
