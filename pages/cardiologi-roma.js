import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function CardiologiRoma() {
  const [specialisti, setSpecialisti] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera tutti i cardiologi di Roma
  useEffect(() => {
    async function fetchTuttiCardiologi() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Visite Specialistiche%')
        .ilike('descrizione', '%cardio%')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSpecialisti(data);
      }
      setLoading(false);
    }
    fetchTuttiCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Cardiologi a Roma | Trova lo Specialista Vicino a Te</title>
        <meta name="description" content="Trova i migliori cardiologi a Roma. Cerca per quartiere, consulta gli studi medici e prenota la tua visita cardiologica o ECG nella capitale." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        {/* NAVIGAZIONE BREADCRUMB */}
        <nav style={{ marginBottom: '20px', fontSize: '14px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Home</a>
          <span style={{ margin: '0 10px', color: '#cbd5e1' }}>/</span>
          <span style={{ color: '#64748b' }}>Cardiologi Roma</span>
        </nav>

        {/* TESTO SEO INTRODUTTIVO */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Cardiologi a Roma</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Trova un <strong>cardiologo a Roma</strong> tra i migliori professionisti selezionati. In questa sezione puoi consultare gli specialisti operanti nei vari quartieri di Roma per esami come ECG, ecocardiogrammi e monitoraggio della pressione.
        </p>

        {/* MENU RAPIDO QUARTIERI (SEO POWER) */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontSize: '15px' }}>Filtra per zona di Roma:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/cardiologi-roma-prati" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Prati</a>
            <span style={{ color: '#cbd5e1', fontSize: '13px', padding: '8px 0' }}>Altre zone in arrivo...</span>
          </div>
        </div>

        {/* LISTA RISULTATI AUTOMATICA */}
        {loading ? (
          <p>Ricerca specialisti in corso...</p>
        ) : specialisti.length > 0 ? (
          specialisti.map((c) => (
            <div key={c.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#2563eb', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                  ZONA {c.zona}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '22px' }}>{c.nome}</h3>
              <p style={{ margin: '0', fontSize: '15px', color: '#64748b', fontWeight: '500' }}>📍 Disponibile a: {c.zona}</p>
              <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', lineHeight: '1.5' }}>{c.descrizione}</p>
              
              <div style={{ marginTop: '20px' }}>
                <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#22c55e', color: 'white', padding: '12px 25px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                   Contatta ora lo specialista
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            Nessun cardiologo registrato attualmente.
          </div>
        )}

        {/* CTA PER INSERZIONISTI (B) */}
        <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Sei un Cardiologo a Roma?</h2>
          <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9' }}>
            Raggiungi nuovi pazienti nella tua zona. Pubblica oggi il tuo profilo professionale su ServiziSalute.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#1e3a8a', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            Pubblica il tuo annuncio gratis
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '15px' }}>ServiziSalute</div>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
            La rete sanitaria digitale di Roma. Mettiamo in contatto pazienti e professionisti senza costi aggiuntivi.
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #1e293b', paddingTop: '20px', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
