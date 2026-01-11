import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function ServiziDomicilioRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('servizi-domicilio', 'roma');

  useEffect(() => {
    async function fetchDomicilio() {
      const queryBusca = getDBQuery('servizi-domicilio'); 
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', `%${queryBusca.cat}%`)
        .eq('approvato', true)
        .order('is_top', { ascending: false });
        
      if (!error && data) setServizi(data);
      setLoading(false);
    }
    fetchDomicilio();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#fdf8f6', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Servizi a Domicilio Roma – Infermieri, Fisioterapia e Assistenza | ServiziSalute</title>
        <meta name="description" content="Trova assistenza sanitaria a domicilio a Roma. Infermieri, fisioterapisti e operatori socio-sanitari disponibili per cure domiciliari in tutta la capitale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#ea580c', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🏠 ASSISTENZA SANITARIA E CURE A DOMICILIO A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#ea580c', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        {/* 🔹 HERO HUB */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #ea580c' }}>
          <h1 style={{ color: '#9a3412', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Servizi a Domicilio Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px', maxWidth: '800px' }}>
            La salute arriva direttamente a casa tua. Trova <strong>infermieri, fisioterapisti e assistenti specializzati</strong> pronti a intervenire nei quartieri di Roma.
          </p>

          {/* 🔹 SEZIONE CATEGORIE INTERNE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '25px' }}>
            {['Infermiere a Domicilio', 'Fisioterapia', 'Assistenza Anziani', 'Prelievi a Casa'].map(cat => (
              <div key={cat} style={{ backgroundColor: '#fff7ed', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #ffedd5', fontSize: '14px', fontWeight: '600', color: '#ea580c' }}>
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 LISTA ANNUNCI */}
        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Professionisti disponibili a casa</h2>
        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : servizi.length > 0 ? servizi.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #ea580c' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ color: '#9a3412', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              {v.is_top && <span style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
            </div>
            <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 Disponibile in: <strong>{v.zona}</strong> — {v.indirizzo}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#ea580c', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama Ora</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun servizio a domicilio trovato.</div>
        )}

        {/* 🔹 TESTO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginTop: '40px', lineHeight: '1.8' }}>
          <h2 style={{ color: '#9a3412' }}>Assistenza sanitaria domiciliare professionale a Roma</h2>
          <p>Ricevere cure mediche e riabilitative nel comfort della propria abitazione è oggi una necessità per molti cittadini romani. Su <strong>ServiziSalute</strong> facilitiamo l'incontro con professionisti certificati per servizi di assistenza a domicilio in zone come <strong>Parioli, San Giovanni, EUR e Roma Nord</strong>, garantendo qualità e rapidità d'intervento.</p>
        </div>

        {/* 🔹 LINK AI QUARTIERI */}
        <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#9a3412', fontSize: '20px', marginBottom: '15px' }}>Assistenza nei quartieri</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Prati', 'Trastevere', 'EUR', 'Parioli', 'Tiburtina', 'San Giovanni', 'Nomentana', 'Flaminio'].map(z => (
              <a key={z} href={`/servizi-domicilio-roma-${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#fff7ed', color: '#ea580c', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: '1px solid #ffedd5' }}>{z}</a>
            ))}
          </div>
        </div>

        {/* 🔹 FAQ */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#9a3412', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c' }}>Quali zone di Roma sono coperte?</p>
              <p style={{ color: '#64748b' }}>La maggior parte dei professionisti copre l'intero territorio all'interno del GRA, inclusi i quartieri centrali e periferici.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c' }}>È possibile richiedere assistenza h24?</p>
              <p style={{ color: '#64748b' }}>Alcuni inserzionisti offrono assistenza continuativa; ti consigliamo di contattarli via WhatsApp per verificare la disponibilità immediata.</p>
            </div>
          </div>
        </section>

        {/* 🔹 CTA INSERZIONISTI */}
        <div style={{ backgroundColor: '#ea580c', color: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ margin: 0 }}>Offri Servizi a Domicilio?</h2>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>Aiuta i cittadini di Roma offrendo la tua professionalità a casa loro. Iscriviti oggi.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: 'white', color: '#ea580c', padding: '15px 40px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Inserisci il tuo servizio</a>
        </div>
      </main>
  {/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
              <p style={{ fontSize: '11px', color: '#718096', marginTop: '15px', fontStyle: 'italic', lineHeight: '1.4' }}>
                🔍 Oltre 15.000 ricerche mensili di pazienti registrate a Roma.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                  ⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.
                </p>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
              <p style={{ fontSize: '12px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>
                ServiziSalute è un portale di annunci e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
