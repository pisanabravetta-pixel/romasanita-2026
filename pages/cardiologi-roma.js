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
        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Cardiologi a Roma</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Ricerca specialistica per la salute del cuore nella tua zona.</p>

        {loading ? (
          <p>Caricamento professionisti...</p>
        ) : medici.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '24px', 
            marginBottom: '20px', 
            border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}>
            
            {/* 🏷️ INTESTAZIONE E BADGE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
                <p style={{ color: '#64748b', margin: '5px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {v.urgenza_24h && (
                  <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #fee2e2' }}>🚨 H24</span>
                )}
                {v.vicino_metro && (
                  <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #dbeafe' }}>🚇 METRO</span>
                )}
              </div>
            </div>

            {/* 📝 DESCRIZIONE */}
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
              {v.descrizione || "Specialista in Cardiologia. Per maggiori informazioni o per prenotare un controllo, contatta direttamente lo studio."}
            </p>

            {/* 💸 OFFERTA PROMOZIONALE (Solo se attiva) */}
            {v.primo_sconto && (
              <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px', border: '1px dashed #22c55e', fontWeight: '500' }}>
                ✨ <strong>Promozione:</strong> Prima visita o screening scontato contattando via WhatsApp.
              </div>
            )}
            
            {/* 📱 TASTI AZIONE */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                Chiama
              </a>
              <a href={`https://wa.me/${v.whatsapp}?text=Buongiorno, la contatto tramite ServiziSalute Roma per una visita.`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                WhatsApp
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                Mappa
              </a>
            </div>
          </div>
        ))}

        {/* 🔗 LINK DI NAVIGAZIONE SEO */}
        <div style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', padding: '20px 0', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cerchi altri specialisti? Guarda anche: <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: 'bold' }}>Dentisti Roma</a></p>
        </div>
      </main>
    </div>
  );
}
