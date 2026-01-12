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
    { n: "Cardiologi Roma", l: "/cardiologi-roma" }
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
    <div className="specialistica-main-container">
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      <Navbar />

      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '15px', textAlign: 'center', fontWeight: '800' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ padding: '20px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900' }}>← TORNA A TUTTE LE SPECIALISTICHE</a>
        </div>

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '35px', marginBottom: '30px', borderLeft: '12px solid #1e3a8a', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', margin: '0 0 10px 0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '18px' }}>Trova i migliori laboratori per analisi cliniche e radiologia.</p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '900', marginBottom: '15px' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '10px 15px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX NUOVI */}
        {loading ? <p>Caricamento...</p> : centri.map((v) => (
          <div key={v.id} className={`box-gigante-nuovo ${v.is_top ? 'is-top' : ''}`}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '28px', fontWeight: '900' }}>{v.nome}</h3>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            
            <div className="grid-bottoni-nuovi">
              <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
              {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
            </div>
          </div>
        ))}

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '50px', borderRadius: '40px', textAlign: 'center', color: 'white', marginTop: '40px' }}>
          <h2 style={{ fontWeight: '900' }}>Gestisci un Centro Diagnostico?</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 40px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE CATEGORIE (Cross-linking) */}
        <div style={{ marginTop: '60px', padding: '30px', backgroundColor: 'white', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '20px' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {altre.map(s => (
              <a key={s.n} href={s.l} style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none', borderBottom: '2px solid #eff6ff' }}>{s.n}</a>
            ))}
          </div>
        </div>

        {/* FAQ & SPAZIO PER FOOTER */}
        <div style={{ marginTop: '60px', paddingBottom: '120px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '24px', marginBottom: '20px' }}>FAQ</h3>
          <p style={{ fontWeight: 'bold' }}>I referti sono online?</p>
          <p style={{ marginBottom: '15px' }}>Sì, la maggior parte dei centri offre il ritiro digitale.</p>
          <p style={{ fontWeight: 'bold' }}>Serve la ricetta?</p>
          <p style={{ marginBottom: '15px' }}>Per le prestazioni private no, per quelle SSN sì.</p>
          <p style={{ fontWeight: 'bold' }}>Come prenoto?</p>
          <p>Usa i tasti Chiama o WhatsApp qui sopra.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
