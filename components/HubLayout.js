import { quartieriTop } from '../lib/seo-logic';
import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { theme } from '../styles/theme';

export default function HubLayout({ 
  titolo, 
  categoria, 
  colore, 
  medici = [],         // Default array vuoto
  loading, 
  quartieri = [],      // Default array vuoto
  schemas, 
  descrizioneMeta,
  testoMiniSEO,
  badgeSpec,
  testoTopBar,
  testoCTA,
  altreSpecialistiche = [] // Default array vuoto
}) {
 return (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
    
    <Head>
      <title>{`${titolo} a Roma – Elenco e contatti | ServiziSalute`}</title>
      <meta 
        name="description" 
        content={descrizioneMeta || `Trova i migliori servizi di ${titolo} a Roma. Contatti diretti, mappa e informazioni per quartiere.`} 
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Come trovare servizi di ${titolo} a Roma?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `È possibile consultare l’elenco dei servizi di ${titolo} a Roma suddivisi per quartiere e utilizzare la mappa per individuare rapidamente la struttura più vicina.`
                }
              },
              {
                "@type": "Question",
                "name": `I servizi di ${titolo} a Roma sono disponibili in tutti i quartieri?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `I servizi di ${titolo} sono presenti in numerosi quartieri di Roma e vengono organizzati per zona per facilitare la ricerca e l’accesso alle strutture sanitarie.`
                }
              },
              {
                "@type": "Question",
                "name": `È possibile contattare direttamente le strutture di ${titolo}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Sì, ogni struttura elencata mette a disposizione contatti diretti (Telefono o WhatsApp) per richiedere informazioni su servizi, orari e disponibilità.`
                }
              }
            ]
          })
        }}
      />
    </Head>

    {/* TOP BAR UNICA */}
    <div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px' }}>
      {testoTopBar}
    </div>
      
    <Navbar />

    <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
      {/* BREADCRUMB */}
      <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
        <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 8px' }}>{'>'}</span>
        <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
        <span style={{ margin: '0 8px' }}>{'>'}</span>
        <span style={{ color: '#065f46' }}>{titolo} Roma</span>
      </div>

      {/* TITOLO E SOTTOTITOLO */}
      <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: theme.padding.main, borderRadius: theme.radius.main, borderLeft: `8px solid ${colore}`, boxShadow: theme.shadows.premium }}>
        <h1 style={{ color: '#2c5282', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
          {titolo} a Roma
        </h1>
        <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
          Specialisti aggiornati a <span style={{ color: colore }}>Gennaio 2026</span>
        </p>
      </div>

      {/* MINI TESTO SEO */}
      <div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
        <p>
          Benvenuto su <strong>ServiziSalute</strong>, il portale dedicato alla sanità locale. In questa sezione puoi consultare l'elenco completo di <strong>{titolo} a Roma</strong>, con schede dettagliate che includono orari, indirizzi e tasti di contatto rapido.
        </p>
      </div>

      {/* CERCA PER QUARTIERE */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '14px', fontWeight: '900', marginBottom: '12px', color: '#2c5282', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          📍 Cerca per Quartiere:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {quartieriTop.map(q => (
            <a key={q.s} href={`/${categoria}-roma-${q.s}`} style={{ padding: '7px 12px', backgroundColor: '#ebf8ff', color: '#2c5282', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>
              {q.n}
            </a>
          ))}
        </div>
      </div>

      {/* BOX MAPPA HUB */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          {medici && medici.length > 0 ? (
            <iframe
              width="100%" height="100%" style={{ border: 0 }} loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(titolo + ' Roma')}+Roma&t=&z=11&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          ) : (
            <div style={{ height: '100%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#94a3b8' }}>Mappa in caricamento...</p>
            </div>
          )}
        </div>
      </div>

      {/* LISTA BOX ANNUNCI */}
      <div style={{ display: 'block' }}>
        {loading ? (
          <p>Caricamento...</p>
        ) : medici && medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: theme.radius.card, padding: theme.padding.card, marginBottom: '20px', border: v.is_top ? `4px solid ${colore}` : '1px solid #e2e8f0', boxShadow: theme.shadows.premium, width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ color: '#2c5282', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: colore, color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: theme.radius.main, textAlign: 'center', border: '2px dashed #cbd5e1', marginBottom: '30px' }}>
            <h3 style={{ color: '#1e293b', fontSize: '22px', fontWeight: '900' }}>Ricerca in corso a Roma</h3>
          </div>
        )}
      </div> 

      {/* SEZIONE SEO E FAQ */}
      <section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2c5282', marginBottom: '15px' }}>
          {titolo} a Roma: guida alla scelta
        </h2>
        <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '16px' }}>
          <p>Roma vanta una rete sanitaria complessa...</p>
        </div>

        <div style={{ height: '1px', backgroundColor: '#f1f5f9', width: '80%', margin: '30px auto' }} />

        <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#2c5282' }}>Domande Frequenti</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div>
            <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>1. Come trovare servizi di {titolo} a Roma?</p>
            <p>È possibile consultare l’elenco suddiviso per quartiere.</p>
          </div>
        </div>

        {/* CTA NERA */}
        <div style={{ backgroundColor: '#0f172a', padding: theme.padding.main, borderRadius: theme.radius.main, textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900' }}>{testoCTA}</h2>
          <a href="/pubblica-annuncio" style={{ backgroundColor: colore, color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>ISCRIVITI ORA</a>
        </div>

        {/* CROSS-LINKING FINALE */}
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px' }}>Esplora altri servizi:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {(categoria || '') !== 'dentisti' && <a href="/dentisti-roma" style={{ color: '#0f766e', fontWeight: '700', textDecoration: 'none' }}>🦷 Dentisti</a>}
            {(categoria || '') !== 'farmacie' && <a href="/farmacie-roma" style={{ color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>💊 Farmacie</a>}
            {(categoria || '') !== 'diagnostica' && <a href="/diagnostica-roma" style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>🔬 Diagnostica</a>}
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </div>
);
}
