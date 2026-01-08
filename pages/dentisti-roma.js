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
        .ilike('categoria', 'dentisti%')
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
        
        {/* SCHEMA MEDICAL ORGANIZATION (SEO) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Dentisti Roma - ServiziSalute",
          "areaServed": "Roma"
        })}} />
      </Head>

      {/* 🧭 SCHEMA BREADCRUMB (SEO) */}
      <Script id="breadcrumb-dentisti" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Dentisti a Roma", "item": "https://www.servizisalute.it/dentisti" }
          ]
        })
      }} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* LINK DI RITORNO ALLA HOME */}
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>← Torna alla Home</a>

        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px', marginTop: '10px' }}>Dentisti a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '20px' }}>I migliori studi odontoiatrici della Capitale selezionati per zona.</p>

        {/* 🔗 LINK RAPIDI ZONE (SEO) - CORRETTO */}
<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
  {['Prati', 'EUR', 'Parioli', 'San Giovanni', 'Centro Storico'].map((zona) => (
    <a 
      key={zona} 
      href={`/dentisti-roma-${zona.toLowerCase().replace(' ', '-')}`} 
      style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '8px 15px', borderRadius: '20px', fontSize: '13px', color: '#1e40af', textDecoration: 'none', fontWeight: '500' }}
    >
      Dentisti {zona}
    </a>
  ))}
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

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {v.urgenza_24h && <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #fee2e2' }}>🚨 URGENZE</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #dbeafe' }}>🚇 METRO</span>}
                {v.primo_sconto && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #dcfce7' }}>✨ PROMO</span>}
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
              {v.descrizione || "Studio dentistico specializzato. Contatta la struttura per informazioni su prestazioni e disponibilità."}
            </p>

            {/* 📱 TASTI AZIONE */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.whatsapp}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp}?text=Buongiorno, vorrei informazioni sulle disponibilità dello studio (da ServiziSalute).`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query={encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #e2e8f0' }}
              >
                📍 Mappa
              </a>
            </div>
          </div>
        ))}

        {/* 🔗 LINK DI RICHIAMO PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', backgroundColor: '#e0e7ff', borderRadius: '24px', border: '1px solid #c7d2fe' }}>
          <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Sei il titolare di uno Studio Dentistico?</h3>
          <p style={{ color: '#475569', marginBottom: '20px' }}>Aumenta la tua visibilità a Roma. Inserisci il tuo studio su ServiziSalute.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo studio gratis →</a>
        </div>

        {/* 🧱 FOOTER CON LINK CORRELATI E DISCLAIMER */}
        <footer style={{ marginTop: '80px', borderTop: '1px solid #e2e8f0', padding: '40px 0' }}>
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginBottom: '15px' }}>Altre Categorie a Roma:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/cardiologi" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>Cardiologi Roma</a>
              <a href="/farmacie" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>Farmacie Roma</a>
              <a href="/diagnostica" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>Centri Diagnostici</a>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'justify', lineHeight: '1.5', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <p><strong>Disclaimer:</strong> Le informazioni contenute su ServiziSalute.it relative agli studi dentistici hanno scopo puramente informativo. Il portale non garantisce l'accuratezza delle prestazioni fornite dai singoli professionisti. In caso di forti dolori, ascessi o traumi dentali urgenti, si consiglia di contattare immediatamente un pronto soccorso odontoiatrico.</p>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>© 2026 ServiziSalute Roma — Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
