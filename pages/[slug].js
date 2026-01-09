import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PaginaQuartiere() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "" });
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        // ESEMPIO SLUG: "farmacie-roma-prati"
        const parti = slug.split('-'); 
        const catSlug = parti[0]; // farmacie
        const zonaSlug = parti[parti.length - 1]; // prati

        let nomeCat = "Specialisti";
        if (catSlug.includes('farmac')) {
          setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE' });
          nomeCat = "Farmacie";
        } else if (catSlug.includes('dentist')) {
          setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'DENTISTI' });
          nomeCat = "Dentisti";
        }

        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
        setMeta({ titolo: `${nomeCat} a Roma ${zonaBella}`, zona: zonaBella });

        // QUERY RINFORZATA: Cerchiamo la categoria corretta NELLA zona corretta
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${catSlug}%`)
          .ilike('zona', `%${zonaSlug}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head><title>{meta.titolo} | ServiziSalute Roma</title></Head>
      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>
        
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', marginTop: '10px' }}>Elenco dei professionisti verificati in zona {meta.zona}.</p>
        </div>

        {loading ? <p>Caricamento...</p> : servizi.length === 0 ? <p style={{textAlign:'center', padding:'50px'}}>Nessun annuncio trovato per questa ricerca.</p> : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', margin: '20px 0', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: tema.primario, margin: '0' }}>{v.nome}</h2>
              <p style={{ fontSize: '17px', margin: '15px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
