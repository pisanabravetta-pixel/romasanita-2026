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

  const zonaNome = "Roma"; // Default per la pagina Hub

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
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

      {/* HEADER HUB (Istruzione 2026-01-11) */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: colore, textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← TORNA A TUTTE LE SPECIALISTICHE
        </Link>
        <div style={{ marginTop: '20px' }}>
          <h1 style={{ fontSize: '38px', color: '#111827', fontWeight: '800', marginBottom: '15px' }}>{titolo}</h1>
          <p style={{ color: '#4b5563', maxWidth: '750px', margin: 'auto', fontSize: '18px', lineHeight: '1.6' }}>
            {testoMiniSEO}
          </p>
        </div>
      </div>

      {/* CERCA PER QUARTIERE */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA PROFESSIONISTI */}
      <div style={{ padding: '20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', color: '#111827' }}>
          Professionisti disponibili a {zonaNome}
        </h2>
        {loading ? (
          <p>Ricerca in corso...</p>
        ) : medici.length > 0 ? (
          medici.map(m => (
            <div key={m.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: m.is_top ? `2px solid ${colore}` : '1px solid #e5e7eb', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ backgroundColor: colore, color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {badgeSpec}
                </span>
                {m.is_top && <span style={{ color: colore, fontWeight: 'bold', fontSize: '14px' }}>⭐ RACCOMANDATO</span>}
              </div>
              <h3 style={{ fontSize: '24px', color: '#111827', margin: '5px 0' }}>{m.titolo}</h3>
              <p style={{ color: '#4b5563', fontSize: '16px' }}>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
              <button style={{ alignSelf: 'start', marginTop: '10px', backgroundColor: colore, color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Visualizza Profilo e Contatti
              </button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '16px' }}>
            <p>Nessun professionista trovato al momento.</p>
          </div>
        )}
      </div>

      {/* CROSS-LINKING ALTRE SPECIALISTICHE */}
      <div style={{ padding: '60px 20px', backgroundColor: 'white', marginTop: '50px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {altreSpecialistiche.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#111827', textDecoration: 'none', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center', fontWeight: '600', backgroundColor: '#f9fafb', transition: 'all 0.2s' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER INTEGRALE (Istruzione 2026-01-12) */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>ServiziSalute Roma</h4>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>Il portale leader per la ricerca di specialisti sanitari nella Capitale. Qualità e trasparenza al tuo servizio.</p>
          </div>
          <div style={{ border: '1px solid #374151', padding: '15px', borderRadius: '10px', height: 'fit-content' }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>SPONSOR</p>
            <div style={{ backgroundColor: '#1f2937', height: '40px', borderRadius: '5px' }}></div>
          </div>
          <div style={{ border: '1px solid #374151', padding: '15px', borderRadius: '10px', height: 'fit-content' }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>COLLABORA CON NOI</p>
            <div style={{ backgroundColor: '#1f2937', height: '40px', borderRadius: '5px' }}></div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', maxWidth: '1100px', margin: '40px auto 0', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>© 2026 Diagnostica Roma - Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
