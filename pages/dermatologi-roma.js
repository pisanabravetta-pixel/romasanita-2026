import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DermatologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('dermatologia', 'roma');

  // Elenco quartieri per i link rapidi
  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .or('categoria.ilike.%dermatologia%,categoria.ilike.%dermatologo%')
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f5f3ff', minHeight: '100vh' }}>
      <Head>
        <title>Dermatologi a Roma – Visita Dermatologica e Mappatura Nei | ServiziSalute</title>
        <meta name="description" content="Trova i migliori dermatologi a Roma. Prenota una visita dermatologica per acne, psoriasi o mappatura nei nei migliori centri della capitale." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <div style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🩺 SPECIALISTI IN DERMATOLOGIA A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#7c3aed', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #7c3aed', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#4c1d95', fontSize: '32px', fontWeight: '800' }}>Dermatologi a Roma</h1>
          <p>La salute della tua pelle è importante. Trova <strong>dermatologi esperti a Roma</strong> per controlli preventivi, cura dell'acne e trattamenti avanzati.</p>
          
          {/* LINK AI QUARTIERI */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#6b7280', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/dermatologi-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #e5e7eb' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ color: '#4c1d95', marginBottom: '20px' }}>Dermatologi disponibili</h2>
        {loading ? (
          <p>Caricamento...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #7c3aed' : '1px solid #e2e8f0' }}>
              <h2 style={{ color: '#4c1d95', margin: 0 }}>{v.nome}</h2>
              <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#7c3aed', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p>Nessun dermatologo trovato. Stiamo aggiornando le disponibilità.</p>
            <a href="/pubblica-annuncio" style={{ color: '#7c3aed', fontWeight: 'bold' }}>Sei un dermatologo? Registrati ora</a>
          </div>
        )}

        <section style={{ marginTop: '50px', backgroundColor: '#ede9fe', padding: '30px', borderRadius: '24px' }}>
          <h3 style={{ color: '#4c1d95' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ marginTop: '20px' }}>
            <p><strong>Quanto costa una visita dermatologica a Roma?</strong><br/>Il prezzo medio varia tra gli 80€ e i 150€ a seconda dello specialista.</p>
            <p style={{ marginTop: '15px' }}><strong>Quando fare la mappatura dei nei?</strong><br/>Si consiglia un controllo annuale per la prevenzione.</p>
          </div>
        </section>
      </main>

      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px',
