import React from 'react';
import { DENTISTI } from '../database'; // <--- Carichiamo il database

export default function DentistiRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#1e3a8a' }}>Dentisti a Roma</h1>
        
        {/* LOGICA AUTOMATICA: Crea i box prendendo i dati dal database */}
        {DENTISTI.map((studio) => (
          <div key={studio.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '15px', 
            border: studio.isTop ? '2px solid #2563eb' : '1px solid #e2e8f0' 
          }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Quartiere {studio.zona}</span>
            <h3 style={{ margin: '5px 0' }}>{studio.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {studio.indirizzo}</p>
            <a href={studio.slug} style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
              Vedi dettagli →
            </a>
          </div>
        ))}

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', border: '2px dashed #cbd5e1' }}>
          <a href="/pubblica-annuncio">Sei un dentista? Aggiungi il tuo studio</a>
        </div>
      </div>
    </div>
  );
}
