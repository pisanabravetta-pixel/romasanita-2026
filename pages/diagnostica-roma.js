import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function DiagnosticaRoma() {
  const [centri, setCentri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiagnostica() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Diagnostica%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setCentri(data);
      setLoading(false);
    }
    fetchDiagnostica();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Centri Diagnostici Roma | Analisi e Radiologia | ServiziSalute</title>
        <meta name="description" content="Trova i migliori centri diagnostici a Roma. Laboratori di analisi, ecografie e radiologia nei principali quartieri della Capitale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Diagnostica Roma - ServiziSalute",
          "description": "Elenco dei centri diagnostici e laboratori di analisi a Roma.",
          "areaServed": "Roma"
        })}} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Diagnostica a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Ricerca un <strong>centro diagnostico o laboratorio</strong> a Roma. Contatta le strutture per analisi, ecografie e diagnostica per immagini.
        </p>

        {/* SEO ZONE - Collegamento alle zone per diagnostica */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e40af' }}>Filtra per zona:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/diagnostica-roma-nord" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Roma Nord</a>
            <a href="/diagnostica-roma-eur" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>EUR</a>
            <a href="/diagnostica-roma-centro" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Centro</a>
          </div>
        </div>

        {loading ? (
          <p>Caricamento centri...</p>
        ) : centri.length > 0 ? (
          centri.map((v) => (
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
          <p>Nessun centro diagnostico trovato.</p>
        )}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px' }}>
          <p><strong>Disclaimer:</strong> ServiziSalute Roma fornisce solo informazioni di contatto. Verificare sempre orari e modalità di prenotazione direttamente con il centro diagnostico.</p>
        </footer>
      </main>
    </div>
  );
}
