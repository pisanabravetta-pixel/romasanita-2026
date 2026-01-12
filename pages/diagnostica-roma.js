import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Diagnostica Roma | Centri Analisi Gennaio 2026</title>
      </Head>

      <Navbar />

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '15px', textAlign: 'center', fontWeight: '900', fontSize: '14px', letterSpacing: '0.5px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      {/* CONTENITORE PRINCIPALE - con padding bottom extra per non tagliare il footer */}
      <main style={{ flex: '1 0 auto', maxWidth: '1100px', margin: '0 auto', padding: '20px 20px 100px 20px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* LINK RITORNO HOME (BREADCRUMB) */}
        <nav style={{ padding: '10px 0 30px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← TORNA ALLA HOME
          </a>
        </nav>

        {/* TITOLO H1 E DESCRIZIONE */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '40px', borderTop: '8px solid #1e3a8a' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '38px', fontWeight: '900', margin: '0 0 15px 0', lineHeight: '1.1' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
            Trova i migliori laboratori per analisi cliniche, ecografie e radiologia a <strong>Roma</strong>. Contatta direttamente le strutture per prenotazioni e orari.
          </p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '25px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '1px' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '12px 18px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #dbeafe', transition: 'all 0.2s' }}>
                {q}
              </a>
            ))}
          </div>
        </div>

        {/* LISTA BOX NUOVI (3 TASTI GRANDI) */}
        <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '25px', color: '#0f172a' }}>Centri disponibili a Roma</h2>

        {loading ? (
          <div style={{ padding: '50px', textAlign: 'center', fontSize: '18px', fontWeight: '700', color: '#64748b' }}>Ricerca centri in corso...</div>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '32px', padding: '35px', marginBottom: '25px', border: v.is_top ? '3px solid #1e3a8a' : '1px solid #e2e8f0', boxShadow: '0 15px 40px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '25px' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '26px', fontWeight: '900' }}>{v.nome}</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '18px', fontWeight: '500' }}>📍 {v.indirizzo} — <strong style={{color: '#1e3a8a'}}>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '14px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}>TOP PARTNER</span>}
              </div>

              {/* GRIGLIA 3 BOTTONI */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '16px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px' }}>📞 CHIAMA ORA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '16px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '16px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '60px', textAlign: 'center', backgroundColor: 'white', borderRadius: '30px', color: '#64748b' }}>Nessun centro diagnostico trovato.</div>
        )}

        {/* CTA PER PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '50px 30px', borderRadius: '35px', marginTop: '60px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '30px' }}>Unisciti a ServiziSalute e aumenta la tua visibilità a Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px 40px', borderRadius: '18px', fontWeight: '900', textDecoration: 'none', fontSize: '18px', display: 'inline-block' }}>ISCRIVI LA TUA STRUTTURA</a>
        </div>

        {/* SEZIONE 3 FAQ */}
        <section style={{ marginTop: '70px', backgroundColor: 'white', padding: '45px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '900', fontSize: '26px', marginBottom: '35px', color: '#1e3a8a', textAlign: 'center' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
              <p style={{ fontWeight: '900', fontSize: '19px', color: '#1e3a8a', marginBottom: '10px' }}>1. Come posso prenotare un esame oggi?</p>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>Puoi utilizzare i tasti di chiamata diretta o WhatsApp presenti in ogni box per parlare subito con la segreteria del centro.</p>
            </div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
              <p style={{ fontWeight: '900', fontSize: '19px', color: '#1e3a8a', marginBottom: '10px' }}>2. I risultati delle analisi sono disponibili online?</p>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>La maggior parte dei centri a Roma fornisce un codice per scaricare i referti via web senza dover tornare fisicamente in sede.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', fontSize: '19px', color: '#1e3a8a', marginBottom: '10px' }}>3. I centri sono convenzionati con le assicurazioni?</p>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>Sì, molti centri collaborano con le principali assicurazioni sanitarie. Ti consigliamo di specificarlo durante la prenotazione telefonica.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER INTEGRALE - Senza tagli grazie al minHeight:100vh del contenitore padre */}
      <Footer />
    </div>
  );
}
