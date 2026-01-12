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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      
      <Navbar />

      {/* Contenitore che si allunga e spinge il footer */}
      <div style={{ flex: '1 0 auto' }}>
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
          
          <div style={{ margin: '20px 0' }}>
            <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800' }}>← TORNA ALLA HOME</a>
          </div>

          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', marginBottom: '20px' }}>Diagnostica a Roma</h1>

          {/* CERCA PER QUARTIERE */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: '800', marginBottom: '10px' }}>Cerca per Quartiere:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieri.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '8px 12px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '8px', textDecoration: 'none', fontSize: '12px' }}>{q}</a>
              ))}
            </div>
          </div>

          {/* LISTA BOX AGGIORNATI (FUORI DALLA GRID VECCHIA) */}
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '30px', 
              padding: '40px', 
              marginBottom: '30px', 
              border: v.is_top ? '3px solid #1e3a8a' : '1px solid #e2e8f0',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '900', margin: '0 0 10px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '25px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>
                )}
                <a href={`http://google.com/maps?q=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ flex: '1', minWidth: '150px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}

          {/* CTA PROFESSIONISTI */}
          <div style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '30px', textAlign: 'center', color: 'white', margin: '40px 0' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900' }}>Gestisci un Centro?</h2>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>PUBBLICA ORA</a>
          </div>

          {/* CROSS-LINKING ALTRE SPECIALISTICHE */}
          <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: '900', marginBottom: '15px' }}>Altre Specialistiche a Roma:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '700' }}>Dermatologi Roma</a>
              <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '700' }}>Dentisti Roma</a>
              <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: '700' }}>Cardiologi Roma</a>
            </div>
          </div>

          {/* 3 FAQ */}
          <div style={{ marginTop: '50px', paddingBottom: '50px' }}>
            <h3 style={{ fontWeight: '900', fontSize: '22px', marginBottom: '20px' }}>FAQ Diagnostica</h3>
            <p><strong>1. Referti online?</strong><br/>Sì, disponibili nella maggior parte dei centri.</p><br/>
            <p><strong>2. Serve la ricetta?</strong><br/>Solo per il regime SSN.</p><br/>
            <p><strong>3. Tempi di attesa?</strong><br/>In media 24-48 ore per i privati.</p>
          </div>

        </div>
      </div>

      {/* FOOTER INTEGRALE - Ora deve apparire per forza */}
      <Footer />
    </div>
  );
}
