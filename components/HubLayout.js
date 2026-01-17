import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';

export default function HubLayout({ 
  titolo, 
  categoria, 
  colore, 
  badgeSpec, 
  testoTopBar, 
  descrizioneMeta, 
  testoMiniSEO, 
  quartieri = [], 
  schemas = {},
  altreSpecialistiche = [] 
}) {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      if (!categoria) return;
      setLoading(true);
      
      const queryBusca = getDBQuery(categoria); 
      
      // La query elastica che ignora maiuscole e plurali
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .or(`categoria.ilike.%${queryBusca.root}%,specialistica.ilike.%${queryBusca.root}%,titolo.ilike.%${queryBusca.root}%`)
        .order('is_top', { ascending: false });
      
      if (data) setMedici(data);
      if (error) console.error("Errore Supabase:", error);
      setLoading(false);
    }
    fetchDocs();
  }, [categoria]);

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>{titolo} a Roma - ServiziSalute</title>
        <meta name="description" content={descrizioneMeta} />
        {schemas?.medical && <script type="application/ld+json">{JSON.stringify(schemas.medical)}</script>}
        {schemas?.faq && <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>}
      </Head>

      <div style={{ backgroundColor: '#111827', color: 'white', padding: '10px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        {testoTopBar}
      </div>

      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/" style={{ color: colore, textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← TORNA ALLA HOME
        </Link>
        <h1 style={{ fontSize: '32px', marginTop: '10px', color: '#111827' }}>{titolo}</h1>
        <p style={{ color: '#4b5563', maxWidth: '600px', margin: '15px auto' }}>{testoMiniSEO}</p>
      </div>

      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: 'auto' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Cerca per Quartiere:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        {loading ? (
          <p>Caricamento professionisti...</p>
        ) : medici.length > 0 ? (
          medici.map(m => (
            <div key={m.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: `2px solid ${m.is_top ? colore : '#e5e7eb'}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ backgroundColor: colore, color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {badgeSpec}
                </span>
                {m.is_top && <span style={{ color: colore, fontWeight: 'bold' }}>⭐ TOP</span>}
              </div>
              <h2 style={{ fontSize: '20px', margin: '10px 0' }}>{m.titolo}</h2>
              <p style={{ color: '#4b5563' }}>📍 {m.indirizzo} — {m.zona_quartiere}</p>
            </div>
          ))
        ) : (
          <p>Nessun professionista trovato in questa categoria.</p>
        )}
      </div>

      <div style={{ padding: '40px 20px', backgroundColor: 'white', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: 'auto' }}>
          <h3 style={{ marginBottom: '20px' }}>Altre Specialistiche a Roma</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
            {altreSpecialistiche.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#111827', textDecoration: 'none', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '50px', padding: '40px 20px', backgroundColor: '#111827', color: 'white', textAlign: 'center' }}>
        <p>© 2026 ServiziSalute Roma - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}
