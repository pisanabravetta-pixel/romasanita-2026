import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function ServiziDomicilioRomaSud() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera servizi domicilio per "Roma Sud"
  useEffect(() => {
    async function fetchDomicilioSud() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('zona', 'Roma Sud')
        .ilike('categoria', '%Domicilio%');

      if (!error && data) {
        setServizi(data);
      }
      setLoading(false);
    }
    fetchDomicilioSud();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdf2f2', minHeight: '100vh' }}>
      <Head>
        <title>Servizi a Domicilio Roma Sud | Assistenza Sanitaria a Casa</title>
        <meta name="description" content="Hai bisogno di assistenza medica a casa a Roma Sud? Trova infermieri, fisioterapisti e medici per visite a domicilio in zona EUR, Garbatella e Ostiense." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #fee2e2' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#dc2626', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/servizi-domicilio-roma" style={{ textDecoration: 'none', color: '#dc2626', fontWeight: 'bold', fontSize: '14px' }}>← Torna a Domicilio Roma</a>
        </nav>

        {/* TITOLO SEO E INTRO */}
        <h1 style={{ color: '#991b1b', fontSize: '32px', marginBottom: '10px' }}>Assistenza a Domicilio Roma Sud</h1>
        <p style={{ color: '#4b5563', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Ricerca di professionisti sanitari per <strong>interventi domiciliari a Roma Sud</strong>. Infermieri, fisioterapisti e medici specialisti disponibili per visite e cure presso la tua abitazione nei quartieri EUR, Garbatella, Ostiense e limitrofi.
        </p>

        {/* LISTA RISULTATI DINAMICA */}
        {loading ? (
          <p style={{ color: '#991b1b' }}>Ricerca operatori disponibili in zona sud...</p>
        ) : servizi.length > 0 ? (
          servizi.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #fee2e2',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#991b1b', fontSize: '22px' }}>{s.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#4b5563' }}>📍 Area operativa: <strong>{s.zona}</strong></p>
                  <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#fff5f5', borderRadius: '8px', borderLeft: '4px solid #dc2626' }}>
                    <p style={{ fontSize: '15px', color: '#4b5563', margin: 0 }}>🩺 {s.descrizione}</p>
                  </div>
                </div>
                <span style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>DISPONIBILITÀ IMMEDIATA</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${s.telefono || '061234567'}`} style={{ flex: 1, textAlign: 'center', backgroundColor: '#dc2626', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Subito
                </a>
                <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          /* CTA SE VUOTO */
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '16px', border: '2px dashed #fee2e2' }}>
            <p style={{ color: '#4b5563', fontSize: '16px' }}>Nessun operatore per Roma Sud attualmente presente nel database.</p>
            <p style={{ fontWeight: 'bold', color: '#991b1b', marginTop: '10px' }}>Sei un infermiere o un fisioterapista che opera in questa zona?</p>
            <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#dc2626', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Iscriviti al Network Gratis
            </a>
          </div>
        )}

        {/* INFO EXTRA SEO ROMA SUD */}
        <section style={{ marginTop: '50px', padding: '30px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #fee2e2' }}>
          <h2 style={{ fontSize: '20px', color: '#991b1b', marginBottom: '15px' }}>Assistenza Sanitaria Integrata a Roma Sud</h2>
          <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7' }}>
            La zona di <strong>Roma Sud</strong>, comprendente aree densamente popolate come l'EUR o storiche come la Garbatella, richiede spesso servizi di assistenza domiciliare rapida. I professionisti elencati su ServiziSalute offrono prestazioni che vanno dalle <strong>terapie riabilitative post-operatorie</strong> alla gestione di pazienti cronici, prelievi ematici a domicilio e medicazioni complesse, garantendo standard ospedalieri nel comfort della propria casa.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#7f1d1d', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fecaca', marginBottom: '10px' }}>ServiziSalute Roma</div>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>© 2026 - Assistenza Medica e Sanitaria a Domicilio Roma Sud</p>
        </div>
      </footer>
    </div>
  );
}
