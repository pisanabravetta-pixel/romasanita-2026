import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function OculistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('oculistica', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const altreSpecialistiche = [
    { nome: "Dermatologi", url: "/dermatologi-roma" },
    { nome: "Cardiologi", url: "/cardiologi-roma" },
    { nome: "Ginecologi", url: "/ginecologi-roma" },
    { nome: "Ortopedici", url: "/ortopedici-roma" },
    { nome: "Psicologi", url: "/psicologi-roma" },
    { nome: "Nutrizionisti", url: "/nutrizionisti-roma" }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const queryBusca = getDBQuery('oculistica'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch oculisti:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f9ff', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Oculisti a Roma – Visita Oculistica e Chirurgia | ServiziSalute</title>
        <meta name="description" content="Trova i migliori oculisti a Roma. Prenota visite oculistiche, esami del fondo oculare e chirurgia refrattiva nei principali quartieri della capitale." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* BARRA SUPERIORE TESTO IN GRASSETTO */}
      <div style={{ backgroundColor: '#0284c7', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        👁️ OCULISTI E CHIRURGIA OFTALMICA A ROMA – GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        {/* LINK PER TORNARE A TUTTE LE SPECIALISTICHE */}
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        {/* DIV CON TITOLO H1, DESCRIZIONE E QUARTIERI */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #0284c7', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#0c4a6e', fontSize: '32px', fontWeight: '800', margin: '0 0 10px 0' }}>Oculisti a Roma</h1>
          <p style={{ lineHeight: '1.6', fontSize: '16px', color: '#4b5563' }}>
            Proteggi la tua vista affidandoti a esperti. In questa sezione trovi i migliori <strong>medici oculisti a Roma</strong> per controlli periodici, screening del glaucoma, esami della retina e interventi di chirurgia refrattiva o cataratta.
          </p>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0f2fe' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/oculisti-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#f0f9ff', color: '#0369a1', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #bae6fd', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LISTA OCULISTI DISPONIBILI */}
        <h2 style={{ color: '#0c4a6e', marginBottom: '20px', fontSize: '22px' }}>Specialisti disponibili</h2>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Caricamento medici...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #0284c7' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ color: '#0c4a6e', margin: 0, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#0284c7', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama Ora</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>
            Nessun oculista trovato a Roma. Stiamo aggiornando le disponibilità.
          </div>
        )}

        {/* SEZIONE ALTRE SPECIALISTICHE (CROSS-LINKING) */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #0284c7' }}>
          <h4 style={{ color: '#0c4a6e', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#0284c7', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome}</a>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#0c4a6e', fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Ogni quanto fare una visita oculistica?</p>
              <p style={{ color: '#64748b' }}>In assenza di patologie, è consigliabile un controllo ogni 2 anni per gli adulti. Per bambini e over 60, il controllo dovrebbe essere annuale.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Cos'è l'esame del fondo oculare?</p>
              <p style={{ color: '#64748b' }}>È un esame indolore che permette di analizzare la retina, i vasi sanguigni e il nervo ottico, fondamentale per diagnosticare precocemente diverse patologie.</p>
            </div>
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
