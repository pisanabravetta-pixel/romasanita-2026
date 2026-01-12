import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

// Componenti centralizzati
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const currentMonth = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();
  const schemas = getSchemas('diagnostica', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti"];

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
        console.error("Errore fetch diagnostica:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Centri Diagnostici Roma | Analisi e Risonanze {currentYear}</title>
        <meta name="description" content={`Trova i migliori centri diagnostici a Roma a ${currentMonth} ${currentYear}.`} />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <Navbar />

      {/* Main Content Area */}
      <div style={{ flex: '1 0 auto', backgroundColor: '#f8fafc' }}>
        
        <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800' }}>
          🔵 DISPONIBILITÀ CENTRI DIAGNOSTICI: {currentMonth.toUpperCase()} {currentYear}
        </div>

        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
          
          {/* HERO SEO */}
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '30px', borderTop: '6px solid #2563eb' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
              Trova laboratori d'eccellenza per analisi cliniche e risonanze a <strong>Roma</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>{q}</a>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '800', color: '#0f172a' }}>Centri e Laboratori disponibili</h2>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento...</p>
          ) : centri.length > 0 ? (
            centri.map((v) => (
              /* BOX ANNUNCIO RICOSTRUITO */
              <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '25px', marginBottom: '20px', border: v.is_top ? '2px solid #2563eb' : '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ color: '#1e3a8a', margin: '0', fontSize: '22px', fontWeight: '800' }}>{v.nome}</h3>
                    <p style={{ margin: '5px 0', fontSize: '15px', color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                  </div>
                  {v.is_top && <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '5px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>TOP PARTNER</span>}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '15px' }}>
                  {v.convenzionato_ssn && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>🏥 SSN</span>}
                  {v.referti_online && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>💻 REFERTI ONLINE</span>}
                  {v.vicino_metro && <span style={{ backgroundColor: '#faf5ff', color: '#7e22ce', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>🚇 METRO</span>}
                </div>

                {/* BOTTONI AZIONE - VERIFICA IL CODICE DI QUESTI TASTI */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                  <a href={`tel:${v.telefono}`} style={{ flex: '1 1 120px', backgroundColor: '#2563eb', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>📞 Chiama</a>
                  {v.whatsapp && (
                    <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 120px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>💬 WhatsApp</a>
                  )}
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 120px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', border: '1px solid #e2e8f0' }}>🗺️ Mappa</a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>Nessuna struttura trovata.</div>
          )}

          {/* FAQ */}
          <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
            <h3 style={{ fontWeight: '900', marginBottom: '25px', fontSize: '22px' }}>FAQ - Diagnostica Roma</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ fontWeight: '800', color: '#1e3a8a' }}>1. Come prenotare un esame?</p>
                <p style={{ fontSize: '14px', color: '#475569' }}>Chiama direttamente o invia un WhatsApp usando i tasti sopra.</p>
              </div>
              <div>
                <p style={{ fontWeight: '800', color: '#1e3a8a' }}>2. I referti sono online?</p>
                <p style={{ fontSize: '14px', color: '#475569' }}>Le strutture con il badge azzurro permettono il download digitale.</p>
              </div>
              <div>
                <p style={{ fontWeight: '800', color: '#1e3a8a' }}>3. Accettate ticket SSN?</p>
                <p style={{ fontSize: '14px', color: '#475569' }}>Verifica il badge "SSN" sugli annunci per le strutture convenzionate.</p>
              </div>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
