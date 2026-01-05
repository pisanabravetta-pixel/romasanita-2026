import React from 'react';
import Head from 'next/head';
import { VISITE } from '../database';

export default function VisiteSpecialisticheRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Visite Specialistiche Roma | Prenota il tuo Medico</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold' }}>← Home</a>
        </nav>

        <h1 style={{ color: '#1e40af' }}>Visite Specialistiche a Roma</h1>
        <p style={{ marginBottom: '25px', color: '#64748b' }}>Trova i migliori medici specialisti vicino a te.</p>
        
        {/* MENU RAPIDO SPECIALIZZAZIONI */}
        <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', width: '100%' }}>Filtra per specialità:</span>
          <a href="/cardiologi-roma" style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '5px 12px', borderRadius: '20px' }}>Cardiologia</a>
          {/* Qui potrai aggiungere /dermatologi-roma ecc. quando avrai i file */}
        </div>

        {VISITE.length > 0 ? VISITE.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: v.isTop ? '2px solid #3b82f6' : '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: 'bold', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                  {v.info}
                </span>
                <h3 style={{ margin: '8px 0 5px 0', color: '#1e3a8a' }}>{v.nome}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>📍 {v.indirizzo} ({v.zona})</p>
              </div>
            </div>
            <a href={v.slug} style={{ display: 'inline-block', marginTop: '15px', color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
              Dettagli e Prenotazione →
            </a>
          </div>
        )) : (
          <p>Nessuna visita specialistica inserita al momento.</p>
        )}
      </div>
    </div>
  );
}
