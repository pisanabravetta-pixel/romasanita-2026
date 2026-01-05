import React from 'react';
import Head from 'next/head'; // Aggiunto per SEO
import { DENTISTI } from '../database';

export default function DentistiRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Dentisti a Roma | Studi Odontoiatrici per Quartiere</title>
      </Head>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* LINK DI RITORNO (Mancava) */}
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#1e3a8a' }}>Dentisti a Roma</h1>
        <p style={{ marginBottom: '25px', color: '#64748b' }}>Trova i migliori studi dentistici selezionati nei quartieri di Roma.</p>

        {/* MENU RAPIDO QUARTIERI (Mancava - Fondamentale per i link interni) */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', width: '100%' }}>Cerca per zona:</span>
          <a href="/dentisti-roma-prati" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '5px 12px', borderRadius: '20px' }}>Prati</a>
          <a href="/dentisti-roma-eur" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '5px 12px', borderRadius: '20px' }}>EUR</a>
          <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '5px 12px', borderRadius: '20px' }}>San Giovanni</a>
        </div>
        
        {/* LISTA AUTOMATICA */}
        {DENTISTI.map((studio) => (
          <div key={studio.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: studio.isTop ? '2px solid #2563eb' : '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 'bold' }}>Zona {studio.zona}</span>
            <h3 style={{ margin: '5px 0' }}>{studio.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {studio.indirizzo}</p>
            <a href={studio.slug} style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginTop: '10px' }}>
              Vedi studio →
            </a>
          </div>
        ))}

        <div style={{ marginTop: '40px', textAlign: 'center', padding: '30px', backgroundColor: '#fff', border: '2px dashed #cbd5e1', borderRadius: '15px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Sei un dentista a Roma?</h3>
          <p style={{ fontSize: '14px', marginBottom: '20px' }}>Aumenta la tua visibilità, pubblica il tuo studio gratuitamente.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Aggiungi il tuo studio</a>
        </div>
      </div>
    </div>
  );
}
