import React from 'react';
import Head from 'next/head';
import { DIAGNOSTICA } from '../database';

export default function DiagnosticaRomaNord() {
  const centriNord = DIAGNOSTICA.filter(d => d.zona === "Roma Nord");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Diagnostica Roma Nord | Centri e Laboratori</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/diagnostica-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Torna a Diagnostica Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a' }}>Diagnostica a Roma Nord</h1>
        
        {centriNord.length > 0 ? (
          centriNord.map((d) => (
            <div key={d.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>{d.nome}</h3>
              <p style={{ margin: '5px 0' }}>📍 {d.indirizzo}</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>🩺 Servizi: {d.info}</p>
              <div style={{ marginTop: '20px' }}>
                <a href="https://wa.me/39" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Prenota Esame
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun centro a Roma Nord presente nel database.</p>
        )}
      </div>
    </div>
  );
}
