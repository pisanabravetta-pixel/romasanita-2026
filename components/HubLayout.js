import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { theme } from '../styles/theme';

export default function HubLayout({ titolo, categoria, colore, medici, loading, quartieri }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>{titolo} Roma: I Migliori Specialisti | Gennaio 2026</title>
      </Head>
      
      {/* Top Bar Colorata */}
      <div style={{ backgroundColor: colore, color: 'white', padding: '12px', textAlign: 'center', fontWeight: '900', fontSize: '14px' }}>
        🚀 {titolo.toUpperCase()} A ROMA — DATI AGGIORNATI GENNAIO 2026
      </div>

      <Navbar />

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* Titolo Master - USA IL TEMA */}
        <div style={{ 
          marginBottom: '25px', backgroundColor: 'white', padding: theme.padding.main, 
          borderRadius: theme.radius.main, borderLeft: `12px solid ${colore}`, boxShadow: theme.shadows.premium 
        }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0' }}>{titolo} a Roma</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', marginTop: '10px' }}>
            Trova i migliori professionisti in <span style={{ color: colore }}>{titolo.toLowerCase()}</span> a Roma.
          </p>
        </div>

        {/* Cerca per Quartiere */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius.main, marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e293b' }}>Cerca nel tuo Quartiere:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieri.map(q => (
              <a key={q} href={`/${categoria}-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: '#f8fafc', color: colore, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', border: `1px solid ${colore}22` }}>{q}</a>
            ))}
          </div>
        </div>

        {/* Lista Risultati */}
        <div style={{ display: 'block' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '50px' }}>Caricamento specialisti...</p>
          ) : medici.length > 0 ? medici.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: theme.radius.card, padding: theme.padding.card, 
              marginBottom: '20px', border: v.is_top ? `4px solid ${colore}` : '1px solid #e2e8f0', 
              boxShadow: theme.shadows.premium, width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: colore, color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: theme.radius.button, textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
                )}
              </div>
            </div>
          )) : (
            <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: theme.radius.main }}>
               <p style={{ color: '#64748b' }}>Nessun professionista trovato in questa categoria al momento.</p>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}
