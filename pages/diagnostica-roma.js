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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Diagnostica Roma | Centri Analisi e Radiologia 2026</title>
      </Head>

      <Navbar />

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '15px', textAlign: 'center', fontWeight: '950', fontSize: '14px', zIndex: 10 }}>
        🔵 DISPONIBILITÀ AGGIORNATA: GENNAIO 2026
      </div>

      {/* WRAPPER CONTENUTO - flex-grow spinge il footer in basso */}
      <div style={{ flex: '1 0 auto' }}>
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
          
          <nav style={{ padding: '20px 0' }}>
            <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '900', fontSize: '16px' }}>
              ← TORNA ALLA HOME
            </a>
          </nav>

          {/* H1 E DESCRIZIONE */}
          <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '40px', marginBottom: '40px', borderLeft: '15px solid #1e3a8a', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '42px', fontWeight: '950', margin: '0 0 15px 0' }}>Diagnostica a Roma</h1>
            <p style={{ color: '#475569', fontSize: '20px', lineHeight: '1.6' }}>Trova i migliori laboratori per analisi cliniche e radiologia nella Capitale.</p>
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

          {/* BOX RISULTATI GIGANTI */}
          {loading ? <p style={{textAlign:'center', padding:'50px'}}>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '50px', 
              padding: '60px', 
              marginBottom: '40px', 
              border: v.is_top ? '6px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.1)',
              display: 'block'
            }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 15px 0', fontSize: '34px', fontWeight: '950' }}>{v.nome}</h3>
              <p style={{ fontSize: '22px', color: '#64748b', marginBottom: '40px' }}>📍 {v.indirizzo} — <strong style={{color:'#1e3a8a'}}>{v.zona}</strong></p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '24px', borderRadius: '25px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>📞 CHIAMA ORA</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ backgroundColor: '#22c55e', color: 'white', padding: '24px', borderRadius: '25px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>💬 WHATSAPP</a>}
                <a href={`http://google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '24px', borderRadius: '25px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '18px' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}

          {/* CTA PROFESSIONISTI - BOX NERO */}
          <div style={{ backgroundColor: '#0f172a', padding: '70px 40px', borderRadius: '50px', textAlign: 'center', color: 'white', marginTop: '60px', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
            <p style={{ fontSize: '20px', color: '#94a3b8', marginBottom: '40px' }}>Aumenta la tua visibilità a Roma con ServiziSalute.</p>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '25px 50px', borderRadius: '20px', fontWeight: '900', textDecoration: 'none', fontSize: '20px', display: 'inline-block' }}>ISCRIVI LA TUA STRUTTURA</a>
          </div>

          {/* ALTRE SPECIALISTICHE (CROSS-LINKING) */}
          <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '40px', marginBottom: '60px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '30px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
              {altreSpecialistiche.map(s => (
                <a key={s.nome} href={s.link} style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none', fontSize: '18px', borderBottom: '3px solid #eff6ff' }}>{s.nome}</a>
              ))}
            </div>
          </div>

          {/* FAQ - TUTTE E 3 PRESENTI */}
          <div style={{ paddingBottom: '120px' }}>
            <h3 style={{ fontSize: '30px', fontWeight: '950', marginBottom: '40px', color: '#1e3a8a' }}>Domande Frequenti (FAQ)</h3>
            <div style={{ marginBottom: '35px' }}>
              <p style={{ fontWeight: '900', fontSize: '22px', marginBottom: '10px' }}>1. I referti si possono ritirare online?</p>
              <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6' }}>Sì, la maggior parte dei centri indicati offre il download digitale protetto tramite il proprio portale.</p>
            </div>
            <div style={{ marginBottom: '35px' }}>
              <p style={{ fontWeight: '900', fontSize: '22px', marginBottom: '10px' }}>2. È necessaria la prenotazione?</p>
              <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6' }}>Per analisi semplici spesso non serve, ma per ecografie, risonanze e TAC è fondamentale prenotare tramite i tasti sopra.</p>
            </div>
            <div style={{ marginBottom: '35px' }}>
              <p style={{ fontWeight: '900', fontSize: '22px', marginBottom: '10px' }}>3. I centri sono convenzionati con il SSN?</p>
              <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6' }}>Alcune strutture sono accreditate. Ti consigliamo di chiedere conferma telefonicamente prima di recarti in sede.</p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
