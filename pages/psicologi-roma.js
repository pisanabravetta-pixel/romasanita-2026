import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function PsicologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('psicologia', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const altreSpecialistiche = [
    { nome: "Dermatologi", url: "/dermatologi-roma" },
    { nome: "Cardiologi", url: "/cardiologi-roma" },
    { nome: "Ginecologi", url: "/ginecologi-roma" },
    { nome: "Ortopedici", url: "/ortopedici-roma" },
    { nome: "Nutrizionisti", url: "/nutrizionisti-roma" },
    { nome: "Dentisti", url: "/dentisti-roma" }
  ];

  useEffect(() => {
    async function fetchPsicologi() {
      try {
        const queryBusca = getDBQuery('psicologia'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
          
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch psicologi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPsicologi();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0fdfa', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Psicologi a Roma – Psicoterapia e Consulenza Psicologica | ServiziSalute</title>
        <meta name="description" content="Trova uno psicologo o psicoterapeuta a Roma. Supporto per ansia, stress e benessere personale nei principali quartieri della capitale." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* BARRA SUPERIORE TESTO IN GRASSETTO */}
      <div style={{ backgroundColor: '#0d9488', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🧠 PSICOLOGI E PSICOTERAPEUTI A ROMA – BENESSERE MENTALE
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        {/* LINK PER TORNARE A TUTTE LE SPECIALISTICHE */}
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#0d9488', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        {/* DIV CON TITOLO H1, DESCRIZIONE E SEZIONE CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #0d9488' }}>
          <h1 style={{ color: '#134e4a', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Psicologi a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>
            Trova il supporto professionale di cui hai bisogno. Consulta i profili di <strong>psicologi e psicoterapeuti a Roma</strong> specializzati in terapia individuale, di coppia, familiare e supporto per disturbi d'ansia o stress.
          </p>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f0fdfa' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#6b7280', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/psicologi-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#f0fdfa', color: '#0d9488', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #ccfbf1', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LISTA PROFESSIONISTI DISPONIBILI */}
        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px', fontWeight: '700' }}>Professionisti disponibili</h2>
        {loading ? (
          <p style={{textAlign:'center', padding: '40px'}}>Caricamento professionisti...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #0d9488' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ color: '#134e4a', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#ccfbf1', color: '#0d9488', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#0d9488', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Prenota Colloquio</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun professionista trovato. Stiamo aggiornando l'elenco dei terapeuti a Roma.</div>
        )}

        {/* SEZIONE ALTRE SPECIALISTICHE (CROSS-LINKING) */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #0d9488' }}>
          <h4 style={{ color: '#134e4a', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#0d9488', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome}</a>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#134e4a', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Come si svolge il primo colloquio psicologico?</p>
              <p style={{ color: '#64748b' }}>Il primo incontro è un momento di conoscenza e accoglienza. Permette di inquadrare la domanda del paziente e definire gli obiettivi di un eventuale percorso terapeutico.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Quanto dura solitamente una seduta?</p>
              <p style={{ color: '#64748b' }}>La durata media di un colloquio psicologico individuale varia tra i 45 e i 60 minuti, a seconda dell'orientamento del professionista.</p>
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
              <p style={{ fontSize: '11px', color: '#718096', marginTop: '15px', fontStyle: 'italic', lineHeight: '1.4' }}>
                🔍 Oltre 15.000 ricerche mensili di pazienti registrate a Roma.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                  ⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.
                </p>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
              <p style={{ fontSize: '12px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>
                ServiziSalute è un portale di annunci e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.
              </p>
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
