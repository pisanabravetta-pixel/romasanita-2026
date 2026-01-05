import React from 'react';
import Head from 'next/head';
import { DOMICILIO } from '../database';

export default function ServiziDomicilioRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdf2f2', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Servizi Sanitari a Domicilio Roma | Infermieri e Visite</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#dc2626', fontWeight: 'bold' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#991b1b' }}>Servizi a Domicilio a Roma</h1>
        <p style={{ marginBottom: '25px' }}>Assistenza infermieristica, fisioterapia e visite mediche direttamente a casa tua.</p>
        
        {/* NAVIGAZIONE QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #fee2e2' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '10px' }}>Filtra per zona:</span>
          <a href="/servizi-domicilio-roma-sud" style={{ color: '#dc2626', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>Roma Sud</a>
        </div>

        {DOMICILIO.length > 0 ? DOMICILIO.map((s) => (
          <div key={s.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: s.isTop ? '2px solid #dc2626' : '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Copertura: {s.zona}</span>
            <h3 style={{ margin: '5px 0', color: '#991b1b' }}>{s.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {s.indirizzo}</p>
            <p style={{ fontSize: '13px', color: '#dc2626' }}>🩺 {s.info}</p>
            <a href={s.slug} style={{ display: 'inline-block', marginTop: '10px', color: '#dc2626', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
              Vedi dettagli servizio →
            </a>
          </div>
        )) : <p>Ricerca servizi a domicilio...</p>}
      </div>
    </div>
  );
}
