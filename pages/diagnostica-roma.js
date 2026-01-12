import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const { data } = await supabase.from('annunci').select('*').eq('approvato', true).ilike('categoria', '%diagnostica%').order('is_top', { ascending: false });
      if (data) setCentri(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      <Navbar />

      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        <div style={{ margin: '15px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>← TORNA ALLA HOME</a>
        </div>

        {/* HEADER */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '25px', borderLeft: '10px solid #1e3a8a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', margin: '0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '17px', marginTop: '5px' }}>Centri analisi e radiologia selezionati.</p>
        </div>

        {/* QUARTIERI (RICHIAMI CATEGORIE) */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX (FORZATI A 100% LARGHEZZA) */}
        <div style={{ display: 'block', width: '100%' }}> 
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '25px', 
              padding: '30px', 
              marginBottom: '20px', 
              border: v.is_top ? '4px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.04)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '130px', backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '130px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>}
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '130px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '40px 25px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '40px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Gestisci un Centro Diagnostico?</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '8px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>Dermatologi Roma</a>
            <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>Dentisti Roma</a>
          </div>
        </div>

        {/* FAQ (DOMANDE) */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>FAQ Diagnostica</h3>
          <p style={{ fontWeight: '800', marginBottom: '5px' }}>1. Referti online?</p>
          <p style={{ color: '#475569', marginBottom: '15px' }}>Sì, quasi tutti i centri offrono il ritiro digitale.</p>
          <p style={{ fontWeight: '800', marginBottom: '5px' }}>2. Serve l'impegnativa?</p>
          <p style={{ color: '#475569', marginBottom: '15px' }}>Obbligatoria per SSN, non sempre per i privati.</p>
          <p style={{ fontWeight: '800', marginBottom: '5px' }}>3. Come prenoto?</p>
          <p style={{ color: '#475569', marginBottom: '15px' }}>Usa i tasti di chiamata rapida sopra.</p>
        </div>

      </main>

      {/* FOOTER - Senza spazi vuoti eccessivi sopra */}
      <Footer />
    </div>
  );
}
