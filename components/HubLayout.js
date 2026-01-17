import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';

export default function HubLayout({ 
  titolo, categoria, colore, badgeSpec, testoTopBar, 
  descrizioneMeta, testoMiniSEO, quartieri = [], schemas = {}, altreSpecialistiche = [] 
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
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: '#1e293b' }}>
      <Head>
        <title>{titolo} a Roma - ServiziSalute</title>
        <meta name="description" content={descrizioneMeta} />
        {schemas?.medical && <script type="application/ld+json">{JSON.stringify(schemas.medical)}</script>}
        {schemas?.faq && <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>}
      </Head>

      {/* TOP BAR - ULTRA BOLD */}
      <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '14px', textAlign: 'center', fontSize: '13px', letterSpacing: '1px' }}>
        <span style={{ fontWeight: '900', textTransform: 'uppercase' }}>{testoTopBar}</span>
      </div>

      {/* HEADER HUB - STRUTTURA DIAGNOSTICA ROMA */}
      <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: colore, textDecoration: 'none', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ← TUTTE LE SPECIALISTICHE
        </Link>
        <h1 style={{ fontSize: '48px', color: '#0f172a', fontWeight: '900', marginTop: '25px', marginBottom: '20px', letterSpacing: '-1.5px', lineHeight: '1' }}>
          {titolo}
        </h1>
        <p style={{ color: '#64748b', maxWidth: '750px', margin: 'auto', fontSize: '19px', lineHeight: '1.7', fontWeight: '400' }}>
          {testoMiniSEO}
        </p>
      </div>

      {/* CERCA PER QUARTIERE - GRID PROFESSIONALE */}
      <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: 'auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', color: '#1e293b', backgroundColor: 'white', fontWeight: '700', fontSize: '15px', transition: 'all 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA MEDICI - BOX CON SHADOWS PROFESSIONALI */}
      <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '35px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Professionisti in evidenza</h2>
        {loading ? <p>Caricamento dati...</p> : medici.map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '30px', border: m.is_top ? `2px solid ${colore}` : '1px solid #e2e8f0', boxShadow: m.is_top ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' : '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ backgroundColor: colore, color: 'white', padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}>{badgeSpec}</span>
              {m.is_top && <span style={{ color: colore, fontWeight: '900', fontSize: '13px' }}>⭐ TOP SPECIALISTA</span>}
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>{m.titolo}</h3>
            <p style={{ color: '#475569', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span> {m.indirizzo} — <strong style={{ color: '#0f172a' }}>{m.zona_quartiere}</strong>
            </p>
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
               <button style={{ backgroundColor: colore, color: 'white', border: 'none', padding: '16px 32px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '15px', boxShadow: `0 10px 15px -3px ${colore}44` }}>VAI AL PROFILO</button>
            </div>
          </div>
        ))}
      </div>

      {/* ALTRE SPECIALISTICHE - CROSS LINKING PESANTE */}
      <div style={{ padding: '80px 20px', backgroundColor: 'white', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: 'auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '40px', textAlign: 'center' }}>ESPLORA ALTRE CATEGORIE A ROMA</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {altreSpecialistiche.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#0f172a', textDecoration: 'none', padding: '30px', border: '1px solid #f1f5f9', borderRadius: '20px', textAlign: 'center', fontWeight: '800', fontSize: '18px', backgroundColor: '#f8fafc', transition: 'transform 0.2s' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER - DEFINITIVO CON BOX AD/CTA PICCOLI (Richiesta 12-01) */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: 'auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '50px', alignItems: 'start' }}>
          <div>
            <h4 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '20px' }}>Diagnostica Roma</h4>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '16px' }}>Il punto di riferimento per la sanità privata d'eccellenza a Roma. Tutti i professionisti sono verificati manualmente.</p>
          </div>
          <div style={{ border: '1px solid #1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '10px' }}>ADVERTISEMENT</span>
            <div style={{ backgroundColor: '#1e293b', height: '40px', borderRadius: '8px' }}></div>
          </div>
          <div style={{ border: '1px solid #1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '10px' }}>PARTNER CTA</span>
            <div style={{ backgroundColor: '#1e293b', height: '40px', borderRadius: '8px' }}></div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid #1e293b', paddingTop: '30px', color: '#475569', fontSize: '14px', fontWeight: '700' }}>
          © 2026 DIAGNOSTICA ROMA — TUTTI I DIRITTI RISERVATI
        </div>
      </footer>
    </div>
  );
}
