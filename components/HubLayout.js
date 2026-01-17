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
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>{titolo} a Roma - ServiziSalute</title>
        <meta name="description" content={descrizioneMeta} />
        {schemas?.medical && <script type="application/ld+json">{JSON.stringify(schemas.medical)}</script>}
        {schemas?.faq && <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>}
      </Head>

      {/* BARRA SUPERIORE IN GRASSETTO */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '12px', textAlign: 'center', fontSize: '14px' }}>
        <strong>{testoTopBar}</strong>
      </div>

      {/* HEADER HUB - STILE DIAGNOSTICA ROMA */}
      <div style={{ padding: '50px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: colore, textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← TORNA A TUTTE LE SPECIALISTICHE
        </Link>
        <h1 style={{ fontSize: '42px', color: '#111827', fontWeight: '800', marginTop: '20px', letterSpacing: '-1px' }}>{titolo}</h1>
        <p style={{ color: '#4b5563', maxWidth: '800px', margin: '20px auto', fontSize: '18px', lineHeight: '1.6' }}>{testoMiniSEO}</p>
      </div>

      {/* SEZIONE QUARTIERI */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '15px', border: '1px solid #d1d5db', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA MEDICI DISPONIBILI */}
      <div style={{ padding: '20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Professionisti Disponibili</h2>
        {loading ? <p>Caricamento...</p> : medici.map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', marginBottom: '25px', border: m.is_top ? `2px solid ${colore}` : '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ backgroundColor: colore, color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>{badgeSpec}</span>
              {m.is_top && <span style={{ color: colore, fontWeight: 'bold' }}>⭐ RACCOMANDATO</span>}
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', marginBottom: '10px' }}>{m.titolo}</h3>
            <p style={{ color: '#4b5563', fontSize: '17px' }}>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
            <button style={{ marginTop: '20px', backgroundColor: colore, color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>CONTATTA ORA</button>
          </div>
        ))}
      </div>

      {/* CROSS-LINKING */}
      <div style={{ padding: '60px 20px', backgroundColor: 'white', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '40px' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {altreSpecialistiche.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#111827', textDecoration: 'none', padding: '25px', border: '1px solid #e5e7eb', borderRadius: '15px', textAlign: 'center', fontWeight: '700', backgroundColor: '#f9fafb' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER IDENTICO HOME (Box piccoli Ad/CTA) */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '400px' }}>
            <h4 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>ServiziSalute Roma</h4>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>Il portale di riferimento per trovare i migliori specialisti sanitari nella Capitale.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ width: '120px', height: '60px', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af' }}>AD BOX</div>
            <div style={{ width: '120px', height: '60px', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af' }}>CTA BOX</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '1px solid #374151', paddingTop: '20px', color: '#6b7280' }}>
          © 2026 Diagnostica Roma - Tutti i diritti riservati
        </div>
      </footer>
    </div>
  );
}
