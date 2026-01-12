import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];
  
  const altre = [
    { n: "Dermatologi Roma", l: "/dermatologi-roma" },
    { n: "Dentisti Roma", l: "/dentisti-roma" },
    { n: "Cardiologi Roma", l: "/cardiologi-roma" },
    { n: "Ginecologi Roma", l: "/ginecologi-roma" }
  ];

  useEffect(() => {
    async function fetchDocs() {
      const { data } = await supabase.from('annunci').select('*').eq('approvato', true).ilike('categoria', '%diagnostica%').order('is_top', { ascending: false });
      if (data) setCentri(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <div style={{ display: 'block', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      
      <Navbar />

      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      {/* CONTENITORE PRINCIPALE */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        
        {/* RITORNO HOME */}
        <div style={{ margin: '20px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800' }}>← TORNA ALLA HOME</a>
        </div>

        {/* HEADER */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', marginBottom: '30px', borderLeft: '8px solid #1e3a8a', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '17px', margin: 0 }}>Trova i migliori laboratori per analisi cliniche e radiologia.</p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '8px 12px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* BOX ANNUNCI - STILE RINFORZATO */}
        {loading ? <p>Caricamento...</p> : centri.map((v) => (
          <div key={v.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: '25px', 
            padding: '30px', 
            marginBottom: '20px', 
            border: v.is_top ? '3px solid #1e3a8a' : '1px solid #e2e8f0', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'block' 
          }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 5px 0', fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
            <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '120px', backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
              {v.whatsapp && (
                <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '120px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
              )}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ flex: '1', minWidth: '120px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
            </div>
          </div>
        ))}

        {/* CTA NERA */}
        <div style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '25px', textAlign: 'center', color: 'white', marginTop: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ marginBottom: '20px', color: '#94a3b8' }}>Aggiungi la tua struttura su ServiziSalute Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {altre.map(s => (
              <a key={s.n} href={s.l} style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>{s.n}</a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '40px', paddingBottom: '60px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '22px', marginBottom: '20px' }}>FAQ</h3>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontWeight: '800', marginBottom: '5px' }}>1. Referti online?</p>
            <p style={{ color: '#475569' }}>Sì, la maggior parte dei centri offre il ritiro digitale.</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontWeight: '800', marginBottom: '5px' }}>2. Serve la ricetta?</p>
            <p style={{ color: '#475569' }}>Solo per prestazioni in convenzione SSN.</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontWeight: '800', marginBottom: '5px' }}>3. Tempi di attesa?</p>
            <p style={{ color: '#475569' }}>Solitamente 24-48 ore per i centri privati.</p>
          </div>
        </div>

      </div>

      <Footer />
      
      {/* SPAZIATORE FINALE PER EVITARE TAGLI */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}
