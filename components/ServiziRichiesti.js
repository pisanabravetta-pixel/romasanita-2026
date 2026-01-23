import React, { useState } from 'react';

export default function ServiziRichiesti() {
  const servizi = [
    { titolo: "Fisioterapia", desc: "Riabilitazione e massoterapia", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400", link: "/fisioterapisti-roma" },
    { titolo: "Oculista", desc: "Esame della vista completo", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400", link: "/oculisti-roma" },
    { titolo: "Psicologo", desc: "Consulenza e supporto", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400", link: "/psicologi-roma" },
    { titolo: "Cardiologo", desc: "ECG e controllo pressione", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400", link: "/cardiologi-roma" }
  ];
  const [idx, setIdx] = useState(0);

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px', fontWeight: '900' }}>Servizi più richiesti</h2>
        
        {/* VERSIONE UNICA (Funziona PC e Mobile senza stili JSX complessi) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {servizi.map((s, i) => (
            <a key={i} href={s.link} style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              width: '280px', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
              <img src={s.img} style={{ width: '100%', height: '160px', objectFit: 'cover' }} alt={s.titolo} />
              <div style={{ padding: '15px', textAlign: 'center' }}>
                <h4 style={{ fontWeight: '800', color: '#065f46', margin: '0' }}>{s.titolo}</h4>
                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
