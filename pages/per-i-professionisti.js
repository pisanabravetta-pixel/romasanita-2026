import React from 'react';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', borderBottom: '1px solid #eee' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '32px' }}>Come farsi trovare da nuovi pazienti a Roma</h1>
        <p style={{ fontSize: '18px', color: '#4a5568' }}>Sei un medico o titolare di una struttura sanitaria? Scopri come apparire nelle ricerche locali di Google.</p>

        <div style={{ margin: '40px 0', padding: '30px', backgroundColor: '#f0f7ff', borderRadius: '15px' }}>
          <h2 style={{ color: '#2b6cb0' }}>Perché ServiziSalute?</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>SEO Locale già pronta:</strong> Le nostre pagine (es. Dentisti Roma Prati) sono già ottimizzate per Google.</li>
            <li><strong>Traffico Qualificato:</strong> Chi arriva sul sito sta cercando un servizio sanitario *ora* a Roma.</li>
            <li><strong>Gratis per i primi 100:</strong> Stiamo lanciando il portale e offriamo i primi inserimenti gratuitamente.</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '20px 40px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
            Pubblica la tua Vetrina Gratis
          </a>
        </div>
      </div>
    </div>
  );
}
