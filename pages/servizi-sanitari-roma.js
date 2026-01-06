import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function MappaServizi() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnunci();
  }, []);

  async function fetchAnnunci() {
    const { data, error } = await supabase
      .from('annunci')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Errore:', error);
    } else {
      setAnnunci(data);
    }
    setLoading(false);
  }

  // Funzione per assegnare colori diversi ai badge per categoria
  const getBadgeStyle = (categoria) => {
    const cat = categoria.toLowerCase();
    if (cat.includes('farmaci')) return { bg: '#ecfdf5', text: '#059669' }; // Verde
    if (cat.includes('domicilio')) return { bg: '#fef2f2', text: '#dc2626' }; // Rosso
    if (cat.includes('diagnostica')) return { bg: '#f5f3ff', text: '#7c3aed' }; // Viola
    return { bg: '#eff6ff', text: '#2563eb' }; // Blu (default medici)
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Mappa Servizi Sanitari Roma | Elenco Completo Specialisti</title>
        <meta name="description" content="Consulta la mappa completa dei servizi sanitari a Roma: medici, farmacie, centri diagnostici e assistenza a domicilio in un unico portale." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '20px 0', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', textDecoration: 'none', letterSpacing: '-0.5px' }}>ServiziSalute</a>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="/pubblica-annuncio" style={{ textDecoration: 'none', color: '#2563eb', fontSize: '14px', fontWeight: 'bold' }}>Aggiungi Servizio</a>
            <a href="/" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px' }}>Home</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>
            Mappa dei Servizi Sanitari
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Tutti i professionisti e le strutture di Roma in un unico elenco aggiornato.</p>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Caricamento database in corso...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {annunci.map((annuncio) => {
              const badge = getBadgeStyle(annuncio.categoria);
              return (
                <div key={annuncio.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '30px', 
                  borderRadius: '20px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ 
                      backgroundColor: badge.bg, 
                      color: badge.text, 
                      padding: '5px 12px', 
                      borderRadius: '30px', 
                      fontSize: '11px', 
                      fontWeight: '800',
                      textTransform: 'uppercase'
                    }}>
                      {annuncio.categoria}
                    </span>
                    <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: '15px 0 8px 0', lineHeight: '1.2' }}>{annuncio.nome}</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      📍 {annuncio.zona} — {annuncio.indirizzo}
                    </p>
                    <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                      {annuncio.descrizione}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href={`https://wa.me/${annuncio.whatsapp}`} target="_blank" rel="noreferrer" 
                       style={{ flex: 2, textAlign: 'center', background: '#22c55e', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                      WhatsApp
                    </a>
                    <a href={`tel:${annuncio.telefono}`} 
                       style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '12px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                      📞
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && annunci.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#f8fafc', borderRadius: '30px', border: '2px dashed #e2e8f0' }}>
            <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '20px' }}>Il database è attualmente vuoto.</p>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 35px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
              Diventa il primo iscritto
            </a>
          </div>
        )}

        {/* SEO FOOTER SECTION */}
        <section style={{ marginTop: '80px', padding: '40px', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '15px' }}>La sanità a Roma, a portata di click</h3>
          <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '15px' }}>
            ServiziSalute è il portale nato per semplificare il contatto tra cittadini e professionisti della salute. 
            Che tu stia cercando un <strong>cardiologo all'EUR</strong>, una <strong>farmacia di turno in Centro</strong> o un <strong>infermiere a domicilio a Roma Nord</strong>, 
            la nostra mappa ti offre trasparenza, contatti diretti e velocità. Naviga tra le categorie o usa i filtri zonali per trovare l'assistenza migliore vicino a te.
          </p>
        </section>
      </main>

      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '20px' }}>ServiziSalute Roma</div>
          <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
            Il portale indipendente per la ricerca di specialisti e servizi sanitari nella Capitale.
          </p>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '30px', fontSize: '12px', color: '#475569' }}>
            © 2026 ServiziSalute Roma - Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}
