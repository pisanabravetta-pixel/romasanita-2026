import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function ServiziDomicilioRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera tutti i servizi a domicilio a Roma
  useEffect(() => {
    async function fetchDomicilioRoma() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Domicilio%')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setServizi(data);
      }
      setLoading(false);
    }
    fetchDomicilioRoma();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdf2f2', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari a Domicilio Roma | Infermieri e Visite a Casa</title>
        <meta name="description" content="Trova assistenza sanitaria a domicilio a Roma. Infermieri, fisioterapisti e medici specialisti disponibili per visite e cure presso la tua abitazione in ogni quartiere." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #fee2e2' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#dc2626', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#dc2626', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        {/* TITOLO SEO E INTRO */}
        <h1 style={{ color: '#991b1b', fontSize: '32px', marginBottom: '10px' }}>Servizi a Domicilio a Roma</h1>
        <p style={{ color: '#4b5563', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          La salute arriva direttamente a casa tua. Scopri i professionisti che offrono <strong>assistenza infermieristica, fisioterapia e visite mediche domiciliari</strong> a Roma.
        </p>
        
        {/* FILTRO ZONE RAPIDO */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #fee2e2' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#991b1b', fontSize: '15px' }}>Filtra per zona di copertura:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/servizi-domicilio-roma-sud" style={{ color: '#dc2626', fontSize: '13px', textDecoration: 'none', backgroundColor: '#fef2f2', padding: '8px 18px', borderRadius: '25px', border: '1px solid #fecaca', fontWeight: '600' }}>Roma Sud</a>
          </div>
        </div>

        {/* LISTA DINAMICA RISULTATI */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#dc2626' }}>Caricamento operatori disponibili...</p>
        ) : servizi.length > 0 ? (
          servizi.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #fee2e2',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#dc2626', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#fef2f2', padding: '4px 10px', borderRadius: '6px' }}>
                  ZONA {s.zona}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#991b1b', fontSize: '22px' }}>{s.nome}</h3>
              <p style={{ margin: '0', fontSize: '15px', color: '#4b5563' }}>📍 Sede/Area operativa: {s.indirizzo || s.zona}</p>
              <p style={{ fontSize: '15px', color: '#374151', marginTop: '12px', lineHeight: '1.5' }}>
                <strong>Servizi offerti:</strong> {s.descrizione}
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${s.telefono}`} style={{ flex: 1, textAlign: 'center', backgroundColor: '#dc2626', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Chiama Ora
                </a>
                <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', border: '1px solid #fee2e2', color: '#991b1b', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #fecaca' }}>
            <p style={{ color: '#6b7280' }}>Al momento non ci sono operatori registrati in questa categoria.</p>
          </div>
        )}

        {/* SEO CONTENT SECTION */}
        <section style={{ marginTop: '50px', padding: '30px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #fee2e2' }}>
          <h2 style={{ fontSize: '20px', color: '#991b1b', marginBottom: '15px' }}>L'importanza dell'assistenza domiciliare a Roma</h2>
          <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7' }}>
            Ricevere cure nel proprio ambiente domestico è fondamentale per la serenità del paziente e l'efficacia della riabilitazione. Che si tratti di <strong>fisioterapia post-operatoria</strong>, gestione di flebo e cateteri, o semplici prelievi del sangue per chi ha difficoltà motorie, Roma dispone di una rete di professionisti pronti a intervenire tempestivamente. Su ServiziSalute puoi trovare il profilo più adatto alle tue esigenze filtrando per zona di residenza.
          </p>
        </section>

        {/* CTA PROFESSIONISTI */}
        <div style={{ marginTop: '60px', textAlign: 'center', padding: '45px', backgroundColor: '#991b1b', borderRadius: '24px', color: 'white' }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '26px' }}>Lavori nel settore sanitario a domicilio?</h2>
          <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9' }}>
            Unisciti al network di ServiziSalute Roma. Ricevi richieste dirette dai pazienti del tuo quartiere senza intermediari.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#991b1b', padding: '15px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-block' }}>
            Pubblica il tuo profilo gratis
          </a>
        </div>
      </main>

      <footer style={{ background: '#450a0a', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', opacity: '0.7' }}>© 2026 ServiziSalute Roma - Il punto di riferimento per la salute a casa tua.</p>
      </footer>
    </div>
  );
}
