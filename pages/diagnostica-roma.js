import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];
  const altreSpecialistiche = [
    { nome: "Dentisti Roma", link: "/dentisti-roma" },
    { nome: "Dermatologi Roma", link: "/dermatologi-roma" },
    { nome: "Cardiologi Roma", link: "/cardiologi-roma" },
    { nome: "Ginecologi Roma", link: "/ginecologi-roma" }
  ];

  useEffect(() => {
    async function fetchDiagnostica() {
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', '%diagnostica%')
          .order('is_top', { ascending: false });
        if (!error && data) setCentri(data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ display: 'block', backgroundColor: '#f8fafc' }}>
      <Head><title>Diagnostica Roma | Centri Analisi 2026</title></Head>
      <Navbar />

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '15px', textAlign: 'center', fontWeight: '800' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        
        {/* RITORNO HOME */}
        <div style={{ padding: '20px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900' }}>← TORNA A TUTTE LE SPECIALISTICHE</a>
        </div>

        {/* HEADER H1 */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', marginBottom: '30px', borderLeft: '10px solid #1e3a8a', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '35px', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '18px' }}>Trova i migliori laboratori per analisi cliniche e radiologia a Roma.</p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '8px 15px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX NUOVI (3 TASTI) */}
        {loading ? <p>Caricamento...</p> : centri.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '30px', padding: '35px', marginBottom: '25px', border: v.is_top ? '3px solid #1e3a8a' : '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '26px', fontWeight: '900' }}>{v.nome}</h3>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '25px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
              {v.whatsapp && (
                <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>
              )}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
            </div>
          </div>
        ))}

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '50px', borderRadius: '30px', textAlign: 'center', color: 'white', marginTop: '40px' }}>
          <h2 style={{ fontWeight: '900' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ marginBottom: '30px' }}>Inserisci la tua struttura su ServiziSalute Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 40px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE (CROSS-LINKING) */}
        <div style={{ marginTop: '60px', padding: '30px', backgroundColor: '#fff', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '20px' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.link} style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', borderBottom: '2px solid #e2e8f0' }}>{s.nome}</a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '60px', paddingBottom: '100px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '24px', marginBottom: '20px' }}>FAQ</h3>
          <p style={{ fontWeight: 'bold' }}>I referti sono online?</p>
          <p style={{ marginBottom: '20px' }}>Sì, la maggior parte dei centri offre il ritiro digitale.</p>
          <p style={{ fontWeight: 'bold' }}>Serve la ricetta?</p>
          <p style={{ marginBottom: '20px' }}>Per le prestazioni private no, per quelle in convenzione SSN è obbligatoria.</p>
          <p style={{ fontWeight: 'bold' }}>Come prenoto?</p>
          <p>Usa i tasti Chiama o WhatsApp qui sopra per parlare direttamente con il centro.</p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
