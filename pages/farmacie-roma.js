import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function FarmacieRoma() {
  const [farmacie, setFarmacie] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera tutte le farmacie di Roma dal Database
  useEffect(() => {
    async function fetchFarmacieRoma() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Farmacie%')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setFarmacie(data);
      }
      setLoading(false);
    }
    fetchFarmacieRoma();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie a Roma | Orari, Turni e Servizi per Quartiere</title>
        <meta name="description" content="Cerca la farmacia più vicina a te a Roma. Scopri i servizi offerti: test rapidi, ossigeno, autoanalisi e farmacie di turno in ogni quartiere della Capitale." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #dcfce7' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#10b981', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        {/* TITOLO SEO E INTRO */}
        <h1 style={{ color: '#064e3b', fontSize: '32px', marginBottom: '10px' }}>Farmacie a Roma</h1>
        <p style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Benvenuto nel portale delle <strong>farmacie di Roma</strong>. Trova facilmente il presidio sanitario più vicino, consulta i servizi disponibili e mettiti in contatto diretto per ordini o consulenze.
        </p>
        
        {/* MENU RAPIDO QUARTIERI */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #dcfce7' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#064e3b', fontSize: '15px' }}>Esplora per zona:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/farmacie-roma-centro" style={{ color: '#059669', fontSize: '13px', textDecoration: 'none', backgroundColor: '#ecfdf5', padding: '8px 18px', borderRadius: '25px', border: '1px solid #d1fae5', fontWeight: '600' }}>Roma Centro</a>
            {/* Future zone come Eur, Prati, Montesacro possono essere aggiunte qui */}
          </div>
        </div>

        {/* LISTA DINAMICA FARMACIE */}
        {loading ? (
          <p style={{ color: '#059669', textAlign: 'center' }}>Aggiornamento elenco farmacie...</p>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#059669', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#ecfdf5', padding: '4px 10px', borderRadius: '6px' }}>
                  ZONA {f.zona}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#064e3b', fontSize: '22px' }}>{f.nome}</h3>
              <p style={{ margin: '0', fontSize: '15px', color: '#4b5563' }}>📍 {f.indirizzo}</p>
              <p style={{ fontSize: '15px', color: '#374151', marginTop: '12px', lineHeight: '1.5' }}>
                <strong>Specializzazioni:</strong> {f.descrizione}
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${f.telefono || '06000000'}`} style={{ flex: 1, textAlign: 'center', backgroundColor: '#10b981', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Chiama
                </a>
                <a href={`https://wa.me/${f.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', border: '1px solid #10b981', color: '#10b981', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #dcfce7' }}>
            <p style={{ color: '#6b7280' }}>Database in aggiornamento. Nessuna farmacia registrata al momento.</p>
          </div>
        )}

        {/* CALL TO ACTION PROFESSIONISTI (FARMACISTI) */}
        <div style={{ marginTop: '60px', textAlign: 'center', padding: '45px', backgroundColor: '#064e3b', borderRadius: '24px', color: 'white', boxShadow: '0 10px 25px -5px rgba(6, 78, 59, 0.2)' }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '26px' }}>Sei il titolare di una Farmacia?</h2>
          <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9', lineHeight: '1.6' }}>
            Porta la tua farmacia online. Pubblica i tuoi orari, i servizi di telemedicina e le disponibilità per i pazienti del tuo quartiere.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#34d399', color: '#064e3b', padding: '15px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-block', fontSize: '16px' }}>
            Aggiungi Farmacia Gratis
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#022c22', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', marginBottom: '15px' }}>ServiziSalute Roma</div>
          <p style={{ fontSize: '14px', color: '#6ee7b7', opacity: '0.8' }}>
            La tua guida ai servizi sanitari di quartiere nella Capitale.
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #064e3b', paddingTop: '20px', fontSize: '12px', color: '#4ade80' }}>
            © 2026 ServiziSalute Roma – Portale Informativo Farmacie
          </div>
        </div>
      </footer>
    </div>
  );
}
