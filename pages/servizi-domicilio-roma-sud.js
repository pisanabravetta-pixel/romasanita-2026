import React from 'react';
import Head from 'next/head';
import { DOMICILIO } from '../database';

export default function ServiziDomicilioRomaSud() {
  const serviziSud = DOMICILIO.filter(s => s.zona === "Roma Sud");

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdf2f2', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Servizi a Domicilio Roma Sud | Assistenza Casa</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/servizi-domicilio-roma" style={{ textDecoration: 'none', color: '#dc2626', fontWeight: 'bold' }}>← Torna a Domicilio Roma</a>
        </nav>

        <h1 style={{ color: '#991b1b' }}>Assistenza a Domicilio Roma Sud</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Servizi sanitari professionali attivi nei quartieri di Roma Sud.</p>
        
        {serviziSud.length > 0 ? (
          serviziSud.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #fee2e2',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#991b1b' }}>{s.nome}</h3>
              <p style={{ margin: '5px 0' }}>📍 Operativi in: {s.zona}</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>🩺 Servizio: {s.info}</p>
              <div style={{ marginTop: '20px' }}>
                <a href="https://wa.me/39" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Richiedi Assistenza
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun servizio a domicilio per Roma Sud nel database.</p>
        )}
      </div>
    </div>
  );
}
