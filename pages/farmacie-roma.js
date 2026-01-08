import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function FarmacieRoma() {
  const [farmacie, setFarmacie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFarmacie() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', 'Farmaci%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setFarmacie(data);
      setLoading(false);
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie a Roma | Orari e Contatti | ServiziSalute</title>
        <meta name="description" content="Trova le farmacie a Roma nel tuo quartiere. Orari, numeri di telefono e posizione delle farmacie aperte nella Capitale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Farmacie Roma - ServiziSalute",
          "description": "Elenco informativo delle farmacie a Roma suddivise per quartiere.",
          "areaServed": "Roma"
        })}} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Farmacie a Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Cerca la <strong>farmacia più vicina</strong>. Trova indirizzi e contatti diretti per farmaci, prodotti sanitari e servizi di telemedicina.
        </p>

        {/* SEO ZONE - Navigazione per zone */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e40af' }}>Filtra per zona:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/farmacie-roma-centro" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Centro</a>
            <a href="/farmacie-roma-prati" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Prati</a>
            <a href="/farmacie-roma-eur" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>EUR</a>
          </div>
        </div>

        {loading ? (
          <p>Caricamento farmacie...</p>
        ) : farmacie.length > 0 ? (
          farmacie.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
              <p style={{ color: '#64748b' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Mappa</a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessuna farmacia trovata.</p>
        )}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px' }}>
          <p><strong>Disclaimer:</strong> ServiziSalute Roma non gestisce i turni delle farmacie. Si consiglia di chiamare per verificare l'effettiva apertura, specialmente in orario notturno o festivo.</p>
        </footer>
      </main>
    </div>
  );
}
