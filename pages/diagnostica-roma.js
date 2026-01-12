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
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'block' }}>
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
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '14px', textAlign: 'center', fontWeight: '800', fontSize: '14px', textTransform: 'uppercase' }}>
        🔵 Disponibilità Centri Diagnostici: {currentMonth} {currentYear}
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', paddingBottom: '80px' }}>
        
        {/* BREADCRUMB / RITORNO HOME */}
        <div style={{ padding: '15px 0', marginBottom: '10px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>← TORNA ALLA HOME</a>
        </div>

        {/* HERO SECTION */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '40px', borderLeft: '10px solid #1e3a8a' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', margin: '0 0 15px 0', fontWeight: '900', lineHeight: '1.1' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '25px' }}>
            Trova i migliori laboratori per analisi cliniche, ecografie e risonanze magnetiche a <strong>Roma</strong>. Contatta direttamente le strutture per informazioni su orari e prenotazioni.
          </p>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <p style={{ fontSize: '13px', fontWeight: '800', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase' }}>Filtra per zona di Roma:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '10px 18px', borderRadius: '12px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>{q}</a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '25px', fontWeight: '900', color: '#0f172a' }}>Centri Diagnostici suggeriti</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', fontWeight: 'bold' }}>Ricerca centri in corso...</div>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            /* BOX NUOVO STILE - TOTALMENTE DIVERSO DAL PRECEDENTE */
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '32px', padding: '35px', marginBottom: '30px', border: v.is_top ? '3px solid #1e3a8a' : '1px solid #e2e8f0', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '20px' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '26px', fontWeight: '900' }}>{v.nome}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                    <span style={{ fontSize: '20px' }}>📍</span>
                    <span style={{ fontSize: '17px', fontWeight: '500' }}>{v.indirizzo} — <strong>{v.zona}</strong></span>
                  </div>
                </div>
                {v.is_top && (
                  <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '14px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Partner Top</div>
                )}
              </div>

              {/* BADGE SERVIZI AGGIORNATI */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
                {v.convenzionato_ssn && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', border: '1px solid #dcfce7' }}>🏥 CONVENZIONATO SSN</span>}
                {v.referti_online && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', border: '1px solid #bae6fd' }}>💻 REFERTI ONLINE</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#faf5ff', color: '#7e22ce', padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', border: '1px solid #f3e8ff' }}>🚇 VICINO METRO</span>}
              </div>

              {/* GRIGLIA PULSANTI AZIONE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px', boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)' }}>💬 WHATSAPP</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '18px', borderRadius: '18px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '32px' }}>Nessun centro disponibile in questa categoria.</div>
        )}

        {/* CTA BOX PER PROFESSIONISTI */}
        <section style={{ backgroundColor: '#0f172a', padding: '50px 30px', borderRadius: '40px', marginTop: '60px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', marginBottom: '15px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>Unisciti a ServiziSalute e raggiungi centinaia di nuovi pazienti ogni mese a Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '20px 40px', borderRadius: '20px', fontWeight: '900', textDecoration: 'none', fontSize: '18px', display: 'inline-block' }}>ISCRIVI IL TUO CENTRO</a>
        </section>

        {/* FAQ SECTION */}
        <section style={{ marginTop: '70px', backgroundColor: 'white', padding: '45px', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '35px', fontSize: '26px', color: '#0f172a', textAlign: 'center' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '18px', marginBottom: '10px' }}>1. I centri sono convenzionati con il Servizio Sanitario Nazionale?</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '16px' }}>Molte strutture presenti nel nostro database sono accreditate SSN. Cerca il badge "CONVENZIONATO SSN" per trovarle immediatamente.</p>
            </div>
            <div style={{ paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '18px', marginBottom: '10px' }}>2. Posso ritirare i referti online?</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '16px' }}>Sì, la maggior parte dei centri d'eccellenza a Roma offre il download digitale. Verifica la presenza del badge "REFERTI ONLINE" nell'annuncio.</p>
            </div>
            <div>
              <p style={{ fontWeight: '900', color: '#1e3a8a', fontSize: '18px', marginBottom: '10px' }}>3. Come posso prenotare un prelievo a domicilio?</p>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '16px' }}>Per i servizi domiciliari, ti consigliamo di contattare il centro tramite WhatsApp o telefono per verificare la disponibilità degli infermieri nella tua zona.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
