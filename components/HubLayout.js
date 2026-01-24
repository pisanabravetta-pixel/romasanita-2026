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
  medici = [], 
  loading, 
  quartieri = [], 
  schemas, 
  descrizioneMeta,
  testoMiniSEO,
  badgeSpec,
  testoTopBar,
  testoCTA,
  altreSpecialistiche = []
}) {
 const mediciAttivi = medici.filter(m => m.attivo).length > 0 
  ? medici.filter(m => m.attivo) 
  : medici;
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

      <div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '15px', width: '100%', letterSpacing: '0.5px' }}>
        {testoTopBar}
      </div>
      
      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href="/servizi-sanitari-roma" style={{ color: '#059669', textDecoration: 'none' }}>Servizi Roma</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <span style={{ color: '#065f46' }}>{titolo} Roma</span>
        </div>

<div style={{ marginBottom: '25px', backgroundColor: 'white', padding: theme.padding.main, borderRadius: theme.radius.main, borderLeft: `8px solid ${colore}`, boxShadow: theme.shadows.premium }}>
  <h1 style={{ color: '#2c5282', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
    {titolo} a Roma
  </h1>
  <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
    Specialisti aggiornati a <span style={{ color: colore }}>Gennaio 2026</span>
  </p>
</div>

<div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
  <p>
    Benvenuto su <strong>ServiziSalute</strong>, il portale dedicato alla sanità locale. In questa sezione puoi consultare l'elenco completo di <strong>{titolo} a Roma</strong>, con schede dettagliate che includono orari, indirizzi e tasti di contatto rapido. Il nostro obiettivo è semplificare l'accesso alle cure, mettendo in contatto diretto i cittadini con i migliori professionisti della Capitale, senza attese o intermediari.
  </p>
</div>

<div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
  <p style={{ fontSize: '14px', fontWeight: '900', marginBottom: '12px', color: '#2c5282', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
    📍 Cerca per Quartiere:
  </p>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    {quartieriTop.map(q => (
      <a 
        key={q.s} 
        href={`/${categoria}-roma-${q.s}`} 
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
    ))}
  </div>
</div>

{/* BOX MAPPA HUB - CORREZIONE DEFINITIVA CRASH */}
<div style={{ marginBottom: '30px' }}>
  <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
    {mediciAttivi && mediciAttivi.length > 0 ? (
<iframe
  width="100%"
  height="100%"
  style={{ border: 0 }}
  loading="lazy"
  src={`https://maps.google.com/maps?q=Roma&t=&z=11&ie=UTF8&iwloc=&output=embed${
    medici.length > 0 
      ? `&q=${encodeURIComponent(medici.slice(0, 5).map(m => `"${m.nome}"`).join(' OR '))}`
      : ''
  }`}
></iframe>
    ) : (
      <div style={{ height: '100%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94a3b8' }}>Mappa in aggiornamento...</p>
      </div>
    )}
  </div>
</div>
<p style={{ 
  fontSize: '14px', 
  color: '#64748b', 
  textAlign: 'center', 
  marginTop: '10px', 
  marginBottom: '30px', 
  fontStyle: 'italic',
  lineHeight: '1.5'
}}>
  La mappa mostra la distribuzione dei servizi di <strong>{titolo} a Roma</strong> nei diversi quartieri della città, aiutando a individuare rapidamente le strutture più vicine alla tua posizione.
</p>

     <div style={{ display: 'block' }}>
          {loading ? (
            <p>Caricamento...</p>
          ) : mediciAttivi && mediciAttivi.length > 0 ? (
            mediciAttivi.map((v) => (
              <div key={v.id} style={{ backgroundColor: 'white', borderRadius: theme.radius.card, padding: theme.padding.card, marginBottom: '20px', border: v.is_top ? `4px solid ${colore}` : '1px solid #e2e8f0', boxShadow: theme.shadows.premium, width: '100%', boxSizing: 'border-box' }}>
                <h3 style={{ color: '#2c5282', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {v.urgenza_24h && <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>🚨 URGENZE</span>}
                  <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#ebf8ff', color: colore, padding: '4px 10px', borderRadius: '6px', border: `1px solid ${colore}44` }}>{badgeSpec}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: colore, color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                  <a href={`https://wa.me/${v.whatsapp || ''}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                  <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ MAPPA</a>
                </div>

                {/* PUNTO 4: MICRO TESTO SEO AGGIUNTO QUI */}
                <p style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px', textAlign: 'center', fontWeight: '600' }}>
                  {badgeSpec} a {v.zona}, Roma
                </p>
              </div>
            ))
          ) : (
            /* BOX CORTESIA SE LISTA VUOTA */
            <div style={{ backgroundColor: 'white', padding: '40px 20px', borderRadius: theme.radius.main, textAlign: 'center', border: '2px dashed #cbd5e1', marginBottom: '30px' }}>
              <span style={{ fontSize: '40px', marginBottom: '10px', display: 'block' }}>🔎</span>
              <h3 style={{ color: '#1e293b', fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Ricerca in corso a Roma</h3>
              <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
                Stiamo selezionando e verificando i migliori profili per <strong>{titolo} a Roma</strong>.<br/>
                I nuovi annunci professionali saranno disponibili a breve.
              </p>
            </div>
          )}
        </div>
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
    <div>
      <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
        1. Come trovare servizi di {titolo} a Roma?
      </p>
      <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
        È possibile consultare l’elenco dei servizi di <strong>{titolo} a Roma</strong> suddivisi per quartiere e utilizzare la mappa per individuare rapidamente la struttura più vicina.
      </p>
    </div>

    <div>
      <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
        2. I servizi di {titolo} a Roma sono disponibili in tutti i quartieri?
      </p>
      <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
        I servizi di <strong>{titolo}</strong> sono presenti in numerosi quartieri di Roma e vengono organizzati per zona per facilitare la ricerca e l’accesso alle strutture sanitarie.
      </p>
    </div>

    <div>
      <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
        3. È possibile contattare direttamente le strutture di {titolo}?
      </p>
      <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
        Sì, ogni struttura elencata mette a disposizione contatti diretti (Telefono o WhatsApp) per richiedere informazioni su servizi, orari e disponibilità.
      </p>
    </div>
  </div>
</section>

          <div style={{ backgroundColor: '#0f172a', padding: theme.padding.main, borderRadius: theme.radius.main, textAlign: 'center', color: 'white', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>{testoCTA}</h2>
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
