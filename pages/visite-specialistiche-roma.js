import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function VisiteSpecialisticheRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('visite-specialistiche', 'roma');

  const quartieriDoc = ['Prati', 'Trastevere', 'EUR', 'Parioli', 'Tiburtina', 'San Giovanni', 'Flaminio', 'Monteverde'];
  const specialitaCorrelate = ['Psicologo', 'Cardiologo', 'Dermatologo', 'Ortopedico', 'Ginecologo', 'Nutrizionista'];

  useEffect(() => {
    async function fetchSpecialisti() {
      try {
        const queryBusca = getDBQuery('visite-specialistiche'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
          
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch specialisti:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSpecialisti();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Visite Specialistiche a Roma – Prenota Psicologi, Cardiologi e Dermatologi | ServiziSalute</title>
        <meta name="description" content="Trova i migliori medici specialisti a Roma. Consulta profili di psicologi, cardiologi, dermatologi e ortopedici nei quartieri di Roma." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <div style={{ backgroundColor: '#4f46e5', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        💜 VISITE SPECIALISTICHE E PROFESSIONISTI A ROMA - GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#4f46e5', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        {/* 🔹 HERO HUB */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #4f46e5' }}>
          <h1 style={{ color: '#312e81', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Visite Specialistiche a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>
            Accedi alle migliori cure specialistiche della Capitale. Trova il professionista giusto tra <strong>psicologi, dermatologi, cardiologi e ortopedici</strong> a Roma.
          </p>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER SPECIALITÀ:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {specialitaCorrelate.map(spec => (
                <a key={spec} href={`/${spec.toLowerCase()}-roma`} style={{ backgroundColor: '#f5f3ff', padding: '10px 18px', borderRadius: '12px', textAlign: 'center', border: '1px solid #ddd6fe', fontSize: '14px', fontWeight: '600', color: '#4f46e5', textDecoration: 'none' }}>
                  {spec}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 LISTA ANNUNCI */}
        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Medici disponibili ora</h2>
        {loading ? (
          <p style={{textAlign:'center'}}>Caricamento specialisti...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #4f46e5' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ color: '#312e81', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                  <span style={{ fontSize: '14px', color: '#6366f1', fontWeight: 'bold', textTransform: 'uppercase' }}>{v.specialista || v.categoria}</span>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#f5f3ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#4f46e5', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Prenota Visita</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessuno specialista trovato. Prova a cambiare quartiere.</div>
        )}

        {/* 🔹 LINK AI QUARTIERI */}
        <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#312e81', fontSize: '20px', marginBottom: '15px' }}>Specialisti nei quartieri di Roma</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {quartieriDoc.map(z => (
              <a key={z} href={`/visite-specialistiche-roma-${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#f5f3ff', color: '#4f46e5', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: '1px solid #ddd6fe' }}>
                {z}
              </a>
            ))}
          </div>
        </div>

        {/* 🔹 FAQ SECTION */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#312e81', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Come posso scegliere lo specialista giusto?</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Puoi consultare le specializzazioni e i quartieri di competenza direttamente negli annunci e contattare il medico per una prima valutazione.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>I contatti sono diretti?</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Sì, ServiziSalute fornisce i recapiti diretti (telefono e WhatsApp) per fissare un appuntamento senza costi di intermediazione.</p>
            </div>
          </div>
        </section>

        {/* 🔹 SEZIONE CTA HUB VISITE SPECIALISTICHE */}
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
            Gestisci una struttura sanitaria o uno studio a Roma?
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
          <p style={{ marginTop: '20px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
            Nessun intermediario • Contatto diretto Paziente-Medico
          </p>
        </section>
      {/* FOOTER INTEGRALE */}
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
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
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
