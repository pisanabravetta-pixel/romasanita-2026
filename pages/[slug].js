import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop, seoData } from '../lib/seo-logic';
import Script from 'next/script';
import Mappa from '../components/Mappa';
import ListaPrezzi from '../components/ListaPrezzi';
import PrezzoDinamico from '../components/PrezzoDinamico';
import Breadcrumbs from '../components/Breadcrumbs';
const prezziIndicativi = {
  farmacie: [ { servizio: "Misurazione pressione", min: 2, max: 5 } ],
  dentisti: [ { servizio: "Visita odontoiatrica", min: 50, max: 100 } ],
  diagnostica: [ { servizio: "Ecografia", min: 60, max: 110 } ],
  'centri-diagnostici': [ { servizio: "Ecografia", min: 60, max: 110 } ],
  'servizi-domicilio': [ { servizio: "Prelievo sangue a domicilio", min: 30, max: 50 } ],
  specialisti: [ { servizio: "Visita specialistica", min: 70, max: 120 } ],
  cardiologi: [ { servizio: "Visita cardiologica", min: 80, max: 140 } ],
  psicologi: [ { servizio: "Colloquio psicologico", min: 50, max: 100 } ],
  dermatologi: [ { servizio: "Visita dermatologica", min: 65, max: 120 } ],
  ginecologi: [ { servizio: "Visita ginecologica", min: 65, max: 120 } ],
  nutrizionisti: [ { servizio: "Visita nutrizionale", min: 60, max: 100 } ],
  ortopedici: [ { servizio: "Visita ortopedica", min: 70, max: 120 } ],
  oculisti: [ { servizio: "Visita oculistica", min: 60, max: 110 } ]
};
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
 
  
  
if (!mounted) return null;

  
  
       
  // --- SE SIAMO NELL'HUB (ROMA) ---
  if (zonaInSlug === 'roma') {
    return (
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
    );
  }

// --- SE SIAMO NEL QUARTIERE ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      
      {/* QUESTA DEVE ESSERE L'UNICA TOPBAR */}
      <div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {titoloPulito} A ROMA {quartiereNome} — {dataStringa.toUpperCase()}
      </div>

      <Navbar />

      {/* 3. POI IL HEAD (Che non si vede graficamente) */}
      <Head>
        <title>{meta.titolo ? `${meta.titolo} (${dataStringa})` : `${titoloPulito} Roma ${quartiereNome}`} | ServiziSalute</title>
        {/* ... tutto il resto del tuo Head ... */}
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

        


      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
     
       <Breadcrumbs categoria={meta.cat} quartiere={meta.zona} />
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
{/* --- AGGIUNTA LISTA PREZZI QUARTIERE --- */}
<ListaPrezzi 
  categoria={meta.nomeSemplice} 
  zona={meta.zona} 
/>

    {/* BOX MAPPA QUARTIERE - VERSIONE SCURA E COMPATTA */}
{mounted && listaDaMostrare.length > 0 && (
  <Mappa lista={listaDaMostrare} />
)}
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
  <div style={{ 
    marginBottom: '20px', 
    padding: '0 5px', 
    fontSize: '15px', 
    fontWeight: '700', 
    color: '#475569', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px',
    // --- MODIFICHE PER CENTRATURA ---
    justifyContent: 'center', 
    textAlign: 'center',
    flexWrap: 'wrap' 
    // --------------------------------
  }}>
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
{listaDaMostrare.map((v, i) => {
  const linkScheda = v.slug ? `/scheda/${v.slug}` : '#';
  const waNumber = v.whatsapp ? String(v.whatsapp).replace(/\D/g, '') : '';
  
  // 1. PULIZIA TOTALE DELLA CHIAVE (Rimuoviamo tutto il superfluo)
  let catKey = v.categoria ? v.categoria.toLowerCase() : '';
  catKey = catKey.replace('visite-specialistiche-', '')
                 .replace('-roma', '')
                 .replace(/\s+/g, '-') // sostituisce spazi con trattini
                 .trim();

  // DEBUG: Decommenta la riga sotto per vedere le chiavi nella console del browser (F12)
  // console.log("Categoria rilevata:", catKey);

  const listinoMedie = {
    'cardiologi': '100€ – 150€',
    'dentisti': '80€ – 180€',
    'dermatologi': '90€ – 130€',
    'psicologi': '60€ – 90€',
    'ginecologi': '100€ – 140€',
    'oculisti': '90€ – 130€',
    'ortopedici': '100€ – 150€',
    'nutrizionisti': '70€ – 110€'
  };

  // 2. RECUPERO SERVIZI (con controllo di sicurezza)
  // Proviamo a cercare 'farmacie', poi 'farmacia', poi 'specialisti'
  const serviziDisponibili = prezziIndicativi[catKey] 
    || prezziIndicativi[catKey.replace(/e$/, 'a')] // prova il singolare
    || prezziIndicativi['specialisti'];
  
  // Scegliamo il servizio in base all'indice i del map
  const s = serviziDisponibili[i % serviziDisponibili.length];

  let badgeTesto = "";
  if (listinoMedie[catKey] && (i % serviziDisponibili.length === 0)) {
    badgeTesto = `Prezzo medio zona: ${listinoMedie[catKey]}`;
  } else {
    badgeTesto = `Prezzo medio zona ${s.servizio}: ${s.min}€ – ${s.max}€`;
  }

  // 3. Label per il badge blu
  let lb = catKey.replace(/-/g, ' ').toUpperCase();
  if (v.approvato === 'f') lb = lb.replace(/I$/, 'A');
  if (v.approvato === 'm') lb = lb.replace(/I$/, 'O');

 return (
      <div key={v.id} style={{
        maxWidth:'600px', margin:'20px auto', backgroundColor:'#fff',
        borderRadius:'18px', boxShadow:'0 2px 16px rgba(44,82,130,0.10)',
        fontFamily:'Arial,sans-serif', border:'1.5px solid #dde6f0',
        overflow:'hidden'
      }}>
        {/* HEADER CARD */}
        <div style={{padding:'20px 20px 0 20px'}}>
          <h2 style={{margin:'0 0 4px 0', fontSize:'22px', color:'#1a2b4a', fontWeight:'900', letterSpacing:'-0.3px'}}>
            {v.nome}
          </h2>
          <div style={{borderBottom:'1px solid #edf2f7', margin:'12px 0'}}></div>

          {/* BADGE CATEGORIA + ZONA */}
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px', flexWrap:'wrap'}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:'5px', fontSize:'13px', color:'#374151', fontWeight:'700'}}>
              <span style={{fontSize:'15px'}}>🩺</span>
              <span>{lb.charAt(0) + lb.slice(1).toLowerCase()}</span>
              <span style={{color:'#6b7280'}}>a</span>
              <strong style={{color:'#1a2b4a'}}>{v.zona}</strong>
            </span>
          </div>

          {/* BADGE PREZZO */}
          <div style={{marginBottom:'12px'}}>
            <PrezzoDinamico categoria={v.categoria} index={i} />
          </div>

          {/* BADGE PREVENTIVO */}
          <div style={{marginBottom:'14px'}}>
            <span style={{display:'inline-block', padding:'5px 14px', backgroundColor:'#6366f1', color:'#fff', borderRadius:'20px', fontWeight:'700', fontSize:'12px', border:'1px solid #4338ca'}}>
              Richiedi preventivo esatto
            </span>
          </div>

          {/* INDIRIZZO */}
          <div style={{display:'flex', alignItems:'center', gap:'6px', color:'#4b5563', fontSize:'14px', marginBottom:'14px', fontWeight:'500'}}>
            <span style={{fontSize:'16px', flexShrink:0}}>📍</span>
            <span>{v.indirizzo}, Roma ({v.zona})</span>
          </div>
        </div>

        {/* SEZIONE MAPPA + CTA CONTATTO */}
        <div style={{display:'flex', gap:'12px', padding:'0 20px 14px 20px', alignItems:'flex-start'}}>
          {/* Miniatura mappa */}
          <a
            href={`https://www.google.it/maps?q=${v.lat},${v.lng}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              flexShrink:0, width:'110px', height:'80px', borderRadius:'10px',
              overflow:'hidden', display:'block', border:'1.5px solid #dde6f0',
              background:`url(https://static-maps.yandex.ru/1.x/?ll=${v.lng},${v.lat}&size=220,160&z=15&l=map&lang=it_IT) center/cover no-repeat #e2e8f0`
            }}
            title="Vedi su Google Maps"
          />
          {/* Testo + pulsanti contatto */}
          <div style={{flex:1}}>
            <p style={{fontSize:'13px', color:'#4b5563', margin:'0 0 10px 0', fontWeight:'600', lineHeight:'1.4'}}>
              Prenota subito per telefono o WhatsApp
            </p>
            <div style={{display:'flex', gap:'8px'}}>
              <a href={`tel:${v.telefono}`} style={{
                flex:1, padding:'10px 6px', backgroundColor:'#2563eb', color:'#fff',
                borderRadius:'9px', textAlign:'center', fontWeight:'800',
                textDecoration:'none', fontSize:'13px', display:'flex',
                alignItems:'center', justifyContent:'center', gap:'5px'
              }}>
                📞 Chiama ora
              </a>
              <a
                href={waNumber ? `https://wa.me/39${waNumber}?text=${encodeURIComponent('Salve, la contatto perché ho visto il suo annuncio su ServiziSalute.com')}` : '#'}
                target="_blank" rel="noopener noreferrer"
                onClick={(e) => { if(!waNumber){ e.preventDefault(); alert('WhatsApp non disponibile'); } }}
                style={{
                  flex:1, padding:'10px 6px', backgroundColor:'#25d366', color:'#fff',
                  borderRadius:'9px', textAlign:'center', fontWeight:'800',
                  textDecoration:'none', fontSize:'13px', display:'flex',
                  alignItems:'center', justifyContent:'center', gap:'5px'
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div style={{
          margin:'0 20px 14px 20px', fontSize:'11px', color:'#94a3b8', lineHeight:'1.5',
          backgroundColor:'#f8fafc', padding:'8px 12px', borderRadius:'8px',
          borderLeft:'3px solid #cbd5e1'
        }}>
          <strong>Nota informativa:</strong> I prezzi indicati rappresentano la media statistica della zona. Per conferme su tariffe, convenzioni e prenotazioni, contatta direttamente il professionista.
        </div>

        {/* PULSANTE SCHEDA FULL-WIDTH */}
        <div style={{padding:'0 20px 20px 20px'}}>
          {v.slug ? (
            <a href={linkScheda} style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
              width:'100%', padding:'14px', boxSizing:'border-box',
              backgroundColor:'#f8fafc', color:'#1a2b4a', border:'1.5px solid #dde6f0',
              borderRadius:'11px', fontWeight:'800', fontSize:'15px',
              textDecoration:'none', transition:'background 0.15s',
              letterSpacing:'0.1px'
            }}>
              Visualizza scheda <span style={{fontSize:'16px'}}>›</span>
            </a>
          ) : (
            <div style={{height:'14px'}} />
          )}
        </div>

        {/* BADGE SEO BOTTOM */}
        <div style={{textAlign:'center', paddingBottom:'14px'}}>
          <span style={{
            fontSize:'10px', fontWeight:'800', backgroundColor:`${tema.primario}12`,
            color:tema.primario, padding:'4px 12px', borderRadius:'20px',
            border:`1px solid ${tema.primario}25`, display:'inline-block',
            textTransform:'uppercase', letterSpacing:'0.5px'
          }}>
            {lb} a Roma {v.zona}
          </span>
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
