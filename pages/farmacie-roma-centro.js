import React from 'react';
import Head from 'next/head';
import { FARMACIE } from '../database';

export default function FarmacieRomaCentro() {
  const farmacieCentro = FARMACIE.filter(f => f.zona === "Centro");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f0fdf4', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Farmacie Roma Centro | Orari e Servizi Centro Storico</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/farmacie-roma" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>← Tutte le Farmacie</a>
        </nav>

        <h1 style={{ color: '#065f46' }}>Farmacia Roma Centro</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Le farmacie di riferimento nel Centro Storico di Roma.</p>
        
        {farmacieCentro.length > 0 ? (
          farmacieCentro.map((f) => (
            <div key={f.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #dcfce7',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#065f46' }}>{f.nome}</h3>
              <p style={{ margin: '5px 0' }}>📍 {f.indirizzo}</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>✨ Servizi: {f.info}</p>
              <div style={{ marginTop: '20px' }}>
                <a href="tel:06000000" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Farmacia
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessuna farmacia nel Centro Storico inserita nel database.</p>
        )}
      </div>
    </div>
  );
}
