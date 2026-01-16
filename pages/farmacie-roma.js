import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';

export default function FarmacieRoma() {
  const [farmacie, setFarmacie] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('farmacie', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchFarmacie() {
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', '%farmac%')
          .order('is_top', { ascending: false });

        if (!error && data) setFarmacie(data);
      } catch (err) {
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Farmacie a Roma: Turni, Orari e Servizi | Gennaio 2026</title>
        <meta name="description" content="Trova le migliori farmacie a Roma. Cerca farmacie di turno, aperte h24 e con servizi di analisi nei quartieri di Roma. Aggiornato a Gennaio 2026." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
      {/* TOP BAR VERDE */}
      <div style={{ backgroundColor: '#166534', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '100%' }}>
        💊 FARMACIE E PARAFARMACIE A ROMA — AGGIORNATI A GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB SEO */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
  <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
  <span style={{ margin: '0 8px' }}>{'>'}</span>
  <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
  <span style={{ margin: '0 8px' }}>{'>'}</span>
  <span style={{ color: '#065f46' }}>Farmacie Roma</span>
</div>

        {/* TITOLO E SOTTOTITOLO SEO */}
       <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: theme.padding.main, borderRadius: theme.radius.main, borderLeft: '8px solid #166534', boxShadow: theme.shadows.premium }}>
          <h1 style={{ color: '#064e3b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Farmacie a Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Migliori Farmacie a Roma aggiornate a <span style={{ color: '#166534' }}>Gennaio 2026</span>
          </p>
        </div>

        {/* CERCA PER QUARTIERE */}
       <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#064e3b' }}>Cerca per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/farmacie-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

       {/* LISTA BOX RIDOTTI */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : farmacie.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: theme.radius.card, padding: theme.padding.card, marginBottom: '20px', border: v.is_top ? '4px solid #166534' : '1px solid #e2e8f0', boxShadow: theme.shadows.premium, display: 'block', width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ color: '#064e3b', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {v.aperto_h24 && <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>🕒 APERTA H24</span>}
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>🩺 TEST E ANALISI</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#166534', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* MINI TESTO SEO */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            In questa pagina trovi l'elenco delle migliori <strong>farmacie a Roma</strong>, con informazioni su orari, servizi di auto-analisi e telemedicina. 
            Cerca la <strong>farmacia di turno a Roma</strong> più vicina a te o filtra per quartiere per trovare professionisti pronti ad assisterti con disponibilità aggiornate a <strong>Gennaio 2026</strong>.
          </p>
        </div>

        {/* CTA NERA RIDOTTA */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '24px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Gestisci una Farmacia a Roma?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Metti in evidenza i tuoi servizi e i turni del tuo punto vendita.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#166534', color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* ALTRE SPECIALISTICHE */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: theme.radius.main, border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#064e3b' }}>Altre Specialistiche a Roma:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ color: '#166534', fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/cardiologi-roma" style={{ color: '#166534', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/diagnostica-roma" style={{ color: '#166534', fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/dermatologi-roma" style={{ color: '#166534', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/ortopedici-roma" style={{ color: '#166534', fontWeight: '700', textDecoration: 'none' }}>Ortopedici</a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#064e3b' }}>Domande Frequenti</h3>
          <p><strong>1. Come trovare una farmacia di turno a Roma?</strong> — Puoi consultare i box qui sopra o verificare i siti istituzionali per i turni notturni ufficiali.</p><br/>
          <p><strong>2. Quali servizi offrono le farmacie elencate?</strong> — Oltre ai farmaci, molte offrono foratura lobi, analisi del sangue, ECG e tamponi rapidi.</p><br/>
          <p><strong>3. Esistono farmacie aperte h24 a Roma?</strong> — Sì, in ogni quartiere principale (come Prati o Eur) sono presenti farmacie che effettuano orario continuato anche di notte.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
