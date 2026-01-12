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
        console.error("Errore:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
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

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* LINK DI RICHIAMO (BREADCRUMB) */}
        <nav style={{ marginBottom: '20px', fontSize: '14px' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>← Torna alla Home</a>
          <span style={{ color: '#cbd5e1', margin: '0 10px' }}>|</span>
          <span style={{ color: '#64748b' }}>Diagnostica a Roma</span>
        </nav>

        {/* HERO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '30px', borderTop: '6px solid #2563eb' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
            Trova laboratori d'eccellenza per analisi cliniche e risonanze a <strong>Roma</strong>. Cerca lo studio più vicino nel tuo quartiere.
          </p>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', display: 'block', marginBottom: '12px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>{q}</a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '800', color: '#0f172a' }}>Risultati suggeriti</h2>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento in corso...</p>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            /* BOX ANNUNCIO - NUOVO STILE FORZATO */
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '25px', marginBottom: '20px', border: v.is_top ? '2px solid #2563eb' : '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: '0', fontSize: '22px', fontWeight: '900' }}>{v.nome}</h3>
                  <p style={{ margin: '8px 0', fontSize: '16px', color: '#475569' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>PARTNER TOP</span>}
              </div>

              {/* BADGE SERVIZI */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
                {v.convenzionato_ssn && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>🏥 SSN</span>}
                {v.referti_online && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>💻 REFERTI ONLINE</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#faf5ff', color: '#7e22ce', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>🚇 METRO</span>}
              </div>

              {/* TASTI AZIONE: CHIAMA, WHATSAPP, MAPPA */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}>📞 Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}>💬 WhatsApp</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px', border: '1px solid #e2e8f0' }}>🗺️ Mappa</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun risultato trovato.</div>
        )}

        {/* FAQ SEO */}
        <section style={{ marginTop: '60px', backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '30px', fontSize: '24px', color: '#0f172a' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '17px', marginBottom: '10px' }}>1. Come prenotare un esame in un centro a Roma?</p>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>È possibile prenotare chiamando direttamente il numero di telefono indicato o inviando un messaggio WhatsApp per una risposta rapida.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '17px', marginBottom: '10px' }}>2. Quali sono i tempi di attesa per i referti?</p>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>I tempi variano in base al tipo di esame, ma molti centri partner offrono la consegna dei referti online entro 24/48 ore.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '17px', marginBottom: '10px' }}>3. I centri diagnostici sono convenzionati?</p>
              <p style={{ color: '#475569', lineHeight: '1.6' }}>Sì, diverse strutture a Roma accettano la convenzione SSN. Cerca il badge "SSN" sugli annunci per identificare i laboratori accreditati.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
