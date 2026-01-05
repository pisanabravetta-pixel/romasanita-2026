import React from 'react';
import Head from 'next/head';
import { VISITE } from '../database';

export default function CardiologiRoma() {
  // Filtriamo dal database solo quelli che si occupano di cardiologia
  const cardiologi = VISITE.filter(v => v.info.toLowerCase().includes("cardio"));

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Cardiologi a Roma | Prenota Visita Specialistica</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Home</a>
          <span style={{ margin: '0 10px', color: '#ccc' }}>/</span>
          <a href="/visite-specialistiche-roma" style={{ textDecoration: 'none', color: '#64748b' }}>Tutte le Visite</a>
        </nav>

        <h1 style={{ color: '#1e3a8a' }}>Cardiologi a Roma</h1>
        
        {/* MENU RAPIDO QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '10px' }}>Cerca per quartiere:</span>
          <a href="/cardiologi-roma-prati" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>Prati</a>
        </div>

        {cardiologi.length > 0 ? cardiologi.map((c) => (
          <div key={c.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: c.isTop ? '2px solid #2563eb' : '1px solid #e2e8f0' 
          }}>
            <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>{c.zona}</span>
            <h3 style={{ margin: '5px 0' }}>{c.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {c.indirizzo}</p>
            <a href={c.slug} style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
              Vedi profilo e zona →
            </a>
          </div>
        )) : <p>Nessun cardiologo trovato nel database.</p>}
      </div>
    </div>
  );
}
