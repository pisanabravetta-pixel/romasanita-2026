import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop, seoData } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica() {
const router = useRouter();
  const { slug } = router.query;

  // --- LOGICA ORIGINALE RIPRISTINATA ---
  const categoriaPulita = slug ? slug.replace('-roma-', '@').split('@')[0] : '';
  const filtri = getDBQuery(categoriaPulita);
  
  // Se la categoria non esiste nel mapping E non è la home o roba vuota
  if (slug && filtri.cat === 'NON_ESISTE') {
    if (typeof window !== 'undefined') {
      router.replace('/404'); 
    }
    return null;
  }
  // --- FINE RIPRISTINO ---
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const annunciPerPagina = 10;
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "", nomeSemplice: "" });
  const [tema, setTema] = useState({ primario: '#0891b2', chiaro: '#ecfeff', label: 'SERVIZI' });

  // LOGICA DERIVATA (Sempre dopo gli stati)
  const listaUnica = Array.from(new Map(servizi.map(item => [item.id, item])).values());
  const totaleAnnunci = listaUnica.length;
  const totalePagine = Math.max(1, Math.ceil(totaleAnnunci / annunciPerPagina));
  
  const inizio = (pagina - 1) * annunciPerPagina;
  const listaDaMostrare = listaUnica.slice(inizio, inizio + annunciPerPagina);

  useEffect(() => {
    // ... resto del codice
  console.log("Slug rilevato:", slug);
  if (!slug || slug === 'index' || slug === '') return;

async function fetchDati() {
      try {
        setLoading(true);
        
        // --- 1. IDENTIFICAZIONE CATEGORIA E ZONA (PULIZIA SLUG) ---
        // Gestisce casi come "dentisti-roma-prati" o "servizi-domicilio-roma-centro-storico"
        const slugPuro = slug.replace('-roma-', '@'); 
        const catSlug = slugPuro.split('@')[0].replace('-roma', ''); 
        const zonaInSlug = slugPuro.includes('@') ? slugPuro.split('@')[1] : 'roma';
        
        const zonaQuery = zonaInSlug.replace(/-/g, ' ');
        const mapping = getDBQuery(catSlug);

// --- 2. QUERY SUPABASE (FILTRO OTTIMIZZATO) ---
        let query = supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true);

        // Filtriamo per categoria SOLO se non è una pagina generica/specialistica
        if (mapping.cat && mapping.cat !== 'NON_ESISTE' && mapping.cat !== 'specialistica') {
          query = query.ilike('categoria', `%${mapping.cat}%`);
        }

        // Se siamo in un quartiere (es. Prati), cerchiamo il termine in 'zona' OR nello 'slug'
        if (zonaInSlug && zonaInSlug !== 'roma') {
          query = query.or(`zona.ilike.%${zonaQuery}%,slug.ilike.%${zonaInSlug}%`);
        }

        // AGGIUNGIAMO ORDINE E RANGE PRIMA DI ESEGUIRE
        const { data } = await query
          .order('is_top', { ascending: false })
          .range(0, 99); 

        // --- 3. AGGIORNAMENTO STATI, TEMA E SEO (STOP UNDEFINED) ---
        setServizi(data || []);

        // Fallback: se il mapping fallisce, usa catSlug per evitare "Undefined"
        const nomeSemplice = (mapping.cat && mapping.cat !== 'NON_ESISTE') ? mapping.cat : catSlug;
      const nomeCat = nomeSemplice.toLowerCase().includes('specialistica') ? 'Specialisti' : nomeSemplice.charAt(0).toUpperCase() + nomeSemplice.slice(1);
        const zonaBella = zonaQuery.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        // Colori dinamici basati sulla categoria
        let primario = "#0891b2"; let chiaro = "#ecfeff";
        if (catSlug.includes('dentist')) { primario = "#0f766e"; chiaro = "#f0fdfa"; }
        else if (catSlug.includes('dermatol')) { primario = "#be185d"; chiaro = "#fdf2f8"; }
        else if (catSlug.includes('cardiolog')) { primario = "#dc2626"; chiaro = "#fef2f2"; }
        else if (catSlug.includes('diagnost')) { primario = "#1e40af"; chiaro = "#eff6ff"; }

      // --- LOGICA DI PULIZIA NOMI E GRAMMATICA ---
let nomeCorretto = nomeCat; 
const n = nomeCorretto.toLowerCase();

if (n.includes('cardio')) nomeCorretto = 'Cardiologi';
else if (n.includes('derma')) nomeCorretto = 'Dermatologi';
else if (n.includes('psico')) nomeCorretto = 'Psicologi';
else if (n.includes('oculi')) nomeCorretto = 'Oculisti';
else if (n.includes('ortope')) nomeCorretto = 'Ortopedici';
else if (n.includes('gineco')) nomeCorretto = 'Ginecologi';
else if (n.includes('dentis')) nomeCorretto = 'Dentisti';
else if (n.includes('specialistica')) nomeCorretto = 'Specialisti';
else if (n.includes('farmaci')) nomeCorretto = 'Farmacie';
else if (n.includes('diagnosti')) nomeCorretto = 'Centri di Diagnostica';

setTema({ primario, chiaro, label: nomeCorretto.toUpperCase() });

setMeta({ 
  titolo: zonaBella.toLowerCase() === 'roma' 
    ? `${nomeCorretto} a Roma` 
    : `${nomeCorretto} a Roma ${zonaBella}`, 
  zona: zonaBella, 
  cat: catSlug,
  nomeSemplice: nomeCorretto 
});

      } catch (err) {
        console.error("Errore nel fetch:", err.message);
      } finally {
        setLoading(false);
      }
    }

  fetchDati();
}, [slug]);

  useEffect(() => {
    // La mappa ora guarda "listaDaMostrare" (i 10 della pagina corrente)
    if (typeof L !== 'undefined' && listaDaMostrare && listaDaMostrare.length > 0) {
      if (window.mapInstance) { window.mapInstance.remove(); }
      
      const map = L.map('map', { scrollWheelZoom: false }).setView([41.9028, 12.4964], 13);
      window.mapInstance = map;
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OSM'
      }).addTo(map);

      const group = new L.featureGroup();
      
      // CICLO SU listaDaMostrare (così vedi solo i 10 della pagina)
      listaDaMostrare.forEach((s) => {
        if (s.lat && s.lng) {
          const marker = L.marker([parseFloat(s.lat), parseFloat(s.lng)])
            .addTo(map)
            .bindPopup(`<b>${s.nome}</b><br>${s.indirizzo}`);
          group.addLayer(marker);
        }
      });

      if (listaDaMostrare.some(s => s.lat && s.lng)) {
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
    // IMPORTANTE: la mappa si aggiorna quando cambia la lista o la pagina
  }, [listaDaMostrare, pagina]); 

  if (!slug) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
  <Head>
  <title>{`${meta.nomeSemplice} a Roma ${meta.zona} – Elenco e contatti | ServiziSalute.com`}</title>
  <meta name="description" content={`Scopri i migliori professionisti in ${meta.nomeSemplice} nel quartiere ${meta.zona} a Roma. Contatti diretti, mappa e informazioni utili aggiornate.`} />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (seoData[meta.cat]?.faq || []).map(f => ({
          "@type": "Question",
          "name": f.q.replace(/{{zona}}/g, meta.zona),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a.replace(/{{zona}}/g, meta.zona)
          }
        }))
      })
    }}
  />
</Head>
      <Navbar />

      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase' }}>
        📍 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* Breadcrumb */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: tema.primario, textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href={`/${meta.cat}-roma`} style={{ color: tema.primario, textDecoration: 'none' }}>{meta.nomeSemplice} Roma</a>
        </div>

      {/* Header SEO */}
<div style={{ 
  marginBottom: '25px', 
  backgroundColor: 'white', 
  padding: '20px', 
  borderRadius: '12px', 
  borderLeft: `8px solid ${tema.primario}`, 
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
}}>
  <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>
    {meta.titolo}
  </h1>
  <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
    I migliori professionisti a {meta.zona} aggiornati a Febbraio 2026
  </p>
</div>

{/* MINI TESTO SEO INIZIALE (Sotto H1) */}
<div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
  <p>
    Il quartiere <strong>{meta.zona}</strong> è una delle zone di Roma servite da numerose strutture sanitarie e attività dedicate alla salute. In questa pagina trovi l’elenco di <strong>{meta.titolo}</strong>, pensato per aiutare residenti, lavoratori e visitatori a individuare rapidamente un professionista o una farmacia nel quartiere <strong>{meta.zona}</strong> di Roma e verificarne contatti e posizione.
  </p>
</div>

        {/* Selezione Zone */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px' }}>Cerca in altre zone vicino a {meta.zona}:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieriTop.map(q => (
              <a key={q.s} href={`/${meta.cat}-roma-${q.s}`} style={{ padding: '7px 12px', backgroundColor: tema.chiaro, color: tema.primario, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q.n}</a>
            ))}
          </div>
        </div>

    {/* BOX MAPPA QUARTIERE - VERSIONE SCURA E COMPATTA */}
<div style={{ marginBottom: '0px' }}>
  <div 
    id="map" 
    style={{ 
      height: '350px', 
      width: '100%',
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: '1px solid #e2e8f0',
      background: '#f8fafc',
      /* Effetto scurito per contrasto */
      filter: 'grayscale(0.2) contrast(1.1) brightness(0.92)',
      marginBottom: '0px' 
    }}
  ></div>
</div>

{/* MINI TESTO SEO SOTTO LA MAPPA - ATTACCATO */}
<p style={{ 
  fontSize: '14px', 
  color: '#64748b', 
  textAlign: 'center', 
  marginTop: '10px', 
  marginBottom: '30px', 
  fontStyle: 'italic',
  lineHeight: '1.5'
}}>
  La mappa mostra la posizione di <strong>{meta.titolo}</strong> nel quartiere <strong>{meta.zona}</strong> a Roma, permettendo di individuare rapidamente le strutture più vicine alla tua posizione.
</p>
{totaleAnnunci > 0 && (
  <div style={{ marginBottom: '20px', padding: '0 5px', fontSize: '15px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ backgroundColor: tema.primario, color: 'white', padding: '3px 10px', borderRadius: '6px', fontSize: '13px' }}>
      {totaleAnnunci}
    </span>
    <span>
      {meta.nomeSemplice.toLowerCase().includes('specialistica') ? 'Specialisti' : meta.nomeSemplice}
      {
        (meta.nomeSemplice.toLowerCase().includes('farmaci') || meta.nomeSemplice.toLowerCase().includes('diagnosti'))
        ? (totaleAnnunci === 1 ? ' trovata' : ' trovate')
        : (totaleAnnunci === 1 ? ' trovato' : ' trovati')
      } a {meta.zona.toLowerCase() === 'roma' ? 'Roma' : `Roma ${meta.zona}`}
    </span>
  </div>
)}
<div style={{ display: 'block' }}>
{listaDaMostrare.map((v) => (
    <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', border: v.is_top ? `4px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 10px 0' }}>{v.nome}</h3>
      <p style={{ fontSize: '16px', color: '#475569', marginBottom: '15px' }}>📍 {v.indirizzo} — <strong style={{ textTransform: 'uppercase' }}>{v.zona}</strong></p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {v.urgenza_24h && <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>🚨 URGENZE</span>}
        <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 10px', borderRadius: '6px', border: `1px solid ${tema.primario}44` }}>{tema.label}</span>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '100px', backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
        
        {/* WHATSAPP FISSO E SEMPRE VERDE */}
        <a 
          href={v.whatsapp ? `https://wa.me/39${String(v.whatsapp).replace(/\D/g, '').replace(/^39/, '')}` : '#'}
          onClick={(e) => { 
            if(!v.whatsapp) { 
              e.preventDefault(); 
              alert("WhatsApp non disponibile per questo professionista"); 
            } 
          }}
          target={v.whatsapp ? "_blank" : "_self"}
          rel="noopener noreferrer"
          style={{ 
            flex: '1', 
            minWidth: '100px', 
            backgroundColor: '#22c55e', 
            color: 'white', 
            padding: '14px', 
            borderRadius: '10px', 
            textAlign: 'center', 
            fontWeight: '800', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          💬 WHATSAPP
        </a>

        <a 
          href={`https://www.google.it/maps?q=${v.lat},${v.lng}`}
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ flex: '1', minWidth: '100px', backgroundColor: '#64748b', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}
        >
          🗺️ MAPPA
        </a>
      </div>

      {/* TESTO TITOLARE - OBBLIGATORIO PER OGNI PAGINA */}
      <p style={{ 
        fontSize: '11px', 
        color: '#94a3b8', 
        marginTop: '16px', 
        marginBottom: '10px',
        textAlign: 'center', 
        lineHeight: '1.5',
        borderTop: '1px solid #f1f5f9', 
        paddingTop: '10px' 
      }}>
        Dati estratti da fonti pubbliche. Sei il titolare? <br/>
        Puoi richiedere la gestione o la modifica di questo annuncio 
        <a 
          href={`mailto:info@servizisalute.com?subject=Richiesta gestione annuncio: ${v.nome}`} 
          style={{ 
            color: tema.primario, 
            marginLeft: '4px', 
            fontWeight: '700', 
            textDecoration: 'underline',
            cursor: 'pointer',
            display: 'inline-block'
          }}
        >
          cliccando qui
        </a>
      </p>

      {/* BADGE DINAMICO SEO QUARTIERE */}
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <span style={{ 
          fontSize: '11px', 
          fontWeight: '800', 
          backgroundColor: `${tema.primario}15`, 
          color: tema.primario, 
          padding: '6px 15px', 
          borderRadius: '20px', 
          border: `1px solid ${tema.primario}33`,
          display: 'inline-block',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {meta.nomeSemplice} A ROMA {v.zona}
        </span>
      </div>
    </div>
  ))}
</div> 
{/* CONTROLLI PAGINAZIONE SOTTO LA LISTA */}
{totaleAnnunci > annunciPerPagina && (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: '15px', 
    margin: '30px 0',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  }}>
    <button 
      type="button"
      onClick={() => { setPagina(p => Math.max(1, p - 1)); window.scrollTo(0,0); }}
      disabled={pagina === 1}
      style={{ 
        padding: '10px 18px', 
        backgroundColor: pagina === 1 ? '#e2e8f0' : tema.primario, 
        color: pagina === 1 ? '#94a3b8' : 'white', 
        border: 'none', 
        borderRadius: '8px', 
        fontWeight: '800', 
        cursor: pagina === 1 ? 'not-allowed' : 'pointer',
        fontSize: '12px'
      }}
    >
      ← PRECEDENTE
    </button>
    
    <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '14px' }}>
      Pagina {pagina} di {totalePagine}
    </span>

    <button 
      type="button"
      onClick={() => { setPagina(p => p + 1); window.scrollTo(0,0); }}
      disabled={pagina >= totalePagine}
      style={{ 
        padding: '10px 18px', 
        backgroundColor: pagina >= totalePagine ? '#e2e8f0' : tema.primario, 
        color: pagina >= totalePagine ? '#94a3b8' : 'white', 
        border: 'none', 
        borderRadius: '8px', 
        fontWeight: '800', 
        cursor: pagina >= totalePagine ? 'not-allowed' : 'pointer',
        fontSize: '12px'
      }}
    >
      SUCCESSIVA →
    </button>
  </div>
)}
{/* GUIDE SPECIFICHE - DISTRIBUZIONE ARTICOLI REALI */}
<div style={{ marginTop: '25px', marginBottom: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0369a1', marginBottom: '12px' }}>
    💰 Approfondimenti e Costi a Roma:
  </h4>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {meta.cat.includes('dentist') ? (
      <>
        <li>🔹 <a href="/guide/costo-pulizia-denti-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una pulizia dei denti a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida: Come prenotare servizi sanitari online</a></li>
      </>
    ) : meta.cat.includes('cardiolog') ? (
      <>
        <li>🔹 <a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una visita cardiologica a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida alle prenotazioni sanitarie nel Lazio</a></li>
      </>
    ) : meta.cat.includes('dermatolog') ? (
      <>
        <li>🔹 <a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una visita dermatologica a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Come orientarsi tra i servizi sanitari della Capitale</a></li>
      </>
    ) : (
      /* Per Diagnostica, Farmacie, Domicilio ecc. usiamo le guide specialistiche come "esempio di costi" */
      <>
        <li>🔹 <a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Esempio Costi: Quanto costa una visita specialistica?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida: Trovare rapidamente servizi sanitari a Roma</a></li>
      </>
    )}
  </ul>
</div>
     
{/* SEO CONCLUSIVO E FAQ CON LINK TESTUALI OBBLIGATORI */}
<section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
  
 <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2c5282', marginBottom: '15px' }}>
  {meta.nomeSemplice} a Roma nel quartiere {meta.zona}
</h2>
  <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '16px' }}>
    <p style={{ marginBottom: '15px' }}>
      Il quartiere <strong>{meta.zona}</strong> è una delle zone di Roma servite da numerose strutture sanitarie e attività dedicate alla salute. In questa pagina trovi l’elenco di <strong>{meta.titolo}</strong>, pensato per aiutare residenti e lavoratori a individuare rapidamente un professionista o una struttura nella propria zona.
    </p>
    
    <p style={{ marginBottom: '15px' }}>
      Grazie alla distribuzione sul territorio, è possibile trovare facilmente una soluzione per la propria salute e verificarne contatti e posizione direttamente sulla mappa. Oltre a questa categoria, nel quartiere {meta.zona} puoi trovare anche servizi di <a href={`/dentisti-roma-${slug?.split('-').pop()}`} style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>Dentisti a Roma {meta.zona}</a> e centri di <a href={`/diagnostica-roma-${slug?.split('-').pop()}`} style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>Diagnostica a Roma {meta.zona}</a>.
    </p>

    <p>
      Puoi confrontare i servizi disponibili e contattare direttamente la struttura per informazioni su orari e disponibilità. Per una visione completa di tutti i servizi in città, puoi sempre <a href={`/${meta.cat}-roma`} style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>tornare alla lista generale di {meta.nomeSemplice} a Roma</a>.
    </p>
  </div>

  <div style={{ height: '1px', backgroundColor: '#f1f5f9', width: '100%', margin: '30px 0' }} />

<h3 style={{ fontSize: '20px', fontWeight: '900', color: '#2c5282', marginBottom: '20px' }}>Domande Frequenti</h3>
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
  {(() => {
    // Identifichiamo la chiave: se è specialistica/specialisti usiamo 'visite-specialistiche'
    const chiaveFaq = (meta.cat === 'specialistica' || meta.cat === 'specialisti') 
      ? 'visite-specialistiche' 
      : meta.cat;

    // Prendiamo le FAQ corrispondenti o quelle di backup
    const datiFaq = (seoData[chiaveFaq] && seoData[chiaveFaq].faq) 
      ? seoData[chiaveFaq].faq 
      : seoData['visite-specialistiche'].faq;

    return datiFaq.map((f, idx) => (
      <div key={idx}>
        <p style={{ fontWeight: '800', color: '#1e293b', margin: '0 0 5px 0' }}>
          {f.q.replace(/{{zona}}/g, meta.zona || 'Roma')}
        </p>
        <p style={{ margin: 0, color: '#475569' }}>
          {f.a.replace(/{{zona}}/g, meta.zona || 'Roma')}
        </p>
      </div>
    ));
  })()}
</div>
</section>
{/* CTA PER PROFESSIONISTI NEL QUARTIERE */}
<div style={{ 
  backgroundColor: '#0f172a', 
  padding: '30px 20px', 
  borderRadius: '12px', 
  textAlign: 'center', 
  color: 'white', 
  margin: '35px 0',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
}}>
  <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '10px', lineHeight: '1.2' }}>
  Sei un professionista o gestisci {meta.nomeSemplice.toLowerCase()} a {meta.zona}?
</h2>
  <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px auto' }}>
    Aumenta la tua visibilità nel quartiere <strong>{meta.zona}</strong>. Inserisci la tua struttura su ServiziSalute e ricevi contatti diretti.
  </p>
  <a href="/pubblica-annuncio" style={{ 
    backgroundColor: tema.primario, 
    color: 'white', 
    padding: '12px 25px', 
    borderRadius: '10px', 
    fontWeight: '900', 
    textDecoration: 'none', 
    display: 'inline-block',
    transition: 'transform 0.2s'
  }}>
    🚀 PUBBLICA IL TUO ANNUNCIO
  </a>
</div>

          {/* CROSS LINKING */}
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px' }}>Esplora altri servizi a {meta.zona}:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <a href={`/dentisti-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#0f766e', fontWeight: '700', textDecoration: 'none' }}>🦷 Dentisti {meta.zona}</a>
              <a href={`/farmacie-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>💊 Farmacie {meta.zona}</a>
              <a href={`/diagnostica-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>🔬 Diagnostica {meta.zona}</a>
              <a href={`/specialisti-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#be185d', fontWeight: '700', textDecoration: 'none' }}>👨‍⚕️ Specialisti {meta.zona}</a>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <a href={`/${meta.cat}-roma`} style={{ color: '#64748b', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>← Torna a {meta.nomeSemplice} a Roma</a>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}
