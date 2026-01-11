import React from 'react';
import Head from 'next/head';

const quartieri = [
  "Prati", "Eur", "Trastevere", "Monti", "Flaminio", "Parioli", "San Giovanni", 
  "Appio Latino", "Nomentano", "Tiburtino", "Ostiense", "Monteverde", "Cassia"
];

const specializzazioni = [
  { nome: "Cardiologi", slug: "cardiologi-roma" },
  { nome: "Dermatologi", slug: "dermatologi-roma" },
  { nome: "Ginecologi", slug: "ginecologi-roma" },
  { nome: "Ortopedici", slug: "ortopedici-roma" },
  { nome: "Psicologi", slug: "psicologi-roma" }
];

export default function QuartieriRoma() {
  return (
    <div style={{ fontFamily: 'system-ui', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari nei Quartieri di Roma | ServiziSalute</title>
        <meta name="description" content="Trova medici e specialisti in tutti i quartieri di Roma: Prati, Eur, Parioli e molti altri." />
      </Head>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '36px', color: '#2d3748', textAlign: 'center' }}>Specialisti per Quartiere</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {quartieri.map(q => (
            <div key={q} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <h3 style={{ color: '#3182ce', borderBottom: '2px solid #ebf8ff', paddingBottom: '10px' }}>{q}</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px', fontSize: '14px', lineHeight: '2' }}>
                {specializzazioni.map(s => (
                  <li key={s.slug}>
                    <a href={`/${s.slug}-${q.toLowerCase().replace(' ', '-')}`} style={{ color: '#4a5568', textDecoration: 'none' }}>
                      {s.nome} {q}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 0', textAlign: 'center', marginTop: '50px' }}>
        © 2026 ServiziSalute – Tutti i diritti riservati
      </footer>
    </div>
  );
}
