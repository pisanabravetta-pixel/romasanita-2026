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
      <title>{titolo === "Home" ? "Servizi Sanitari Roma: Farmacie, Medici e Diagnostica | ServiziSalute - V2" : (titolo.includes("Roma") ? titolo : `${titolo} a Roma: Studi e Urgenze | Gennaio 2026`)}</title>
        <meta name="description" content={descrizioneMeta} />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
      {/* TOP BAR INTEGRALE */}
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

        {/* TESTO SEO INIZIALE (Aggiunto dagli Appunti) */}
        <div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
          <p style={{ margin: '0 0 15px 0' }}>
            Su ServiziSalute trovi un elenco aggiornato di <strong>{titolo} a Roma</strong>, suddivisi per quartiere e facilmente contattabili. 
            Ogni struttura presente sulla piattaforma fornisce informazioni chiare su servizi disponibili, orari di apertura e contatti diretti, 
            per aiutarti a trovare rapidamente la soluzione più vicina alle tue esigenze.
          </p>
          <p style={{ margin: 0 }}>
            I professionisti e le strutture di Roma presenti nel portale offrono servizi d'eccellenza, consulenze specialistiche 
            e supporto diagnostico all'avanguardia. Attraverso il nostro sistema puoi individuare la struttura giusta nel tuo quartiere 
            e contattarla direttamente senza intermediari.
          </p>
        </div>
     {/* CERCA PER QUARTIERE (Versione Automatica Centralizzata) */}
<div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
  <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#2c5282' }}>Cerca per Quartiere:</h2>
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
{/* BOX MAPPA HUB - FIX PER BUILD ERROR */}
<div style={{ marginBottom: '30px' }}>
  <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
    {/* Controlliamo che servizi sia un array e che abbia elementi */}
    {Array.isArray(servizi) && servizi.length > 0 ? (
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(servizi.slice(0, 15).map(s => s.nome).join(' OR '))}+Roma&t=&z=11&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
    ) : (
      <div style={{ height: '100%', backgroundColor: '#f8fafc' }} />
    )}
  </div>
</div>

       {/* LISTA BOX ANNUNCI (Con controllo lista vuota) */}
        <div style={{ display: 'block' }}>
          {loading ? (
            <p>Caricamento...</p>
          ) : medici && medici.length > 0 ? (
            medici.map((v) => (
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
              </div>
            ))
          ) : (
            /* BOX CORTESIA SE LISTA VUOTA (Hub Page) */
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
{/* TESTO SEO CONCLUSIVO (Novità Appunti 21 Gennaio) */}
        <section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: theme.radius.main, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2c5282', marginBottom: '15px' }}>
            {titolo} a Roma: servizi, orari e informazioni utili
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '15px' }}>
            Roma è una città con una rete capillare di strutture sanitarie e professionisti distribuiti in tutti i quartieri, dal centro storico alle zone periferiche. 
            Molte delle realtà presenti nel nostro portale offrono servizi aggiuntivi come test diagnostici rapidi, supporto per terapie croniche e consulenze personalizzate. 
            Su ServiziSalute puoi confrontare diverse opzioni per <strong>{titolo.toLowerCase()} a Roma</strong> e scegliere quella più comoda in base alla zona e ai servizi offerti.
          </p>
          <p style={{ color: '#475569', lineHeight: '1.7', margin: 0 }}>
            È sempre consigliato verificare direttamente con la struttura gli orari di apertura e i turni aggiornati, soprattutto nei giorni festivi o notturni. 
            Il nostro portale nasce per facilitare il contatto diretto tra cittadini e professionisti della salute, rendendo più semplice l’accesso ai servizi essenziali della Capitale.
          </p>
        </section>

        {/* MINI TESTO SEO */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            {testoMiniSEO}
          </p>
        </div>

        {/* CTA NERA */}
        <div style={{ backgroundColor: '#0f172a', padding: theme.padding.main, borderRadius: theme.radius.main, textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>{testoCTA}</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Inserisci la tua struttura e ricevi contatti da nuovi pazienti a Roma.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: colore, color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>
   {/* FAQ OTTIMIZZATE (Regola Appunti 21 Gennaio) */}
        <section style={{ paddingBottom: '50px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '25px', color: '#2c5282', borderBottom: `3px solid ${colore}`, display: 'inline-block' }}>
            Domande Frequenti su {titolo} a Roma
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
                1. Come trovare {titolo.toLowerCase()} a Roma vicino a me?
              </p>
              <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
                Su ServiziSalute puoi cercare {titolo.toLowerCase()} a Roma filtrando per quartiere. Ogni annuncio include indirizzo e contatti diretti per raggiungere facilmente la struttura più vicina nel tuo quadrante urbano.
              </p>
            </div>

            <div>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
                2. Quali servizi offrono {titolo.toLowerCase()} a Roma?
              </p>
              <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
                Oltre alle prestazioni standard, molte strutture a Roma offrono servizi accessori (come test rapidi o consulenze specialistiche) indicati direttamente nella scheda del professionista. Ti consigliamo di chiamare per confermare la disponibilità del servizio specifico.
              </p>
            </div>

            <div>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
                3. Come sapere se la struttura è aperta oggi a Roma?
              </p>
              <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>
                Gli orari possono variare in base al quartiere e alla giornata (festivi o turni). Il modo più rapido è utilizzare i tasti <strong>Chiama</strong> o <strong>WhatsApp</strong> presenti su ServiziSalute per parlare direttamente con la segreteria o il titolare.
              </p>
            </div>
          </div>
        </section>

      {/* ... tutto il resto della pagina (lista, guide, FAQ) ... */}

        {/* SEZIONE CROSS-LINKING FINALE - Ultima cosa dentro il MAIN */}
        <div style={{ marginTop: '40px', padding: '25px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', marginBottom: '20px', color: '#1e293b' }}>
            Altre specialistiche disponibili a Roma:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f766e', fontWeight: '700', textDecoration: 'none', padding: '10px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
              <span>🦷</span> Dentisti Roma
            </a>
            <a href="/farmacie-roma" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#15803d', fontWeight: '700', textDecoration: 'none', padding: '10px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #dcfce7' }}>
              <span>💊</span> Farmacie Roma
            </a>
            <a href="/diagnostica-roma" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e40af', fontWeight: '700', textDecoration: 'none', padding: '10px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #dbeafe' }}>
              <span>🔬</span> Diagnostica Roma
            </a>
            <a href="/dermatologi-roma" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#be185d', fontWeight: '700', textDecoration: 'none', padding: '10px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #fce7f3' }}>
              <span>👨‍⚕️</span> Dermatologi Roma
            </a>
          </div>
          
          <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
            <a href="/specialistiche-roma" style={{ color: '#64748b', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>
              ← Esplora tutte le categorie mediche a Roma
            </a>
          </div>
        </div>

      </main> {/* CHIUDE IL MAIN */}

      <Footer /> {/* IL FOOTER STA FUORI DAL MAIN */}
    </div>
  );
}
