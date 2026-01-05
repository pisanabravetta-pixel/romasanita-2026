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
        {/* NAVIGAZIONE SUPERIORE AGGIUNTA */}
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', fontSize: '14px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#059669' }}>Home</a>
          <span style={{ color: '#ccc' }}>/</span>
          <a href="/farmacie-roma" style={{ textDecoration: 'none', color: '#059669' }}>Tutte le Farmacie</a>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: '#64748b' }}>Roma Centro</span>
        </nav>

        <h1 style={{ color: '#065f46' }}>Farmacia Roma Centro</h1>
        
        {/* MENU RAPIDO ALTRE ZONE (Mancava!) */}
        <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #dcfce7' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>Altre zone:</span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Al momento solo Centro è disponibile.</span>
        </div>

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
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="tel:06000000" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama ora
                </a>
                {/* AGGIUNTO LINK DI RITORNO RAPIDO SUL SINGOLO BOX */}
                <a href="/servizi-sanitari-roma" style={{ border: '1px solid #10b981', color: '#10b981', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Mappa Servizi
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessuna farmacia nel Centro Storico nel database.</p>
        )}
      </div>
    </div>
  );
}
