import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function ServiziSanitariRoma() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);

  const quartieri = [
    'Prati', 'Trastevere', 'EUR', 'Parioli', 'Tiburtina', 'San Giovanni', 
    'Ostiense', 'Testaccio', 'Nomentana', 'Flaminio', 'Monteverde', 
    'Appio Latino', 'Balduina', 'Talenti', 'Eur Torrino', 'Cassia'
  ];

  useEffect(() => {
    async function fetchTutti() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .order('is_top', { ascending: false })
        .limit(10); // Mostriamo solo i top recenti come anteprima
        
      if (!error && data) setAnnunci(data);
      setLoading(false);
    }
    fetchTutti();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Servizi Sanitari Roma – Cerca per Quartiere e Zona | ServiziSalute</title>
        <meta name="description" content="Mappa completa dei servizi sanitari a Roma. Trova farmacie, dentisti e specialisti nel tuo quartiere. La guida alla salute zona per zona." />
      </Head>

      <div style={{ backgroundColor: '#334155', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        📍 MAPPA COMPLETA DEI SERVIZI SANITARI A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#334155', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        {/* 🔹 HERO HUB GEOGRAFICO */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #334155' }}>
          <h1 style={{ color: '#0f172a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Servizi Sanitari per Quartiere</h1>
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '17px', maxWidth: '850px' }}>
            Esplora la mappa della salute di <strong>Roma</strong>. Seleziona il tuo quartiere per visualizzare tutti i professionisti, le farmacie e i centri diagnostici disponibili nella tua zona.
          </p>
        </div>

        {/* 🔹 GRIGLIA QUARTIERI (NAVIGAZIONE PRINCIPALE) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {quartieri.map(q => (
            <div key={q} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#0f172a' }}>{q}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href={`/farmacie-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>• Farmacie {q}</a>
                <a href={`/dentisti-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>• Dentisti {q}</a>
                <a href={`/diagnostica-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>• Centri Diagnostici</a>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 ANTEPRIMA ULTIMI INSERITI */}
        <h2 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '20px' }}>Professionisti in evidenza a Roma</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {loading ? <p>Caricamento...</p> : annunci.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <h3 style={{ color: '#334155', margin: '0 0 10px 0', fontSize: '18px' }}>{v.nome}</h3>
              <p style={{ fontSize: '14px', margin: '5px 0' }}>📍 {v.zona} — <span style={{color: '#64748b'}}>{v.categoria}</span></p>
              <a href={`/servizi-sanitari-roma-${v.zona.toLowerCase()}`} style={{ display: 'inline-block', marginTop: '10px', fontSize: '12px', color: '#334155', fontWeight: 'bold' }}>Vedi tutti a {v.zona} →</a>
            </div>
          ))}
        </div>

        {/* 🔹 TESTO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginTop: '50px', lineHeight: '1.8' }}>
          <h2 style={{ color: '#0f172a' }}>La tua guida alla sanità locale a Roma</h2>
          <p>Roma è una metropoli complessa e trovare il servizio sanitario giusto vicino a casa può fare la differenza, specialmente in situazioni di urgenza o per visite frequenti. <strong>ServiziSalute</strong> nasce per mappare ogni angolo della Capitale, offrendo una panoramica trasparente e immediata su ciò che ogni quartiere offre, migliorando l'accessibilità alle cure per tutti i cittadini.</p>
        </div>
      </main>
{/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
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
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
