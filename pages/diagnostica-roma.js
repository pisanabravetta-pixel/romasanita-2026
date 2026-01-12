import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

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
        <title>Diagnostica Roma | Centri Analisi e Radiologia Gennaio 2026</title>
      </Head>
      
      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center' }}>
        <strong style={{ textTransform: 'uppercase' }}>Tutti i Centri di Diagnostica a Roma — Aggiornato Gennaio 2026</strong>
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '1000px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* LINK RITORNO */}
        <div style={{ margin: '15px 0' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>← TORNA ALLA HOME</a>
        </div>

        {/* TITOLO H1 */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '38px', fontWeight: '900', margin: '0' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '19px' }}>Cerca centri analisi e radiologia per quartiere a Roma.</p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ padding: '10px 18px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid #dbeafe' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX GRANDI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '35px', padding: '45px', marginBottom: '30px', 
              border: v.is_top ? '6px solid #1e3a8a' : '1px solid #e2e8f0', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.06)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '30px', fontWeight: '950', margin: '0 0 10px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '20px', color: '#475569', marginBottom: '35px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#1e3a8a', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '18px' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '150px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '20px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '18px' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA NERA */}
        <div style={{ backgroundColor: '#0f172a', padding: '60px 40px', borderRadius: '40px', textAlign: 'center', color: 'white', margin: '60px 0' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '35px' }}>Inserisci la tua struttura e ricevi contatti diretti.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px 40px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '35px', backgroundColor: 'white', borderRadius: '30px', border: '1px solid #e2e8f0', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a href="/dermatologi-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Dermatologi Roma</a>
            <a href="/dentisti-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Dentisti Roma</a>
            <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: '800', textDecoration: 'none' }}>Cardiologi Roma</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '60px' }}>
          <h3 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '25px', color: '#1e3a8a' }}>FAQ Diagnostica</h3>
          <p><strong>1. I referti sono online?</strong> — Sì, quasi tutti i centri li offrono.</p><br/>
          <p><strong>2. Serve ricetta?</strong> — Obbligatoria solo per SSN.</p><br/>
          <p><strong>3. Come prenoto?</strong> — Clicca sul tasto Chiama o WhatsApp sopra.</p>
        </div>

      </main>

      {/* FOOTER MANUALE IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            
            {/* 1️⃣ BLOCCO 1 – LOGO + TESTO (SEO) */}
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>

            {/* 2️⃣ BLOCCO 2 – LINK UTENTI */}
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>
                ● Disponibilità aggiornate: Gennaio 2026
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
              <p style={{ fontSize: '11px', color: '#718096', marginTop: '15px', fontStyle: 'italic', lineHeight: '1.4' }}>
                🔍 Oltre 15.000 ricerche mensili di pazienti registrate a Roma.
              </p>
            </div>

            {/* 3️⃣ BLOCCO 3 – LINK PROFESSIONISTI */}
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                  ⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.
                </p>
              </div>
            </div>

            {/* 4️⃣ BLOCCO 4 – NOTE LEGALI */}
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
              <p style={{ fontSize: '12px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>
                ServiziSalute è un portale di annunci e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.
              </p>
            </div>
          </div>

          {/* 🔒 COPYRIGHT */}
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
