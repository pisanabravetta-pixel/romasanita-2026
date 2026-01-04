import React from 'react';

export default function CardiologiRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Pubblica Profilo</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Cardiologi a Roma: Visite, ECG e Prevenzione</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova i migliori specialisti in cardiologia a Roma per visite cardiologiche, elettrocardiogramma (ECG) ed ecocardiogrammi.</p>

        {/* TESTO SEO (Strategia Step 2) */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#fff5f5', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #feb2b2' }}>
          <h2 style={{ fontSize: '22px', color: '#c53030', marginBottom: '15px' }}>La salute del tuo cuore a Roma</h2>
          <p>
            Cercare un <strong>cardiologo a Roma</strong> richiede affidabilità e rapidità. Che tu risieda a <strong>Roma Nord, zona Prati, Eur o Appio Latino</strong>, la capitale offre centri d'eccellenza per la diagnosi e cura delle patologie cardiovascolari. La prevenzione è l'arma più efficace contro l'ipertensione e le aritmie.
          </p>
          <p>
            Su ServiziSalute puoi trovare specialisti che offrono pacchetti di prevenzione completa, inclusi <strong>ECG da sforzo, Holter pressorio 24h e visite aritmologiche</strong>. Molti studi medici privati a Roma permettono di prenotare visite specialistiche con tempi d'attesa ridotti rispetto alle strutture pubbliche.
          </p>
        </div>

        {/* LISTA ESEMPI */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Specialisti disponibili:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Studio Cardiologico Dr. Martini</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Roma (Zona Flaminio) - Specialista in Ipertensione</p>
              <span style={{ fontSize: '11px', background: '#fff5f5', color: '#c53030', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>ECG IMMEDIATO</span>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Prenota Visita</button>
          </div>
        </div>

        {/* CTA PER IL MEDICO (Step 3) */}
        <div style={{ marginTop: '60px', textAlign: 'center', backgroundColor: '#1a365d', color: '#fff', padding: '40px', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '26px' }}>Sei un Cardiologo a Roma?</h2>
          <p style={{ opacity: '0.9', marginBottom: '25px' }}>Rendi visibile il tuo studio specialistico. Pubblica oggi stesso la tua scheda professionale gratuitamente.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '16px 35px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
            Pubblica il tuo Profilo Medico
          </a>
        </div>
      </div>
    </div>
  );
}
