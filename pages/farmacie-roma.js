import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('farmacie', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];

  const serviziCorrelati = [
    { nome: "Diagnostica a Roma", url: "/diagnostica-roma" },
    { nome: "Servizi a Domicilio", url: "/servizi-domicilio-roma" },
    { nome: "Dermatologi Roma", url: "/dermatologi-roma" },
    { nome: "Nutrizionisti Roma", url: "/nutrizionisti-roma" }
  ];

  useEffect(() => {
    async function fetchFarmacie() {
      try {
        const queryBusca = getDBQuery('farmacie'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
          
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch farmacie:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0fdf4', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Farmacie a Roma – Servizi, offerte e prenotazioni | ServiziSalute</title>
        <meta name="description" content="Trova farmacie a Roma che offrono servizi sanitari, analisi e test. Consulta orari e contatti diretti nei principali quartieri della capitale." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 FARMACIE E PARAFARMACIE APERTE A ROMA - GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#059669', textDecoration: 'none', fontWeight: '600' }}>← Torna alla Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #059669' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Farmacie a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px' }}>
            Trova farmacie che offrono analisi, test rapidi e consulenze professionali a <strong>Roma</strong>. Cerca lo studio più vicino a te tra <strong>Prati, EUR, San Giovanni o Parioli</strong>.
          </p>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/farmacie-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #dcfce7', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Risultati disponibili oggi</h2>
        {loading ? (
          <p style={{textAlign:'center'}}>Caricamento...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ color: '#065f46', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessuna farmacia trovata.</div>
        )}

        {/* CROSS-LINKING SERVIZI */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #059669' }}>
          <h4 style={{ color: '#065f46', marginBottom: '15px', fontSize: '18px' }}>Servizi aggiuntivi utili</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {serviziCorrelati.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#059669', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome}</a>
            ))}
          </div>
        </section>

        <section id="faq" style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#065f46', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {schemas.faq?.mainEntity.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>{item.name}</p>
                <p style={{ color: '#64748b', fontSize: '15px' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 SEZIONE CTA PROFESSIONISTI (UNICA E CORRETTA) */}
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
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
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
