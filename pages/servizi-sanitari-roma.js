import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { supabase } from '../lib/supabaseClient';

export default function ServiziSanitariRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTuttiServizi() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .limit(50) // Aumentato a 50 per una panoramica più ricca
        .order('is_top', { ascending: false });

      if (!error && data) setServizi(data);
      setLoading(false);
    }
    fetchTuttiServizi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari Roma | Guida alla Salute Locale | ServiziSalute</title>
        <meta name="description" content="Esplora la rete completa dei servizi sanitari a Roma. Dai medici specialisti alle farmacie di quartiere, tutto in un unico portale." />
      </Head>

      {/* 🧭 SCHEMA BREADCRUMB */}
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
        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Tutti i Servizi Sanitari a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Guida completa ai professionisti e alle strutture sanitarie della Capitale.
        </p>

        {loading ? (
          <p>Caricamento servizi...</p>
        ) : servizi.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '24px', 
            marginBottom: '20px', 
            border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            
            {/* 🏷️ CATEGORIA E BADGE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ 
                  backgroundColor: '#eff6ff', 
                  color: '#2563eb', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {v.categoria}
                </span>
                <h3 style={{ margin: '10px 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
                <p style={{ color: '#64748b', margin: 0 }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              </div>

              <div style={{ display: 'flex', gap: '5px' }}>
                {v.urgenza_24h && (
                  <span title="Disponibilità H24 o Urgenze" style={{ cursor: 'help' }}>🚨</span>
                )}
                {v.vicino_metro && (
                  <span title="Vicino Metro" style={{ cursor: 'help' }}>🚇</span>
                )}
                {v.primo_sconto && (
                  <span title="Promozione Attiva" style={{ cursor: 'help' }}>✨</span>
                )}
              </div>
            </div>

            {/* 📝 DESCRIZIONE BREVE */}
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', margin: '15px 0' }}>
              {v.descrizione ? v.descrizione.substring(0, 120) + '...' : "Professionista sanitario selezionato a Roma. Contatta per maggiori informazioni."}
            </p>
            
            {/* 📱 TASTI AZIONE */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                Chiama
              </a>
              <a href={`https://wa.me/${v.whatsapp}?text=Salve, la contatto da ServiziSalute Roma.`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                WhatsApp
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 0.5, minWidth: '80px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                📍
              </a>
            </div>
          </div>
        ))}

        {/* 🔗 FOOTER DI NAVIGAZIONE */}
        <div style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', padding: '20px 0', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Sei un medico? <a href="/per-i-professionisti" style={{ color: '#2563eb', fontWeight: 'bold' }}>Aggiungi la tua attività</a>
          </p>
        </div>
      </main>
    </div>
  );
}
