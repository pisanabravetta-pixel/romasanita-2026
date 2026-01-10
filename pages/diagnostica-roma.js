import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DiagnosticaRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('diagnostica', 'roma');

  useEffect(() => {
    async function fetchDati() {
      const queryBusca = getDBQuery('diagnostica');
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', queryBusca)
        .eq('approvato', true)
        .order('is_top', { ascending: false });
      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchDati();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Centri Diagnostici a Roma | TAC e Risonanze | ServiziSalute</title>
        <meta name="description" content="Trova i migliori centri diagnostici a Roma per esami del sangue, TAC, risonanze e radiografie. Prenota la tua visita nei centri convenzionati e privati." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🔵 CENTRI DIAGNOSTICI E ANALISI A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #2563eb' }}>
          <h1 style={{ color: '#1e40af', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Centri Diagnostici a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px', maxWidth: '800px' }}>
            Hai bisogno di una risonanza magnetica, una TAC o semplici analisi del sangue? Esplora i centri diagnostici più all'avanguardia di <strong>Roma</strong>, suddivisi per quartiere.
          </p>
        </div>

        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #2563eb' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#1e40af', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
            <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        ))}

        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#1e40af', fontSize: '24px', marginBottom: '20px' }}>Domande Frequenti</h3>
          {schemas.faq.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </main>

      {/* FOOTER UFFICIALE 2026 */}
      {renderFooter()}
    </div>
  );
}

// Funzione helper per il footer (per non appesantire il codice)
function renderFooter() {
  return (
    <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
            <p style={{ fontSize: '14px', color: '#a0aec0' }}>Portata di annunci sanitari a Roma.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Link Rapidi</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/farmacie-roma" style={{ color: '#a0aec0' }}>Farmacie Roma</a></li>
              <li><a href="/dentisti-roma" style={{ color: '#a0aec0' }}>Dentisti Roma</a></li>
              <li><a href="/diagnostica-roma" style={{ color: '#a0aec0' }}>Diagnostica Roma</a></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
          © 2026 ServiziSalute – Tutti i diritti riservati
        </div>
      </div>
    </footer>
  );
}
