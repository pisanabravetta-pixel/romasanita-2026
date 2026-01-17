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
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .or(`categoria.ilike.%${queryBusca.root}%,specialistica.ilike.%${queryBusca.root}%,titolo.ilike.%${queryBusca.root}%`)
        .order('is_top', { ascending: false });
      
      if (data) setMedici(data);
      setLoading(false);
    }
    fetchDocs();
  }, [categoria]);

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>{titolo} a Roma - ServiziSalute</title>
        <meta name="description" content={descrizioneMeta} />
        {schemas?.medical && <script type="application/ld+json">{JSON.stringify(schemas.medical)}</script>}
        {schemas?.faq && <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>}
      </Head>

      {/* BARRA SUPERIORE (Istruzione 2026-01-11) */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '12px', textAlign: 'center', fontSize: '14px' }}>
        <strong>{testoTopBar}</strong>
      </div>

      {/* HEADER CON RITORNO */}
      <div style={{ padding: '30px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: colore, textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← TORNA A TUTTE LE SPECIALISTICHE
        </Link>
        <h1 style={{ fontSize: '36px', marginTop: '15px', fontWeight: '800', color: '#111827' }}>{titolo}</h1>
        <p style={{ color: '#4b5563', maxWidth: '700px', margin: '15px auto', fontSize: '18px', lineHeight: '1.6' }}>
          {testoMiniSEO}
        </p>
      </div>

      {/* CERCA PER QUARTIERE (Link Rapidi) */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', color: '#111827' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white', fontWeight: '500', transition: 'all 0.2s' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA MEDICI DISPONIBILI */}
      <div style={{ padding: '20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '20px', color: '#111827' }}>Professionisti Disponibili</h2>
        {loading ? (
          <p>Caricamento...</p>
        ) : medici.length > 0 ? (
          medici.map(m => (
            <div key={m.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', marginBottom: '20px', border: m.is_top ? `2px solid ${colore}` : '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ backgroundColor: colore, color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {badgeSpec}
                </span>
                {m.is_top && <span style={{ color: colore, fontWeight: 'bold', fontSize: '14px' }}>⭐ RACCOMANDATO</span>}
              </div>
              <h3 style={{ fontSize: '22px', margin: '15px 0 5px 0' }}>{m.titolo}</h3>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '15px' }}>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
              <button style={{ backgroundColor: colore, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Contatta Professionista
              </button>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '15px' }}>
            <p>Nessun annuncio trovato per questa categoria.</p>
          </div>
        )}
      </div>

      {/* ALTRE SPECIALISTICHE (Cross-linking) */}
      <div style={{ padding: '60px 20px', backgroundColor: 'white', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <h2 style={{ marginBottom: '30px', fontSize: '24px' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {altreSpecialistiche.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#111827', textDecoration: 'none', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center', fontWeight: '600', backgroundColor: '#f9fafb' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER (Identico alla home) */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>ServiziSalute Roma</h4>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>Il portale di riferimento per la sanità privata a Roma. Trova lo specialista più vicino a te.</p>
          </div>
          <div style={{ border: '1px solid #374151', padding: '15px', borderRadius: '8px' }}>
             <p style={{ fontSize: '12px' }}>Ad Box</p>
          </div>
          <div style={{ border: '1px solid #374151', padding: '15px', borderRadius: '8px' }}>
             <p style={{ fontSize: '12px' }}>CTA Box</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#6b7280', fontSize: '14px' }}>© 2026 Diagnostica Roma - Riproduzione Riservata</p>
      </footer>
    </div>
  );
}
