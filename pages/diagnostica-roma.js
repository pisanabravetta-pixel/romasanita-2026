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
    <div className="specialistica-main-container">
      <Head><title>Diagnostica Roma | 2026</title></Head>
      <Navbar />
      
      <main style={{ flex: '1 0 auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
          
          <div style={{ margin: '20px 0' }}>
            <a href="/" style={{ fontWeight: '900', color: '#1e3a8a', textDecoration: 'none' }}>← TORNA ALLA HOME</a>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#1e3a8a', marginBottom: '30px' }}>Diagnostica a Roma</h1>

          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} className={`box-gigante-nuovo ${v.is_top ? 'is-top' : ''}`}>
              <h3 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 10px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '25px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div className="grid-bottoni-nuovi">
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>}
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}

          {/* CTA NERA */}
          <div style={{ backgroundColor: '#1a202c', color: 'white', padding: '50px', borderRadius: '30px', textAlign: 'center', margin: '50px 0' }}>
            <h2 style={{ fontWeight: '900' }}>Sei un professionista?</h2>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#3182ce', color: 'white', padding: '15px 35px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginTop: '20px' }}>PUBBLICA IL TUO CENTRO</a>
          </div>

          {/* FAQ */}
          <div style={{ paddingBottom: '80px' }}>
            <h3 style={{ fontWeight: '900', marginBottom: '25px' }}>FAQ</h3>
            <p><strong>1. Referti online?</strong> — Sì, quasi tutti i centri li offrono.</p><br/>
            <p><strong>2. Serve ricetta?</strong> — Solo per convenzioni SSN.</p><br/>
            <p><strong>3. Tempi attesa?</strong> — 24-48 ore per i privati.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
