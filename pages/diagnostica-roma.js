import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800' }}>
        🔵 DISPONIBILITÀ CENTRI DIAGNOSTICI AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* HERO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '30px', borderTop: '6px solid #2563eb' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '900' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
            Trova laboratori d'eccellenza per analisi cliniche e risonanze a <strong>Roma</strong>. Prenota un esame nei quartieri più cercati della capitale.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
            {quartieriDoc.map(q => (
              <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '700' }}>{q}</a>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: '800' }}>Centri e Laboratori disponibili</h2>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento in corso...</p>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              padding: '25px', 
              marginBottom: '20px', 
              border: v.is_top ? '2px solid #2563eb' : '1px solid #e2e8f0',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ color: '#1e3a8a', margin: '0', fontSize: '22px', fontWeight: '800' }}>{v.nome}</h3>
                  <p style={{ margin: '5px 0', fontSize: '15px', color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '5px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>TOP PARTNER</span>}
              </div>

              {/* BADGE DINAMICI (Appaiono solo se compilati su Supabase) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '15px' }}>
                {v.convenzionato_ssn && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>🏥 SSN</span>}
                {v.referti_online && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>💻 REFERTI ONLINE</span>}
                {v.parcheggio_privato && <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>🚗 PARCHEGGIO</span>}
                {v.senza_barriere && <span style={{ backgroundColor: '#f8fafc', color: '#64748b', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>♿ ACCESSIBILE</span>}
                {v.vicino_metro && <span style={{ backgroundColor: '#faf5ff', color: '#7e22ce', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>🚇 METRO</span>}
              </div>

              {/* BOTTONI AZIONE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ backgroundColor: '#2563eb', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>📞 Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>💬 WhatsApp</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', border: '1px solid #e2e8f0' }}>🗺️ Mappa</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessuna struttura trovata per questa categoria.</div>
        )}

        {/* CTA PROFESSIONISTI */}
        <section style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', marginTop: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Gestisci una struttura a Roma?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Aumenta i tuoi pazienti con ServiziSalute. Pubblica il tuo profilo oggi.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>🚀 Pubblica Gratis</a>
        </section>

        {/* FAQ COMPLETE (3) */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '900', marginBottom: '25px', fontSize: '22px' }}>FAQ - Diagnostica Roma</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', fontSize: '16px', marginBottom: '8px' }}>1. Come scelgo il miglior centro analisi a Roma?</p>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>Valuta la vicinanza al tuo quartiere e i servizi offerti (come il parcheggio o i referti online). Su ServiziSalute puoi confrontare le strutture top di ogni zona.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', fontSize: '16px', marginBottom: '8px' }}>2. È necessaria la prenotazione per gli esami del sangue?</p>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>Sì, nella maggior parte dei laboratori a Roma è consigliata la prenotazione per ridurre i tempi di attesa. Puoi usare il tasto WhatsApp o il telefono per fissare l'appuntamento.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#1e3a8a', fontSize: '16px', marginBottom: '8px' }}>3. Quali centri offrono la convenzione SSN?</p>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>Molti centri privati a Roma sono accreditati. Cerca il badge "SSN" nell'annuncio per trovare le strutture dove puoi usare l'impegnativa del medico.</p>
            </div>
          </div>
        </section>

        {/* CROSS-LINKING */}
        <section style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Potrebbe interessarti anche:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            {specialisticheCorrelate.map(s => (
              <a key={s.nome} href={s.url} style={{ fontSize: '13px', color: '#1e3a8a', textDecoration: 'none', padding: '8px 15px', backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0' }}>{s.nome}</a>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
