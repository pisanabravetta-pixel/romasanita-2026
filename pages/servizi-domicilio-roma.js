import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function ServiziDomicilioRoma() {
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDomicilio() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', '%Domicilio%') 
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setServizi(data);
      setLoading(false);
    }
    fetchDomicilio();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Head>
        <title>Servizi Sanitari a Domicilio Roma | Assistenza e Cure | ServiziSalute</title>
        <meta name="description" content="Trova servizi sanitari a domicilio a Roma: infermieri, fisioterapisti e medici pronti ad assisterti direttamente a casa tua nei quartieri di Roma." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Servizi a Domicilio Roma - ServiziSalute",
          "description": "Elenco dei professionisti che offrono assistenza sanitaria domiciliare a Roma.",
          "areaServed": "Roma"
        })}} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <h1 style={{ color: '#1e40af', fontSize: '32px' }}>Servizi a Domicilio Roma</h1>
        <p style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
          Ricerca <strong>assistenza sanitaria a casa tua</strong>. Trova infermieri, fisioterapisti e medici specialisti che effettuano visite domiciliari a Roma.
        </p>

        {/* SEO ZONE - Navigazione per zone per servizi a domicilio */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#1e40af' }}>Filtra per zona di intervento:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/servizi-domicilio-roma-sud" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Roma Sud</a>
            <a href="/servizi-domicilio-roma-nord" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Roma Nord</a>
            <a href="/servizi-domicilio-roma-centro" style={{ padding: '8px 15px', backgroundColor: '#eff6ff', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600' }}>Centro</a>
          </div>
        </div>

        {loading ? (
          <p>Ricerca professionisti a domicilio...</p>
        ) : servizi.length > 0 ? (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0', color: '#1e3a8a' }}>{v.nome}</h3>
              <p style={{ color: '#64748b' }}>📍 Copertura: <strong>{v.zona}</strong> — {v.indirizzo}</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun servizio a domicilio trovato.</p>
        )}

        <footer style={{ marginTop: '60px', padding: '20px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '12px' }}>
          <p><strong>Disclaimer:</strong> ServiziSalute Roma facilita il contatto con i professionisti ma non è responsabile della qualità delle prestazioni erogate a domicilio. In caso di emergenza medica acuta, contattare sempre il 118.</p>
        </footer>
      </main>
    </div>
  );
}
