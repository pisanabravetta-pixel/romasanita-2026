import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupera Schemi (FAQ + MedicalBusiness) dal motore SEO
  const schemas = getSchemas('cardiologi', 'roma');

  useEffect(() => {
    async function fetchCardiologi() {
      const queryBusca = getDBQuery('cardiologi');
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', queryBusca)
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
        <title>Cardiologi a Roma | Visite e Screening Cuore | ServiziSalute</title>
        <meta name="description" content="Trova i migliori cardiologi a Roma. Prenota visite, ECG ed ecocardiogrammi nei migliori studi della Capitale. Contatto diretto." />
        <link rel="canonical" href="https://www.servizisalute.it/cardiologi-roma" />
        <meta name="robots" content="index, follow" />
        
        {/* SCHEMI SEO (Invisibili per Google) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>← Torna alla Home</a>

        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px', marginTop: '10px' }}>Cardiologi a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '20px' }}>Specialisti in cardiologia selezionati per zona e competenza.</p>

        {/* 🔗 LINK RAPIDI ZONE (Internal Linking per far scalare Google) */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {['Prati', 'EUR', 'Parioli', 'San Giovanni', 'Centro'].map((zona) => (
            <a key={zona} href={`/cardiologi-roma-${zona.toLowerCase()}`} style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '8px 15px', borderRadius: '20px', fontSize: '13px', color: '#1e40af', textDecoration: 'none', fontWeight: '500' }}>
              Cardiologi {zona}
            </a>
          ))}
        </div>

        {loading ? (
          <p>Caricamento cardiologi...</p>
        ) : medici.length === 0 ? (
          <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '15px', textAlign: 'center' }}>
            <p>Nessun cardiologo trovato in questa categoria.</p>
          </div>
        ) : medici.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', padding: '25px', borderRadius: '24px', marginBottom: '20px', 
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
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
              {v.descrizione || "Specialista in Cardiologia. Contatta la struttura per prenotare visite ed esami diagnostici."}
            </p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #e2e8f0' }}>📍 Mappa</a>
            </div>
          </div>
        ))}

        {/* ❓ FAQ VISIVE (Fondamentali per scalare su Google) */}
        <section style={{ marginTop: '50px', padding: '30px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '20px' }}>Domande Frequenti sui Cardiologi a Roma</h2>
          {schemas.faq.mainEntity.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '5px', fontSize: '17px' }}>{item.name}</h4>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.5' }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        {/* 🔗 SEZIONE PROFESSIONISTI */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px 30px', backgroundColor: '#e0e7ff', borderRadius: '24px', border: '1px solid #c7d2fe' }}>
          <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0' }}>Sei un Cardiologo o titolare di uno Studio a Roma?</h3>
          <p style={{ color: '#475569', marginBottom: '20px' }}>Pubblica gratuitamente il tuo servizio su ServiziSalute e fatti trovare da nuovi pazienti.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo studio gratis →</a>
        </div>

        {/* 🧱 FOOTER UNIFICATO (Internal Linking + Disclaimer) */}
        <footer style={{ marginTop: '80px', borderTop: '1px solid #e2e8f0', padding: '40px 0' }}>
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginBottom: '15px' }}>Altre Categorie a Roma:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/dentisti-roma" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>Dentisti Roma</a>
              <a href="/farmacie-roma" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>Farmacie Roma</a>
              <a href="/diagnostica-roma" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px' }}>Centri Diagnostici</a>
            </div>
          </div>

          <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'justify', lineHeight: '1.5', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <p><strong>Disclaimer:</strong> Le informazioni contenute su ServiziSalute.it hanno scopo puramente informativo. Il portale non garantisce l'accuratezza delle prestazioni dei singoli professionisti. In caso di emergenza cardiaca o dolori al petto, contattare immediatamente il numero unico di emergenza 112 o recarsi al pronto soccorso più vicino.</p>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>© 2026 ServiziSalute Roma — Il tuo portale sanitario locale.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
