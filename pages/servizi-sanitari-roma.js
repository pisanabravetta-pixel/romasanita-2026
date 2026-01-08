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
        .limit(50) 
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

      {/* 🧭 SCHEMA BREADCRUMB (SEO) */}
      <Script id="breadcrumb-generale" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Servizi Sanitari Roma", "item": "https://www.servizisalute.it/servizi-sanitari" }
          ]
        })
      }} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* LINK DI RITORNO ALLA HOME */}
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>← Torna alla Home</a>

        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px', marginTop: '10px' }}>Tutti i Servizi Sanitari a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Guida completa ai professionisti e alle strutture sanitarie della Capitale.
        </p>

        {/* 🗺️ GRIGLIA NAVIGAZIONE CATEGORIE (SEO & UX) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '12px', 
          marginBottom: '40px' 
        }}>
          {[
            { n: 'Dentisti', l: '/dentisti' },
            { n: 'Diagnostica', l: '/diagnostica' },
            { n: 'Specialisti', l: '/visite-specialistiche' },
            { n: 'Domicilio', l: '/servizi-domicilio' },
            { n: 'Farmacie', l: '/farmacie' },
            { n: 'Cardiologi', l: '/cardiologi' }
          ].map((cat) => (
            <a key={cat.n} href={cat.l} style={{ 
              backgroundColor: 'white', 
              padding: '12px', 
              borderRadius: '16px', 
              textAlign: 'center', 
              textDecoration: 'none', 
              color: '#1e40af', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              {cat.n}
            </a>
          ))}
        </div>

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
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ 
                  backgroundColor: '#eff6ff', 
                  color: '#2563eb', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  textTransform: 'uppercase'
                }}>
                  {v.categoria}
                </span>
                <h3 style={{ margin: '10px 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
                <p style={{ color: '#64748b', margin: 0 }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {v.urgenza_24h && <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '5px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', border: '1px solid #fee2e2' }}>🚨 H24</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#f0f9ff', color: '#0369a1', padding: '5px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', border: '1px solid #e0f2fe' }}>🚇 METRO</span>}
                {v.primo_sconto && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '900', border: '1px solid #dcfce7' }}>✨ PROMO</span>}
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', margin: '15px 0' }}>
              {v.descrizione ? v.descrizione.substring(0, 160) + '...' : "Professionista sanitario selezionato a Roma. Contatta la struttura per maggiori informazioni su orari e prestazioni."}
            </p>
            
            {/* 📱 TASTI AZIONE */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp}?text=Salve, la contatto da ServiziSalute Roma.`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ flex: 0.4, minWidth: '60px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #e2e8f0' }}
              >
                📍
              </a>
            </div>
          </div>
        ))}

        {/* 🔗 CTA PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', backgroundColor: '#e0e7ff', borderRadius: '24px', border: '1px solid #c7d2fe' }}>
          <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Sei un operatore sanitario a Roma?</h3>
          <p style={{ color: '#475569', marginBottom: '20px' }}>Inserisci la tua attività o il tuo studio nella nostra guida gratuita.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Aggiungi la tua attività →</a>
        </div>

        {/* 🧱 FOOTER LEGALE */}
        <footer style={{ marginTop: '80px', borderTop: '1px solid #e2e8f0', padding: '40px 0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'justify', lineHeight: '1.5' }}>
            <p><strong>Disclaimer:</strong> ServiziSalute.it è un aggregatore di servizi sanitari locali a Roma. Le informazioni fornite (indirizzi, orari, disponibilità) possono subire variazioni senza preavviso. Si raccomanda di confermare sempre telefonicamente prima di recarsi in struttura. In caso di emergenza medica, chiamare il 112 o il 118.</p>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>© 2026 ServiziSalute Roma — Indice Generale della Salute.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
