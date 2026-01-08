import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../../lib/supabaseClient';

export default function PaginaDinamicaSalute() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("Servizi Sanitari Roma");

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      // 1. TRASFORMA LO SLUG IN FILTRI (es: dentisti-roma-prati)
      // Dividiamo le parole per capire categoria e zona
      const parti = slug.split('-'); 
      const categoriaCercata = parti[0].toUpperCase(); // Prende "DENTISTI"
      const zonaCercata = parti.length > 2 ? parti[parti.length - 1] : null; // Prende "prati" se esiste

      setTitolo(`${parti[0].charAt(0).toUpperCase() + parti[0].slice(1)} a Roma ${zonaCercata ? zonaCercata : ""}`);

      // 2. QUERY AL DATABASE
      let query = supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${categoriaCercata}%`); // Cerca la categoria

      if (zonaCercata) {
        query = query.ilike('zona', `%${zonaCercata}%`); // Cerca la zona se presente nell'URL
      }

      const { data, error } = await query.order('is_top', { ascending: false });

      if (!error && data) setServizi(data);
      setLoading(false);
    }

    fetchDati();
  }, [slug]);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Torna alla Home</a>
        
        <h1 style={{ color: '#1e40af', marginTop: '20px' }}>{titolo}</h1>
        <p style={{ color: '#64748b' }}>I migliori professionisti selezionati nella zona di {titolo.split('Roma')[1] || 'Roma'}.</p>

        {loading ? (
          <p>Caricamento in corso...</p>
        ) : servizi.length > 0 ? (
          servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', padding: '20px', borderRadius: '16px', 
              marginBottom: '15px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' 
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>{v.nome}</h3>
              <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} style={{ background: '#22c55e', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none' }}>WhatsApp</a>}
              </div>
            </div>
          ))
        ) : (
          <p>Nessun risultato trovato per questa zona. Prova a cercare in un quartiere limitrofo.</p>
        )}
      </main>
    </div>
  );
}
