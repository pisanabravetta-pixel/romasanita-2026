import React from 'react';
import Head from 'next/head';

export default function Disclaimer() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Head>
        <title>Disclaimer Legale | ServiziSalute Roma</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      {/* HEADER GLOBALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Torna alla Home</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', lineHeight: '1.8' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>
        
        <h1 style={{ fontSize: '32px', color: '#dc2626', marginBottom: '20px', borderBottom: '4px solid #fecaca', paddingBottom: '10px', display: 'inline-block' }}>
          Disclaimer Legale
        </h1>
        
        <div style={{ color: '#475569', fontSize: '16px' }}>
          <p><strong>ServiziSalute</strong> è un portale di annunci e informazione dedicato esclusivamente alla visibilità dei servizi sanitari privati e locali nella città di Roma.</p>
          
          <p>È importante sottolineare che:</p>
          
          <ul style={{ paddingLeft: '20px', marginBottom: '30px' }}>
