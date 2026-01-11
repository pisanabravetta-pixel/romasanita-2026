import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';

export default function NutrizionistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const queryBusca = getDBQuery('nutrizionista'); 
      const { data, error } = await supabase.from('annunci').select('*').ilike('categoria', `%${queryBusca.cat}%`).eq('approvato', true).order('is_top', { ascending: false });
      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f7fee7', minHeight: '100vh' }}>
      <Head>
        <title>Nutrizionisti a Roma – Dieta e Benessere | ServiziSalute</title>
      </Head>
      <div style={{ backgroundColor: '#65a30d', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>🥗 NUTRIZIONISTI A ROMA</div>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#65a30d', textDecoration: 'none', fontWeight: '600' }}>← Tutte</a>
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #65a30d', marginBottom: '30px' }}>
          <h1 style={{ color: '#365314', fontSize: '32px', fontWeight: '800' }}>Nutrizionisti a Roma</h1>
          <p>Trova esperti in diete personalizzate ed educazione alimentare a Roma.</p>
        </div>
        {loading ? <p>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #65a30d' : '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#365314', margin: 0 }}>{v.nome}</h2>
            <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <a href={`tel:${v.telefono}`} style={{ display:'block', marginTop:'20px', backgroundColor: '#65a30d', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
          </div>
        ))}
      </main>
      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 0', textAlign: 'center' }}>© 2026 ServiziSalute</footer>
    </div>
  );
}
