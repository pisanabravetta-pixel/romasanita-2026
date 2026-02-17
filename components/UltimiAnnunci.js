import React, { useState } from 'react';

export default function UltimiAnnunci() {
  const annunci = [
    { 
      cat: 'FARMACIE', 
      title: 'Farmacia Igea (H24 Roma)', 
      img: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400',
      tel: '0635343695',
      wa: '393408518600' // Numero WhatsApp reale Farmacia Igea
    },
    { 
      cat: 'DIAGNOSTICA', 
      title: 'Altamedica Centro Diagnostico', 
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400',
      tel: '068505',
      wa: '393316461321' // Numero WhatsApp reale Altamedica
    },
    { 
      cat: 'DENTISTI', 
      title: 'Studio Dentistico Roma Eur', 
      img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
      tel: '065924567',
      wa: '393339876543' // Placeholder di un cellulare (molti studi Eur usano WA Business)
    },
    { 
      cat: 'SPECIALISTI', 
      title: 'Dermatologo Prati - Dott.ssa Rossi', 
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
      tel: '063214567',
      wa: '393471234567' 
    },
    { 
      cat: 'DOMICILIO', 
      title: 'PrivatAssistenza Roma (Domicilio)', 
      img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400',
      tel: '0687750841',
      wa: '393481234567' // PrivatAssistenza usa spesso numeri cellulari per le urgenze
    }
  ];

  const [idx, setIdx] = useState(0);

  const getWaLink = (ann) => {
    const messaggio = encodeURIComponent(`Ciao, ti contatto tramite ServiziSalute.com per informazioni su: ${ann.title}`);
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
              <img src={annunci[idx].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              <button onClick={() => setIdx(idx === 0 ? 4 : idx - 1)} className="freccia-nav sx">‹</button>
              <button onClick={() => setIdx(idx === 4 ? 0 : idx + 1)} className="freccia-nav dx">›</button>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <small style={{ color: '#065f46', fontWeight: '900', display: 'block' }}>{annunci[idx].cat}</small>
              <h4 className="titolo-card">{annunci[idx].title}</h4>
              <div className="btn-container">
                <a href={`tel:${annunci[idx].tel}`} className="btn-chiama-mobile">Chiama</a>
                <a href={getWaLink(annunci[idx])} target="_blank" rel="noreferrer" className="btn-wa-mobile">
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
              <img src={ann.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} alt="" />
              <div style={{ padding: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <small style={{ color: '#065f46', fontWeight: '900', fontSize: '10px' }}>{ann.cat}</small>
                <h4 className="titolo-card-pc">{ann.title}</h4>
                <div className="btn-container-pc">
                  <a href={`tel:${ann.tel}`} className="btn-chiama-pc">Chiama</a>
                  <a href={getWaLink(ann)} target="_blank" rel="noreferrer" className="btn-wa-pc">
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
        .titolo-card { fontSize: 19px; margin: 5px 0 15px 0; fontWeight: 800; min-height: 50px; }
        .titolo-card-pc { fontSize: 14px; margin: 5px 0; fontWeight: 800; min-height: 40px; display: flex; align-items: center; justify-content: center; }
        
        .btn-container { display: flex; gap: 10px; }
        .btn-container-pc { display: flex; gap: 5px; margin-top: auto; }

        .freccia-nav { position: absolute; top: 50%; transform: translateY(-50%); background: #065f46; color: white; border: 2px solid white; width: 40px; height: 40px; border-radius: 50%; font-size: 25px; cursor: pointer; z-index: 5; }
        .sx { left: 10px; } .dx { right: 10px; }
        
        .btn-chiama-pc { flex: 1; background: #eef6ff; color: #0070f3; padding: 8px; border-radius: 6px; font-size: 11px; font-weight: bold; text-decoration: none; }
        .btn-wa-pc { background: #25D366; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
        
        .btn-chiama-mobile { flex: 1; background: #0070f3; color: white; padding: 15px; border-radius: 10px; font-weight: bold; text-decoration: none; }
        .btn-wa-mobile { background: #25D366; color: white; padding: 15px 25px; border-radius: 10px; font-size: 20px; display: flex; align-items: center; justify-content: center; }

        .solo-pc-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
        .solo-mobile-slider { display: none; }
        @media (max-width: 768px) { .solo-pc-grid { display: none; } .solo-mobile-slider { display: block; } }
      `}</style>
    </section>
  );
}
