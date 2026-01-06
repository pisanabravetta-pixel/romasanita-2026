import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function FarmacieRomaCentro() {
  const [farmacie, setFarmacie] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera farmacie zona "Centro" dal Database
  useEffect(() => {
    async function fetchFarmacieCentro() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('zona', 'Centro')
        .ilike('categoria', '%Farmacie%');

      if (!error && data) {
        setFarmacie(data);
      }
      setLoading(false);
    }
    fetchFarmacieCentro();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie Roma Centro | Orari e Servizi Centro Storico</title>
        <meta name="description" content="Trova le farmacie nel Centro Storico di Roma. Orari, indirizzi e servizi (test rapidi, autoanalisi) vicino a Piazza Navona, Pantheon e Trastevere." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #dcfce7' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#10b981', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        {/* BREADCRUMB */}
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', fontSize: '14px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>Home</a>
          <span style={{ color: '#ccc' }}>/</span>
          <a href="/farmacie-roma" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>Tutte le Farmacie</a>
        </nav>

        {/* TITOLO E INTRO SEO */}
        <h1 style={{ color: '#065f46', fontSize: '32px', marginBottom: '10px' }}>Farmacia a Roma Centro</h1>
        <p style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Hai bisogno di una farmacia nel cuore della Capitale? Qui trovi l'elenco dei presidi sanitari nel <strong>Centro Storico di Roma</strong>, con recapiti diretti per consulenze farmaceutiche, autoanalisi e preparazioni galeniche.
        </p>

        {/* MENU RAPIDO ZONE */}
        <div style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #dcfce7', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#065f46' }}>Cerca in altre zone:</span>
          <span style={{ fontSize: '13px', color: '#9ca3af' }}>Zona Nord, Eur e San Giovanni (prossimamente)</span>
        </div>

        {/* LISTA FARMACIE DINAMICA */}
        {loading ? (
          <p>Ricerca farmacie nel Centro Storico...</p>
        ) : farmacie.length > 0 ? (
          farmacie.map((f) => (
            <div key={f.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #dcfce7',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#065f46', fontSize: '22px' }}>{f.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#4b5563' }}>📍 {f.indirizzo} — Roma Centro</p>
                  <p style={{ fontSize: '15px', color: '#059669', fontWeight: 'bold', marginTop: '12px' }}>✨ {f.descrizione}</p>
                </div>
                <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>APERTA</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${f.telefono || '06000000'}`} style={{ flex: 1, textAlign: 'center', backgroundColor: '#10b981', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Ora
                </a>
                <a href={`https://wa.me/${f.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', border: '1px solid #10b981', color: '#10b981', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          /* CTA PER NUOVI INSERZIONISTI */
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '2px dashed #10b981' }}>
            <p style={{ color: '#374151', fontSize: '16px' }}>Attualmente non ci sono farmacie registrate per il Centro Storico.</p>
            <p style={{ fontWeight: 'bold', color: '#065f46', marginTop: '10px' }}>Gestisci una farmacia in centro?</p>
            <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#10b981', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Registra la tua Farmacia Gratis
            </a>
          </div>
        )}

        {/* BOX INFORMATIVO SEO QUARTIERE */}
        <section style={{ marginTop: '60px', padding: '30px', background: 'white', borderRadius: '16px', border: '1px solid #dcfce7' }}>
          <h2 style={{ fontSize: '20px', color: '#065f46', marginBottom: '15px' }}>Assistenza Sanitaria nel Centro Storico</h2>
          <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7' }}>
            Le farmacie situate tra <strong>Piazza Navona, Campo de' Fiori e il Pantheon</strong> sono un punto di riferimento fondamentale per chi vive o visita il cuore di Roma. Oltre alla dispensazione di farmaci, molte strutture offrono servizi di telemedicina, misurazione del peso e della pressione, e consulenze nutrizionali. In caso di necessità fuori orario, si consiglia di verificare la farmacia di turno più vicina tramite i recapiti forniti.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#064e3b', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#34d399', marginBottom: '10px' }}>ServiziSalute</div>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>© 2026 ServiziSalute Roma - Il network della tua salute nel Centro Storico.</p>
        </div>
      </footer>
    </div>
  );
}
