import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';

export default function HubLayout({ 
  titolo, categoria, colore, badgeSpec, testoTopBar, 
  descrizioneMeta, testoMiniSEO, quartieri = [], faq = [], altreSpecialistiche = [] 
}) {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      if (!categoria) return;
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
      </Head>

      {/* TOP BAR BOLD */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '12px', textAlign: 'center' }}>
        <strong style={{ fontSize: '14px', letterSpacing: '0.5px' }}>{testoTopBar}</strong>
      </div>

      {/* HEADER HUB - MODELLO DIAGNOSTICA ROMA */}
      <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: colore, textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
          ← TORNA A TUTTE LE SPECIALISTICHE
        </Link>
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginTop: '20px', color: '#111827' }}>{titolo}</h1>
        <div style={{ maxWidth: '800px', margin: '20px auto', fontSize: '18px', lineHeight: '1.6', color: '#4b5563' }}>
          {testoMiniSEO}
        </div>
      </div>

      {/* CERCA PER QUARTIERE */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white', fontWeight: '600' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA ANNUNCI - I MEDICI CHE ERANO SPARITI */}
      <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>Professionisti Disponibili</h2>
        {loading ? <p>Caricamento...</p> : medici.map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', marginBottom: '20px', border: m.is_top ? `2px solid ${colore}` : '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ backgroundColor: colore, color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>{badgeSpec}</span>
              {m.is_top && <span style={{ color: colore, fontWeight: 'bold' }}>⭐ RACCOMANDATO</span>}
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: '800', margin: '15px 0' }}>{m.titolo}</h3>
            <p style={{ fontSize: '17px', color: '#4b5563' }}>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
            <button style={{ marginTop: '20px', backgroundColor: colore, color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>CONTATTA ORA</button>
          </div>
        ))}
      </div>

      {/* FAQ SEZIONE */}
      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: 'auto' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px' }}>Domande Frequenti (FAQ)</h2>
        {faq.map((f, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #e5e7eb' }}>
            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#111827' }}>{f.q}</p>
            <p style={{ marginTop: '10px', color: '#4b5563', lineHeight: '1.5' }}>{f.a}</p>
          </div>
        ))}
      </div>

      {/* ALTRE SPECIALISTICHE - CROSS LINKING */}
      <div style={{ padding: '60px 20px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {altreSpecialistiche.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#111827', textDecoration: 'none', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center', fontWeight: '600', backgroundColor: 'white' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER INTEGRALE (Istruzione 12-01) */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div style={{ maxWidth: '400px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>Diagnostica Roma</h4>
            <p style={{ color: '#9ca3af', marginTop: '10px' }}>Il portale di riferimento per la sanità privata a Roma.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ width: '120px', height: '60px', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af' }}>AD BOX</div>
            <div style={{ width: '120px', height: '60px', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af' }}>CTA BOX</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #374151', paddingTop: '20px', color: '#6b7280', fontSize: '14px' }}>
          © 2026 Diagnostica Roma - Tutti i diritti riservati
        </div>
      </footer>
    </div>
  );
}
