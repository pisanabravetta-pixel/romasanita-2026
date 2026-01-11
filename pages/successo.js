import React from 'react';
import Head from 'next/head';

export default function Successo() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'system-ui' }}>
      <Head><title>Operazione Completata | ServiziSalute</title></Head>
      <div style={{ fontSize: '60px' }}>✅</div>
      <h1 style={{ color: '#2d3748' }}>Richiesta Inviata con Successo!</h1>
      <p style={{ color: '#718096', maxWidth: '500px', margin: '20px auto' }}>
        Grazie per aver scelto ServiziSalute. Il nostro team verificherà i dati e l'annuncio sarà online entro 24 ore.
      </p>
      <a href="/" style={{ display: 'inline-block', backgroundColor: '#3182ce', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
        Torna alla Home
      </a>
    </div>
  );
}
