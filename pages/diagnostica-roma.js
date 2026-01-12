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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      
      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center' }}>
        <strong style={{ textTransform: 'uppercase' }}>Tutti i Centri di Diagnostica a Roma — Gennaio 2026</strong>
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* LINK RITORNO */}
        <div style={{ margin: '15px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>← TORNA ALLA HOME</a>
        </div>

        {/* TITOLO H1 */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '38px', fontWeight: '900', margin: '0 0 10px 0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '19px' }}>Trova centri analisi, laboratori e radiologia vicino a te.</p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '10px 18px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX GIGANTI - 3 BOTTONI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '35px', padding: '45px', marginBottom: '30px', 
              border: v.is_top ? '6px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.06)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '30px', fontWeight: '950', margin: '0 0 10px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '20px', color: '#475569', marginBottom: '35px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>📞 CHIAMA</a>
                
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>💬 WHATSAPP</a>
                
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '18px' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA NERA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '60px 40px', borderRadius: '40px', textAlign: 'center', color: 'white', margin: '60px 0' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '35px' }}>Inserisci la tua struttura e ricevi prenotazioni dirette.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px 40px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI GRATIS</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '35px', backgroundColor: 'white', borderRadius: '30px', border: '1px solid #e2e8f0', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/oculisti-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Oculisti</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '60px' }}>
          <h3 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '25px', color: '#1e3a8a' }}>Domande Frequenti</h3>
          <p style={{ fontWeight: '900', fontSize: '18px' }}>1. I referti sono online?</p>
          <p style={{ color: '#475569', fontSize: '17px', marginBottom: '20px' }}>Sì, la quasi totalità dei centri diagnostici a Roma offre il download dei risultati via web.</p>
          
          <p style={{ fontWeight: '900', fontSize: '18px' }}>2. Serve l'impegnativa del medico?</p>
          <p style={{ color: '#475569', fontSize: '17px', marginBottom: '20px' }}>È necessaria solo per le prestazioni tramite Servizio Sanitario Nazionale (SSN).</p>
          
          <p style={{ fontWeight: '900', fontSize: '18px' }}>3. Come posso prenotare?</p>
          <p style={{ color: '#475569', fontSize: '17px' }}>Puoi usare i tasti rapidi Chiama o WhatsApp che trovi in ogni scheda centro sopra.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
