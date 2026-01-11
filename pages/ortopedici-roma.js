import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic'; // Aggiunto getSchemas

export default function OrtopediciRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('ortopedia', 'roma'); // Inizializzato schemas

  useEffect(() => {
    async function fetchData() {
      try {
        const queryBusca = getDBQuery('ortopedia'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch ortopedici:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <Head>
        <title>Ortopedici a Roma – Chirurgia e Traumatologia | ServiziSalute</title>
        <meta name="description" content="Trova i migliori ortopedici a Roma. Specialisti in traumatologia, chirurgia del ginocchio e della colonna nei quartieri di Roma." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      <div style={{ backgroundColor: '#059669', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🦴 SPECIALISTI IN ORTOPEDIA E TRAUMATOLOGIA A ROMA
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#059669', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #059669', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#064e3b', fontSize: '32px', fontWeight: '800' }}>Ortopedici a Roma</h1>
          <p>Migliora la tua mobilità. Contatta i migliori <strong>specialisti in ortopedia a Roma</strong> per consulenze su articolazioni, colonna vertebrale e infortuni sportivi.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Caricamento...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #059669' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ color: '#064e3b', margin: 0, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#dcfce7', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama Ora</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun ortopedico trovato a Roma.</div>
        )}
      </main>

      {/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>Il portale di annunci dedicato ai servizi sanitari a Roma.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
