import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OculistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('oculisti', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchOculisti() {
      try {
        const queryBusca = getDBQuery('oculistica'); 
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
    fetchOculisti();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Oculisti a Roma: Visite Oculistiche e Chirurgia | Gennaio 2026</title>
        <meta name="description" content="Cerchi un oculista a Roma? Trova i migliori specialisti per visita oculistica, esame del fondo oculare e chirurgia laser a Roma. Aggiornato a Gennaio 2026." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
      <div style={{ backgroundColor: '#1e40af', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '100%' }}>
        👁️ OCULISTI E STUDI OCULISTICI A ROMA — AGGIORNATI A GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
  <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
  <span style={{ margin: '0 8px' }}>&gt;</span>
  <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
  <span style={{ margin: '0 8px' }}>&gt;</span>
  <span style={{ color: '#065f46' }}>Oculisti Roma</span>
</div>
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #1e40af', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Oculisti a Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Migliori Oculisti a Roma aggiornati a <span style={{ color: '#1e40af' }}>Gennaio 2026</span>
          </p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e3a8a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/oculisti-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#eff6ff', color: '#1e40af', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA MEDICI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : medici.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '20px', padding: '25px', marginBottom: '20px', 
              border: v.is_top ? '4px solid #1e40af' : '1px solid #e2e8f0', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.04)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#eff6ff', color: '#1e40af', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>👁️ VISITA OCULISTICA</span>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#eff6ff', color: '#1e40af', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>🔬 ESAME FONDO OCULARE</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#1e40af', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* MINI TESTO SEO POSIZIONATO CORRETTAMENTE (FUORI DALLA LISTA) */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            In questa pagina trovi i migliori <strong>oculisti a Roma</strong>, specializzati in chirurgia refrattiva, cura del glaucoma e visite pediatriche. 
            Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un <strong>oculista a Roma</strong> disponibile per esami della vista e diagnostica avanzata, aggiornato a <strong>Gennaio 2026</strong>.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Sei un Oculista a Roma?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Metti in evidenza il tuo studio e ricevi contatti diretti da nuovi pazienti.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#1e40af', color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e3a8a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/diagnostica-roma" style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/dermatologi-roma" style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
          </div>
        </div>

        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e3a8a' }}>Domande Frequenti</h3>
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
