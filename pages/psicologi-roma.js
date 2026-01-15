import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PsicologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('psicologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchPsicologi() {
      try {
        const queryBusca = getDBQuery('psicologia'); 
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
    fetchPsicologi();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Psicologi a Roma: Psicoterapia e Consulenza | Gennaio 2026</title>
        <meta name="description" content="Cerchi uno psicologo a Roma? Trova i migliori psicoterapeuti per terapia individuale, di coppia e familiare a Roma. Aggiornato a Gennaio 2026." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#4f46e5', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '100%' }}>
        🧠 PSICOLOGI E PSICOTERAPEUTI A ROMA — AGGIORNATI A GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
       <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
  <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
  <span style={{ margin: '0 8px' }}>&gt;</span>
  <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
  <span style={{ margin: '0 8px' }}>&gt;</span>
  <span style={{ color: '#065f46' }}>Psicologi Roma</span>
</div>

        {/* TITOLO MASTER H1 */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #4f46e5', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#3730a3', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Psicologi a Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Migliori Psicologi a Roma aggiornati a <span style={{ color: '#4f46e5' }}>Gennaio 2026</span>
          </p>
        </div>

        {/* BOX QUARTIERI */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#3730a3' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/psicologi-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#eef2ff', color: '#4f46e5', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA MEDICI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : medici.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '20px', padding: '25px', marginBottom: '20px', 
              border: v.is_top ? '4px solid #4f46e5' : '1px solid #e2e8f0', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.04)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#3730a3', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '6px', border: '1px solid #c7d2fe' }}>🗣️ PSICOTERAPIA</span>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#eef2ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '6px', border: '1px solid #c7d2fe' }}>👥 TERAPIA DI COPPIA</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#4f46e5', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* TESTO SEO - POSIZIONATO FUORI DAL LOOP */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            In questa pagina trovi i migliori <strong>psicologi a Roma</strong>, professionisti iscritti all'albo specializzati in psicoterapia cognitiva, sistemica e supporto psicologico. 
            Contatta direttamente gli studi o filtra per zona per trovare un <strong>psicologo a Roma</strong> disponibile per una consulenza individuale o di coppia, aggiornato a <strong>Gennaio 2026</strong>.
          </p>
        </div>

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Sei uno Psicologo a Roma?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Aumenta la tua visibilità e ricevi contatti diretti da chi cerca supporto nella tua zona.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#4f46e5', color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* CROSS LINKING */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#3730a3' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/diagnostica-roma" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/dermatologi-roma" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#3730a3' }}>Domande Frequenti</h3>
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
