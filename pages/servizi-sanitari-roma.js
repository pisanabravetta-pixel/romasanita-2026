import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { supabase } from '../lib/supabaseClient';

export default function ServiziSanitariRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTuttiServizi() {
      const { data, error } = await supabase.from('annunci').select('*').eq('approvato', true).limit(20).order('is_top', { ascending: false });
      if (!error && data) setServizi(data);
      setLoading(false);
    }
    fetchTuttiServizi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari Roma | Portale Medico e Salute | ServiziSalute</title>
      </Head>

      <Script id="breadcrumb-generale" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Servizi Sanitari Roma", "item": "https://www.servizisalute.it/servizi-sanitari-roma" }
          ]
        })
      }} />

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Servizi Sanitari Roma</h1>
        
        {loading ? <p>Caricamento...</p> : servizi.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
            <p style={{ color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong> ({v.categoria})</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Mappa</a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
