import React, { useEffect, useState } from 'react';
import { quartieriTop, seoData } from '../lib/seo-logic';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { theme } from '../styles/theme';
import { supabase } from '../lib/supabaseClient';
import Script from 'next/script';
export default function HubLayout({ 
  titolo, 
  categoria, 
  colore, 
  datiIniziali = [], // AGGIUNTO
  totaleDalServer = 0, // AGGIUNTO
  paginaIniziale = 1,
  medici = [], 
  loading,
  // ... resto dei parametri invariato
  quartieri = [], 
  schemas, 
  descrizioneMeta,
  testoMiniSEO,
  badgeSpec,
  testoTopBar,
  testoCTA,
  altreSpecialistiche = [],
  children
}) {
  // 1. Calcolo automatico della data corrente
  const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataAttuale = new Date();
  const meseCorrente = mesi[dataAttuale.getMonth()];
  const annoCorrente = dataAttuale.getFullYear();
  const dataStringa = `${meseCorrente} ${annoCorrente}`;
  const titoloPulito = (titolo || "").split(" Roma")[0].split(" a Roma")[0].trim();
  // DEFINISCI SEMPRE QUESTI PER PRIMI
const [serviziRealTime, setServiziRealTime] = useState(datiIniziali?.length > 0 ? datiIniziali : (medici || []));
  const [loadingRealTime, setLoadingRealTime] = useState(datiIniziali?.length > 0 ? false : true);
  const [pagina, setPagina] = useState(paginaIniziale || 1);

// Aggiungi questo subito sotto per leggere la pagina dall'URL
useEffect(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const p = parseInt(params.get('page')) || 1;
    setPagina(p);
  }
}, []);
  const annunciPerPagina = 10;

// ORA CALCOLA LE VARIABILI DERIVATE
const sorgenteDati = (serviziRealTime && serviziRealTime.length > 0) ? serviziRealTime : (medici || []);
const listaUnica = Array.from(new Map(sorgenteDati.map(item => [item.id, item])).values());
const totaleAnnunci = totaleDalServer || listaUnica.length;
const totalePagine = Math.max(1, Math.ceil(totaleAnnunci / annunciPerPagina));
  
  const inizio = (pagina - 1) * annunciPerPagina;
  const listaDaMostrare = listaUnica.slice(inizio, inizio + annunciPerPagina);
  useEffect(() => {
    if (medici && medici.length > 0) {
      setLoadingRealTime(false);
      return; 
    }


    // AGGIUNGI QUESTO QUI SOTTO:
    // Se abbiamo già caricato i dati dal server (nuovo metodo SSR)
    if (serviziRealTime.length > 0 && pagina === 1) {
      setLoadingRealTime(false);
      return;
    }
    
   
async function fetchNuoviMedici() {
  try {
    setLoadingRealTime(true);
    
   // In fetchNuoviMedici
const { data, error } = await supabase
  .from('annunci')
  .select('*')
  .eq('approvato', true)
  .order('is_top', { ascending: false })
  .range(0, 399); // <--- PORTALO A 400

    if (error) throw error;

    const filtrati = data ? data.filter(item => {
      if (!item.categoria) return false;
      
      const cDB = item.categoria.toLowerCase();
      const cURL = (categoria || "").toLowerCase();

      // RADICE KILLER (4 lettere): "derm" becca tutto quello che ti serve
      const radice = cURL.substring(0, 4); 

      // Se la radice è presente nella categoria del DB, l'annuncio passa.
      // Questo recupera i "7" che vedevi prima + tutti quelli che erano rimasti fuori.
      return cDB.includes(radice);
    }) : [];

    setServiziRealTime(filtrati);
  } catch (err) {
    console.error("Errore fetch Hub:", err);
  } finally {
    setLoadingRealTime(false);
  }
}
    fetchNuoviMedici();
  }, [categoria, medici]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.L === 'undefined' || !listaDaMostrare || listaDaMostrare.length === 0) {
      return;
    }
    const L = window.L; 
    try {
      if (window.mapInstance) { 
        window.mapInstance.remove(); 
        window.mapInstance = null;
      }
      const map = L.map('map', { scrollWheelZoom: false }).setView([41.9028, 12.4964], 11);
      window.mapInstance = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OSM'
      }).addTo(map);

      listaDaMostrare.forEach((m) => {
        if (m.lat && m.lng) {
          L.marker([parseFloat(m.lat), parseFloat(m.lng)])
            .addTo(map)
            .bindPopup(`<b>${m.nome || m.titolo}</b><br>${m.indirizzo}`);
        }
      });
    } catch (err) {
      console.error("Errore Mappa:", err);
    }
  }, [listaDaMostrare]);

  return (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
    
  <Head>
  <title>{`${titoloPulito} Roma (${dataStringa}): Elenco e Contatti | ServiziSalute`}</title>
  <meta 
    name="description" 
    content={`Cerchi ${titoloPulito} a Roma? ✅ Elenco aggiornato a ${dataStringa}. Trova i migliori professionisti, guarda la mappa e contattali direttamente su WhatsApp o telefono.`} 
  />
  <link rel="canonical" href={schemas?.canonical || `https://www.servizisalute.com/${categoria}-roma`} />
  
  {/* OTTIMIZZAZIONE MAPPA */}
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
      __html: JSON.stringify(schemas?.faq || {})
    }}
  />
</Head>

{/* CARICAMENTO JS MAPPA SOLO QUANDO SERVE */}
<Script 
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossOrigin=""
  strategy="lazyOnload" 
/>

<div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px' }}>
  {testoTopBar.split(' — ')[0]} — {dataStringa.toUpperCase()}
</div>

<Navbar />
      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
        <span style={{ color: '#065f46' }}>{titoloPulito} Roma</span>
        </div>

<h1 style={{ color: '#2c5282', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
  {titoloPulito} a Roma
</h1>
<p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: '0 0 25px 0' }}>
  Specialisti aggiornati a <span style={{ color: colore }}>{dataStringa}</span>
</p>

<div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
  <p>
    Trova e contatta i migliori professionisti in <strong>{titoloPulito} a Roma</strong> aggiornati a <strong>{dataStringa}</strong>. 
    In questa sezione puoi consultare l'elenco completo, con schede dettagliate che includono indirizzi e tasti di contatto rapido via <strong>WhatsApp o Telefono</strong>. 
    Il nostro obiettivo è semplificare l'accesso alle cure a Roma, mettendo in contatto diretto i cittadini con le strutture del proprio quartiere, senza attese o intermediari.
  </p>
</div>
 <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
  <p style={{ fontSize: '14px', fontWeight: '900', marginBottom: '12px', color: '#2c5282', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
    📍 Cerca per Quartiere:
  </p>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {quartieriTop.map((q) => {
      // Logica sicura per lo slug
      const catPresente = categoria || '';
      const catSicura = (!catPresente || catPresente === 'undefined' || catPresente === 'specialisti' || catPresente === 'specialistica') 
        ? 'visite-specialistiche' 
        : catPresente;

      return (
        <a 
          key={q.s} 
          href={`/${catSicura}-roma-${q.s}`} 
          style={{ 
            padding: '7px 12px', 
            backgroundColor: '#ebf8ff', 
            color: '#2c5282', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontWeight: '700', 
            fontSize: '12px' 
          }}
        >
          {q.n}
        </a>
      );
    })}
  </div>
</div>
{children}
{/* BOX MAPPA LEAFLET - SPAZIO AZZERATO */}
<div style={{ marginBottom: '25px' }}> 
  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1e293b', margin: '0 0 15px 0', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
    📍 Mappa Professionisti a Roma
  </h3>
  
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

  <p style={{ 
    fontSize: '14px', 
    color: '#64748b', 
    textAlign: 'center', 
    marginTop: '12px', 
    fontStyle: 'italic',
    lineHeight: '1.5'
  }}>
    La mappa mostra la distribuzione dei servizi di <strong>{titoloPulito} a Roma</strong>, aiutando a individuare le strutture verificate più vicine alla tua posizione.
  </p>
</div>
         
{/* BLOCCO ANNUNCI DETTAGLIATI */}
{totaleAnnunci > 0 && (
  <div style={{ 
    marginBottom: '20px', 
    padding: '0 5px', 
    fontSize: '15px', 
    fontWeight: '700', 
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    <span style={{ 
      backgroundColor: colore, 
      color: 'white', 
      padding: '3px 10px', 
      borderRadius: '6px',
      fontSize: '13px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {totaleAnnunci}
    </span>
    <span>
      {titoloPulito} {
        (titoloPulito.toLowerCase().includes('farmaci') || titoloPulito.toLowerCase().includes('diagnosti'))
        ? (totaleAnnunci === 1 ? 'trovata' : 'trovate')
        : (totaleAnnunci === 1 ? 'trovato' : 'trovati')
      } a Roma
    </span>
  </div>
)}

<div style={{ display: 'block' }}>
  {loadingRealTime ? (
    <p>Caricamento...</p>
  ) : listaDaMostrare && listaDaMostrare.length > 0 ? (
    listaDaMostrare.map((v, index) => {
     const linkScheda = v.slug ? `/scheda/${v.slug}` : '#';

      return (
        <div key={v.id} style={{ backgroundColor: 'white', borderRadius: theme.radius.card, padding: theme.padding.card, marginBottom: '20px', border: v.is_top ? `4px solid ${colore}` : '1px solid #e2e8f0', boxShadow: theme.shadows.premium, width: '100%', boxSizing: 'border-box' }}>
          
          <h3 style={{ color: '#2c5282', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>
  {v.slug ? (
    <a href={linkScheda} style={{ color: '#2c5282', textDecoration: 'none' }}>
      {v.nome || v.titolo || 'Professionista Verificato'}
    </a>
  ) : (
    v.nome || v.titolo || 'Professionista Verificato'
  )}
</h3>
          
          <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>
            📍 {v.indirizzo || 'Roma'} — <strong>{v.zona || v.quartiere || 'Roma'}</strong>
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {v.urgency_24h && <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>🚨 URGENZE</span>}
            <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#ebf8ff', color: colore, padding: '4px 10px', borderRadius: '6px', border: `1px solid ${colore}44` }}>
              {v.categoria 
                ? v.categoria.toLowerCase().replace('visite-specialistiche', '').replace(/-/g, ' ').trim().toUpperCase() 
                : (badgeSpec || 'SPECIALISTA').toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: colore, color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>
              📞 CHIAMA
            </a>
{v.slug && (
  <a href={linkScheda} style={{ flex: '1', minWidth: '110px', backgroundColor: '#1e293b', color: 'white', padding: '14px', borderRadius: '8px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>
    📄 SCHEDA
  </a>
)}

            <a 
              href={v.whatsapp ? `https://wa.me/39${String(v.whatsapp).replace(/\D/g, '').replace(/^39/, '')}?text=${encodeURIComponent(`Salve, la contatto perché ho visto il suo annuncio su ServiziSalute.com`)}` : '#'}
              onClick={(e) => { if(!v.whatsapp) { e.preventDefault(); alert("WhatsApp non disponibile"); } }}
              target={v.whatsapp ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '8px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              💬 WHATSAPP
            </a>

            <a href={`https://www.google.it/maps?q=${v.lat},${v.lng}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#64748b', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>
              🗺️ MAPPA
            </a>
          </div>

          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '16px', marginBottom: '10px', textAlign: 'center', lineHeight: '1.5', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
            Dati estratti da fonti pubbliche. Sei il titolare? <br/>
            Puoi richiedere la modifica di questo annuncio 
            <a href={`mailto:info@servizisalute.com?subject=Richiesta: ${v.nome}`} style={{ color: colore, marginLeft: '4px', fontWeight: '700', textDecoration: 'underline' }}>cliccando qui</a>
          </p>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: `${colore}15`, color: colore, padding: '6px 15px', borderRadius: '20px', border: `1px solid ${colore}33`, display: 'inline-block', textTransform: 'uppercase' }}>
              {titoloPulito} A ROMA {v.zona || v.quartiere || ''}
            </span>
          </div>
        </div>
      );
    })
  ) : (
    <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: theme.radius.main, textAlign: 'center', border: '2px dashed #cbd5e1', marginBottom: '30px' }}>
      <span style={{ fontSize: '40px', marginBottom: '10px', display: 'block' }}>🔎</span>
      <h3 style={{ color: '#1e293b', fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Ricerca in corso a Roma</h3>
      <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
        Stiamo selezionando i migliori profili per <strong>{titoloPulito} a Roma</strong>.
      </p>
    </div>
  )}
</div>

    {/* 4. CONTROLLI PAGINAZIONE SEO */}
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
            onClick={(e) => { if(pagina === 1) e.preventDefault(); else window.scrollTo(0,0); }}
            style={{ 
              padding: '10px 18px', 
              backgroundColor: pagina === 1 ? '#e2e8f0' : colore, 
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
            onClick={(e) => { if(pagina >= totalePagine) e.preventDefault(); else window.scrollTo(0,0); }}
            style={{  
              padding: '10px 18px',  
              backgroundColor: pagina >= totalePagine ? '#e2e8f0' : colore,  
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
     
{/* GUIDE SPECIFICHE - VERSIONE PER HUBLAYOUT */}
<div style={{ marginTop: '25px', marginBottom: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0369a1', marginBottom: '12px' }}>
    💰 Approfondimenti e Costi a Roma:
  </h4>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {(categoria || '').toLowerCase().includes('dentist') ? (
      <>
        <li>🔹 <a href="/guide/costo-pulizia-denti-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una pulizia dei denti a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida: Come prenotare servizi sanitari online</a></li>
      </>
    ) : (categoria || '').toLowerCase().includes('cardiolog') ? (
      <>
        <li>🔹 <a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una visita cardiologica a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida alle prenotazioni sanitarie nel Lazio</a></li>
      </>
    ) : (categoria || '').toLowerCase().includes('dermatolog') ? (
      <>
        <li>🔹 <a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una visita dermatologica a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Come orientarsi tra i servizi sanitari della Capitale</a></li>
      </>
    ) : (
      <>
        <li>🔹 <a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Esempio Costi: Quanto costa una visita specialistica?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida: Trovare rapidamente servizi sanitari a Roma</a></li>
      </>
    )}
  </ul>
</div>
<section style={{ 
  margin: '40px 0', 
  padding: '25px', 
  backgroundColor: 'white', 
  borderRadius: '15px', 
  border: '1px solid #e2e8f0', 
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' 
}}>
  
  <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2c5282', marginBottom: '15px' }}>
    {titolo} a Roma: guida alla scelta nel tuo quartiere
  </h2>
  
  <p style={{ marginBottom: '15px' }}>
  Roma vanta una rete sanitaria complessa che si estende dal centro storico fino alle zone periferiche. Per facilitare la tua ricerca, abbiamo organizzato i servizi di <strong>{titolo.toLowerCase()} a Roma</strong> per aree strategiche, permettendoti di individuare professionisti a: 
  <a href={`/${categoria}-roma-prati`} style={{color: '#059669', fontWeight: '700', textDecoration: 'none', marginLeft: '5px'}}>Prati</a>, 
  <a href={`/${categoria}-roma-eur`} style={{color: '#059669', fontWeight: '700', textDecoration: 'none', marginLeft: '5px'}}>EUR</a>, 
  <a href={`/${categoria}-roma-parioli`} style={{color: '#059669', fontWeight: '700', textDecoration: 'none', marginLeft: '5px'}}>Parioli</a>, 
  <a href={`/${categoria}-roma-san-giovanni`} style={{color: '#059669', fontWeight: '700', textDecoration: 'none', marginLeft: '5px'}}>San Giovanni</a> e 
  <a href={`/${categoria}-roma-monteverde`} style={{color: '#059669', fontWeight: '700', textDecoration: 'none', marginLeft: '5px'}}>Monteverde</a>.
</p>

    <p style={{ marginBottom: '15px' }}>
      Oltre alle prestazioni standard, molte delle strutture elencate offrono servizi di autoanalisi, test diagnostici rapidi e telemedicina. Se non sai come orientarti tra le diverse opzioni disponibili, ti consigliamo di leggere la nostra guida su <a href="/guide/trovare-servizio-sanitario-roma" style={{color: '#059669', fontWeight: '700', textDecoration: 'none'}}>come trovare il miglior servizio sanitario a Roma</a>, dove troverai consigli utili su ticket, esenzioni e scelta del medico.
    </p>

   <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '16px' }}>
      <p style={{ marginBottom: '30px' }}>
        Ti ricordiamo di verificare sempre la disponibilità e gli orari aggiornati (specialmente per i turni festivi) utilizzando i tasti <strong>Chiama</strong> o <strong>WhatsApp</strong> presenti in ogni scheda. Questo garantisce un contatto immediato con la segreteria o lo specialista di riferimento nel tuo quadrante urbano.
      </p>
    </div>

  <div style={{ height: '1px', backgroundColor: '#f1f5f9', width: '80%', margin: '30px auto' }} />

<h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#2c5282', borderBottom: `3px solid ${colore}`, display: 'inline-block' }}>
    Domande Frequenti su {titolo} a Roma
  </h3>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
    {/* 1. Prova a usare faqRaw (passate dalla pagina), 2. Altrimenti usa seoData, 3. Altrimenti fallback */}
    {(schemas?.faqRaw || seoData?.[categoria]?.faq) ? (
      (schemas?.faqRaw || seoData[categoria].faq).map((f, idx) => (
        <div key={idx}>
          <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
            {idx + 1}. {f.q.replace(/{{zona}}/g, 'Roma')}
          </p>
          <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
            {f.a.replace(/{{zona}}/g, 'Roma')}
          </p>
        </div>
      ))
    ) : (
      <div>
        <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>1. Come trovare servizi di {titolo} a Roma?</p>
        <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>È possibile consultare l’elenco suddiviso per quartiere e utilizzare la mappa per individuare la struttura più vicina.</p>
      </div>
    )}
  </div>
</section>

<div style={{ backgroundColor: '#0f172a', padding: theme.padding.main, borderRadius: theme.radius.main, textAlign: 'center', color: 'white', marginBottom: '40px' }}>
  <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>
    Gestisci {titolo.toLowerCase()} a Roma?
  </h2>
  <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Inserisci la tua struttura e ricevi contatti da nuovi pazienti a Roma.</p>
  <a href="/pubblica-annuncio" style={{ backgroundColor: colore, color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
</div>
          {/* SEZIONE CROSS-LINKING FINALE */}
<div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
  <p style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px', color: '#1e293b' }}>
    Esplora altri servizi a Roma:
  </p>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
    {(categoria || '') !== 'dentisti' && <a href="/dentisti-roma" style={{ color: '#0f766e', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>🦷 Dentisti Roma</a>}
    {(categoria || '') !== 'farmacie' && <a href="/farmacie-roma" style={{ color: '#15803d', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>💊 Farmacie Roma</a>}
    {(categoria || '') !== 'diagnostica' && <a href="/diagnostica-roma" style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>🔬 Diagnostica Roma</a>}
    {(categoria || '') !== 'dermatologi' && <a href="/dermatologi-roma" style={{ color: '#be185d', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>👨‍⚕️ Dermatologi Roma</a>}
    {(categoria || '') !== 'servizi-a-domicilio' && <a href="/servizi-a-domicilio-roma" style={{ color: '#ea580c', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>🏠 Servizi a Domicilio</a>}
  </div>
  
  <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
    <a href="/specialistiche-roma" style={{ color: '#64748b', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>
      ← Torna a tutte le specialistiche a Roma
    </a>
  </div>
</div>
      </main>          
      <Footer />
    </div>
  );
}
