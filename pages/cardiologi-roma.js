import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { supabase } from '../lib/supabaseClient';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCardiologi() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Cardiolog%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Cardiologi a Roma | Visite e Check-up Cuore | ServiziSalute</title>
        <meta name="description" content="Trova i migliori cardiologi a Roma. Prenota una visita cardiologica, ECG o controllo del cuore nei principali quartieri della Capitale." />
      </Head>

      {/* 🧭 SCHEMA BREADCRUMB */}
      <Script id="breadcrumb-cardiologi" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Cardiologi a Roma", "item": "https://www.servizisalute.it/cardiologi-roma" }
          ]
        })
      }} />

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Cardiologi a Roma</h1>

        {loading ? <p>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
            <p style={{ color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              {/* 🗺️ MAPPA */}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Mappa</a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
