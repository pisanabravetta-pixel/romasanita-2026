import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { supabase } from '../lib/supabaseClient';

export default function DentistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDentisti() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', 'Dentist%')
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchDentisti();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Dentisti a Roma | Studi Odontoiatrici e Urgenze | ServiziSalute</title>
        <meta name="description" content="Trova i migliori dentisti a Roma. Studi dentistici specializzati in implantologia e ortodonzia nei quartieri della Capitale." />
        
        {/* SCHEMA MEDICAL ORGANIZATION */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Dentisti Roma - ServiziSalute",
          "areaServed": "Roma"
        })}} />
      </Head>

      {/* SCHEMA BREADCRUMB */}
      <Script
        id="breadcrumb-dentisti"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
              { "@type": "ListItem", "position": 2, "name": "Dentisti a Roma", "item": "https://www.servizisalute.it/dentisti-roma" }
            ]
          }),
        }}
      />

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Dentisti a Roma</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>I migliori studi odontoiatrici della Capitale selezionati per zona.</p>
        
        {/* 🗺️ FILTRI ZONE (Ottimi per la SEO) */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e40af' }}>Filtra per zona:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/dentisti-roma-prati" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Prati</a>
            <a href="/dentisti-roma-eur" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>EUR</a>
          </div>
        </div>

        {loading ? (
          <p>Caricamento dentisti...</p>
        ) : medici.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '24px', 
            marginBottom: '20px', 
            border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' 
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
                <p style={{ color: '#64748b', margin: '5px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              </div>

              {/* 🟢 BADGE DI FIDUCIA */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {v.urgenza_24h && (
                  <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #fee2e2' }}>🚨 URGENZE</span>
                )}
                {v.vicino_metro && (
                  <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #dbeafe' }}>🚇 METRO</span>
                )}
              </div>
            </div>

            {/* DESCRIZIONE */}
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
              {v.descrizione || "Studio dentistico specializzato. Contatta la struttura per informazioni su orari, prestazioni e disponibilità."}
            </p>

            {/* 💸 OFFERTA PROMOZIONALE */}
            {v.primo_sconto && (
              <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px', border: '1px dashed #22c55e', fontWeight: '500' }}>
                ✨ <strong>Promozione:</strong> Prima visita o pulizia dei denti scontata citando "ServiziSalute".
              </div>
            )}
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: '1 1 120px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
              
              <a href={`https://wa.me/${v.whatsapp}?text=Buongiorno, vorrei informazioni sulle disponibilità dello studio (da ServiziSalute).`} style={{ flex: '1 1 120px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ flex: '1 1 120px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}
              >
                📍 Mappa
              </a>
            </div>
          </div>
        ))}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px', textAlign: 'center' }}>
          <p><strong>Disclaimer:</strong> ServiziSalute Roma è un portale indipendente. I dati sono forniti dai professionisti.</p>
        </footer>
      </main>
    </div>
  );
}
