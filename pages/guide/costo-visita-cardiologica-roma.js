import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { seoData, quartieriTop, getDBQuery } from '../lib/seo-logic';
import Script from 'next/script';
import Mappa from '../components/Mappa';

export default function PaginaQuartiereDinamica({
  datiIniziali,
  totaleDalServer,
  paginaIniziale,
  slugSSR,
  categoriaSSR,
  zonaSSR
}) {
  const router = useRouter();
  const { slug } = router.query;
  const slugAttivo = slug || slugSSR;
  if (!slugAttivo) return <div className="min-h-screen bg-gray-50" />;

  const catSlug = categoriaSSR || slugAttivo.replace('-roma-', '@').split('@')[0].replace('-roma', '');
  const quartiereNome = zonaSSR ? zonaSSR.charAt(0).toUpperCase() + zonaSSR.slice(1).replace(/-/g, ' ') : 'Roma';
  const filtri = getDBQuery(catSlug);
  const colore = filtri.colore || '#2563eb';

  const mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  const dataAttuale = new Date();
  const dataStringa = `${mesi[dataAttuale.getMonth()]} ${dataAttuale.getFullYear()}`;

  const [servizi, setServizi] = useState(datiIniziali || []);
  const [pagina, setPagina] = useState(paginaIniziale || 1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setPagina(parseInt(params.get('page')) || 1);
    }
  }, [router.query]);

  if (!mounted) return null;

  const annunciPerPagina = 10;
  const totalePagine = Math.max(1, Math.ceil((totaleDalServer || servizi.length)/annunciPerPagina));
  const listaDaMostrare = servizi.slice((pagina-1)*annunciPerPagina, pagina*annunciPerPagina);

  // Pulizia categoria per titoli
  const nomiCorrettiH1 = {
    'farmacie': 'Farmacie','farmac': 'Farmacie',
    'diagnostica': 'Diagnostica','diagnost': 'Diagnostica',
    'dentisti': 'Dentisti',
    'dermatologi': 'Dermatologi',
    'cardiologi': 'Cardiologi',
    'psicologi': 'Psicologi',
    'oculisti': 'Oculisti',
    'ortopedici': 'Ortopedici',
    'nutrizionisti': 'Nutrizionisti',
    'ginecologi': 'Ginecologi'
  };
  const titoloPulito = nomiCorrettiH1[catSlug.toLowerCase()] || catSlug.toUpperCase().replace(/-/g,' ');

  return (
    <>
      <Head>
        <title>{titoloPulito} {quartiereNome} | ServiziSalute</title>
        <meta name="description" content={`Cerchi ${titoloPulito.toLowerCase()} a ${quartiereNome}? ✅ Elenco aggiornato a ${dataStringa}. Contatti diretti WhatsApp e telefono.`} />
        <link rel="canonical" href={`https://www.servizisalute.com/${slugAttivo}`} />
      </Head>

      <Navbar />

      <div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {titoloPulito} a {quartiereNome} — {dataStringa.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        {/* Breadcrumb */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: colore, textDecoration: 'none' }}>Home</a> &gt; 
          <a href={`/${catSlug}-roma`} style={{ color: colore, textDecoration: 'none', marginLeft:'8px' }}>{titoloPulito} Roma</a>
        </div>

        {/* Header SEO */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: `8px solid ${colore}`, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>{titoloPulito} Roma {quartiereNome}</h1>
          <p style={{ fontSize: '18px', fontWeight: '600', margin:0 }}>I migliori professionisti a {quartiereNome} aggiornati a <span style={{ color: colore }}>{dataStringa}</span></p>
        </div>

        {/* Testo introduttivo SEO */}
        <p style={{ marginBottom:'25px', fontSize:'16px', lineHeight:'1.7', color:'#475569' }}>
          Stai cercando <strong>{titoloPulito} a {quartiereNome}</strong>? In questa pagina trovi i contatti diretti e la posizione dei professionisti e delle strutture disponibili oggi nel quartiere. Visualizza la mappa per trovare la struttura più vicina e chiama per prenotare una visita o richiedere informazioni su costi e orari.
        </p>

        {/* Selezione zone */}
        <div style={{ backgroundColor:'white', padding:'20px', borderRadius:'12px', marginBottom:'15px', border:'1px solid #e2e8f0' }}>
          <h2 style={{ fontSize:'15px', fontWeight:'900', marginBottom:'12px' }}>Cerca in altre zone vicino a {quartiereNome}:</h2>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {quartieriTop.map(q => (
              <a key={q.s} href={`/${catSlug}-roma-${q.s}`} style={{ padding:'7px 12px', backgroundColor:'#f0f9ff', color:colore, borderRadius:'8px', textDecoration:'none', fontWeight:'700', fontSize:'12px' }}>{q.n}</a>
            ))}
          </div>
        </div>

        {/* Lista servizi con Mappa */}
        {listaDaMostrare.length > 0 && <Mappa lista={listaDaMostrare} />}

        <p style={{ fontSize:'14px', color:'#64748b', textAlign:'center', marginTop:'10px', marginBottom:'30px', fontStyle:'italic', lineHeight:'1.5' }}>
          La mappa mostra la posizione di <strong>{titoloPulito}</strong> nel quartiere <strong>{quartiereNome}</strong> a Roma, permettendo di individuare rapidamente le strutture più vicine.
        </p>

        {/* Guide approfondimenti */}
        <div style={{ marginTop:'25px', marginBottom:'30px', padding:'20px', backgroundColor:'#f0f9ff', borderRadius:'12px', border:'1px solid #bae6fd' }}>
          <h4 style={{ fontSize:'16px', fontWeight:'800', color:'#0369a1', marginBottom:'12px' }}>💰 Approfondimenti e costi a {quartiereNome}:</h4>
          <ul style={{ listStyle:'none', padding:0, margin:0, fontSize:'14px', display:'flex', flexDirection:'column', gap:'10px' }}>
            {meta.cat.toLowerCase().includes('dentist') ? (
              <>
                <li>🔹 <a href={`/guide/costo-pulizia-denti-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Quanto costa una pulizia dei denti a {quartiereNome}</a></li>
                <li>🔹 <a href={`/guide/trovare-servizio-sanitario-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Guida: Come prenotare servizi sanitari a {quartiereNome}</a></li>
              </>
            ) : meta.cat.toLowerCase().includes('cardiolog') ? (
              <>
                <li>🔹 <a href={`/guide/costo-visita-cardiologica-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Quanto costa una visita cardiologica a {quartiereNome}</a></li>
                <li>🔹 <a href={`/guide/trovare-servizio-sanitario-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Guida alle prenotazioni sanitarie nel quartiere {quartiereNome}</a></li>
              </>
            ) : meta.cat.toLowerCase().includes('dermatolog') ? (
              <>
                <li>🔹 <a href={`/guide/costo-visita-dermatologica-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Quanto costa una visita dermatologica a {quartiereNome}</a></li>
                <li>🔹 <a href={`/guide/trovare-servizio-sanitario-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Come orientarsi tra i servizi sanitari di {quartiereNome}</a></li>
              </>
            ) : (
              <>
                <li>🔹 <a href={`/guide/costo-visita-specialistica-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Esempio costi: quanto costa una visita specialistica a {quartiereNome}</a></li>
                <li>🔹 <a href={`/guide/trovare-servizio-sanitario-roma-${zonaSSR}`} style={{ color:'#0284c7', textDecoration:'none', fontWeight:'600' }}>Guida: trovare rapidamente servizi sanitari a {quartiereNome}</a></li>
              </>
            )}
          </ul>
        </div>

        {/* SEO conclusivo e FAQ */}
        <section style={{ margin:'40px 0', padding:'25px', backgroundColor:'white', borderRadius:'15px', border:'1px solid #e2e8f0', boxShadow:'0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize:'22px', fontWeight:'900', color:'#2c5282', marginBottom:'15px' }}>{titoloPulito} a {quartiereNome}</h2>
          <div style={{ color:'#475569', lineHeight:'1.8', fontSize:'16px' }}>
            <p>Il quartiere <strong>{quartiereNome}</strong> è servito da numerose strutture sanitarie. In questa pagina trovi l’elenco di <strong>{titoloPulito}</strong>, pensato per aiutarti a individuare rapidamente un professionista nella zona.</p>
            <p>Oltre a questa categoria, puoi trovare anche servizi di <a href={`/dentisti-roma-${zonaSSR}`} style={{ color:'#059669', fontWeight:'700', textDecoration:'underline' }}>Dentisti</a> e <a href={`/diagnostica-roma-${zonaSSR}`} style={{ color:'#059669', fontWeight:'700', textDecoration:'underline' }}>Diagnostica</a> a {quartiereNome}.</p>
            <p>Per vedere tutti i servizi in città, puoi tornare alla lista generale di <a href={`/${meta.cat}-roma`} style={{ color:'#059669', fontWeight:'700', textDecoration:'underline' }}>{titoloPulito} a Roma</a>.</p>
          </div>

          <div style={{ height:'1px', backgroundColor:'#f1f5f9', width:'100%', margin:'30px 0' }} />

          <h3 style={{ fontSize:'20px', fontWeight:'900', color:'#2c5282', marginBottom:'20px' }}>Domande Frequenti</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            {(() => {
              const chiaveFaq = (meta.cat === 'specialistica' || meta.cat === 'specialisti') ? 'visite-specialistiche' : meta.cat;
              const datiFaq = (seoData[chiaveFaq] && seoData[chiaveFaq].faq) ? seoData[chiaveFaq].faq : seoData['visite-specialistiche'].faq;
              return datiFaq.map((f, idx) => (
                <div key={idx}>
                  <p style={{ fontWeight:'800', color:'#1e293b', margin:'0 0 5px 0' }}>{f.q.replace(/{{zona}}/g, quartiereNome)}</p>
                  <p style={{ margin:0, color:'#475569' }}>{f.a.replace(/{{zona}}/g, quartiereNome)}</p>
                </div>
              ));
            })()}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
