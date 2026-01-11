import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DermatologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('dermatologia', 'roma');

  useEffect(() => {
    async function fetchDermatologi() {
      const queryBusca = getDBQuery('dermatologia'); 
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', `%${queryBusca.cat}%`)
        .eq('approvato', true)
        .order('is_top', { ascending: false });
        
      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchDermatologi();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#faf5ff', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Dermatologi a Roma – Visita Dermatologica e Mappatura Nei | ServiziSalute</title>
        <meta name="description" content="Trova i migliori dermatologi a Roma. Prenota visite specialistiche per pelle, capelli e mappatura nei nei principali quartieri di Roma." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#9333ea', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        ✨ SPECIALISTI IN DERMATOLOGIA A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#9333ea', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #9333ea' }}>
          <h1 style={{ color: '#581c87', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Dermatologi a Roma</h1>
          <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '16px', maxWidth: '800px' }}>
            La salute della tua pelle è importante. Trova <strong>dermatologi esperti a Roma</strong> per controlli preventivi, cura dell'acne e trattamenti dermatologici avanzati.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {['Mappatura Nei', 'Dermatologia Estetica', 'Cura Acne', 'Controllo Capelli'].map(s => (
              <span key={s} style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>{s}</span>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '22px', color: '#1a202c', marginBottom: '20px' }}>Dermatologi disponibili</h2>
        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : medici.length > 0 ? medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #9333ea' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ color: '#581c87', margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              {v.is_top && <span style={{ backgroundColor: '#f3e8ff', color: '#9333ea', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
            </div>
            <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#9333ea', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Prenota Visita</a>
              <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun dermatologo trovato.</div>
        )}

        {/* FOOTER IDENTICO */}
        <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '50px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '12px', color: '#718096' }}>© 2026 ServiziSalute – Tutti i diritti riservati</div>
        </footer>
      </main>
    </div>
  );
}
