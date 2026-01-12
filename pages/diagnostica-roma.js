import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentMonth = "Gennaio";
  const currentYear = 2026;

  useEffect(() => {
    async function fetchDiagnostica() {
      try {
        setLoading(true);
        const queryBusca = getDBQuery('diagnostica'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${queryBusca.cat}%`)
          .order('is_top', { ascending: false });
        if (!error && data) setCentri(data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head><title>Diagnostica Roma | Centri Analisi {currentYear}</title></Head>
      <Navbar />

      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '800', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: '1', maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800' }}>← TORNA ALLA HOME</a>
        </nav>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '6px solid #1e3a8a' }}>
          <h1 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569' }}>I migliori centri per esami clinici e diagnostica per immagini a Roma.</p>
        </div>

        {loading ? <p>Caricamento...</p> : centri.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '25px', marginBottom: '20px', border: v.is_top ? '2px solid #1e3a8a' : '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#1e3a8a', margin: 0, fontSize: '22px', fontWeight: '900' }}>{v.nome}</h3>
            <p style={{ margin: '5px 0', color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginTop: '20px' }}>
              <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
              {v.whatsapp && (
                <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
              )}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
            </div>
          </div>
        ))}

        <section style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '40px', color: 'white' }}>
          <h2 style={{ fontWeight: '900' }}>Gestisci un Centro?</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', display: 'inline-block', fontWeight: '800', textDecoration: 'none', marginTop: '15px' }}>PUBBLICA ORA</a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
