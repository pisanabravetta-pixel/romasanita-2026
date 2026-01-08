import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, formatZona, generateSchema } from '../lib/seo-logic';

export default function CategoriaMaster() {
  const router = useRouter();
  const { categoria } = router.query;
  const [dati, setDati] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoria) return;

    async function fetchData() {
      const querySearch = getDBQuery(categoria);
      
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', querySearch) // Filtro blindato maiuscole/minuscole
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setDati(data);
      setLoading(false);
    }
    fetchData();
  }, [categoria]);

  if (!categoria) return null;

  const nomeCategoria = formatZona(categoria); // Es: "Dentisti"

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>{`${nomeCategoria} a Roma | Prenota su ServiziSalute`}</title>
        <meta name="description" content={`Trova i migliori professionisti in ${nomeCategoria} a Roma. Contatti diretti, indirizzi e orari aggiornati.`} />
        {/* SCHEMA.ORG INVISIBILE PER GOOGLE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema(nomeCategoria, 'Roma')) }}
        />
      </Head>

      <header style={{ background: 'white', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <a href="/" style={{ fontWeight: '800', color: '#3b82f6', textDecoration: 'none' }}>ServiziSalute Roma</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1e40af' }}>{nomeCategoria} a Roma</h1>
        <p style={{ color: '#475569', marginBottom: '30px' }}>
          Elenco completo dei professionisti e delle strutture per <strong>{nomeCategoria}</strong> in tutta la Capitale.
        </p>

        {/* LINK ALLE ZONE (SEO) */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['centro', 'prati', 'eur', 'nord', 'sud'].map((zona) => (
            <a key={zona} href={`/${categoria}-roma-${zona}`} style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', border: '1px solid #dbeafe' }}>
              {nomeCategoria} Roma {zona.charAt(0).toUpperCase() + zona.slice(1)}
            </a>
          ))}
        </div>

        {loading ? <p>Caricamento...</p> : dati.map((v) => (
          <div key={v.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>📍 {v.indirizzo} ({v.zona})</p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <a href={`tel:${v.telefono}`} style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp}`} style={{ color: '#22c55e', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        ))}

        {/* DISCLAIMER FISSO IN OGNI PAGINA */}
        <footer style={{ marginTop: '50px', padding: '20px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#94a3b8' }}>
          <strong>Disclaimer:</strong> ServiziSalute è un portale informativo. Le informazioni non sostituiscono il parere medico. In caso di emergenza chiamare il 118.
        </footer>
      </main>
    </div>
  );
}
