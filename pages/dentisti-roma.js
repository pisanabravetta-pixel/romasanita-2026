import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DentistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('dentisti', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDentisti() {
      try {
        const queryBusca = getDBQuery('dentisti'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${queryBusca.cat}%`)
          .order('is_top', { ascending: false });

        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDentisti();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Dentisti a Roma: Studi Odontoiatrici e Urgenze | Gennaio 2026</title>
        <meta name="description" content="Cerchi un dentista a Roma? Trova i migliori studi dentistici per pulizia denti, impianti e ortodonzia nei quartieri di Roma con contatti diretti." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
   <div style={{ backgroundColor: '#3182ce', color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px' }}>
  🦷 STUDI DENTISTICI E ODONTOIATRI A ROMA — AGGIORNATI A GENNAIO 2026
</div>
      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB SEO */}
       <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
  <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
  <span style={{ margin: '0 8px' }}>{'>'}</span>
  <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
  <span style={{ margin: '0 8px' }}>{'>'}</span>
  <span style={{ color: '#065f46' }}>Dentisti Roma</span>
</div>

        {/* TITOLO E SOTTOTITOLO SEO */}
<div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #3182ce', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#2c5282', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Dentisti a Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Studi Odontoiatrici e Igiene Dentale aggiornati a <span style={{ color: '#3182ce' }}>Gennaio 2026</span>
          </p>
        </div>

        {/* CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#2c5282' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/dentisti-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#ebf8ff', color: '#2c5282', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA BOX RIDOTTI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', marginBottom: '20px', border: v.is_top ? '4px solid #2c5282' : '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'block', width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ color: '#2c5282', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {v.urgenza_24h && <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>🚨 URGENZE</span>}
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#ebf8ff', color: '#3182ce', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bee3f8' }}>🦷 ODONTOIATRIA</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#3182ce', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* MINI TESTO SEO DOPO ANNUNCI */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            In questa pagina trovi i migliori <strong>studi dentistici a Roma</strong>, specializzati in igiene dentale, impianti, ortodonzia e carie. 
            Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un <strong>dentista a Roma</strong> disponibile per visite di controllo o urgenze.
          </p>
        </div>

        {/* CTA NERA RIDOTTA */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '24px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Gestisci uno Studio Dentistico?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Inserisci il tuo studio e ricevi contatti da nuovi pazienti a Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#3182ce', color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#2c5282' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dermatologi-roma" style={{ color: '#3182ce', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/cardiologi-roma" style={{ color: '#3182ce', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/diagnostica-roma" style={{ color: '#3182ce', fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/oculisti-roma" style={{ color: '#3182ce', fontWeight: '700', textDecoration: 'none' }}>Oculisti</a>
            <a href="/ortopedici-roma" style={{ color: '#3182ce', fontWeight: '700', textDecoration: 'none' }}>Ortopedici</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#2c5282' }}>Domande Frequenti</h3>
          {schemas.faq?.mainEntity.slice(0, 3).map((item, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <p><strong>{i+1}. {item.name}</strong> — {item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

      </main>

     <Footer />
    </div>
  );
}
