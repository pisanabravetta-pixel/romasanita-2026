import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
// IMPORTIAMO I NUOVI COMPONENTI
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      <Head>
        <title>Farmacie a Roma – Servizi e Orari | ServiziSalute</title>
        <meta name="description" content="Trova farmacie a Roma con servizi sanitari e test rapidi." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* 1. NAVBAR COMPONENTE */}
      <Navbar />

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 FARMACIE E PARAFARMACIE APERTE A ROMA - GENNAIO 2026
      </div>

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #059669' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Farmacie a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>
            Trova farmacie che offrono analisi e test rapidi a <strong>Roma</strong>.
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

        {/* LISTA FARMACIE CON BADGE */}
        {loading ? (
          <p style={{textAlign:'center'}}>Caricamento...</p>
        ) : (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
               {/* Qui ci sono i tuoi badge (h24_aperto, test_rapidi, ecc.) che funzionano già */}
               <h2 style={{ color: '#065f46', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                 {v.h24_aperto && <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>APERTURA 24H</span>}
                 {v.consegna_domicilio && <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>DOMICILIO</span>}
               </div>
               <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                  <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
               </div>
            </div>
          ))
        )}
      </main>

      {/* 2. FOOTER COMPONENTE (Toglie 50 righe di codice inutile) */}
      <Footer />
    </div>
  );
}
