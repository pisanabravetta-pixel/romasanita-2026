import React, { useState, useEffect } from 'react';

export default function DentistiRoma() {
  const [zonaFiltrata, setZonaFiltrata] = useState("Roma");
  const [cosaCercata, setCosaCercata] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const z = params.get('zona');
    const c = params.get('cerca');
    if (z && z !== "Tutta Roma") setZonaFiltrata(z);
    if (c) setCosaCercata(c);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '50px' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Dentista"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>Trova studi odontoiatrici per <strong>{cosaCercata || "cure dentali"}</strong> a {zonaFiltrata}.</p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Studi Dentistici a Roma: Eccellenza e Prossimità</h2>
          <p>Benvenuto su <strong>ServiziSalute</strong>. Se cerchi un <strong>dentista a Roma</strong>, il nostro portale ti permette di individuare i migliori studi nei quartieri della Capitale. Dall'implantologia all'ortodonzia, colleghiamo i pazienti con i professionisti locali in modo diretto e gratuito.</p>
        </section>

        {/* LINK INTERNI AI QUARTIERI */}
        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', color: '#1e3a8a', marginBottom: '15px' }}>Cerca dentisti nei quartieri:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a href="/dentisti-roma-prati" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma Prati</a>
            <a href="/dentisti-roma-eur" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma EUR</a>
            <a href="/dentisti-roma-centro" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma Centro</a>
            <a href="/dentisti-roma-nord" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma Nord</a>
          </div>
        </section>
{/* 🏆 VETRINA AGGIORNATA - TUTTI I TOP DENTISTI */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a', marginBottom: '25px' }}>Studi in evidenza a Roma</h2>

          {/* GRUPPO PRATI */}
          <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
            <h4 style={{ color: '#64748b', fontSize: '13px', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>Quartiere Prati</h4>
            <div style={{ display: 'grid', gap: '15px' }}>
               <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <strong style={{ color: '#1e3a8a' }}>Dr. Marco Bazzucchi</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>📍 Via dei Gracchi, 151</p>
               </div>
               <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <strong style={{ color: '#1e3a8a' }}>Centro Dentistico Cavour</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>📍 Via Pietro Cossa, 28</p>
               </div>
               <a href="/dentisti-roma-prati" style={{ color: '#2563eb', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'right', display: 'block' }}>Vedi tutti a Prati →</a>
            </div>
          </div>

          {/* GRUPPO EUR */}
          <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f0f7ff', borderRadius: '12px', border: '1px dotted #bfdbfe' }}>
            <h4 style={{ color: '#64748b', fontSize: '13px', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>Quartiere EUR</h4>
            <div style={{ display: 'grid', gap: '15px' }}>
               <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <strong style={{ color: '#1e3a8a' }}>De Sanctis Odontoiatria Digitale</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>📍 Viale Europa, 64</p>
               </div>
               <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <strong style={{ color: '#1e3a8a' }}>Studio Giovannini Ludovici</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#64748b' }}>📍 Viale Beethoven, 70</p>
               </div>
               <a href="/dentisti-roma-eur" style={{ color: '#2563eb', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'right', display: 'block' }}>Vedi tutti all'EUR →</a>
            </div>
          </div>
        </section>
        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>Stiamo selezionando nuovi studi per <strong>{cosaCercata || "odontoiatria"}</strong> a {zonaFiltrata}.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>Sei un dentista? Pubblica il tuo studio gratis</a>
        </div>

        <div style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}><strong>Nota Legale:</strong> ServiziSalute è un portale di annunci. Non fornisce consulenze mediche.</p>
        </div>
      </div>
    </div>
  );
}
