import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Recupera tutti i centri diagnostici di Roma
  useEffect(() => {
    async function fetchDiagnosticaRoma() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Diagnostica%')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCentri(data);
      }
      setLoading(false);
    }
    fetchDiagnosticaRoma();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Centri Diagnostici a Roma | Esami, Ecografie e Analisi</title>
        <meta name="description" content="Mappa dei migliori centri diagnostici a Roma. Trova laboratori per analisi del sangue, risonanze magnetiche ed ecografie. Prenota online o via WhatsApp." />
      </Head>

      {/* HEADER PROFESSIONALE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        {/* H1 SEO E INTRODUZIONE */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Diagnostica a Roma</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Trova i centri specializzati in <strong>ecografie, radiografie, risonanze e analisi cliniche</strong> a Roma. Accedi ai servizi delle migliori strutture sanitarie della Capitale con prenotazione diretta.
        </p>

        {/* MENU RAPIDO ZONE (SEO POWER) */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#1e3a8a', fontSize: '15px' }}>Filtra per zona di Roma:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/diagnostica-roma-nord" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', backgroundColor: '#eff6ff', padding: '8px 18px', borderRadius: '25px', border: '1px solid #dbeafe', fontWeight: '600' }}>Roma Nord</a>
            {/* Qui potrai aggiungere /diagnostica-roma-sud, /centro, ecc. */}
          </div>
        </div>

        {/* LISTA RISULTATI DINAMICA DA SUPABASE */}
        {loading ? (
          <p>Caricamento centri diagnostici...</p>
        ) : centri.length > 0 ? (
          centri.map((d) => (
            <div key={d.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', color: '#2563eb', textTransform: 'uppercase', fontWeight: '900', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
                  {d.zona}
                </span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '22px' }}>{d.nome}</h3>
              <p style={{ margin: '0', fontSize: '15px', color: '#64748b', fontWeight: '500' }}>📍 {d.indirizzo}</p>
              <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', lineHeight: '1.5' }}>
                <strong>Servizi:</strong> {d.descrizione}
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`https://wa.me/${d.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', backgroundColor: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Prenota su WhatsApp
                </a>
                <a href={`tel:${d.telefono || '061234567'}`} style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Chiama Centro
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessun centro diagnostico ancora registrato.</p>
          </div>
        )}

        {/* INFO SEO AGGIUNTIVA */}
        <section style={{ marginTop: '50px', padding: '30px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Diagnostica e Prevenzione a Roma</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7' }}>
            Roma offre una vasta rete di centri diagnostici d'eccellenza, sia privati che convenzionati con il SSN. Che tu debba effettuare una <strong>risonanza magnetica</strong>, una <strong>MOC</strong> o semplici <strong>analisi del sangue</strong>, è importante scegliere strutture certificate con tecnologie moderne. Su ServiziSalute mappiamo i laboratori più efficienti per aiutarti a ridurre i tempi di attesa e ottenere diagnosi accurate.
          </p>
        </section>

        {/* CALL TO ACTION PROFESSIONISTI */}
        <div style={{ marginTop: '60px', textAlign: 'center', padding: '40px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Gestisci un Centro Diagnostico?</h2>
          <p style={{ fontSize: '16px', marginBottom: '25px', opacity: '0.9' }}>
            Aumenta le prenotazioni del tuo centro. Inserisci la tua struttura gratuitamente su ServiziSalute Roma.
          </p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#1e3a8a', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', display: 'inline-block' }}>
            Registra Centro Gratis
          </a>
        </div>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#94a3b8' }}>© 2026 ServiziSalute Roma - Il portale della tua salute in città.</p>
      </footer>
    </div>
  );
}
