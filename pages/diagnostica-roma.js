import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentMonth = "Gennaio";
  const currentYear = 2026;
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
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Diagnostica Roma | Centri Analisi e Risonanze {currentYear}</title>
        <meta name="description" content={`Trova i migliori centri diagnostici a Roma a ${currentMonth} ${currentYear}.`} />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <Navbar />

      {/* BARRA DISPONIBILITÀ */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '800', fontSize: '14px' }}>
        🔵 DISPONIBILITÀ AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: '1', maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* LINK TORNA ALLA HOME */}
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>← TORNA ALLA HOME</a>
        </nav>

        {/* HERO SEO SECTION */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '6px solid #1e3a8a' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '17px', lineHeight: '1.6' }}>
            Trova laboratori d'eccellenza per analisi cliniche e risonanze a <strong>Roma</strong>. Prenota un esame nei quartieri più cercati della capitale.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
            {quartieriDoc.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>{q}</a>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '900', color: '#0f172a' }}>Centri e Laboratori disponibili</h2>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento in corso...</p>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            /* BOX ANNUNCIO AGGIORNATO */
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              padding: '25px', 
              marginBottom: '20px', 
              border: v.is_top ? '2px solid #1e3a8a' : '1px solid #e2e8f0',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: '0', fontSize: '22px', fontWeight: '900' }}>{v.nome}</h3>
                  <p style={{ margin: '5px 0', fontSize: '15px', color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '5px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>TOP PARTNER</span>}
              </div>

              {/* TASTI AZIONE: CHIAMA, WA, MAPPA */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '14px' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '14px' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '14px', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessuna struttura trovata.</div>
        )}

        {/* CTA BOX PROFESSIONISTI */}
        <section style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '24px', marginTop: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Raggiungi nuovi pazienti ogni giorno a Roma con la nostra piattaforma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>ISCRIVI IL TUO CENTRO</a>
        </section>

        {/* FAQ SECTION */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '50px' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '25px', fontSize: '22px' }}>FAQ - Diagnostica Roma</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '5px' }}>Come prenotare una visita?</p>
              <p style={{ fontSize: '15px', color: '#475569' }}>Puoi chiamare direttamente o usare il tasto WhatsApp per parlare con la segreteria del centro scelto.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '5px' }}>I centri sono convenzionati?</p>
              <p style={{ fontSize: '15px', color: '#475569' }}>Molte strutture accettano l'impegnativa SSN. Ti consigliamo di chiedere conferma durante la chiamata.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '5px' }}>Quando riceverò il referto?</p>
              <p style={{ fontSize: '15px', color: '#475569' }}>La maggior parte dei laboratori a Roma fornisce i risultati online entro 24-48 ore dall'esame.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
