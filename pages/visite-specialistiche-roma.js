import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function VisiteSpecialisticheRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecialisti() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        // Cerchiamo categorie che contengono "Medico", "Visita" o "Specialista"
        .or('categoria.ilike.%Medico%,categoria.ilike.%Specialista%')
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchSpecialisti();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Visite Specialistiche a Roma | Prenota Medici Esperti | ServiziSalute</title>
        <meta name="description" content="Trova medici specialisti a Roma per ogni branca della medicina. Ginecologi, Dermatologi, Nutrizionisti e molti altri nei quartieri di Roma." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Visite Specialistiche Roma - ServiziSalute",
          "description": "Elenco completo dei medici specialisti a Roma suddivisi per categoria e zona.",
          "areaServed": "Roma"
        })}} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Visite Specialistiche a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Ricerca il tuo <strong>medico specialista</strong> a Roma. Consulta i profili professionali e contatta direttamente gli studi per appuntamenti e consulenze.
        </p>

        {/* SEO ZONE - Navigazione quartieri per specialisti */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e40af' }}>Cerca specialisti in:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/visite-specialistiche-roma-prati" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Prati</a>
            <a href="/visite-specialistiche-roma-eur" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>EUR</a>
            <a href="/visite-specialistiche-roma-centro" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Centro</a>
          </div>
        </div>

        {loading ? (
          <p>Caricamento medici specialisti...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' }}>{v.categoria}</span>
              <h3 style={{ margin: '5px 0', color: '#1e3a8a', fontSize: '22px' }}>{v.nome}</h3>
              <p style={{ color: '#64748b', fontSize: '15px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <p style={{ marginTop: '12px', color: '#475569', fontSize: '15px', lineHeight: '1.5' }}>{v.descrizione}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama Studio</a>
                <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Nessuno specialista trovato per questa ricerca.</p>
        )}

        <footer style={{ marginTop: '60px', padding: '30px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px' }}>
          <p><strong>Disclaimer Medico:</strong> ServiziSalute Roma è una piattaforma informativa. Le informazioni fornite dai medici non costituiscono diagnosi. In caso di sintomi gravi o emergenze, contattare subito il 118 o il pronto soccorso.</p>
        </footer>
      </main>
    </div>
  );
}
