import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrtopediciRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('ortopedici', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchOrtopedici() {
      try {
        const queryBusca = getDBQuery('ortopedia'); 
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
    fetchOrtopedici();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Ortopedici a Roma: Visite Specialistiche e Chirurgia | Gennaio 2026</title>
        <meta name="description" content="Cerchi un ortopedico a Roma? Trova i migliori specialisti in chirurgia protesica, traumatologia e infiltrazioni a Roma. Aggiornato a Gennaio 2026." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#0d9488', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '100%' }}>
        🦴 ORTOPEDICI E CHIRURGHI ORTOPEDICI A ROMA — AGGIORNATI A GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
  <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
  <span style={{ margin: '0 8px' }}>{'>'}</span>
  <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
  <span style={{ margin: '0 8px' }}>{'>'}</span>
  <span style={{ color: '#065f46' }}>Ortopedici Roma</span>
</div>

        {/* TITOLO MASTER H1 */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #0d9488', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#134e4a', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Ortopedici a Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Migliori Ortopedici a Roma aggiornati a <span style={{ color: '#0d9488' }}>Gennaio 2026</span>
          </p>
        </div>

        {/* BOX QUARTIERI */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#134e4a' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/ortopedici-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#f0fdfa', color: '#0d9488', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA MEDICI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : medici.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '20px', padding: '25px', marginBottom: '20px', 
              border: v.is_top ? '4px solid #0d9488' : '1px solid #e2e8f0', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.04)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#134e4a', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#f0fdfa', color: '#0d9488', padding: '4px 10px', borderRadius: '6px', border: '1px solid #99f6e4' }}>🦴 VISITA ORTOPEDICA</span>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#f0fdfa', color: '#0d9488', padding: '4px 10px', borderRadius: '6px', border: '1px solid #99f6e4' }}>💉 INFILTRAZIONI</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#0d9488', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* TESTO SEO - POSIZIONATO FUORI DAL LOOP */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            In questa pagina trovi i migliori <strong>ortopedici a Roma</strong>, specializzati in chirurgia dell'anca e del ginocchio, traumatologia sportiva e trattamenti infiltrativi. 
            Contatta direttamente gli specialisti del tuo quartiere o filtra per zona per trovare un <strong>medico ortopedico a Roma</strong> disponibile per consulenze e interventi, aggiornato a <strong>Gennaio 2026</strong>.
          </p>
        </div>

        {/* CTA PROFESSIONISTI */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '25px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Sei un Ortopedico a Roma?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Metti in evidenza il tuo studio e ricevi contatti diretti da nuovi pazienti.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#0d9488', color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* CROSS LINKING */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#134e4a' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ color: '#0d9488', fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#0d9488', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/diagnostica-roma" style={{ color: '#0d9488', fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/dermatologi-roma" style={{ color: '#0d9488', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#134e4a' }}>Domande Frequenti</h3>
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
