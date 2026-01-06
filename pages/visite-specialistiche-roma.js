import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function VisiteSpecialisticheRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera tutti i medici specialisti dal Database
  useEffect(() => {
    async function fetchSpecialisti() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        // Filtriamo per categorie che contengono "Medico" o "Visita"
        .or('categoria.ilike.%Medico%,categoria.ilike.%Visita%')
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
        <meta name="description" content="Trova i migliori medici specialisti a Roma. Prenota visite cardiologiche, dermatologiche e oculistiche nei principali quartieri della Capitale." />
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
          Ricerca rapida di <strong>medici specialisti nella Capitale</strong>. Contatta direttamente gli studi medici per prenotare visite cliniche, esami diagnostici e consulenze specialistiche.
        </p>
        
        {/* MENU FILTRI PER SPECIALITÀ */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#1e40af', fontSize: '15px' }}>Filtra per branca medica:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/cardiologi-roma" style={{ color: '#3b82f6', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 18px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Cardiologia</a>
            {/* Qui potrai aggiungere /dermatologi-roma, /ginecologi-roma, ecc. */}
            <span style={{ fontSize: '13px', color: '#94a3b8', padding: '8px' }}>Altre specialità in arrivo...</span>
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
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                    {v.categoria}
                  </span>
                  <h3 style={{ margin: '12px 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#64748b' }}>📍 {v.indirizzo} ({v.zona})</p>
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

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', opacity: '0.7' }}>© 2026 ServiziSalute Roma - Il network dei medici specialisti a Roma.</p>
      </footer>
    </div>
  );
}
