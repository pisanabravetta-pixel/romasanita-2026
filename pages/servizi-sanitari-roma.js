import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import Navbar from '../components/Navbar';

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

      {/* FOOTER MASTER INTEGRALE A 4 COLONNE */}
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
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>
                ● Disponibilità aggiornate: Gennaio 2026
              </p>
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
