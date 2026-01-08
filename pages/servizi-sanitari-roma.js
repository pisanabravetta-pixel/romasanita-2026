import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function ServiziSanitariRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTuttiServizi() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .limit(20) // Mostriamo i primi 20 per non appesantire la pagina generale
        .order('is_top', { ascending: false });

      if (!error && data) setServizi(data);
      setLoading(false);
    }
    fetchTuttiServizi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari Roma | Portale Medico e Salute | ServiziSalute</title>
        <meta name="description" content="Esplora tutti i servizi sanitari disponibili a Roma su ServiziSalute. Dai medici specialisti alle farmacie, tutto il benessere della Capitale in un unico portale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Servizi Sanitari Roma - ServiziSalute",
          "description": "Panoramica completa dei servizi medici e sanitari offerti a Roma.",
          "areaServed": "Roma"
        })}} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Tutti i Servizi Sanitari a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Esplora la rete sanitaria di Roma. Trova velocemente professionisti, centri e farmacie pronti a rispondere alle tue esigenze di salute.
        </p>

        {/* CATEGORIE RAPIDE - Smistamento traffico alle pagine verticali */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
          <a href="/dentisti-roma" style={{ padding: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', color: '#1e40af', fontWeight: 'bold' }}>🦷 Dentisti</a>
          <a href="/farmacie-roma" style={{ padding: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', color: '#1e40af', fontWeight: 'bold' }}>💊 Farmacie</a>
          <a href="/cardiologi-roma" style={{ padding: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', color: '#1e40af', fontWeight: 'bold' }}>❤️ Cardiologi</a>
          <a href="/diagnostica-roma" style={{ padding: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', color: '#1e40af', fontWeight: 'bold' }}>🔬 Diagnostica</a>
        </div>

        <h2 style={{ color: '#1e40af', fontSize: '24px', marginBottom: '20px' }}>Ultimi Inserimenti</h2>

        {loading ? (
          <p>Caricamento servizi...</p>
        ) : servizi.length > 0 ? (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
                <span style={{ fontSize: '12px', background: '#eff6ff', color: '#3b82f6', padding: '4px 8px', borderRadius: '6px' }}>{v.categoria}</span>
              </div>
              <p style={{ color: '#64748b', marginTop: '5px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Contatta</a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun servizio registrato.</p>
        )}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px', textAlign: 'center' }}>
          <p>ServiziSalute Roma: Il portale di riferimento per la tua salute locale.</p>
        </footer>
      </main>
    </div>
  );
}
