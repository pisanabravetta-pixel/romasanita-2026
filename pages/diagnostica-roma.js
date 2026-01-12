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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc', width: '100%' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      
      <Navbar />

      {/* 1. BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px', flexShrink: 0 }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      {/* 2. CONTENITORE CHE SPINGE IL FOOTER */}
      <div style={{ flex: '1 0 auto', width: '100%' }}>
        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
          
          <div style={{ margin: '20px 0' }}>
            <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900', fontSize: '15px' }}>← TORNA ALLA HOME</a>
          </div>

          {/* TITOLO E DESCRIZIONE */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', marginBottom: '25px', borderLeft: '10px solid #1e3a8a', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>Diagnostica a Roma</h1>
            <p style={{ color: '#475569', fontSize: '17px', margin: 0 }}>I migliori centri per analisi e radiologia selezionati per zona.</p>
          </div>

          {/* CERCA PER QUARTIERE (Richiami Categorie) */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieri.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '8px 14px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', border: '1px solid #dbeafe' }}>{q}</a>
              ))}
            </div>
          </div>

          {/* LISTA BOX (Nuovo Stile che ignora il CSS vecchio) */}
          {loading ? <p style={{textAlign:'center', padding: '50px'}}>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '25px', 
              padding: '35px', 
              marginBottom: '20px', 
              border: v.is_top ? '4px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
              display: 'block', // Questo rompe la grid vecchia
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
              <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '25px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '140px', backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '140px', backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>}
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '140px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}

          {/* CTA NERA */}
          <div style={{ backgroundColor: '#0f172a', padding: '45px 30px', borderRadius: '30px', textAlign: 'center', color: 'white', margin: '40px 0' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>Gestisci un Centro Diagnostico?</h2>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Inserisci la tua struttura su ServiziSalute Roma.</p>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '10px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
          </div>

          {/* ALTRE SPECIALISTICHE (Cross-linking) */}
          <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>Dermatologi Roma</a>
              <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>Dentisti Roma</a>
              <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>Cardiologi Roma</a>
            </div>
          </div>

          {/* FAQ (3 DOMANDE) */}
          <div style={{ paddingBottom: '60px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>FAQ Diagnostica</h3>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: '800', marginBottom: '5px' }}>1. I referti sono disponibili online?</p>
              <p style={{ color: '#475569' }}>Sì, quasi tutti i centri permettono il ritiro digitale tramite portale dedicato.</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: '800', marginBottom: '5px' }}>2. Serve l'impegnativa del medico?</p>
              <p style={{ color: '#475569' }}>È obbligatoria per prestazioni in convenzione SSN, non sempre richiesta per visite private.</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontWeight: '800', marginBottom: '5px' }}>3. Come si prenota?</p>
              <p style={{ color: '#475569' }}>Puoi chiamare direttamente il centro scelto usando i tasti rapidi qui sopra.</p>
            </div>
          </div>

        </main>
      </div>

      {/* FOOTER - Integrale e bloccato in fondo */}
      <Footer />
    </div>
  );
}
