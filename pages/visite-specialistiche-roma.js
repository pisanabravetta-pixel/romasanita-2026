import React from 'react';
import Head from 'next/head';
import { VISITE } from '../database';

export default function VisiteSpecialisticheRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Visite Specialistiche Roma | Prenota il tuo Medico Specialista</title>
        <meta name="description" content="Trova i migliori medici specialisti a Roma. Prenota visite cardiologiche, dermatologiche e molto altro nei principali quartieri della Capitale." />
      </Head>

      {/* HEADER PROFESSIONALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#3b82f6', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold', fontSize: '14px' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Visite Specialistiche a Roma</h1>
        <p style={{ marginBottom: '30px', color: '#64748b' }}>Trova e contatta i migliori medici specialisti vicino a te.</p>
        
        {/* MENU RAPIDO SPECIALIZZAZIONI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '35px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e40af', display: 'block', marginBottom: '12px' }}>Filtra per specialità:</span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/cardiologi-roma" style={{ color: '#3b82f6', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '6px 15px', borderRadius: '20px', border: '1px solid #dbeafe', fontWeight: '500' }}>
              Cardiologia
            </a>
            <span style={{ color: '#cbd5e1', fontSize: '13px', padding: '6px 0' }}>Altre specialità in arrivo...</span>
          </div>
        </div>

        {/* LISTA MEDICI DAL DATABASE */}
        {VISITE.length > 0 ? (
          VISITE.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: v.isTop ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: '800', backgroundColor: '#eff6ff', padding: '3px 10px', borderRadius: '4px' }}>
                    {v.info}
                  </span>
                  <h3 style={{ margin: '12px 0 5px 0', color: '#1e3a8a', fontSize: '20px' }}>{v.nome}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>📍 {v.indirizzo} ({v.zona})</p>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
                <a href={v.slug} style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#3b82f6', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Dettagli
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessuna visita specialistica inserita al momento.</p>
          </div>
        )}

        {/* SEZIONE PER MEDICI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px', backgroundColor: '#fff', border: '2px dashed #3b82f6', borderRadius: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Sei un Medico Specialista?</h3>
          <p style={{ fontSize: '15px', marginBottom: '25px', color: '#64748b' }}>Aumenta la tua visibilità a Roma e ricevi contatti diretti dai pazienti.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Inserisci il tuo studio gratis</a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1e293b', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Network Medici Specialisti</p>
      </footer>
    </div>
  );
}
