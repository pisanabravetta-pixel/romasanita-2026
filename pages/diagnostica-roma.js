import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head><title>Diagnostica Roma | Centri {currentYear}</title></Head>
      <Navbar />

      <main style={{ flex: '1', backgroundColor: '#f1f5f9' }}>
        {/* TOP BAR */}
        <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900' }}>
          🔵 DISPONIBILITÀ {currentMonth.toUpperCase()} {currentYear}
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
          
          {/* LINK RITORNO */}
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', display: 'block', marginBottom: '20px' }}>← TORNA ALLA HOME</a>

          {/* HERO */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            <h1 style={{ color: '#1e3a8a', fontWeight: '900' }}>Diagnostica a Roma</h1>
            <p style={{ color: '#475569' }}>Cerca centri diagnostici e laboratori analisi nei principali quartieri di Roma.</p>
          </div>

          {/* BOX LISTA */}
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', marginBottom: '20px', borderLeft: v.is_top ? '8px solid #1e3a8a' : '1px solid #e2e8f0', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '15px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}

          {/* CTA PROFESSIONISTI */}
          <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ fontWeight: '900' }}>Gestisci un centro diagnostico?</h2>
            <p>Raggiungi più pazienti a Roma con ServiziSalute.</p>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '15px 30px', borderRadius: '12px', display: 'inline-block', textDecoration: 'none', fontWeight: '900', marginTop: '10px' }}>ISCRIVITI ORA</a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
