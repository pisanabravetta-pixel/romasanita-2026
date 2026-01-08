import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, formatZona, generateSchema } from '../lib/seo-logic';

export default function ZonaMaster() {
  const router = useRouter();
  const { categoria, zona } = router.query;
  const [dati, setDati] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoria || !zona) return;

    async function fetchLocalData() {
      const querySearch = getDBQuery(categoria);
      
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', querySearch) // Filtro categoria blindato
        .ilike('zona', `%${zona}%`)      // Filtro zona blindato (es: "prati" trova "Roma Prati")
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setDati(data);
      setLoading(false);
    }
    fetchLocalData();
  }, [categoria, zona]);

  if (!categoria || !zona) return null;

  const nomeCategoria = formatZona(categoria);
  const nomeZona = formatZona(zona);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>{`${nomeCategoria} a Roma ${nomeZona} | Migliori Studi e Contatti`}</title>
        <meta name="description" content={`Cerchi ${nomeCategoria} a Roma in zona ${nomeZona}? Consulta l'elenco dei professionisti, orari e contatti diretti su ServiziSalute.`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema(nomeCategoria, nomeZona)) }}
        />
      </Head>

      <header style={{ background: 'white', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <a href="/" style={{ fontWeight: '800', color: '#3b82f6', textDecoration: 'none' }}>ServiziSalute Roma</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '15px' }}>
          <a href={`/${categoria}-roma`} style={{ textDecoration: 'none', color: '#3b82f6', fontSize: '14px' }}>
            ← Torna a {nomeCategoria} Roma
          </a>
        </nav>

        <h1 style={{ color: '#1e40af', fontSize: '28px' }}>{nomeCategoria} a Roma {nomeZona}</h1>
        <p style={{ color: '#475569', lineHeight: '1.6' }}>
          Trova i migliori professionisti per <strong>{nomeCategoria}</strong> operanti nel quartiere <strong>{nomeZona}</strong>. Contatta direttamente lo studio per info e appuntamenti.
        </p>

        {loading ? (
          <p>Ricerca in corso a {nomeZona}...</p>
        ) : dati.length > 0 ? (
          dati.map((v) => (
            <div key={v.id} style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' }}>{v.categoria}</span>
              <h3 style={{ margin: '5px 0', color: '#1e3a8a' }}>{v.nome}</h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>📍 {v.indirizzo}</p>
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '30px', background: '#fff', borderRadius: '12px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessun risultato trovato per {nomeCategoria} a {nomeZona}.</p>
            <a href="/pubblica-annuncio" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Sei un professionista in questa zona? Registrati gratis</a>
          </div>
        )}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
          <p><strong>Disclaimer Medico:</strong> Le informazioni su ServiziSalute Roma sono a scopo informativo. Non costituiscono diagnosi o prescrizione. Rivolgersi sempre a personale medico qualificato.</p>
        </footer>
      </main>
    </div>
  );
}
