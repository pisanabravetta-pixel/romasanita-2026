import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function DiagnosticaRomaNord() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera centri diagnostici a Roma Nord
  useEffect(() => {
    async function fetchDiagnosticaNord() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('zona', 'Roma Nord')
        .ilike('categoria', '%Diagnostica%');

      if (!error && data) {
        setCentri(data);
      }
      setLoading(false);
    }
    fetchDiagnosticaNord();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Diagnostica Roma Nord | Centri Eccellenza e Laboratori</title>
        <meta name="description" content="Trova i migliori centri di diagnostica e laboratori di analisi a Roma Nord. Prenota esami del sangue, radiografie ed ecografie vicino a te (Parioli, Cassia, Corso Francia)." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        {/* BREADCRUMB */}
        <nav style={{ marginBottom: '20px' }}>
          <a href="/diagnostica-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna a Diagnostica Roma</a>
        </nav>

        {/* TITOLO SEO E INTRO */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Diagnostica a Roma Nord</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Elenco dei <strong>centri diagnostici e laboratori di analisi a Roma Nord</strong>. Cerca strutture specializzate per risonanze magnetiche, ecografie e analisi cliniche nei quartieri Parioli, Corso Francia, Cassia e Flaminio.
        </p>

        {/* LISTA RISULTATI DINAMICA */}
        {loading ? (
          <p>Ricerca centri diagnostici in corso...</p>
        ) : centri.length > 0 ? (
          centri.map((d) => (
            <div key={d.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{d.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#64748b' }}>📍 {d.zona} — Roma</p>
                  <div style={{ display: 'inline-block', marginTop: '10px', backgroundColor: '#eff6ff', color: '#2563eb', padding: '5px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>
                    🔬 {d.descrizione}
                  </div>
                </div>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>CENTRO ATTIVO</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`https://wa.me/${d.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Prenota Esame (WhatsApp)
                </a>
              </div>
            </div>
          ))
        ) : (
          /* CTA SE NON CI SONO RISULTATI */
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '2px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessun centro diagnostico a Roma Nord attualmente registrato.</p>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginTop: '10px' }}>Gestisci un centro diagnostico in questa zona?</p>
            <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Aggiungi la tua struttura gratis
            </a>
          </div>
        )}

        {/* SEZIONE SEO QUARTIERE NORD */}
        <section style={{ marginTop: '50px', padding: '30px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Perché scegliere un centro a Roma Nord</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7' }}>
            Il quadrante Nord di Roma è rinomato per l'eccellenza delle sue strutture sanitarie private e convenzionate. I centri di <strong>diagnostica tra Corso Francia e i Parioli</strong> offrono tecnologie di ultima generazione per la diagnostica per immagini (RM ad alto campo, TC multistrato) e laboratori di analisi con refertazione rapida. La zona è facilmente raggiungibile sia per chi risiede sulla Cassia che per chi proviene dal centro tramite il Lungotevere.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '10px' }}>ServiziSalute</div>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>
            © 2026 ServiziSalute Roma - Diagnostica e Prevenzione Roma Nord
          </p>
        </div>
      </footer>
    </div>
  );
}
