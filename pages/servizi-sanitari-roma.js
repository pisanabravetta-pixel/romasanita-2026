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
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .order('is_top', { ascending: false })
          .limit(10); 
          
        if (!error && data) setAnnunci(data);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTutti();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Servizi Sanitari Roma – Cerca per Quartiere e Zona | ServiziSalute</title>
        <meta name="description" content="Mappa completa dei servizi sanitari a Roma. Trova farmacie, dentisti e specialisti nel tuo quartiere. La guida alla salute zona per zona aggiornata al 2026." />
      </Head>

      <div style={{ backgroundColor: '#334155', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        📍 MAPPA COMPLETA DEI SERVIZI SANITARI A ROMA - GENNAIO 2026
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {quartieri.map(q => (
            <div key={q} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>{q}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href={`/farmacie-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>• Farmacie {q}</a>
                <a href={`/dentisti-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>• Dentisti {q}</a>
                <a href={`/dermatologi-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#ea580c', textDecoration: 'none', fontWeight: 'bold' }}>• Dermatologi {q}</a>
                <a href={`/diagnostica-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontSize: '13px', color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>• Centri Diagnostici</a>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 ANTEPRIMA ULTIMI INSERITI */}
        <h2 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '20px', fontWeight: '800' }}>Professionisti in evidenza a Roma</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {loading ? (
            <p>Caricamento...</p>
          ) : annunci.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ color: '#334155', margin: '0 0 10px 0', fontSize: '18px', fontWeight: '700' }}>{v.nome}</h3>
                {v.is_top && <span style={{ fontSize: '10px', backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '14px', margin: '5px 0' }}>📍 <strong>{v.zona}</strong> — <span style={{color: '#64748b'}}>{v.categoria}</span></p>
              <a href={`/servizi-sanitari-roma-${v.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: '#334155', fontWeight: '700', textDecoration: 'underline' }}>Vedi tutti a {v.zona} →</a>
            </div>
          ))}
        </div>

        {/* 🔹 TESTO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginTop: '50px', lineHeight: '1.8', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#0f172a', fontSize: '24px' }}>La tua guida alla sanità locale a Roma</h2>
          <p>Roma è una metropoli complessa e trovare il servizio sanitario giusto vicino a casa può fare la differenza, specialmente in situazioni di urgenza o per visite frequenti. <strong>ServiziSalute</strong> nasce per mappare ogni angolo della Capitale, offrendo una panoramica trasparente e immediata su ciò che ogni quartiere offre, migliorando l'accessibilità alle cure per tutti i cittadini (Gennaio 2026).</p>
        </div>
        {/* 🔹 SEZIONE CTA HUB GEOGRAFICO (SERVIZI SANITARI ROMA) */}
        <section style={{ 
          backgroundColor: '#ffffff', 
          padding: '50px 30px', 
          borderRadius: '32px', 
          marginTop: '60px', 
          textAlign: 'center', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '800', marginBottom: '15px' }}>
            La tua attività non è ancora sulla mappa?
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            Migliaia di cittadini a Roma cercano servizi sanitari nel proprio quartiere ogni giorno. Non perdere l'opportunità di essere trovato da chi vive vicino al tuo studio o alla tua struttura.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#10b981', 
              color: 'white', 
              padding: '18px 35px', 
              borderRadius: '16px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              fontSize: '17px',
              boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)'
            }}>
              📍 Inserisci la tua attività
            </a>
            <a href="/per-i-professionisti" style={{ 
              backgroundColor: 'white', 
              color: '#0f172a', 
              padding: '18px 35px', 
              borderRadius: '16px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              fontSize: '17px',
              border: '1px solid #e2e8f0'
            }}>
              Vantaggi per le strutture
            </a>
          </div>
          <p style={{ marginTop: '20px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
            Ottimizzazione SEO locale inclusa • Presenza su Roma Gennaio 2026
          </p>
        </section>
      </main>

      {/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '60px' }}>
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
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
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
