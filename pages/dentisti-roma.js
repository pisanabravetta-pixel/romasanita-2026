import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function DentistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupera Schemi e FAQ specifiche per Dentisti
  const schemas = getSchemas('dentisti', 'roma');

  useEffect(() => {
    async function fetchDentisti() {
      const queryBusca = getDBQuery('dentisti');
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .ilike('categoria', queryBusca)
        .eq('approvato', true)
        .order('is_top', { ascending: false });

      if (!error && data) setMedici(data);
      setLoading(false);
    }
    fetchDentisti();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Dentisti a Roma | Studi Dentistici e Implantologia | ServiziSalute</title>
        <meta name="description" content="Trova i migliori dentisti a Roma. Implantologia, estetica dentale e pronto soccorso odontoiatrico nei quartieri della Capitale." />
        <link rel="canonical" href="https://www.servizisalute.it/dentisti-roma" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🦷 STUDI DENTISTICI E ODONTOIATRIA A ROMA
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>
          ← Torna alla Home
        </a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0' }}>Dentisti a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Trova il tuo dentista di fiducia tra i migliori studi odontoiatrici della Capitale.</p>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Prati', 'EUR', 'San Giovanni', 'Parioli', 'Tiburtina'].map(z => (
              <a key={z} href={`/${z.toLowerCase()}`} style={{ padding: '8px 16px', backgroundColor: '#eff6ff', color: '#1e40af', borderRadius: '20px', fontSize: '13px', textDecoration: 'none', fontWeight: '500', border: '1px solid #dbeafe' }}>
                Dentisti {z}
              </a>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Ricerca specialisti in corso...</div>
        ) : medici.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p>Nessuno studio dentistico trovato. Sei un professionista? Pubblica il tuo profilo!</p>
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
                   {v.urgenza_24h && <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>🚨 PRONTO SOCCORSO</span>}
                   {v.vicino_metro && <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>🚇 METRO</span>}
                </div>
              </div>
              
              <p style={{ color: '#4b5563', fontSize: '16px', margin: '10px 0' }}>
                📍 {v.indirizzo} — <strong style={{ color: '#1e3a8a' }}>{v.zona}</strong>
              </p>

              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
                {v.descrizione || "Studio odontoiatrico specializzato in implantologia, ortodonzia e pulizia dentale. Contatta per un appuntamento o un preventivo."}
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>WhatsApp</a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.5', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>📍</a>
              </div>
            </div>
          ))
        )}

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', marginBottom: '25px' }}>Domande Frequenti sui Dentisti a Roma</h2>
          {schemas.faq.mainEntity.map((faq, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', color: '#1e40af', marginBottom: '8px' }}>{faq.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', margin: '0 0 10px 0' }}>Sei un Dentista a Roma?</h2>
          <p style={{ fontSize: '17px', opacity: '0.9', marginBottom: '25px' }}>Aumenta la visibilità del tuo studio. Inserisci il tuo profilo gratis su ServiziSalute.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '15px 35px', borderRadius: '14px', textDecoration: 'none', fontWeight: '800', fontSize: '16px' }}>Pubblica il tuo studio →</a>
        </div>

        <footer style={{ marginTop: '80px', paddingBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginBottom: '20px' }}>CATEGORIE PRINCIPALI</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <a href="/farmacie-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Farmacie</a>
              <a href="/cardiologi-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Cardiologi</a>
              <a href="/diagnostica-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Diagnostica</a>
              <a href="/visite-specialistiche-roma" style={{ color: '#4b5563', textDecoration: 'none' }}>Specialisti</a>
            </div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', fontSize: '13px', color: '#6b7280', lineHeight: '1.6', border: '1px solid #e2e8f0' }}>
            <p><strong>Disclaimer:</strong> Le informazioni presenti sono a titolo informativo. Si raccomanda di verificare sempre le qualifiche del professionista odontoiatrico scelto.</p>
            <hr style={{ border: '0', borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />
            <p style={{ textAlign: 'center' }}>© 2026 ServiziSalute Roma</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
