import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop, seoData } from '../lib/seo-logic';
import Script from 'next/script';
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

  // --- LOGICA ORIGINALE ---
  const slugAttivo = slug || slugSSR; // FIX: usa slugSSR se slug è undefined
  if (!slugAttivo) {
  return <div className="min-h-screen bg-gray-50" />;
}
  const categoriaPulita = slugAttivo ? slugAttivo.replace('-roma-', '@').split('@')[0] : '';
  const filtri = getDBQuery(categoriaPulita);
  const catSlug = categoriaSSR || (categoriaPulita ? categoriaPulita.replace('-roma', '') : '');
  const zonaInSlug = zonaSSR || (slugAttivo && slugAttivo.includes('-roma-') ? slugAttivo.split('-roma-')[1] : 'roma');
  
  
  const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataAttuale = new Date();
  const meseCorrente = mesi[dataAttuale.getMonth()];
  const annoCorrente = dataAttuale.getFullYear();
  const dataStringa = `${meseCorrente} ${annoCorrente}`;

  const nomiCorrettiH1 = {
    'farmacie': 'FARMACIE', 'farmac': 'FARMACIE', 'diagnostica': 'DIAGNOSTICA',
    'diagnost': 'DIAGNOSTICA', 'dentisti': 'DENTISTI', 'dermatologi': 'DERMATOLOGI',
    'cardiologi': 'CARDIOLOGI', 'psicologi': 'PSICOLOGI', 'oculisti': 'OCULISTI',
    'ortopedici': 'ORTOPEDICI', 'nutrizionisti': 'NUTRIZIONISTI', 'ginecologi': 'GINECOLOGI'
  };

  const quartiereNome = zonaInSlug ? zonaInSlug.charAt(0).toUpperCase() + zonaInSlug.slice(1).replace(/-/g, ' ') : '';
  const titoloPulito = nomiCorrettiH1[catSlug.toLowerCase()] || catSlug.toUpperCase().replace(/-/g, ' ');
  const colore = filtri.colore || '#2563eb';

  // --- STATI E LOGICA ---
  const [servizi, setServizi] = useState(datiIniziali || []);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(paginaIniziale || 1);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "", nomeSemplice: "" });
  const [tema, setTema] = useState({ primario: '#0891b2', chiaro: '#ecfeff', label: 'SERVIZI' });
const [mounted, setMounted] = useState(false);
  useEffect(() => {
  setMounted(true);
}, []);
  const annunciPerPagina = 10;
  // FIX: aggiunto (servizi || []) per evitare crash se i dati non sono ancora arrivati
  const listaUnica = Array.from(new Map((servizi || []).map(item => [item.id, item])).values());
  const inizio = (pagina - 1) * annunciPerPagina;
  const listaDaMostrare = listaUnica.slice(inizio, inizio + annunciPerPagina);
  const totaleAnnunci = totaleDalServer || listaUnica.length;
  const totalePagine = Math.max(1, Math.ceil(totaleAnnunci / annunciPerPagina));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = parseInt(params.get('page')) || 1;
      setPagina(p);
    }
  }, [router.query]);

  useEffect(() => {
    const s = slug || slugSSR; // FIX: coerenza con slugSSR
    if (!s || s === 'index' || s === '') return;

    const slugPuro = s.replace('-roma-', '@');
    const catEstratta = slugPuro.split('@')[0].replace('-roma', ''); 
    const zonaEstratta = slugPuro.includes('@') ? slugPuro.split('@')[1] : 'roma';
    const isHub = !zonaEstratta || zonaEstratta === 'roma';

    const nomiPuliti = {
      'diagnostica': 'Diagnostica', 'farmacie': 'Farmacie', 'dermatologi': 'Dermatologi',
      'cardiologi': 'Cardiologi', 'dentisti': 'Dentisti', 'ginecologi': 'Ginecologi',
      'oculisti': 'Oculisti', 'ortopedici': 'Ortopedici', 'psicologi': 'Psicologi',
      'nutrizionisti': 'Nutrizionisti', 'servizi-sanitari': 'Servizi Sanitari',
      'servizi-domicilio': 'Servizi a Domicilio'
    };
    const nomeBase = nomiPuliti[catEstratta.toLowerCase()] || (catEstratta.charAt(0).toUpperCase() + catEstratta.slice(1));
    const zonaBella = (zonaEstratta === 'roma') ? 'Roma' : zonaEstratta.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    let primario = "#0891b2"; let chiaro = "#ecfeff";
    if (catEstratta.includes('dentist')) { primario = "#0f766e"; chiaro = "#f0fdfa"; }
    else if (catEstratta.includes('dermatol')) { primario = "#be185d"; chiaro = "#fdf2f8"; }
    else if (catEstratta.includes('cardiolog')) { primario = "#dc2626"; chiaro = "#fef2f2"; }

    setTema({ primario, chiaro, label: nomeBase.toUpperCase() });
    setMeta({ 
      titolo: isHub ? `${nomeBase} a Roma` : `${nomeBase} a Roma ${zonaBella}`, 
      zona: zonaBella, cat: catEstratta, nomeSemplice: nomeBase 
    });

    if (isHub && datiIniziali && datiIniziali.length > 0) {
      setServizi(datiIniziali);
      setLoading(false);
      return; 
    }
    // --- AGGIUNGI QUESTO QUI SOTTO ---
    if (datiIniziali && datiIniziali.length > 0) {
      setServizi(datiIniziali);
      setLoading(false);
      return; 
    }
    // --- FINE AGGIUNTA ---

    const fetchData = async () => {
      try {
        setLoading(true);
        const keyword = catEstratta.toLowerCase().substring(0, 4);
        let q = supabase.from('annunci').select('*').eq('approvato', true);
        q = q.or(`categoria.ilike.%${keyword}%,nome.ilike.%${keyword}%`);
        if (!isHub) {
          const zQuery = zonaEstratta.replace(/-/g, ' ');
          q = q.or(`zona.ilike.%${zQuery}%,slug.ilike.%${zonaEstratta}%`);
        }
        const { data, error } = await q.order('is_top', { ascending: false }).range(0, 99);
       setServizi(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Errore fetch client:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, slugSSR, datiIniziali]);
 
  // 3. MAPPA
  useEffect(() => {
  if (!mounted) return; // ← blocca la mappa finché non siamo sul client
  if (typeof window !== 'undefined' && typeof L !== 'undefined' && listaDaMostrare?.length > 0) {
    if (window.mapInstance) { window.mapInstance.remove(); }
    const map = L.map('map', { scrollWheelZoom: false }).setView([41.9028, 12.4964], 13);
    window.mapInstance = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OSM' }).addTo(map);
    const group = new L.featureGroup();
    listaDaMostrare.forEach((s) => {
      if (s.lat && s.lng) {
        const m = L.marker([parseFloat(s.lat), parseFloat(s.lng)]).addTo(map).bindPopup(`<b>${s.nome}</b>`);
        group.addLayer(m);
      }
    });
    if (group.getLayers().length > 0) map.fitBounds(group.getBounds().pad(0.1));
  }
}, [listaDaMostrare, mounted]);
  
if (!mounted) return null;
 return (
  <>
    {/* AGGIUNGI QUESTA RIGA: Se siamo su Roma usa HubLayout */}
    {zonaInSlug === 'roma' ? (
      <HubLayout 
        titolo={catSlug.replace(/-/g, ' ')}
        categoria={catSlug}
        colore="#2c5282"
        datiIniziali={servizi}
        totaleDalServer={totaleDalServer}
        paginaIniziale={pagina}
        testoTopBar={`${catSlug.toUpperCase()} ROMA`}
        badgeSpec={catSlug}
      />
    ) : (
      /* --- DA QUI IN POI È IL TUO CODICE ORIGINALE --- */
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
        <Head>
          <title>{meta.titolo ? `${meta.titolo} (${dataStringa})` : `${titoloPulito} Roma ${quartiereNome}`} | ServiziSalute</title>
          <meta 
            name="description" 
            content={`Cerchi ${titoloPulito.toLowerCase()} a Roma in zona ${quartiereNome}? ✅ Elenco aggiornato a ${dataStringa}. Contatti diretti WhatsApp e telefono.`} 
          />
          <link rel="canonical" href={`https://www.servizisalute.com/${slug}`} />
          
          <link rel="preconnect" href="https://basemaps.cartocdn.com" />
          <link 
            rel="stylesheet" 
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": (seoData[filtri.cat]?.faq || []).map(f => ({
                  "@type": "Question",
                  "name": f.q.replace(/{{zona}}/g, quartiereNome),
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a.replace(/{{zona}}/g, quartiereNome)
                  }
                }))
              })
            }}
          />
        </Head>

        <Script 
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
          strategy="lazyOnload" 
        />

<div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
  {titoloPulito} A ROMA {quartiereNome} — {dataStringa.toUpperCase()}
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
    {titoloPulito} Roma {quartiereNome || 'Centro'}
  </h1>
  <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
    I migliori professionisti a {quartiereNome || 'Roma'} aggiornati a <span style={{ color: colore }}>{dataStringa}</span>
  </p>
</div>
{/* TESTO SEO INTELLIGENTE POTENZIATO */}
      <div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
        {(() => {
          const slugCorrente = slug?.toLowerCase() || '';
          const checkFarmacia = slugCorrente.includes('farmac') || (meta.cat && meta.cat.toLowerCase().includes('farmac'));
          const nomePosto = checkFarmacia ? 'Il presidio farmaceutico' : 'L\'Hub sanitario';
          const tipoServizio = checkFarmacia ? 'farmaci di turno' : 'uno specialista';

          const testiUrgenza = {
            'prati': `Cerchi ${checkFarmacia ? 'una farmacia di turno' : 'un\'urgenza medica'} a Prati? Il quartiere offre standard d'eccellenza: trovi qui i professionisti pronti a risponderti su WhatsApp per assistenza immediata.`,
            'eur': `${nomePosto} dell'EUR è attivo anche per le emergenze. Se cerchi ${tipoServizio} o assistenza rapida nel quadrante Sud di Roma, consulta la nostra lista con contatti diretti.`,
            'ostia': `Emergenza sanitaria sul litorale? Non serve arrivare a Roma centro. Trova subito i medici e le farmacie aperte ora a Ostia Lido con posizione GPS e WhatsApp.`
          };

          const chiaveQuartiere = Object.keys(testiUrgenza).find(q => slugCorrente.includes(q));
          const introUrgenza = chiaveQuartiere ? testiUrgenza[chiaveQuartiere] : '';

          return (
            <p>
              {introUrgenza && (
                <span style={{ display: 'block', marginBottom: '12px', color: '#b91c1c', fontWeight: '700' }}>
                  🚨 {introUrgenza}
                </span>
              )}
              Stai cercando <strong>{meta.nomeSemplice} a Roma {meta.zona}</strong>? In questa pagina trovi i contatti diretti e la posizione dei professionisti e delle strutture disponibili oggi nel quartiere. 
              {checkFarmacia && (
                <span> Ti consigliamo di contattare telefonicamente la struttura per verificare la disponibilità immediata di farmaci o l'eventuale turno notturno in corso a {meta.zona}.</span>
              )}
              {meta.cat.includes('psico') && (
                <span> Puoi contattare direttamente i professionisti tramite WhatsApp per richiedere un primo colloquio conoscitivo o verificare la disponibilità per una seduta a {meta.zona}.</span>
              )}
              {!checkFarmacia && !meta.cat.includes('psico') && (
                <span> Visualizza la mappa per trovare il centro più vicino a te e chiama per prenotare una visita o richiedere informazioni su costi e orari.</span>
              )}
            </p>
          );
        })()}
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
<div style={{ marginBottom: '0px', position: 'relative' }}>
  <div 
    id="map" 
    style={{ 
      height: '350px', 
      width: '100%',
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: '1px solid #e2e8f0',
      background: '#f8fafc', 
      filter: 'grayscale(0.2) contrast(1.1) brightness(0.92)',
      zIndex: 1
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
{listaDaMostrare.map((v, index) => {
    const linkScheda = v.slug ? `/scheda/${v.slug}` : '#';
   
    return (
      <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', border: v.is_top ? `4px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
       <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 10px 0' }}>
  {v.slug ? (
    <a href={linkScheda} style={{ color: '#1e293b', textDecoration: 'none' }}>
      {v.nome}
    </a>
  ) : (
    v.nome
  )}
</h3>
        <p style={{ fontSize: '16px', color: '#475569', marginBottom: '15px' }}>📍 {v.indirizzo} — <strong style={{ textTransform: 'uppercase' }}>{v.zona}</strong></p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {v.urgenza_24h && <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>🚨 URGENZE</span>}
       <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 10px', borderRadius: '6px', border: `1px solid ${tema.primario}44` }}>
  {v.categoria 
    ? v.categoria.toLowerCase().replace('visite-specialistiche', '').replace(/-/g, ' ').trim().toUpperCase() 
    : tema.label}
</span>
        </div>
        
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
  <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '100px', backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
          
  {/* Modificato qui: usiamo v.slug invece di mostraLinkScheda */}
  {v.slug && (
    <a href={linkScheda} style={{ flex: '1', minWidth: '100px', backgroundColor: '#1e293b', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📄 SCHEDA</a>
          )}

          <a 
            href={v.whatsapp ? `https://wa.me/39${String(v.whatsapp).replace(/\D/g, '').replace(/^39/, '')}?text=${encodeURIComponent(`Salve, la contatto perché ho visto il suo annuncio su ServiziSalute.com`)}` : '#'}
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
      </div>
    );
  })}
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
  Dati estratti da fonti pubbliche. Sei il titolare di una di queste strutture? <br/>
  Puoi richiedere la gestione o la modifica dei dati 
  <a 
    href={`mailto:info@servizisalute.com?subject=Richiesta gestione annuncio`} 
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
<div style={{ textAlign: 'center', marginTop: '12px', marginBottom: '30px' }}>
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
    {/* Qui usiamo meta.nomeSemplice che è già calcolato sopra */}
    {meta.nomeSemplice} A ROMA {meta.zona}
  </span>
</div>
{/* CONTROLLI PAGINAZIONE SOTTO LA LISTA - VERSIONE SEO */}
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
    <a 
      href={pagina > 1 ? `?page=${pagina - 1}` : '#'}
      onClick={(e) => { 
        if(pagina === 1) {
          e.preventDefault(); 
        } else {
          window.scrollTo(0,0);
        }
      }}
      style={{ 
        padding: '10px 18px', 
        backgroundColor: pagina === 1 ? '#e2e8f0' : tema.primario, 
        color: pagina === 1 ? '#94a3b8' : 'white', 
        borderRadius: '8px', 
        fontWeight: '800', 
        textDecoration: 'none',
        cursor: pagina === 1 ? 'not-allowed' : 'pointer',
        fontSize: '12px',
        display: 'inline-block'
      }}
    >
      ← PRECEDENTE
    </a>
    
    <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '14px' }}>
      Pagina {pagina} di {totalePagine}
    </span>

    <a 
      href={pagina < totalePagine ? `?page=${pagina + 1}` : '#'}
      onClick={(e) => { 
        if(pagina >= totalePagine) {
          e.preventDefault(); 
        } else {
          window.scrollTo(0,0);
        }
      }}
      style={{ 
        padding: '10px 18px', 
        backgroundColor: pagina >= totalePagine ? '#e2e8f0' : tema.primario, 
        color: pagina >= totalePagine ? '#94a3b8' : 'white', 
        borderRadius: '8px', 
        fontWeight: '800', 
        textDecoration: 'none',
        cursor: pagina >= totalePagine ? 'not-allowed' : 'pointer',
        fontSize: '12px',
        display: 'inline-block'
      }}
    >
      SUCCESSIVA →
    </a>
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
    )}
  </>
);
}

export async function getServerSideProps(context) {
  const { slug, page: queryPage } = context.query;
  const page = parseInt(queryPage) || 1;
  const annunciPerPagina = 10;

  try {

    // 1. ANALISI DELLO SLUG
    const slugPuro = slug ? slug.replace('-roma-', '@') : '';
    const catRicercata = slugPuro.split('@')[0].replace('-roma', '');
    if (!catRicercata || catRicercata.length < 3) {
      return { notFound: true };
    }

    const zonaInSlug = slugPuro.includes('@') ? slugPuro.split('@')[1] : 'roma';
    const isHub = !zonaInSlug || zonaInSlug === 'roma';

    // 2. QUERY BASE
    let query = supabase
      .from('annunci')
      .select('*', { count: 'exact' })
      .eq('approvato', true);

    // 3. LOGICA RADICE
    let radice = catRicercata.toLowerCase();
    if (radice.endsWith('i')) radice = radice.slice(0, -1);
    if (radice.length > 9) radice = radice.substring(0, 10); 

    query = query.ilike('categoria', `%${radice}%`);

    // 4. FILTRO ZONA
    if (!isHub) {
      const zonaRicerca = zonaInSlug.replace(/-/g, ' ');
      query = query.ilike('zona', `%${zonaRicerca}%`);
    }

    // 5. PAGINAZIONE
    const da = (page - 1) * annunciPerPagina;
    const a = da + annunciPerPagina - 1;

    const { data, count, error } = await query
      .order('id', { ascending: false })
      .range(da, a);

    if (error) throw error;

    return {
      props: {
        datiIniziali: data || [],
        totaleDalServer: count || 0,
        paginaIniziale: page,
        slugSSR: slug || "",
        categoriaSSR: catRicercata,
        zonaSSR: zonaInSlug
      }
    };

  } catch (err) {
    console.error("ERRORE SSR:", err);

    return { 
      props: { 
        datiIniziali: [], 
        totaleDalServer: 0, 
        paginaIniziale: 1, 
        slugSSR: slug || "",
        categoriaSSR: "",
        zonaSSR: ""
      } 
    };
  }
}
