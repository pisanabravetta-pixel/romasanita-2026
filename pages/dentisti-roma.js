import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function DentistiRoma() {
  const [specialisti, setSpecialisti] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera tutti i dentisti di Roma dal Database
  useEffect(() => {
    async function fetchTuttiDentisti() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Dentisti%')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSpecialisti(data);
      }
      setLoading(false);
    }
    fetchTuttiDentisti();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Dentisti a Roma | Migliori Studi Odontoiatrici per Quartiere</title>
        <meta name="description" content="Cerchi un dentista a Roma? Trova i migliori studi odontoiatrici divisi per quartiere: Prati, EUR, San Giovanni e altri. Prenota la tua visita oggi." />
      </Head>

      {/* HEADER PROFESSIONALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Home</a>
        </nav>

        {/* H1 SEO E TESTO INTRODUTTIVO */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Dentisti a Roma</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Trova lo studio odontoiatrico più vicino a te. Abbiamo selezionato i migliori <strong>dentisti a Roma</strong> suddivisi per quartiere, per garantirti assistenza rapida e professionale in tutta la Capitale.
        </p>

        {/* MENU RAPIDO QUARTIERI (SEO POWER) */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontSize: '15px' }}>Scegli il tuo quartiere:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/dentisti-roma-prati" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Prati</a>
            <a href="/dentisti-roma-eur" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>EUR</a>
            <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>San Giovanni</a>
          </div>
        </div>
        
        {/* LISTA AUTOMATICA TUTTA ROMA DAL DATABASE */}
        {loading ? (
          <p>Caricamento dentisti disponibili...</p>
        ) : specialisti.length > 0 ? (
          specialisti.map((studio) => (
            <div key={studio.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#2563eb', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                  ZONA {studio.zona}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '22px' }}>{studio.nome}</h3>
              <p style={{ margin: '0', fontSize: '15px', color: '#64748b', fontWeight: '500' }}>📍 {studio.zona}, Roma</p>
              <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', lineHeight: '1.5' }}>{studio.descrizione}</p>
              
              <div style={{ marginTop: '20px' }}>
                <a href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#22c55e', color: 'white', padding: '12px 25px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Contatta ora lo studio
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            Nessun dentista ancora presente nel database generale.
          </div>
        )}

        {/* CALL TO ACTION PROFESSIONISTI (B) */}
        <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Sei un Dentista a Roma?</h2>
          <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9' }}>
            Unisciti al network di ServiziSalute. Raggiungi pazienti nel tuo quartiere e aumenta la visibilità del tuo studio.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#1e3a8a', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-block', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            Pubblica il tuo studio gratis
          </a>
        </div>
      </main>

      {/* FOOTER PROFESSIONALE */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '15px' }}>ServiziSalute</div>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
            Il portale leader per la ricerca di servizi odontoiatrici e sanitari a Roma. Trasparenza, qualità e vicinanza al cittadino.
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #1e293b', paddingTop: '20px', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
