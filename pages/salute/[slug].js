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
    // Se lo slug non è ancora disponibile (Next.js sta caricando), non fare nulla
    if (!slug) return;

    async function fetchDati() {
      try {
        const parti = slug.split('-'); 
        const categoriaCercata = parti[0].toUpperCase();
        // Cerchiamo l'ultima parte dello slug come zona (es: prati)
        const zonaCercata = parti.length > 2 ? parti[parti.length - 1] : null;

        setTitolo(`${parti[0].charAt(0).toUpperCase() + parti[0].slice(1)} a Roma ${zonaCercata ? zonaCercata : ""}`);

        let query = supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true);

        // Filtro Categoria
        query = query.ilike('categoria', `%${categoriaCercata}%`);

        // Filtro Zona (se presente)
        if (zonaCercata && zonaCercata !== 'roma') {
          query = query.ilike('zona', `%${zonaCercata}%`);
        }

        const { data, error } = await query.order('is_top', { ascending: false });

        if (error) throw error;
        if (data) setServizi(data);
      } catch (err) {
        console.error("Errore caricamento dati:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDati();
  }, [slug]);

  // Se Next.js non ha ancora letto l'URL, mostriamo un caricamento invece della pagina bianca
  if (!slug) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Inizializzazione...</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
        
        <h1 style={{ color: '#1e40af', marginTop: '20px', fontSize: '28px' }}>{titolo}</h1>
        
        {loading ? (
          <p>Ricerca professionisti in corso...</p>
        ) : servizi.length > 0 ? (
          servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', padding: '25px', borderRadius: '24px', 
              marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
              <p style={{ color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Nessun risultato trovato per <strong>{titolo}</strong>.</p>
            <p>Stiamo aggiornando il database con nuovi professionisti.</p>
          </div>
        )}
      </main>
    </div>
  );
}
