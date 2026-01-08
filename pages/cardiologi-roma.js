import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCardiologi() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Cardiolog%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Cardiologi a Roma | Visite e Check-up Cuore | ServiziSalute</title>
        <meta name="description" content="Trova i migliori cardiologi a Roma. Prenota una visita cardiologica, ECG o controllo del cuore nei principali quartieri della Capitale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Cardiologi Roma - ServiziSalute",
          "description": "Elenco dei medici specialisti in cardiologia a Roma.",
          "areaServed": "Roma"
        })}} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Cardiologi a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Ricerca uno <strong>specialista in cardiologia</strong> a Roma. Consulta i profili per visite, ECG e prevenzione.
        </p>

        {/* SEO ZONE - Collegamento ai quartieri */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e40af' }}>Filtra per zona:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/cardiologi-roma-prati" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Prati</a>
            <a href="/cardiologi-roma-eur" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>EUR</a>
            <a href="/cardiologi-roma-centro" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Centro</a>
          </div>
        </div>

        {loading ? (
          <p>Ricerca specialisti...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
              <p style={{ color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun cardiologo trovato.</p>
        )}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px' }}>
          <p><strong>Disclaimer:</strong> ServiziSalute Roma è un portale informativo. Le informazioni non sostituiscono il parere medico. In caso di emergenza chiama il 118.</p>
        </footer>
      </main>
    </div>
  );
}
