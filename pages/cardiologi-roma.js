import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('cardiologia', 'roma');

  useEffect(() => {
    async function fetchCardiologi() {
      // Usiamo la logica specifica per cardiologia
      const queryBusca = getDBQuery('cardiologia'); 
      
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', `%${queryBusca.cat}%`)
        .eq('approvato', true)
        .order('is_top', { ascending: false });
        
      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#fef2f2', minHeight: '100vh', color: '#1e293b' }}>
      <Head>
        <title>Cardiologi a Roma – Visita Cardiologica ed Ecocardiogramma | ServiziSalute</title>
        <meta name="description" content="Cerchi un cardiologo a Roma? Trova i migliori specialisti per visite cardiologiche, ECG ed ecocardiogrammi nei principali quartieri della Capitale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        ❤️ SPECIALISTI IN CARDIOLOGIA A ROMA – PREVENZIONE E CURA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#dc2626', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        {/* 🔹 HERO CARDIOLOGIA */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #dc2626' }}>
          <h1 style={{ color: '#991b1b', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Cardiologi a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px', maxWidth: '800px' }}>
            Trova i migliori <strong>cardiologi a Roma</strong> per il monitoraggio della tua salute cardiovascolare. Prenota subito una visita, un ECG o un ecocardiogramma vicino a te.
          </p>

          {/* 🔹 SERVIZI SPECIFICI */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '25px' }}>
            {['Visita Cardiologica', 'Elettrocardiogramma (ECG)', 'Ecocardiogramma', 'Holter Cardiaco'].map(serv => (
              <div key={serv} style={{ backgroundColor: '#fff1f2', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #fecaca', fontSize: '14px', fontWeight: '600', color: '#dc2626' }}>
                {serv}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 LISTA CARDIOLOGI */}
        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Specialisti disponibili oggi</h2>
        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : medici.length > 0 ? medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #dc2626' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ color: '#991b1b', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              {v.is_top && <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
            </div>
            <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#dc2626', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Prenota Ora</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun cardiologo trovato a Roma.</div>
        )}

        {/* 🔹 TESTO SEO */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginTop: '40px', lineHeight: '1.8' }}>
          <h2 style={{ color: '#991b1b' }}>Quando consultare un cardiologo a Roma?</h2>
          <p>La prevenzione è il primo passo per un cuore sano. Su <strong>ServiziSalute</strong> puoi trovare specialisti in cardiologia operativi a Roma in zone come <strong>Prati, EUR, Parioli e San Giovanni</strong>. Che si tratti di un controllo sportivo o del monitoraggio della pressione arteriosa, connettiti direttamente con il medico senza lunghe liste d'attesa.</p>
        </div>

        {/* 🔹 LINK AI QUARTIERI */}
        <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#991b1b', fontSize: '20px', marginBottom: '15px' }}>Cerca cardiologo nel tuo quartiere</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Prati', 'EUR', 'Parioli', 'Tiburtina', 'San Giovanni', 'Nomentana'].map(z => (
              <a key={z} href={`/cardiologi-roma-${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#fff1f2', color: '#991b1b', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: '1px solid #fecaca' }}>{z}</a>
            ))}
          </div>
        </div>

        {/* 🔹 FAQ */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#991b1b', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c' }}>Quanto costa una visita cardiologica a Roma?</p>
              <p style={{ color: '#64748b' }}>I prezzi variano in base allo specialista e agli esami inclusi (come l'ECG). Puoi chiedere un preventivo diretto tramite WhatsApp.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c' }}>Posso fare un ecocardiogramma a domicilio?</p>
              <p style={{ color: '#64748b' }}>Alcuni dei nostri specialisti offrono strumentazione portatile per visite domiciliari. Controlla la descrizione dell'annuncio.</p>
            </div>
          </div>
        </section>

        {/* 🔹 CTA INSERZIONISTI */}
        <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ margin: 0 }}>Sei un Cardiologo a Roma?</h2>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>Aumenta i tuoi pazienti e offri le tue competenze nel tuo quartiere.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: 'white', color: '#dc2626', padding: '15px 40px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Pubblica il tuo profilo</a>
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
