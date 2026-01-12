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
      <Head>
        <title>Diagnostica Roma: Centri Analisi e Radiologia | Gennaio 2026</title>
        <meta name="description" content="Trova i migliori centri di diagnostica a Roma. Prenota analisi del sangue, risonanze e radiografie nei migliori centri della Capitale." />
      </Head>
      
      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ margin: '15px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900', fontSize: '14px' }}>← TUTTE LE SPECIALISTICHE A ROMA</a>
        </div>

        {/* TITOLO SEO H1 */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', marginBottom: '25px', borderLeft: '12px solid #1e3a8a', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Centri di Diagnostica a Roma <br/>
            <span style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>Disponibilità e Orari aggiornati a Gennaio 2026</span>
          </h1>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '8px 15px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX CON 3 BOTTONI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento centri...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '25px', padding: '35px', marginBottom: '25px', 
              border: v.is_top ? '4px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'block', width: '100%' 
            }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '26px', fontWeight: '900' }}>{v.nome}</h3>
              <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '25px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '130px', backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '130px', backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>}
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '130px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '50px 30px', borderRadius: '35px', textAlign: 'center', color: 'white', margin: '50px 0' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '10px' }}>Gestisci un Centro Diagnostico a Roma?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Ricevi contatti diretti da pazienti nella tua zona.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '18px 35px', borderRadius: '12px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>PUBBLICA LA TUA STRUTTURA</a>
        </div>

        {/* ALTRE SPECIALISTICHE (CROSS-LINKING COMPLETO) */}
        <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '25px', border: '1px solid #e2e8f0', marginBottom: '50px' }}>
          <h3 style={{ fontSize: '19px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/oculisti-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Oculisti</a>
            <a href="/ortopedici-roma" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>Ortopedici</a>
          </div>
        </div>

        {/* FAQ - 3 DOMANDE */}
        <div style={{ paddingBottom: '50px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#1e3a8a' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: '800', fontSize: '18px', marginBottom: '5px' }}>1. I referti della diagnostica sono online?</p>
            <p style={{ color: '#475569' }}>Sì, la maggior parte dei centri privati a Roma fornisce le credenziali per scaricare i referti via web.</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: '800', fontSize: '18px', marginBottom: '5px' }}>2. Serve l'impegnativa del medico curante?</p>
            <p style={{ color: '#475569' }}>Per le prestazioni in regime privato non è necessaria, mentre è obbligatoria per il regime convenzionato SSN.</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: '800', fontSize: '18px', marginBottom: '5px' }}>3. Come prenoto un esame radiologico?</p>
            <p style={{ color: '#475569' }}>Puoi contattare direttamente i centri cliccando sul tasto "Chiama" presente nelle schede qui sopra.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
