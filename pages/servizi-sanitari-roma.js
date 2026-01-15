import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ServiziSanitariRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('servizi-sanitari', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchTuttiServizi() {
      try {
        // Query generica per mostrare un mix di servizi in primo piano nell'hub
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .order('is_top', { ascending: false })
          .limit(15);

        if (!error && data) setServizi(data);
      } catch (err) {
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTuttiServizi();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Servizi Sanitari Roma: Guida Completa alla Salute | Gennaio 2026</title>
        <meta name="description" content="Tutti i servizi sanitari a Roma: farmacie, dentisti, psicologi e assistenza a domicilio. Trova il professionista più vicino nel tuo quartiere. Aggiornato 2026." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>
      
      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#10b981', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', width: '100%' }}>
        🏥 PORTALE SERVIZI SANITARI ROMA — TUTTE LE SPECIALISTICHE AGGIORNATE A GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMB */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
  <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
  <span style={{ margin: '0 8px' }}>&gt;</span>
  <span style={{ color: '#065f46' }}>Tutti i Servizi Sanitari a Roma</span>
</div>

        {/* TITOLO MASTER H1 */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #10b981', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            Servizi Sanitari Roma
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Guida ai Centri Medici e Professionisti a Roma <span style={{ color: '#10b981' }}>2026</span>
          </p>
        </div>

        {/* BOX QUARTIERI - LINK RAPIDI */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#065f46' }}>Cerca Servizi per Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/servizi-sanitari-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* LISTA ANTEPRIMA SERVIZI DISPONIBILI */}
        <div style={{ display: 'block' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#065f46', marginBottom: '20px', paddingLeft: '5px' }}>Professionisti e Centri in primo piano:</h2>
          {loading ? <p>Caricamento...</p> : servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '20px', padding: '25px', marginBottom: '20px', 
              border: v.is_top ? '4px solid #10b981' : '1px solid #e2e8f0', 
              boxShadow: '0 6px 15px rgba(0,0,0,0.04)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#065f46', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '15px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{v.categoria}</p>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '12px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#10b981', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CONTATTA</a>
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>🗺️ VEDI MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* TESTO SEO - HUB GENERALE */}
        <div style={{ margin: '30px 0', padding: '0 10px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
            ServiziSalute è il punto di riferimento per chi cerca <strong>servizi sanitari a Roma</strong>. Il nostro portale aggrega i migliori professionisti della Capitale, offrendo una panoramica completa su centri di diagnostica, studi odontoiatrici, psicologi e assistenza infermieristica domiciliare. Naviga tra i quartieri di Roma per trovare la struttura sanitaria più vicina alle tue esigenze, con recapiti diretti e posizioni su mappa aggiornati a <strong>Gennaio 2026</strong>.
          </p>
        </div>

        {/* CROSS LINKING SPECIALISTICHE - STRUTTURA BLINDATA */}
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '15px', color: '#065f46' }}>Esplora le Categorie:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href="/dentisti-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}>Dentisti</a>
            <a href="/diagnostica-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}>Diagnostica</a>
            <a href="/psicologi-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}>Psicologi</a>
            <a href="/dermatologi-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}>Dermatologi</a>
            <a href="/cardiologi-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}>Cardiologi</a>
            <a href="/servizi-domicilio-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}>Assistenza Domiciliare</a>
          </div>
        </div>

        {/* FAQ HUB - 3 DOMANDE COMPLETE */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#065f46' }}>FAQ Servizi Roma</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <p><strong>1. Come trovo un servizio sanitario vicino a me?</strong> — Puoi utilizzare la sezione "Cerca per Quartiere" per filtrare istantaneamente i professionisti e i centri medici attivi nella tua zona specifica di Roma.</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <p><strong>2. Gli annunci sono verificati?</strong> — Sì, tutti i profili degli specialisti e delle strutture presenti su ServiziSalute Roma vengono controllati manualmente per garantire l'affidabilità dei recapiti e delle informazioni fornite.</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <p><strong>3. Come posso prenotare una visita o un servizio?</strong> — Basta cliccare sul tasto "Contatta" o "Chiama" presente in ogni annuncio per parlare direttamente con la struttura o il medico e fissare il tuo appuntamento senza intermediari.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
