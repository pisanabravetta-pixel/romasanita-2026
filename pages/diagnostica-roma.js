import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

// COMPONENTI CENTRALIZZATI
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Date dinamiche (si aggiornano da sole ogni mese)
  const currentMonth = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();

  const schemas = getSchemas('diagnostica', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti"];
  
  const specialisticheCorrelate = [
    { nome: "Cardiologi Roma", url: "/visite-specialistiche-roma/cardiologo" },
    { nome: "Ortopedici Roma", url: "/visite-specialistiche-roma/ortopedico" },
    { nome: "Ginecologi Roma", url: "/visite-specialistiche-roma/ginecologo" },
    { nome: "Oculisti Roma", url: "/visite-specialistiche-roma/oculista" },
    { nome: "Dermatologi Roma", url: "/visite-specialistiche-roma/dermatologo" }
  ];

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1a202c', fontFamily: 'system-ui, sans-serif' }}>
      <Head>
        <title>Centri Diagnostici Roma | Analisi e Risonanze {currentYear}</title>
        <meta name="description" content={`Trova i migliori centri diagnostici a Roma a ${currentMonth} ${currentYear}. Laboratori analisi, ecografie e risonanze magnetiche con referti online.`} />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <Navbar />

      {/* TOP BAR DINAMICA */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>
        🔵 DISPONIBILITÀ CENTRI DIAGNOSTICI AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
        <div style={{ marginBottom: '20px' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}> Home</a> 
          <span style={{ color: '#94a3b8', margin: '0 8px' }}>/</span>
          <span style={{ color: '#64748b', fontSize: '14px' }}>Diagnostica Roma</span>
        </div>

        {/* HERO SEO SECTION */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '30px', borderTop: '6px solid #2563eb' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', margin: '0 0 15px 0', fontWeight: '900', lineHeight: '1.1' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '17px', maxWidth: '850px' }}>
            Hai bisogno di analisi cliniche o esami strumentali? <strong>ServiziSalute</strong> ti aiuta a trovare i centri diagnostici più qualificati di Roma. Confronta laboratori per <strong>ecografie, risonanze magnetiche e check-up completi</strong> a Prati, EUR e in tutto il centro.
          </p>

          <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', display: 'block', marginBottom: '12px', textTransform: 'uppercase' }}>Cerca per Quartiere:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase().replace(" ", "-")}`} style={{ fontSize: '13px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '20px', fontWeight: '800' }}>Laboratori e Centri Analisi suggeriti</h2>
        
        {loading ? (
          <div style={{textAlign:'center', padding: '50px'}}>Ricerca centri in corso...</div>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '2px solid #2563eb' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: '0', fontSize: '22px', fontWeight: '800' }}>{v.nome}</h3>
                  <p style={{ fontSize: '16px', color: '#64748b', margin: '8px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '900' }}>ECCELLENZA</span>}
              </div>

              {/* BADGE DINAMICI */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
                {v.referti_online && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #bae6fd' }}>💻 REFERTI ONLINE</span>}
                {v.convenzionato_ssn && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #dcfce7' }}>🏥 CONVENZIONATO SSN</span>}
                {v.parcheggio_privato && <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #e2e8f0' }}>🚗 PARCHEGGIO</span>}
                {v.senza_barriere && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #dcfce7' }}>♿ ACCESSIBILE</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#faf5ff', color: '#7e22ce', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #f3e8ff' }}>🚇 METRO</span>}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '15px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}>Contatta Centro</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}>WhatsApp</a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun centro diagnostico trovato.</div>
        )}

        {/* CTA BUSINESS PER PROFESSIONISTI */}
        <section style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '32px', marginTop: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '15px' }}>Gestisci un Centro Diagnostico a Roma?</h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '600px', margin: '0 auto 25px', lineHeight: '1.6' }}>
            Aumenta la visibilità del tuo laboratorio. Entra in ServiziSalute e fatti trovare dai pazienti del tuo quartiere.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 32px', borderRadius: '14px', fontWeight: '800', textDecoration: 'none', fontSize: '16px', display: 'inline-block' }}>Aggiungi il tuo Centro — Gratis</a>
        </section>

        {/* FAQ - SEO STRUTTURATA */}
        <section style={{ marginTop: '60px', backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', fontSize: '24px', marginBottom: '30px', fontWeight: '900' }}>FAQ - Diagnostica a Roma</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '8px', fontSize: '17px' }}>1. Quali centri diagnostici a Roma sono convenzionati SSN?</p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>Nella nostra lista, i centri che accettano l'impegnativa del medico curante sono contrassegnati dal badge "CONVENZIONATO SSN". Si consiglia di confermare telefonicamente la disponibilità dei ticket.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '8px', fontSize: '17px' }}>2. Come posso scaricare i referti online?</p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>Molti laboratori d'avanguardia a Roma offrono il portale paziente. Cerca il badge "REFERTI ONLINE" per individuare le strutture che permettono il download digitale degli esami.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', marginBottom: '8px', fontSize: '17px' }}>3. Dove fare una risonanza magnetica aperta a Roma?</p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>Diversi centri in zona EUR e Prati dispongono di macchinari per pazienti claustrofobici. Contatta i centri con il tasto "Chiama" per verificare la tecnologia disponibile.</p>
            </div>
          </div>
        </section>

        {/* CROSS-LINKING SPECIALISTICO */}
        <section style={{ marginTop: '50px', padding: '25px', backgroundColor: '#f1f5f9', borderRadius: '20px', textAlign: 'center' }}>
          <h4 style={{ color: '#475569', marginBottom: '20px', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase' }}>Trova lo specialista dopo gli esami:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
            {specialisticheCorrelate.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#1e3a8a', textDecoration: 'none', fontSize: '14px', fontWeight: '700', backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                {s.nome}
              </a>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
