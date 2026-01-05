import React from 'react';
import Head from 'next/head';
import { DIAGNOSTICA } from '../database';

export default function DiagnosticaRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Centri Diagnostici a Roma | Esami e Analisi</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#1e3a8a' }}>Diagnostica a Roma</h1>
        <p style={{ marginBottom: '25px' }}>Centri specializzati in ecografie, radiografie e analisi cliniche.</p>
        
        {/* NAVIGAZIONE QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '10px' }}>Filtra per zona:</span>
          <a href="/diagnostica-roma-nord" style={{ color: '#2563eb', fontSize: '14px', textDecoration: 'none' }}>Roma Nord</a>
        </div>

        {DIAGNOSTICA.length > 0 ? DIAGNOSTICA.map((d) => (
          <div key={d.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: d.isTop ? '2px solid #2563eb' : '1px solid #e2e8f0' 
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>{d.zona}</span>
            <h3 style={{ margin: '5px 0' }}>{d.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {d.indirizzo}</p>
            <p style={{ fontSize: '13px', color: '#1e3a8a' }}>ℹ️ {d.info}</p>
            <a href={d.slug} style={{ display: 'inline-block', marginTop: '10px', color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
              Dettagli centro →
            </a>
          </div>
        )) : <p>Caricamento centri diagnostici...</p>}
      </div>
    </div>
  );
}
