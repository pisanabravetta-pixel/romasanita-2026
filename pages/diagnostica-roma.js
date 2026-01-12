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
    { nome: "Dermatologi Roma", link: "/dermatologi-roma" },
    { nome: "Dentisti Roma", link: "/dentisti-roma" },
    { nome: "Cardiologi Roma", link: "/cardiologi-roma" },
    { nome: "Ginecologi Roma", link: "/ginecologi-roma" }
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9', margin: 0, padding: 0 }}>
      <Head><title>Diagnostica Roma | Gennaio 2026</title></Head>
      <Navbar />

      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '15px', textAlign: 'center', fontWeight: '900', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      <div style={{ flex: '1 0 auto', width: '100%' }}>
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>
          
          {/* LINK RITORNO ALLA HOME */}
          <nav style={{ padding: '20px 0' }}>
            <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900', fontSize: '16px' }}>
              ← TORNA ALLA HOME
            </a>
          </nav>

          {/* TITOLO E DESCRIZIONE */}
          <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '40px', marginBottom: '35px', borderLeft: '15px solid #1e3a8a', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '40px', fontWeight: '950', margin: '0 0 15px 0', lineHeight: '1' }}>Diagnostica a Roma</h1>
            <p style={{ color: '#475569', fontSize: '20px', lineHeight: '1.5', margin: 0 }}>Trova i migliori laboratori per analisi cliniche e radiologia nella Capitale.</p>
          </div>

          {/* CERCA PER QUARTIERE */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '25px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {quartieri.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '12px 20px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '15px', textDecoration: 'none', fontWeight: '800', border: '1px solid #dbeafe' }}>{q}</a>
              ))}
            </div>
          </div>

          {/* LISTA BOX GIGANTI - STILE INLINE TOTALE */}
          {loading ? <p style={{textAlign:'center', padding:'50px'}}>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '45px', 
              padding: '50px', 
              marginBottom: '35px', 
              border: v.is_top ? '5px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
              display: 'block'
            }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '32px', fontWeight: '950' }}>{v.nome}</h3>
              <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '35px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '22px', borderRadius: '20px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>📞 CHIAMA ORA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '22px', borderRadius: '20px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>💬 WHATSAPP</a>}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '22px', borderRadius: '20px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '18px' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}

          {/* CTA PROFESSIONISTI - BOX NERO */}
          <div style={{ backgroundColor: '#0f172a', padding: '60px 40px', borderRadius: '45px', textAlign: 'center', color: 'white', marginTop: '60px', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
            <p style={{ fontSize: '19px', color: '#94a3b8', marginBottom: '35px' }}>Raggiungi migliaia di pazienti a Roma ogni mese.</p>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '22px 45px', borderRadius: '20px', fontWeight: '900', textDecoration: 'none', fontSize: '18px', display: 'inline-block' }}>PUBBLICA IL TUO CENTRO</a>
          </div>

          {/* ALTRE SPECIALISTICHE (CROSS-LINKING) */}
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '35px', marginBottom: '60px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '25px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {altreSpecialistiche.map(s => (
                <a key={s.nome} href={s.link} style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none', fontSize: '17px', borderBottom: '2px solid #eff6ff' }}>{s.nome}</a>
              ))}
            </div>
          </div>

          {/* FAQ E SPAZIATORE ANTI-TAGLIO */}
          <div style={{ paddingBottom: '150px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '30px', color: '#1e3a8a' }}>Domande Frequenti</h3>
            <div style={{ marginBottom: '30px' }}>
              <p style={{ fontWeight: '900', fontSize: '20px', marginBottom: '5px' }}>1. I referti si possono ritirare online?</p>
              <p style={{ color: '#475569', fontSize: '17px' }}>Certamente, quasi tutti i laboratori indicati offrono il download digitale protetto.</p>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <p style={{ fontWeight: '900', fontSize: '20px', marginBottom: '5px' }}>2. È necessaria la prenotazione?</p>
              <p style={{ color: '#475569', fontSize: '17px' }}>Per le analisi del sangue spesso è accesso libero, per ecografie e risonanze è obbligatoria la prenotazione tramite i tasti sopra.</p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
