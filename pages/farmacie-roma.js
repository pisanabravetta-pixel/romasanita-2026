import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { supabase } from '../lib/supabaseClient';

export default function FarmacieRoma() {
  const [farmacie, setFarmacie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFarmacie() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', 'Farmaci%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setFarmacie(data);
      setLoading(false);
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie a Roma | Orari e Contatti | ServiziSalute</title>
        <meta name="description" content="Trova le farmacie a Roma nel tuo quartiere. Orari, numeri di telefono e posizione delle farmacie aperte nella Capitale." />
      </Head>

      {/* 🧭 SCHEMA BREADCRUMB (SEO) */}
      <Script id="breadcrumb-farmacie" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.it" },
            { "@type": "ListItem", "position": 2, "name": "Farmacie a Roma", "item": "https://www.servizisalute.it/farmacie" }
          ]
        })
      }} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Farmacie a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>Cerca la farmacia più vicina nel tuo quartiere.</p>

        {loading ? (
          <p>Caricamento farmacie...</p>
        ) : farmacie.map((v) => (
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
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {v.urgenza_24h && (
                  <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #fee2e2' }}>🌙 H24 / NOTTURNA</span>
                )}
                {v.vicino_metro && (
                  <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #dbeafe' }}>🚇 METRO</span>
                )}
                {v.primo_sconto && (
                   <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', border: '1px solid #dcfce7' }}>✨ PROMO</span>
                )}
              </div>
            </div>

            {/* 📝 DESCRIZIONE */}
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
              {v.descrizione || "Servizi farmaceutici, farmaci da banco e consulenza professionale. Contatta la farmacia per conoscere gli orari di apertura e la disponibilità di prodotti."}
            </p>

            {/* 💸 AREA SERVIZI/PROMO */}
            {v.primo_sconto && (
              <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '12px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px', border: '1px dashed #22c55e', fontWeight: '500' }}>
                ✨ <strong>Servizio Smart:</strong> Prenota farmaci o invia ricetta tramite WhatsApp per ritiro rapido.
              </div>
            )}
            
            {/* 📱 TASTI AZIONE */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.whatsapp}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                Chiama
              </a>
              <a href={`https://wa.me/${v.whatsapp}?text=Buongiorno, vorrei informazioni sulla disponibilità di un farmaco.`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                WhatsApp
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                Mappa
              </a>
            </div>
          </div>
        ))}

        {/* 🔗 LINK DI RICHIAMO PER PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '30px', backgroundColor: '#e0e7ff', borderRadius: '24px', border: '1px solid #c7d2fe' }}>
          <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Sei il titolare di una Farmacia?</h3>
          <p style={{ color: '#475569', marginBottom: '20px' }}>Inserisci la tua attività su ServiziSalute Roma per farti trovare dai pazienti della tua zona.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
            Pubblica il tuo profilo gratis →
          </a>
        </div>

        {/* 🧱 FOOTER CON DISCLAIMER LEGALE */}
        <footer style={{ marginTop: '80px', borderTop: '1px solid #e2e8f0', padding: '40px 0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'justify', lineHeight: '1.5' }}>
            <p><strong>Disclaimer Medico:</strong> Le informazioni contenute su ServiziSalute.it sono fornite a solo scopo informativo e non intendono sostituire il parere del medico curante o di altri professionisti sanitari. Nonostante l'impegno nel verificare i dati, la redazione non garantisce l'accuratezza o la completezza delle informazioni fornite dai singoli inserzionisti. ServiziSalute non risponde di eventuali ritardi o inesattezze riguardanti gli orari delle farmacie di turno. In caso di emergenza medica, contattare immediatamente il 118 o recarsi al Pronto Soccorso.</p>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>© 2026 ServiziSalute Roma — Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
