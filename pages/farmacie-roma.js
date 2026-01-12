import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

// IMPORTIAMO I COMPONENTI CHE HAI APPENA CREATO
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // SEO Logic per Schemi JSON-LD
  const schemas = getSchemas('farmacie', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];

  const serviziCorrelati = [
    { nome: "Diagnostica a Roma", url: "/diagnostica-roma" },
    { nome: "Servizi a Domicilio", url: "/servizi-domicilio-roma" },
    { nome: "Dermatologi Roma", url: "/dermatologi-roma" },
    { nome: "Nutrizionisti Roma", url: "/nutrizionisti-roma" }
  ];

  useEffect(() => {
    async function fetchFarmacie() {
      try {
        const queryBusca = getDBQuery('farmacie'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
          
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch farmacie:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0fdf4', color: '#1a202c', fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <Head>
        <title>Farmacie a Roma – Servizi, offerte e prenotazioni | ServiziSalute</title>
        <meta name="description" content="Trova farmacie a Roma che offrono servizi sanitari, analisi e test. Consulta orari e contatti diretti nei principali quartieri." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* 1️⃣ NAVBAR PROFESSIONALE */}
      <Navbar />

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 FARMACIE E PARAFARMACIE APERTE A ROMA - GENNAIO 2026
      </div>

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#059669', textDecoration: 'none', fontWeight: '600' }}>← Torna alla Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #059669' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Farmacie a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>
            Trova farmacie che offrono analisi, test rapidi e consulenze professionali a <strong>Roma</strong>. Cerca lo studio più vicino a te tra <strong>Prati, EUR, San Giovanni o Parioli</strong>.
          </p>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/farmacie-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dcfce7', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Risultati disponibili oggi</h2>
        
        {loading ? (
          <p style={{textAlign:'center'}}>Caricamento...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ color: '#065f46', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                  <p style={{ fontSize: '17px', margin: '8px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>

              {/* --- BADGE DINAMICI --- */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {v.h24_aperto && <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #fecaca' }}>🏪 APERTO 24H</span>}
                {v.test_rapidi && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #bae6fd' }}>🧪 TEST RAPIDI</span>}
                {v.consegna_domicilio && <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #fde68a' }}>📦 DOMICILIO</span>}
                {v.senza_barriere && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #dcfce7' }}>♿ ACCESSIBILE</span>}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessuna farmacia trovata.</div>
        )}

        {/* FAQ SECTION */}
        <section id="faq" style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#065f46', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {schemas.faq?.mainEntity.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>{item.name}</p>
                <p style={{ color: '#64748b', fontSize: '15px' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 2️⃣ FOOTER PROFESSIONALE IDENTICO ALLA HOME */}
      <Footer />
    </div>
  );
}
