import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Specialisti per Quartiere a Roma | Cerca il tuo Medico | ServiziSalute</title>
        <meta name="description" content="Trova i migliori specialisti sanitari nei principali quartieri di Roma. Naviga tra Cardiologi, Dermatologi e Ortopedici vicino a te." />
      </Head>

      <Navbar />

      <main style={{ flex: '1 0 auto', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* INTESTAZIONE SEO */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#164e63', fontSize: '42px', fontWeight: '900', marginBottom: '15px' }}>
            Specialisti per Quartiere
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Seleziona la tua zona di residenza per trovare i professionisti sanitari più vicini a te. 
            La continuità terapeutica inizia dalla vicinanza.
          </p>
        </div>

        {/* GRID QUARTIERI */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px',
          marginBottom: '80px' 
        }}>
          {quartieri.map(q => (
            <div key={q} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '24px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              border: '1px solid #f1f5f9'
            }}>
              <h3 style={{ 
                color: '#0891b2', 
                fontSize: '22px', 
                fontWeight: '800',
                borderBottom: '2px solid #ecfeff', 
                paddingBottom: '12px',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '10px' }}>📍</span> {q}
              </h3>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {specializzazioni.map(s => (
                  <li key={s.slug} style={{ marginBottom: '10px' }}>
                    <a 
                      href={`/${s.slug}-${q.toLowerCase().replace(' ', '-')}`} 
                      style={{ 
                        color: '#475569', 
                        textDecoration: 'none', 
                        fontSize: '15px',
                        fontWeight: '500',
                        display: 'block',
                        transition: 'color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#0891b2'}
                      onMouseOut={(e) => e.target.style.color = '#475569'}
                    >
                      • {s.nome} {q}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
