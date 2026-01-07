import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function VisiteSpecialisticheRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Solo Medici e Visite Cliniche
  useEffect(() => {
    async function fetchSpecialisti() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        // Filtra solo medici/specialisti
        .or('categoria.ilike.%Medico%,categoria.ilike.%Visita%,categoria.ilike.%Cardiologi%')
        .eq('approvato', true)
        .order('is_top', { ascending: false })
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMedici(data);
      }
      setLoading(false);
    }
    fetchSpecialisti();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Visite Specialistiche Roma | Prenota il tuo Medico Specialista</title>
        <meta name="description" content="Trova i migliori medici specialisti a Roma. Prenota visite cardiologiche, dermatologiche e ginecologiche nei principali quartieri della Capitale." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#3b82f6', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        {/* TITOLO E INTRO SEO */}
        <h1 style={{ color: '#1e40af', fontSize: '32px', marginBottom: '10px' }}>Visite Specialistiche a Roma</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Ricerca rapida di <strong>medici specialisti nella Capitale</strong>. Contatta direttamente gli studi medici per prenotare visite cliniche e consulenze specialistiche nei principali quartieri.
        </p>
        
        {/* MENU FILTRI - LINK DI RICHIAMO ALLE ZONE (CORRETTO) */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#1e40af', fontSize: '15px' }}>Cerca uno specialista vicino a te:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/medici-roma-centro" style={{ color: '#3b82f6', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 18px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Roma Centro</a>
            <a href="/medici-roma-prati" style={{ color: '#3b82f6', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 18px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Prati</a>
            <a href="/medici-roma-eur" style={{ color: '#3b82f6', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 18px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>EUR</a>
            <a href="/medici-roma-nord" style={{ color: '#3b82f6', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 18px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Roma Nord</a>
          </div>
        </div>

        {/* LISTA MEDICI DINAMICA */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Caricamento medici specialisti...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              position: 'relative'
            }}>
              {v.is_top && (
                <span style={{ position: 'absolute', top: '-10px', right: '20px', backgroundColor: '#3b82f6', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>TOP PARTNER</span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                    {v.categoria}
                  </span>
                  <h3 style={{ margin: '12px 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                  <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', lineHeight: '1.5' }}>
                    {v.descrizione}
                  </p>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`https://wa.me/${v.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', backgroundColor: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', border: '1px solid #3b82f6', color: '#3b82f6', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Studio
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessuno specialista ancora registrato per questa categoria.</p>
          </div>
        )}

        {/* CTA PER MEDICI */}
        <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: '#1e40af', borderRadius: '24px', color: 'white' }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '24px' }}>Sei un Medico Specialista?</h2>
          <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9' }}>
            Unisciti al network di ServiziSalute Roma e rendi il tuo studio facilmente reperibile dai pazienti della Capitale.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#1e40af', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-block' }}>
            Registra il tuo Studio Gratis
          </a>
        </div>
      </main>

      {/* FOOTER SEO */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ color: '#3b82f6', fontSize: '18px', marginBottom: '15px' }}>Esperti in Medicina Specialistica a Roma</h3>
          <p style={{ fontSize: '14px', opacity: '0.7', lineHeight: '1.6', marginBottom: '20px' }}>
            Il portale di riferimento per le visite specialistiche a Roma. Mettiamo in contatto pazienti e medici nei quartieri EUR, Prati, Centro e Roma Nord per garantire un'assistenza sanitaria d'eccellenza.
          </p>
          <p style={{ fontSize: '12px', opacity: '0.5' }}>© 2026 ServiziSalute Roma - Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
