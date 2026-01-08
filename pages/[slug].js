import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient'; // <--- CORRETTO: un solo ../

export default function PaginaDinamicaSalute() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("Servizi Sanitari Roma");

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        const parti = slug.split('-'); 
        // Se lo slug è "dentisti-roma-prati", parti[0] è "dentisti"
        const categoriaCercata = parti[0].toUpperCase();
        const zonaCercata = parti.length > 2 ? parti[parti.length - 1] : null;

        setTitolo(`${parti[0].charAt(0).toUpperCase() + parti[0].slice(1)} a Roma ${zonaCercata ? zonaCercata : ""}`);

        let query = supabase.from('annunci').select('*').eq('approvato', true);
        query = query.ilike('categoria', `%${categoriaCercata}%`);

        if (zonaCercata && zonaCercata.toLowerCase() !== 'roma') {
          query = query.ilike('zona', `%${zonaCercata}%`);
        }

        const { data, error } = await query.order('is_top', { ascending: false });
        if (data) setServizi(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <Head><title>{titolo} | ServiziSalute</title></Head>
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
        <h1 style={{ color: '#1e40af', marginTop: '20px' }}>{titolo}</h1>
        {loading ? <p>Caricamento...</p> : servizi.length > 0 ? (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', marginBottom: '15px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
              <h3>{v.nome}</h3>
              <p>📍 {v.indirizzo} — {v.zona}</p>
              <a href={`tel:${v.telefono}`} style={{ display: 'inline-block', background: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>Chiama</a>
            </div>
          ))
        ) : <p>Nessun risultato trovato.</p>}
      </main>
    </div>
  );
}
