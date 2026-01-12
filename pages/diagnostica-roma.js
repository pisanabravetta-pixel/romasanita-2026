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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ margin: '15px 0' }}><a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800' }}>← TORNA ALLA HOME</a></div>

        {/* HEADER */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '20px', borderLeft: '10px solid #1e3a8a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '30px', fontWeight: '900', margin: 0 }}>Diagnostica a Roma</h1>
        </div>

        {/* QUARTIERI */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX - FORZATURA TOTALE */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              display: 'block', // ROMPE I BOX VECCHI
              backgroundColor: 'white', 
              borderRadius: '25px', 
              padding: '30px', 
              marginBottom: '20px', 
              border: v.is_top ? '4px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.04)',
              width: '100%'
            }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '130px', backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '130px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>}
              </div>
            </div>
          ))}
        </div>

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '40px 25px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '30px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '8px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
          <p style={{ fontWeight: '900', marginBottom: '10px' }}>Altre Specialistiche a Roma:</p>
          <a href="/dentisti-roma" style={{ color: '#2563eb', marginRight: '15px', fontWeight: '700' }}>Dentisti</a>
          <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '700' }}>Dermatologi</a>
        </div>

        {/* FAQ - ZERO SPAZIO SOTTO */}
        <div style={{ paddingBottom: '20px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>FAQ Diagnostica</h3>
          <p><strong>1. Referti online?</strong> — Sì, disponibili.</p><br/>
          <p><strong>2. Serve ricetta?</strong> — Solo per SSN.</p><br/>
          <p><strong>3. Come prenoto?</strong> — Chiama i centri sopra.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
