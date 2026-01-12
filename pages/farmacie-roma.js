import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

// I tuoi componenti centralizzati
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Data dinamica per non doverla cambiare a mano ogni mese
  const currentMonth = new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date());
  const currentYear = new Date().getFullYear();

  const schemas = getSchemas('farmacie', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Tuscolana", "Flaminio"];

  const serviziCorrelati = [
    { nome: "Psicologi Roma", url: "/visite-specialistiche-roma/psicologo" },
    { nome: "Dentisti Roma", url: "/dentisti-roma" },
    { nome: "Dermatologi Roma", url: "/visite-specialistiche-roma/dermatologo" },
    { nome: "Cardiologi Roma", url: "/visite-specialistiche-roma/cardiologo" },
    { nome: "Servizi a Domicilio", url: "/servizi-domicilio-roma" }
  ];

  useEffect(() => {
    async function fetchFarmacie() {
      try {
        const queryBusca = getDBQuery('farmacie'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
          
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch farmacie:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1a202c', fontFamily: 'system-ui, sans-serif' }}>
      <Head>
        <title>Farmacie a Roma | Trova Farmacie Aperte e Servizi {currentYear}</title>
        <meta name="description" content={`Cerca farmacie a Roma aperte a ${currentMonth} ${currentYear}. Test rapidi, consegna a domicilio e orari h24 per ogni quartiere.`} />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <Navbar />

      {/* BARRA SUPERIORE DINAMICA */}
      <div style={{ backgroundColor: '#16a34a', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>
        📢 DISPONIBILITÀ FARMACIE AGGIORNATA: {currentMonth.toUpperCase()} {currentYear}
      </div>

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB / TORNA INDIETRO */}
        <div style={{ marginBottom: '20px' }}>
          <a href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}> Home</a> 
          <span style={{ color: '#94a3b8', margin: '0 8px' }}>/</span>
          <span style={{ color: '#64748b', fontSize: '14px' }}>Farmacie Roma</span>
        </div>

        {/* HERO SECTION SEO */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '30px', borderTop: '6px solid #16a34a' }}>
          <h1 style={{ color: '#166534', fontSize: '36px', margin: '0 0 15px 0', fontWeight: '900', lineHeight: '1.1' }}>Farmacie a Roma</h1>
          <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '17px', maxWidth: '800px' }}>
            ServiziSalute è il punto di riferimento per trovare la <strong>farmacia più vicina a te a Roma</strong>. Filtra per quartiere e scopri i servizi essenziali come test antigenici, consegna farmaci a casa e turni notturni.
          </p>

          {/* LINK DI RICHIAMO QUARTIERI (INTERLINKING) */}
          <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', display: 'block', marginBottom: '12px', textTransform: 'uppercase' }}>Seleziona il tuo quartiere:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/farmacie-roma-${q.toLowerCase().replace(" ", "-")}`} style={{ fontSize: '13px', backgroundColor: '#f0fdf4', color: '#166534', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #dcfce7', fontWeight: '700', transition: '0.2s' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LISTA RISULTATI */}
        <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '20px', fontWeight: '800' }}>Farmacie disponibili a Roma</h2>
        
        {loading ? (
          <div style={{textAlign:'center', padding: '50px'}}>Caricamento farmacie...</div>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '2px solid #16a34a' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: '#166534', margin: '0', fontSize: '22px', fontWeight: '800' }}>{v.nome}</h3>
                  <p style={{ fontSize: '16px', color: '#64748b', margin: '8px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}>Consigliato</span>}
              </div>

              {/* BADGE DI SERVIZIO (BADGE DINAMICI) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
                {v.h24_aperto && <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #fecaca' }}>🏪 APERTO 24H</span>}
                {v.test_rapidi && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #bae6fd' }}>🧪 TEST RAPIDI</span>}
                {v.consegna_domicilio && <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #fde68a' }}>📦 DOMICILIO</span>}
                {v.senza_barriere && <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', border: '1px solid #dcfce7' }}>♿ ACCESSIBILE</span>}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#16a34a', color: 'white', padding: '15px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}>Chiama Farmacia</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '14px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun risultato trovato per la ricerca.</div>
        )}

        {/* CTA PER PROFESSIONISTI - MARKETING */}
        <section style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', marginTop: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '15px' }}>Sei il titolare di una farmacia a Roma?</h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '600px', margin: '0 auto 25px', lineHeight: '1.6' }}>
            Inserisci la tua attività su ServiziSalute e raggiungi centinaia di nuovi pazienti ogni giorno nel tuo quartiere.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#16a34a', color: 'white', padding: '16px 32px', borderRadius: '14px', fontWeight: '800', textDecoration: 'none', fontSize: '16px', display: 'inline-block' }}>Pubblica il tuo annuncio — Gratis</a>
        </section>

        {/* FAQ - ALMENO 3 COME DA APPUNTI */}
        <section style={{ marginTop: '60px', backgroundColor: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', fontSize: '24px', marginBottom: '30px', fontWeight: '900' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <p style={{ fontWeight: '800', color: '#166534', marginBottom: '8px', fontSize: '17px' }}>1. Come trovo una farmacia aperta h24 a Roma?</p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>Scorri la nostra lista e cerca il badge rosso "APERTO 24H". Le farmacie con questo servizio garantiscono assistenza continua giorno e notte.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#166534', marginBottom: '8px', fontSize: '17px' }}>2. Quali farmacie effettuano test rapidi e antigenici?</p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>Molte farmacie a Roma (Prati, EUR, Centro) offrono il servizio test. Cerca il badge azzurro "TEST RAPIDI" nell'elenco degli annunci.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: '#166534', marginBottom: '8px', fontSize: '17px' }}>3. È possibile ricevere i farmaci a domicilio?</p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>Sì, diverse strutture offrono la consegna a casa. Puoi contattare direttamente la farmacia tramite il tasto WhatsApp per richiedere il servizio.</p>
            </div>
          </div>
        </section>

        {/* SEO INCROCIATA (CROSS-LINKING) */}
        <section style={{ marginTop: '50px', padding: '25px', backgroundColor: '#f1f5f9', borderRadius: '20px', textAlign: 'center' }}>
          <h4 style={{ color: '#475569', marginBottom: '20px', fontSize: '15px', fontWeight: '700', textTransform: 'uppercase' }}>Potrebbero servirti anche:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
            {serviziCorrelati.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#166534', textDecoration: 'none', fontSize: '14px', fontWeight: '700', backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                {s.nome}
              </a>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
