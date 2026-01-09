import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('farmacie', 'roma');

  useEffect(() => {
    async function fetchFarmacie() {
      const queryBusca = getDBQuery('farmacie');
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', queryBusca)
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchFarmacie();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>Farmacie a Roma | Turni e Orari | ServiziSalute</title>
      </Head>

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 FARMACIE E PARAFARMACIE APERTE A ROMA
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #059669', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', margin: '0' }}>Farmacie a Roma</h1>
          <p style={{ color: '#64748b', marginTop: '10px' }}>Scegli un quartiere per i turni locali:</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* LINK DI RICHIAMO CORRETTI: farmacie-roma-zona */}
            {['Prati', 'EUR', 'San Giovanni', 'Parioli', 'Tiburtina'].map(z => (
              <a key={z} href={`/farmacie-roma-${z.toLowerCase()}`} style={{ padding: '10px 18px', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '20px', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #d1fae5' }}>{z}</a>
            ))}
          </div>
        </div>

        {loading ? <p>Caricamento...</p> : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', margin: '20px 0', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0' }}>
            <h2 style={{ color: '#065f46', margin: '0' }}>{v.nome}</h2>
            <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>}
            </div>
          </div>
        ))}

        {/* FOOTER IDENTICO ALLA HOME (SANO) */}
        <footer style={{ marginTop: '100px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>La tua guida alla salute nella Capitale.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Categorie</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti Roma</a></li>
                <li><a href="/cardiologi-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiologi Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Diagnostica Roma</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Legale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/termini-condizioni" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #334155', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#64748b' }}><strong>DISCLAIMER:</strong> ServiziSalute Roma è un portale informativo. Verificare sempre i dati.</p>
            <p style={{ fontSize: '13px', marginTop: '15px' }}>© 2026 ServiziSalute Roma</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
