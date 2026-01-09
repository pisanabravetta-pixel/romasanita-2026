import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PaginaQuartiereDinamica() {
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
        const parti = slug.split('-'); // es: farmacie, roma, prati
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

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
      <Head><title>{meta.titolo} | ServiziSalute</title></Head>
      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, marginTop: '20px' }}>
          <h1 style={{ color: tema.primario, margin: '0' }}>{meta.titolo}</h1>
        </div>
        {/* MAPPA ANNUNCI E FOOTER UGUALE A SOPRA */}
        {/* ... (inserire lista servizi e footer identico a farmacie-roma.js) ... */}
      </main>
    </div>
  );
}
