import React from 'react';
import Head from 'next/head';
import { FARMACIE } from '../database';

export default function FarmacieRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Farmacie a Roma | Orari e Servizi in tutti i Quartieri</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#065f46' }}>Farmacie a Roma</h1>
        <p style={{ marginBottom: '25px' }}>Trova le farmacie di turno e i servizi sanitari nel tuo quartiere.</p>
        
        {/* NAVIGAZIONE QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #dcfce7' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '10px' }}>Seleziona Zona:</span>
          <a href="/farmacie-roma-centro" style={{ color: '#059669', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>Roma Centro</a>
        </div>

        {FARMACIE.map((f) => (
          <div key={f.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: f.isTop ? '2px solid #10b981' : '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Quartiere: {f.zona}</span>
            <h3 style={{ margin: '5px 0', color: '#065f46' }}>{f.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {f.indirizzo}</p>
            <p style={{ fontSize: '13px', color: '#059669' }}>💊 {f.info}</p>
            <a href={f.slug} style={{ display: 'inline-block', marginTop: '10px', color: '#10b981', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
              Dettagli e Orari →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
