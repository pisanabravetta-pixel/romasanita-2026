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
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Farmacie a Roma | Turni, Orari e Parafarmacie | ServiziSalute</title>
        <meta name="description" content="Trova le farmacie aperte a Roma, parafarmacie e turni notturni nei principali quartieri della Capitale." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 FARMACIE E PARAFARMACIE APERTE A ROMA
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#059669', textDecoration: 'none', fontWeight: '600' }}>← Torna alla Home</a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '8px solid #059669' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>Farmacie a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Trova la farmacia più vicina a te. Orari e contatti verificati.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Prati', 'EUR', 'San Giovanni', 'Parioli', 'Tiburtina'].map(z => (
              <a key={z} href={`/${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', fontWeight: '500', border: '1px solid #d1fae5' }}>Farmacie {z}</a>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Ricerca in corso...</div>
        ) : medici.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: '0', color: '#065f46', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
            <p style={{ color: '#4b5563', fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
              {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>}
            </div>
          </div>
        ))}

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#059669', fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h2>
          {schemas.faq.mainEntity.slice(0, 3).map((faq, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', color: '#059669', marginBottom: '8px', fontWeight: '700' }}>{faq.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* FOOTER IDENTICO ALLA HOME */}
        <footer style={{ marginTop: '80px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px 20px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Il portale di riferimento per trovare medici, farmacie e specialisti nella Capitale. Informazioni verificate e contatti diretti.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Categorie</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti</a></li>
                <li><a href="/cardiologi-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiologi</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Diagnostica</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Legale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/termini-condizioni" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #334155', paddingTop: '30px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}><strong>Disclaimer Medico:</strong> Le informazioni su questo sito sono a scopo puramente informativo.</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>© 2026 ServiziSalute Roma. Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
