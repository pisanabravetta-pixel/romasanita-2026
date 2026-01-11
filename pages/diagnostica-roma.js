import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('diagnostica', 'roma');

  useEffect(() => {
    async function fetchDiagnostica() {
      const queryBusca = getDBQuery('diagnostica'); 
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', `%${queryBusca.cat}%`)
        .eq('approvato', true)
        .order('is_top', { ascending: false });
        
      if (!error && data) setCentri(data);
      setLoading(false);
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Centri Diagnostici a Roma – Analisi, Risonanze e Screening | ServiziSalute</title>
        <meta name="description" content="Trova i migliori centri diagnostici a Roma. Prenota analisi del sangue, ecografie, risonanze e screening preventivi nei principali quartieri." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🔵 CENTRI DIAGNOSTICI E LABORATORI ANALISI A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        {/* 🔹 HERO HUB */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #2563eb' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px', maxWidth: '800px' }}>
            Trova centri d'eccellenza per <strong>analisi cliniche, diagnostica per immagini e screening</strong> a Roma. Dai laboratori in centro alle grandi strutture di EUR e Prati.
          </p>

          {/* 🔹 SEZIONE CATEGORIE INTERNE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '25px' }}>
            {['Analisi del Sangue', 'Ecografie', 'Risonanza Magnetica', 'Check-up Completo'].map(cat => (
              <div key={cat} style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 LISTA ANNUNCI */}
        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Centri disponibili a Roma</h2>
        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : centri.length > 0 ? centri.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #2563eb' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ color: '#1e3a8a', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              {v.is_top && <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
            </div>
            <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun centro diagnostico trovato.</div>
        )}

        {/* 🔹 TESTO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginTop: '40px', lineHeight: '1.8' }}>
          <h2 style={{ color: '#1e3a8a' }}>L'importanza della prevenzione e della diagnostica a Roma</h2>
          <p>Scegliere il giusto <strong>centro diagnostico a Roma</strong> è fondamentale per ottenere referti precisi in tempi brevi. ServiziSalute aggrega i laboratori più affidabili della capitale, permettendoti di filtrare per quartiere e tipologia di esame, garantendo un accesso rapido alle prestazioni di cui hai bisogno.</p>
        </div>

        {/* 🔹 LINK AI QUARTIERI */}
        <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '20px', marginBottom: '15px' }}>Centri Diagnostici nei quartieri</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Prati', 'Trastevere', 'EUR', 'Parioli', 'Tiburtina', 'San Giovanni', 'Ostiense', 'Testaccio'].map(z => (
              <a key={z} href={`/diagnostica-roma-${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: '1px solid #dbeafe' }}>{z}</a>
            ))}
          </div>
        </div>

        {/* 🔹 FAQ */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c' }}>Come prenotare un esame diagnostico?</p>
              <p style={{ color: '#64748b' }}>Puoi contattare direttamente i centri tramite i pulsanti Chiama o WhatsApp presenti in ogni annuncio su ServiziSalute.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c' }}>Quali sono i tempi medi di attesa?</p>
              <p style={{ color: '#64748b' }}>I centri privati presenti sul portale offrono solitamente disponibilità nell'arco di 24-48 ore.</p>
            </div>
          </div>
        </section>

        {/* 🔹 CTA INSERZIONISTI */}
        <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ margin: 0 }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>Inserisci la tua struttura su ServiziSalute e raggiungi nuovi pazienti ogni giorno.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: 'white', color: '#1e3a8a', padding: '15px 40px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Pubblica la tua struttura</a>
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
