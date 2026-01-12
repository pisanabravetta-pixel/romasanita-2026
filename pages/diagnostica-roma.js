import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

// Componenti Centralizzati
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentMonth = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();
  const schemas = getSchemas('diagnostica', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio"];

  useEffect(() => {
    async function fetchDiagnostica() {
      try {
        setLoading(true);
        const queryBusca = getDBQuery('diagnostica'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${queryBusca.cat}%`)
          .order('is_top', { ascending: false });
          
        if (!error && data) setCentri(data);
      } catch (err) {
        console.error("Errore database:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Diagnostica Roma | Centri e Laboratori {currentYear}</title>
        <meta name="description" content={`Trova i migliori centri diagnostici a Roma a ${currentMonth} ${currentYear}.`} />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <Navbar />

      {/* TOP BAR DINAMICA */}
      <div style={{ backgroundColor: '#1e40af', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        
        {/* BREADCRUMB / LINK DI RICHIAMO */}
        <div style={{ marginBottom: '25px' }}>
          <a href="/" style={{ color: '#1e40af', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>← Torna alla Home</a>
          <span style={{ color: '#cbd5e1', margin: '0 12px' }}>|</span>
          <span style={{ color: '#64748b', fontSize: '15px' }}>Diagnostica a Roma</span>
        </div>

        {/* HERO SECTION */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '6px solid #1e40af' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '17px', lineHeight: '1.6', marginBottom: '20px' }}>
            Trova laboratori d'eccellenza per analisi cliniche e risonanze a <strong>Roma</strong>. Contatta direttamente le strutture per prenotazioni rapide.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieriDoc.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#1e40af', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA ANNUNCI */}
        <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '800', color: '#0f172a' }}>Centri Diagnostici suggeriti</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Caricamento risultati...</div>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', marginBottom: '25px', border: v.is_top ? '2px solid #1e40af' : '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: '0', fontSize: '24px', fontWeight: '900' }}>{v.nome}</h3>
                  <p style={{ margin: '8px 0', fontSize: '17px', color: '#475569' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#1e40af', color: 'white', padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>TOP PARTNER</span>}
              </div>

              {/* BADGE */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {v.convenzionato_ssn && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #dcfce7' }}>🏥 SSN</span>}
                {v.referti_online && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #bae6fd' }}>💻 REFERTI ONLINE</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#faf5ff', color: '#7e22ce', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #f3e8ff' }}>🚇 METRO</span>}
              </div>

              {/* TASTI AZIONE MODERNI */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e40af', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '15px' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '15px' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '15px', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '24px', color: '#64748b' }}>Nessun centro disponibile al momento.</div>
        )}

        {/* FAQ */}
        <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '80px' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '30px', fontSize: '24px' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '17px', marginBottom: '8px' }}>Come prenotare una visita?</p>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>Puoi contattare direttamente la struttura tramite il tasto di chiamata o WhatsApp presente in ogni annuncio.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '17px', marginBottom: '8px' }}>I risultati sono affidabili?</p>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>Selezioniamo solo centri diagnostici autorizzati e laboratori d'eccellenza operanti sul territorio di Roma.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '17px', marginBottom: '8px' }}>Quali sono gli orari dei prelievi?</p>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>La maggior parte dei laboratori esegue prelievi dalle 07:30 alle 10:30. Ti consigliamo di chiamare per conferma.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
