import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generiamo gli schemi SEO e le FAQ dal nostro file logic
  const schemas = getSchemas('cardiologi', 'roma');

  useEffect(() => {
    async function fetchCardiologi() {
      const queryBusca = getDBQuery('cardiologi');
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', queryBusca)
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Cardiologi a Roma | Visite e Screening Cuore | ServiziSalute</title>
        <meta name="description" content="Trova i migliori cardiologi a Roma. Prenota visite, ECG ed ecocardiogrammi. Contatto diretto e ricerca per zona." />
        <link rel="canonical" href="https://www.servizisalute.it/cardiologi-roma" />
        <meta name="robots" content="index, follow" />
        
        {/* SCHEMI SEO PER GOOGLE */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      {/* HEADER BAR */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🚀 PORTALE SANITARIO ROMA - RICERCA SPECIALISTI
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
          ← Torna alla Home
        </a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0' }}>Cardiologi a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Trova lo specialista più vicino a te tra i migliori studi cardiologici della Capitale.</p>
          
          {/* INTERNAL LINKING ZONE */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Prati', 'EUR', 'San Giovanni', 'Parioli', 'Tiburtina'].map(z => (
              <a key={z} href={`/cardiologi-roma-${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#eff6ff', color: '#1e40af', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', fontWeight: '500', border: '1px solid #dbeafe' }}>
                Cardiologi {z}
              </a>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Caricamento specialisti...</div>
        ) : medici.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p>Nessun cardiologo trovato in questa categoria.</p>
          </div>
        ) : (
          medici.map((v) => (
            <div key={v.id} style={{ 
               backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px',
              border: v.is_top ? '3px solid #3b82f6' : '1px solid #e2e8f0',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ margin: '0', color: '#1e3a8a', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                <div style={{ display: 'flex', gap: '5px' }}>
                   {v.urgenza_24h && <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>🚨 URGENZE</span>}
                   {v.vicino_metro && <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>🚇 METRO</span>}
                </div>
              </div>
              
              <p style={{ color: '#4b5563', fontSize: '16px', margin: '10px 0' }}>
                📍 {v.indirizzo} — <strong style={{ color: '#1e3a8a' }}>{v.zona}</strong>
              </p>

              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
                {v.descrizione || "Specialista in Cardiologia. Per prenotare una visita cardiologica o un esame strumentale (ECG, Ecocardio), contatta lo studio tramite i pulsanti sottostanti."}
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>WhatsApp</a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.5', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>📍</a>
              </div>
            </div>
          ))
        )}

        {/* ❓ FAQ SECTION (Richiesta dai suggerimenti) */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '25px' }}>Domande Frequenti sui Cardiologi a Roma</h2>
          {schemas.faq.mainEntity.map((faq, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', color: '#1e40af', marginBottom: '8px' }}>{faq.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* 📢 INVITO PROFESSIONISTI (Il punto 9 dei suggerimenti) */}
        <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', margin: '0 0 10px 0' }}>Sei un Cardiologo a Roma?</h2>
          <p style={{ fontSize: '17px', opacity: '0.9', marginBottom: '25px' }}>Aggiungi il tuo studio al portale gratuitamente e raggiungi nuovi pazienti nella tua zona.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '15px 35px', borderRadius: '14px', textDecoration: 'none', fontWeight: '800', fontSize: '16px' }}>Pubblica il tuo annuncio →</a>
        </div>

        {/* 🧱 FOOTER PROFESSIONALE (Punto 5 e 9) */}
        <footer style={{ marginTop: '80px', paddingBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginBottom: '20px' }}>CATEGORIE PRINCIPALI</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <a href="/dentisti-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Dentisti</a>
              <a href="/farmacie-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Farmacie</a>
              <a href="/diagnostica-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Diagnostica</a>
              <a href="/visite-specialistiche-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Specialisti</a>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', fontSize: '13px', color: '#6b7280', lineHeight: '1.6', border: '1px solid #e2e8f0' }}>
            <p><strong>Disclaimer Medico:</strong> Le informazioni su ServiziSalute sono a scopo puramente informativo. Il portale non effettua diagnosi né prescrive cure. In caso di dolore al petto, fiato corto o sospetto infarto, non usare il sito e contatta immediatamente il 112.</p>
            <hr style={{ border: '0', borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />
            <p style={{ textAlign: 'center' }}>© 2026 ServiziSalute Roma - Portale Indipendente di Servizi Sanitari.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
