import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DermatologiRoma() {
  const [dermatologi, setDermatologi] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('dermatologi', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const specialisticheRoma = [
    { nome: "Cardiologi Roma", url: "/cardiologi-roma" },
    { nome: "Ortopedici Roma", url: "/ortopedici-roma" },
    { nome: "Ginecologi Roma", url: "/ginecologi-roma" },
    { nome: "Oculisti Roma", url: "/oculisti-roma" },
    { nome: "Psicologi Roma", url: "/psicologi-roma" },
    { nome: "Dentisti Roma", url: "/dentisti-roma" }
  ];

  useEffect(() => {
    async function fetchDermatologi() {
      try {
        setLoading(true);
        const queryBusca = getDBQuery('dermatologi'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${queryBusca.cat}%`)
          .order('is_top', { ascending: false });
          
        if (!error && data) setDermatologi(data);
      } catch (err) {
        console.error("Errore fetch dermatologi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDermatologi();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Dermatologi a Roma | Migliori Specialisti in Dermatologia | ServiziSalute</title>
        <meta name="description" content="Cerchi un dermatologo a Roma? Trova i migliori specialisti per mappatura nei, acne e patologie della pelle nei quartieri di Roma con contatti diretti." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* BARRA SUPERIORE CON TESTO IN GRASSETTO */}
      <div style={{ backgroundColor: '#be185d', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🌸 MIGLIORI DERMATOLOGI E STUDI DERMATOLOGICI A ROMA - GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        {/* LINK PER TORNARE A TUTTE LE SPECIALISTICHE */}
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#be185d', textDecoration: 'none', fontWeight: '600' }}>← Torna a tutte le Specialistiche</a>

        {/* DIV CON TITOLO H1 E DESCRIZIONE */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #be185d' }}>
          <h1 style={{ color: '#831843', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Dermatologi a Roma</h1>
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '16px' }}>
            Hai bisogno di una visita dermatologica? Trova i migliori <strong>dermatologi a Roma</strong> specializzati in controllo nei, dermatologia oncologica, cura dell'acne e trattamenti estetici a <strong>Prati, EUR, San Giovanni o Parioli</strong>.
          </p>

          {/* SEZIONE CERCA PER QUARTIERE */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/dermatologi-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#fdf2f8', color: '#be185d', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #fce7f3', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LISTA DEI DERMATOLOGI DISPONIBILI */}
        <h2 style={{ fontSize: '22px', color: '#1e293b', marginBottom: '20px', fontWeight: '700' }}>Specialisti disponibili</h2>
        
        {loading ? (
          <p style={{textAlign:'center', padding: '40px'}}>Ricerca medici in corso...</p>
        ) : dermatologi.length > 0 ? (
          dermatologi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #be185d' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ color: '#831843', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                  <p style={{ fontSize: '17px', margin: '8px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP SPECIALISTA</span>}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>🔬 MAPPATURA NEI</span>
                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800' }}>✨ DERMATOLOGIA ESTETICA</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#be185d', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama Studio</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun dermatologo trovato a Roma al momento.</div>
        )}

        {/* SEZIONE ALTRE SPECIALISTICHE A ROMA */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #be185d' }}>
          <h4 style={{ color: '#831843', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            {specialisticheRoma.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#be185d', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome}</a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#831843', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {schemas.faq?.mainEntity.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{item.name}</p>
                <p style={{ color: '#64748b', fontSize: '15px' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER INTEGRALE DELLA HOME */}
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
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
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
