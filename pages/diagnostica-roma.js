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

  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

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
      } catch (err) {
        console.error("Errore database:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Diagnostica Roma | Centri e Laboratori {currentYear}</title>
        <meta name="description" content={`Migliori centri diagnostici a Roma aggiornati a ${currentMonth} ${currentYear}.`} />
      </Head>

      <Navbar />

      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ CENTRI: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800' }}>← TORNA ALLA HOME</a>
        </nav>

        {/* TITOLO E DESCRIZIONE */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '8px solid #1e3a8a' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', margin: '0 0 15px 0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6' }}>
            Trova i centri d'eccellenza per analisi cliniche e radiologia a Roma.
          </p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '10px 15px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid #dbeafe' }}>
                {q}
              </a>
            ))}
          </div>
        </div>

        {/* LISTA BOX NUOVI (3 TASTI) */}
        <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '20px', color: '#0f172a' }}>Risultati a Roma</h2>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Caricamento...</div>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '28px', padding: '30px', marginBottom: '20px', border: v.is_top ? '3px solid #1e3a8a' : '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: 0, fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
                  <p style={{ margin: '8px 0', color: '#64748b', fontSize: '16px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>TOP PARTNER</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center' }}>Nessuna struttura trovata.</div>
        )}

        {/* 3 FAQ */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '40px', borderRadius: '30px', border: '1px solid #e2e8f0', marginBottom: '50px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '24px', marginBottom: '30px', color: '#1e3a8a' }}>FAQ Diagnostica</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <p style={{ fontWeight: '900', marginBottom: '10px' }}>1. Posso scaricare i referti online?</p>
              <p style={{ color: '#475569' }}>Sì, la maggior parte dei centri partner a Roma offre il portale per lo scarico digitale dei risultati.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', marginBottom: '10px' }}>2. Accettate la convenzione SSN?</p>
              <p style={{ color: '#475569' }}>Alcuni centri sono accreditati. Ti consigliamo di chiamare per verificare se l'esame specifico è coperto da ticket.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', marginBottom: '10px' }}>3. Quali sono i tempi di attesa?</p>
              <p style={{ color: '#475569' }}>Grazie al nostro portale puoi contattare centri con disponibilità immediata, spesso entro 24/48 ore.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
