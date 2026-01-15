import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HubDermatologiRoma() {
  const quartieri = [
    "Prati", "Eur", "Appio Latino", "Trastevere", "Monteverde", 
    "Parioli", "Ostiense", "San Giovanni", "Talenti", "Flaminio"
  ];

  const specialistiche = [
    { nome: "Cardiologi Roma", link: "/cardiologi-roma" },
    { nome: "Ginecologi Roma", link: "/ginecologi-roma" },
    { nome: "Ortopedici Roma", link: "/ortopedici-roma" },
    { nome: "Dentisti Roma", link: "/dentisti-roma" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Migliori Dermatologi a Roma: Prenota Visita Online 2026</title>
        <meta name="description" content="Cerca il miglior dermatologo a Roma per quartiere. Leggi le recensioni e prenota la tua visita." />
      </Head>

      <Navbar />

      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#f1f5f9', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Dermatologia Roma</span>
          <a href="/specialistiche" style={{ color: '#0891b2', fontSize: '14px', fontWeight: '600' }}>← Tutte le specialistiche</a>
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '1100px', margin: '40px auto', padding: '0 20px', width: '100%' }}>
        
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#164e63', marginBottom: '15px' }}>
          Dermatologi a Roma
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '40px', maxWidth: '800px' }}>
          Trova lo specialista della pelle più vicino a te. Abbiamo selezionato i migliori professionisti di Roma per mappatura nei, acne, psoriasi e trattamenti estetici.
        </p>

        {/* SEZIONE QUARTIERI (Cerca per Quartiere) */}
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Cerca per Quartiere</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
            {quartieri.map((q) => (
              <a 
                key={q} 
                href={`/dermatologi-roma/${q.toLowerCase().replace(' ', '-')}`}
                style={{ 
                  padding: '12px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '10px', 
                  textAlign: 'center', 
                  textDecoration: 'none', 
                  color: '#0891b2', 
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {q}
              </a>
            ))}
          </div>
        </section>

        {/* LISTA DERMATOLOGI (Esempio) */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Dermatologi disponibili</h2>
          <div style={{ backgroundColor: '#f8fafc', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '2px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Caricamento medici in corso...</p>
          </div>
        </section>

        {/* CROSS-LINKING ALTRE SPECIALISTICHE */}
        <section style={{ marginBottom: '60px', padding: '30px', backgroundColor: '#f8fafc', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {specialistiche.map((s) => (
              <a 
                key={s.nome} 
                href={s.link}
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '20px', 
                  color: '#475569', 
                  textDecoration: 'none', 
                  fontSize: '14px' 
                }}
              >
                {s.nome}
              </a>
            ))}
          </div>
        </section>

        {/* FAQ VELOCI */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Domande Frequenti</h2>
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <p><strong>Serve l'impegnativa per una visita privata?</strong><br /> No, per le visite presso i dermatologi privati presenti sul portale non è necessaria l'impegnativa del medico di base.</p>
          </div>
        </section>

      </main>

      {/* FOOTER INTEGRALE (Come richiesto) */}
      <Footer />
    </div>
  );
}
