import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';

export default function OrtopediciRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const queryBusca = getDBQuery('ortopedia'); 
      const { data, error } = await supabase.from('annunci').select('*').ilike('categoria', `%${queryBusca.cat}%`).eq('approvato', true).order('is_top', { ascending: false });
      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <Head>
        <title>Ortopedici a Roma – Chirurgia e Traumatologia | ServiziSalute</title>
      </Head>
      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>🦴 ORTOPEDIA A ROMA</div>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#059669', textDecoration: 'none', fontWeight: '600' }}>← Tutte</a>
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #059669', marginBottom: '30px' }}>
          <h1 style={{ color: '#064e3b', fontSize: '32px', fontWeight: '800' }}>Ortopedici a Roma</h1>
          <p>Specialisti in traumatologia e problemi articolari a Roma.</p>
        </div>
        {loading ? <p>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#064e3b', margin: 0 }}>{v.nome}</h2>
            <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <a href={`tel:${v.telefono}`} style={{ display:'block', marginTop:'20px', backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
          </div>
        ))}
      </main>
      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 0', textAlign: 'center' }}>© 2026 ServiziSalute</footer>
    </div>
  );
}
