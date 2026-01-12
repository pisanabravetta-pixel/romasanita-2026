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
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        CENTRI DIAGNOSTICI A ROMA - AGGIORNAMENTO GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* LINK RITORNO */}
        <div style={{ margin: '15px 0' }}>
          <a href="/visite-specialistiche-roma" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900' }}>
            ← TORNA A TUTTE LE SPECIALISTICHE
          </a>
        </div>

        {/* TITOLO H1 */}
        <div style={{ margin: '20px 0 40px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>Trova centri analisi e radiologia per quartiere.</p>
        </div>

        {/* QUARTIERI */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '10px 16px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX CON CHIAMA, WA E MAPPA */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '30px', padding: '40px', marginBottom: '30px', 
              border: v.is_top ? '5px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 10px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '20px', color: '#475569', marginBottom: '30px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
                
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>
                )}
                
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '150px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '25px', border: '1px solid #e2e8f0', marginBottom: '50px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Cardiologi</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '20px' }}>FAQ</h3>
          <p><strong>1. Come ritiro i referti?</strong> — Quasi tutti i centri offrono il download online.</p><br/>
          <p><strong>2. Serve l'impegnativa?</strong> — Solo se prenoti con il SSN.</p><br/>
          <p><strong>3. Orari di apertura?</strong> — Variano per centro, chiama per conferma.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
