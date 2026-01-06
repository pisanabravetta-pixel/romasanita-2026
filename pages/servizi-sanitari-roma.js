import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function MappaServizi() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnunci();
  }, []);

  async function fetchAnnunci() {
    const { data, error } = await supabase
      .from('annunci')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore:', error);
    } else {
      setAnnunci(data);
    }
    setLoading(false);
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Servizi Sanitari Roma | Ricerca Specialisti</title>
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute</a>
          <a href="/" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: 'bold' }}>← Torna alla Home</a>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', borderBottom: '3px solid #3b82f6', paddingBottom: '15px', display: 'inline-block' }}>
          Specialisti a Roma
        </h1>
        
        {loading ? (
          <p style={{ marginTop: '20px' }}>Caricamento specialisti...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '40px' }}>
            {annunci.map((annuncio) => (
              <div key={annuncio.id} style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <span style={{ backgroundColor: '#dbeafe', color: '#2563eb', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {annuncio.categoria}
                </span>
                <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: '15px 0 5px 0' }}>{annuncio.nome}</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>📍 Zona: <strong>{annuncio.zona}</strong></p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.5', minHeight: '45px' }}>{annuncio.descrizione}</p>
                
                <a href={`https://wa.me/${annuncio.whatsapp}`} target="_blank" rel="noreferrer" 
                   style={{ display: 'block', textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', marginTop: '20px' }}>
                  Contatta via WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}

        {annunci.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#64748b' }}>Nessun professionista ancora iscritto in questa sezione.</p>
            <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold' }}>Sii il primo!</a>
          </div>
        )}

        {/* BANNER PROFESSIONISTI */}
        <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#eff6ff', borderRadius: '20px', textAlign: 'center', border: '1px solid #dbeafe' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a', fontSize: '24px' }}>Sei un professionista?</h3>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginTop: '10px' }}>
            Pubblica il tuo annuncio gratis
          </a>
        </div>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '40px 0', marginTop: '80px', textAlign: 'center' }}>
         <p style={{ fontSize: '12px', color: '#94a3b8' }}>© 2026 ServiziSalute Roma</p>
      </footer>
    </div>
  );
}
