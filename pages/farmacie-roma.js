import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('farmacie', 'roma');

  useEffect(() => {
    async function fetchFarmacie() {
      // Recuperiamo l'oggetto con cat e spec
      const queryBusca = getDBQuery('farmacie'); 
      
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        // USIAMO queryBusca.cat PER LA CATEGORIA
        .ilike('categoria', `%${queryBusca.cat}%`)
        .eq('approvato', true)
        .order('is_top', { ascending: false });
        
      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Farmacie a Roma – Servizi, offerte e prenotazioni | ServiziSalute</title>
        <meta name="description" content="Trova farmacie a Roma che offrono servizi sanitari, analisi e test. Consulta orari e contatti diretti." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 FARMACIE E PARAFARMACIE APERTE A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#059669', textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #059669' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Farmacie a Roma – Servizi e Prenotazioni</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px', maxWidth: '800px' }}>
            Trova farmacie che offrono analisi, test e consulenze professionali a <strong>Roma</strong>.
          </p>

          {/* 🔹 SEZIONE CATEGORIE INTERNE (Appunto 2) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '25px' }}>
            {['Farmacie h24', 'Test Rapidi', 'Servizi Diagnostici', 'Consegna a Domicilio'].map(cat => (
              <div key={cat} style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600', color: '#059669' }}>
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 LISTA ANNUNCI */}
        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Risultati disponibili oggi</h2>
        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ color: '#065f46', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              {v.is_top && <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
            </div>
            <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              <a href={`https://wa.me/${v.whatsapp}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        ))}

        {/* 🔹 TESTO SEO (Appunto 4) */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginTop: '40px', lineHeight: '1.8' }}>
          <h2 style={{ color: '#065f46' }}>Come trovare una farmacia a Roma?</h2>
          <p>Cercare una <strong>farmacia a Roma</strong> su ServiziSalute ti permette di accedere rapidamente ai servizi di zone come Prati, EUR o San Giovanni. Siamo un portale informativo e non sanitario, nato per semplificare il contatto tra cittadino e professionista.</p>
        </div>

        {/* 🔹 CTA INSERZIONISTI (Appunto 8) */}
        <div style={{ backgroundColor: '#065f46', color: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ margin: 0 }}>Sei una farmacia a Roma?</h2>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>Pubblica il tuo servizio gratuitamente su ServiziSalute.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: 'white', color: '#065f46', padding: '15px 40px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Pubblica gratis</a>
        </div>
      </main>
{/* 🔹 LINK AI QUARTIERI (Appunto 6) */}
        <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#065f46', fontSize: '20px', marginBottom: '15px' }}>Farmacie nei quartieri di Roma</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Prati', 'Trastevere', 'EUR', 'Parioli', 'Tiburtina', 'San Giovanni', 'Ostiense', 'Testaccio'].map(z => (
              <a key={z} href={`/farmacie-roma-${z.toLowerCase().replace(/\s+/g, '-')}`} style={{ padding: '8px 16px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: '1px solid #dcfce7' }}>
                {z}
              </a>
            ))}
          </div>
        </div>

        {/* 🔹 FAQ + SCHEMA (Appunto 7) */}
        <section id="faq" style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#065f46', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Come trovare una farmacia a Roma su ServiziSalute?</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Basta inserire il proprio quartiere nella barra di ricerca in alto o cliccare su uno dei quartieri suggeriti per visualizzare l'elenco dei professionisti disponibili nella zona selezionata.</p>
            </div>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Che servizi offrono le farmacie presenti?</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Oltre alla vendita di farmaci, molte farmacie a Roma offrono test rapidi, analisi del sangue, servizi diagnostici di base, consegna a domicilio e consulenze specialistiche.</p>
            </div>

            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Posso contattare la farmacia direttamente?</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Certamente. Ogni annuncio include i pulsanti diretti per chiamare la farmacia o inviare un messaggio WhatsApp per richiedere informazioni o prenotare un servizio.</p>
            </div>

            <div>
              <p style={{ fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>Il servizio di ricerca è gratuito?</p>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Sì, l'utilizzo del portale ServiziSalute per la ricerca di professionisti e farmacie a Roma è completamente gratuito per tutti gli utenti.</p>
            </div>
          </div>
        </section>
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
