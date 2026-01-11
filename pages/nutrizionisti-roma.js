import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function NutrizionistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('nutrizionista', 'roma');

  useEffect(() => {
    async function fetchData() {
      try {
        const queryBusca = getDBQuery('nutrizionista'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f7fee7', minHeight: '100vh' }}>
      <Head>
        <title>Nutrizionisti a Roma – Dieta e Benessere Alimentare | ServiziSalute</title>
        <meta name="description" content="Trova i migliori biologi nutrizionisti a Roma. Piani alimentari personalizzati e diete per salute e sport a Roma." />
        {schemas && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />}
      </Head>

      <div style={{ backgroundColor: '#65a30d', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🥗 NUTRIZIONISTI E DIETISTI A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ color: '#65a30d', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #65a30d', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#365314', fontSize: '32px', fontWeight: '800' }}>Nutrizionisti a Roma</h1>
          <p>Migliora il tuo stile di vita. Trova un <strong>nutrizionista a Roma</strong> per diete personalizzate.</p>
        </div>

        {loading ? <p style={{textAlign:'center', marginTop:'40px'}}>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginTop: '20px', border: v.is_top ? '3px solid #65a30d' : '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#365314', margin: 0 }}>{v.nome}</h2>
            <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#65a30d', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama Ora</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        ))}
      </main>

      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '50px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
          © 2026 ServiziSalute – Tutti i diritti riservati
        </div>
      </footer>
    </div>
  );
}
