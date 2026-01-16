import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { theme } from '../styles/theme';

export default function HubLayout({ titolo, categoria, colore, medici, loading, quartieri }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>{titolo} Roma: I Migliori Specialisti | Gennaio 2026</title>
        <meta name="description" content={`Trova i migliori professionisti per ${titolo} a Roma. Contatti diretti, orari e disponibilità aggiornata a Gennaio 2026.`} />
      </Head>
      
      <div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '14px' }}>
        🚀 {titolo.toUpperCase()} A ROMA — AGGIORNATO GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* 1. TITOLO MASTER */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: theme.padding.main, borderRadius: theme.radius.main, borderLeft: `12px solid ${colore}`, boxShadow: theme.shadows.premium }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0' }}>{titolo} a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', marginTop: '10px' }}>I migliori professionisti in <span style={{ color: colore }}>{titolo.toLowerCase()}</span> aggiornati.</p>
        </div>

        {/* 2. CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e293b' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/${categoria}-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#f8fafc', color: colore, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', border: `1px solid ${colore}22` }}>{q}</a>
            ))}
          </div>
        </div>

        {/* 3. LISTA RISULTATI (CON MAPPA) */}
        <div style={{ display: 'block' }}>
          {loading ? (
            <p>Caricamento...</p>
          ) : medici.length > 0 ? medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: theme.radius.card, padding: theme.padding.card, marginBottom: '20px', border: v.is_top ? `4px solid ${colore}` : '1px solid #e2e8f0', boxShadow: theme.shadows.premium, width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: colore, color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          )) : (
            <p style={{ padding: '20px', backgroundColor: 'white', borderRadius: theme.radius.main }}>Nessun annuncio trovato.</p>
          )}
        </div>

        {/* 4. MINI TESTO SEO */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            In questa pagina trovi l'elenco dei migliori specialisti in <strong>{titolo.toLowerCase()} a Roma</strong>. 
            Puoi filtrare per quartiere per trovare lo studio più vicino a te e contattare direttamente il professionista per prenotare una visita o richiedere informazioni su orari e tariffe aggiornate a <strong>Gennaio 2026</strong>.
          </p>
        </div>

        {/* 5. CTA NERA */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: theme.radius.main, textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Sei un professionista in {titolo}?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Metti in evidenza il tuo studio e raggiungi nuovi pazienti a Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: colore, color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* 6. ALTRE SPECIALISTICHE */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: theme.radius.main, border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#1e293b' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ color: colore, fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/dermatologi-roma" style={{ color: colore, fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/diagnostica-roma" style={{ color: colore, fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/farmacie-roma" style={{ color: colore, fontWeight: '700', textDecoration: 'none' }}>Farmacie</a>
          </div>
        </div>

        {/* 7. FAQ */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e293b' }}>Domande Frequenti</h3>
          <p><strong>1. Come prenotare una visita con un esperto in {titolo.toLowerCase()}?</strong> — Puoi usare i tasti "Chiama" o "WhatsApp" presenti nei box degli specialisti per un contatto immediato.</p><br/>
          <p><strong>2. Gli specialisti sono disponibili in tutti i quartieri di Roma?</strong> — Sì, usufruendo della ricerca per quartiere puoi trovare il professionista più vicino alla tua zona.</p><br/>
          <p><strong>3. Le informazioni sono aggiornate?</strong> — Sì, l'elenco dei professionisti e dei servizi è verificato e aggiornato a Gennaio 2026.</p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
