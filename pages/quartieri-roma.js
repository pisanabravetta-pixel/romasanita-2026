import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Lista uniforme a tutte le altre pagine hub
const quartieri = [
  "Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", 
  "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"
];

const specializzazioni = [
  { nome: "Cardiologi", slug: "cardiologi-roma" },
  { nome: "Dermatologi", slug: "dermatologi-roma" },
  { nome: "Ginecologi", slug: "ginecologi-roma" },
  { nome: "Ortopedici", slug: "ortopedici-roma" },
  { nome: "Psicologi", slug: "psicologi-roma" },
  { nome: "Dentisti", slug: "dentisti-roma" },
  { nome: "Diagnostica", slug: "diagnostica-roma" }
];

export default function QuartieriRoma() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Specialisti per Quartiere a Roma | Cerca il tuo Medico | ServiziSalute</title>
        <meta name="description" content="Trova i migliori specialisti sanitari nei principali quartieri di Roma. Naviga tra Cardiologi, Dermatologi e Ortopedici vicino a te." />
      </Head>

      <Navbar />

      <main style={{ flex: '1 0 auto', width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* INTESTAZIONE */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#0f172a', fontSize: '36px', fontWeight: '900', marginBottom: '15px' }}>
            Specialisti per Quartiere a Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6', fontWeight: '500' }}>
            Seleziona la tua zona per visualizzare i professionisti e i centri medici disponibili nel tuo quartiere.
          </p>
        </div>

        {/* GRID QUARTIERI */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px',
          marginBottom: '60px' 
        }}>
          {quartieri.map(q => (
            <div key={q} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '24px', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                color: '#0d9488', 
                fontSize: '20px', 
                fontWeight: '800',
                borderBottom: '2px solid #f0fdfa', 
                paddingBottom: '12px',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '10px' }}>📍</span> {q}
              </h3>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {specializzazioni.map(s => (
                  <li key={s.slug} style={{ marginBottom: '8px' }}>
                    <a 
                      href={`/${s.slug}-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                      style={{ 
                        color: '#475569', 
                        textDecoration: 'none', 
                        fontSize: '14px',
                        fontWeight: '600',
                        display: 'block',
                        padding: '4px 0'
                      }}
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
