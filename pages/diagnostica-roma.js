import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      const { data } = await supabase.from('annunci').select('*').eq('approvato', true).ilike('categoria', '%diagnostica%').order('is_top', { ascending: false });
      if (data) setCentri(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'block' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      <Navbar />

      {/* BARRA AGGIORNAMENTO */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        {/* RITORNO HOME */}
        <div style={{ margin: '30px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900', fontSize: '18px' }}>← TORNA ALLA HOME</a>
        </div>

        {/* INTESTAZIONE */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', marginBottom: '40px', borderLeft: '12px solid #1e3a8a', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '38px', fontWeight: '900', margin: '0 0 10px 0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '19px' }}>I migliori centri per analisi e radiologia aggiornati a Gennaio 2026.</p>
        </div>

        {/* LISTA BOX GIGANTI */}
        {loading ? <p style={{textAlign:'center', padding:'50px'}}>Caricamento centri...</p> : centri.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: '35px', 
            padding: '45px', 
            marginBottom: '30px', 
            border: v.is_top ? '5px solid #1e3a8a' : '1px solid #e2e8f0', 
            boxShadow: '0 15px 30px rgba(0,0,0,0.06)',
            display: 'block'
          }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 10px 0' }}>{v.nome}</h3>
            <p style={{ fontSize: '20px', color: '#475569', marginBottom: '30px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
              <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '17px' }}>📞 CHIAMA ORA</a>
              {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '17px' }}>💬 WHATSAPP</a>}
              <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '17px' }}>🗺️ MAPPA</a>
            </div>
          </div>
        ))}

        {/* CTA NERA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '60px 40px', borderRadius: '40px', textAlign: 'center', color: 'white', margin: '60px 0' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', marginBottom: '15px' }}>Sei il titolare di un centro diagnostico?</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '30px' }}>Inserisci la tua struttura su ServiziSalute Roma per ricevere nuove prenotazioni.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px 40px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', fontSize: '18px', display: 'inline-block' }}>ISCRIVITI GRATIS</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '35px', backgroundColor: 'white', borderRadius: '30px', border: '1px solid #e2e8f0', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Dermatologi Roma</a>
            <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Dentisti Roma</a>
            <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Cardiologi Roma</a>
          </div>
        </div>

        {/* 3 FAQ */}
        <div style={{ paddingBottom: '100px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: '950', marginBottom: '30px', color: '#1e3a8a' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ fontWeight: '900', fontSize: '20px', marginBottom: '8px' }}>1. I referti si ritirano online?</p>
            <p style={{ color: '#475569', fontSize: '18px' }}>Sì, quasi tutti i centri diagnostici a Roma offrono un portale per scaricare i risultati comodamente da casa.</p>
          </div>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ fontWeight: '900', fontSize: '20px', marginBottom: '8px' }}>2. Serve la ricetta medica?</p>
            <p style={{ color: '#475569', fontSize: '18px' }}>Per le analisi in regime privato non è sempre necessaria, mentre è obbligatoria per le prestazioni in convenzione SSN.</p>
          </div>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ fontWeight: '900', fontSize: '20px', marginBottom: '8px' }}>3. Come posso prenotare una visita?</p>
            <p style={{ color: '#475569', fontSize: '18px' }}>Puoi chiamare direttamente i centri cliccando sul tasto blu "Chiama Ora" presente in ogni scheda qui sopra.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
