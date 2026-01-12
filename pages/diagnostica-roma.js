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
    { nome: "Ginecologi Roma", link: "/ginecologi-roma" },
    { nome: "Oculisti Roma", link: "/oculisti-roma" }
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
    <div id="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head><title>Diagnostica Roma | Centri 2026</title></Head>
      
      <Navbar />

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '14px', textAlign: 'center', fontWeight: '800', fontSize: '14px' }}>
        <strong>DISPONIBILITÀ AGGIORNATA: GENNAIO 2026</strong>
      </div>

      {/* MAIN CONTENT - flex-grow assicura che il footer stia in basso */}
      <main style={{ flexGrow: 1, maxWidth: '1000px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* LINK RITORNO */}
        <div style={{ marginBottom: '20px' }}>
          <a href="/visite-specialistiche-roma" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Torna a tutte le specialistiche
          </a>
        </div>

        {/* TITOLO H1 */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '25px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: 0 }}>Trova i migliori laboratori per analisi cliniche e radiologia nella Capitale.</p>
        </div>

        {/* SEZIONE QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '15px', color: '#1e3a8a', textTransform: 'uppercase' }}>Cerca per Quartiere</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '8px 14px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX - STRUTTURA RINFORZATA */}
        <div id="results-container">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento centri...</p>
          ) : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '35px', // Angoli molto arrotondati come richiesto
              padding: '40px', 
              marginBottom: '30px', 
              border: v.is_top ? '4px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 12px 24px rgba(0,0,0,0.07)',
              position: 'relative'
            }}>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '28px', fontWeight: '900' }}>{v.nome}</h3>
                <p style={{ fontSize: '18px', color: '#475569', margin: 0 }}>📍 {v.indirizzo} — <span style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{v.zona}</span></p>
              </div>
              
              {/* BOTTONI AZIONE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '17px' }}>📞 CHIAMA ORA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '17px' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '17px', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BOX PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '50px 30px', borderRadius: '35px', textAlign: 'center', color: 'white', marginTop: '50px', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '30px' }}>Unisciti al network di ServiziSalute e ottieni nuovi pazienti ogni mese.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '18px 40px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', fontSize: '18px' }}>ISCRIVI LA TUA STRUTTURA</a>
        </div>

        {/* ALTRE SPECIALISTICHE (CROSS-LINKING) */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '25px', marginBottom: '60px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Altre Specialistiche a Roma</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.link} style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '15px', borderBottom: '2px solid #eff6ff' }}>{s.nome}</a>
            ))}
          </div>
        </div>

        {/* FAQ - CON PADDING EXTRA PER SALVARE IL FOOTER */}
        <div style={{ paddingBottom: '100px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '30px' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '18px' }}>Quanto costa una visita a Roma?</p>
            <p style={{ color: '#475569' }}>I prezzi variano in base al centro e alla convenzione. Contatta le strutture per un preventivo immediato.</p>
          </div>
          <div style={{ marginBottom: '25px' }}>
            <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '18px' }}>Posso prenotare con WhatsApp?</p>
            <p style={{ color: '#475569' }}>Sì, la maggior parte dei centri diagnostici su ServiziSalute risponde in pochi minuti via chat.</p>
          </div>
          <div>
            <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '18px' }}>Come ritiro i referti?</p>
            <p style={{ color: '#475569' }}>Quasi tutti i centri offrono il portale referti online per evitare di tornare fisicamente in sede.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
