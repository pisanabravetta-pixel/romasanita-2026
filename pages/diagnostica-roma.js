import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('diagnostica', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const specialisticheCorrelate = [
    { nome: "Cardiologi", url: "/cardiologi-roma" },
    { nome: "Ortopedici", url: "/ortopedici-roma" },
    { nome: "Ginecologi", url: "/ginecologi-roma" },
    { nome: "Oculisti", url: "/oculisti-roma" },
    { nome: "Dermatologi", url: "/dermatologi-roma" }
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
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Centri Diagnostici a Roma | Analisi, Risonanze e Screening | ServiziSalute</title>
        <meta name="description" content="Cerchi un centro diagnostico a Roma? Trova i migliori laboratori per analisi del sangue, ecografie e risonanze nei quartieri di Roma con contatti diretti." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🔵 CENTRI DIAGNOSTICI E LABORATORI ANALISI A ROMA - GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #2563eb' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Diagnostica a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>
            Trova i migliori <strong>centri diagnostici a Roma</strong>. Ricerca laboratori d'eccellenza per analisi cliniche, risonanze magnetiche ed ecografie a <strong>Prati, EUR, San Giovanni o Parioli</strong>.
          </p>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/diagnostica-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dbeafe', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Centri disponibili</h2>
        {loading ? (
          <p style={{textAlign:'center'}}>Caricamento centri...</p>
        ) : centri.length > 0 ? (
          centri.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #2563eb' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ color: '#1e3a8a', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun centro diagnostico trovato a Roma.</div>
        )}

        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #2563eb' }}>
          <h4 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '18px' }}>Hai i referti? Trova uno specialista a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {specialisticheCorrelate.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#2563eb', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome}</a>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {schemas.faq?.mainEntity.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>{item.name}</p>
                <p style={{ color: '#64748b', fontSize: '15px' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ 
          backgroundColor: '#ffffff', 
          padding: '50px 30px', 
          borderRadius: '32px', 
          marginTop: '60px', 
          textAlign: 'center', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '800', marginBottom: '15px' }}>
            Gestisci un centro diagnostico a Roma?
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            Unisciti al network di <strong>ServiziSalute</strong>. Raggiungi migliaia di pazienti nel tuo quartiere e potenzia la tua presenza digitale nella Capitale.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ 
              backgroundColor: '#10b981', 
              color: 'white', 
              padding: '18px 35px', 
              borderRadius: '16px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              fontSize: '17px',
              boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)'
            }}>
              🚀 Inizia a ricevere contatti
            </a>
            <a href="/per-i-professionisti" style={{ 
              backgroundColor: 'white', 
              color: '#0f172a', 
              padding: '18px 35px', 
              borderRadius: '16px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              fontSize: '17px',
              border: '1px solid #e2e8f0'
            }}>
              Soluzioni Business
            </a>
          </div>
        </section>
      </main>

      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
