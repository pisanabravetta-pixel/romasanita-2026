import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { supabase } from '../lib/supabaseClient';

export default function ServiziDomicilioRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDomicilio() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Domicilio%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setServizi(data);
      setLoading(false);
    }
    fetchDomicilio();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari a Domicilio Roma | Assistenza e Cure | ServiziSalute</title>
        <meta name="description" content="Trova assistenza sanitaria a domicilio a Roma: infermieri, fisioterapisti e medici pronti ad assisterti direttamente a casa tua." />
      </Head>

      {/* 🧭 SCHEMA BREADCRUMB */}
      <Script id="breadcrumb-domicilio" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Servizi a Domicilio Roma", "item": "https://www.servizisalute.it/servizi-domicilio-roma" }
          ]
        })
      }} />

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Assistenza a Domicilio Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>Infermieri, fisioterapisti e medici disponibili per cure presso il tuo domicilio.</p>

        {loading ? (
          <p>Caricamento servizi...</p>
        ) : servizi.length > 0 ? (
          servizi.map((v) => (
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
                  <p style={{ color: '#64748b', margin: '5px 0' }}>📍 Zona operativa: <strong>{v.zona}</strong></p>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {v.urgenza_24h && (
                    <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #fee2e2' }}>🚑 DISPONIBILITÀ H24</span>
                  )}
                </div>
              </div>

              {/* 📝 DESCRIZIONE */}
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
                {v.descrizione || "Professionista sanitario specializzato in interventi domiciliari. Contatta per concordare orari e tipologia di assistenza richiesta."}
              </p>

              {/* 💸 OFFERTA PROMOZIONALE */}
              {v.primo_sconto && (
                <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px', border: '1px dashed #22c55e', fontWeight: '500' }}>
                  ✨ <strong>Promozione:</strong> Agevolazione sulla prima prestazione o consulto telefonico gratuito.
                </div>
              )}
              
              {/* 📱 TASTI AZIONE */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Chiama
                </a>
                <a href={`https://wa.me/${v.whatsapp}?text=Buongiorno, vorrei richiedere informazioni per assistenza a domicilio (da ServiziSalute Roma).`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                  WhatsApp
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Mappa Studio
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
             <p style={{ color: '#64748b' }}>Nessun servizio a domicilio disponibile al momento in questa categoria.</p>
             <a href="/pubblica-annuncio" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Sei un professionista? Iscriviti ora</a>
          </div>
        )}

        <footer style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', padding: '20px 0', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Hai bisogno di esami clinici? <a href="/diagnostica-roma" style={{ color: '#2563eb', fontWeight: 'bold' }}>Diagnostica Roma</a></p>
        </footer>
      </main>
    </div>
  );
}
