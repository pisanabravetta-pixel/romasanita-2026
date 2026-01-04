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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* 1. BARRA DI NAVIGAZIONE - Per non far sentire l'utente perso */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* 2. INTESTAZIONE - Qui usiamo quello che l'utente ha cercato */}
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Dentista"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            I migliori centri odontoiatrici per <strong>{cosaCercata || "cure dentali"}</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        {/* 3. BOX DI FIDUCIA - Spieghiamo cosa stiamo facendo */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Perché scegliere questi centri?</h2>
          <ul style={{ paddingLeft: '20px', color: '#4b5563' }}>
            <li style={{ marginBottom: '10px' }}>Specialisti in <strong>{cosaCercata}</strong> verificati.</li>
            <li style={{ marginBottom: '10px' }}>Tecnologie all'avanguardia per la zona di {zonaFiltrata}.</li>
            <li>Preventivi chiari e trasparenza totale.</li>
          </ul>
        </div>

        {/* 4. MESSAGGIO DI ATTESA - Così non sembra vuoto */}
        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo selezionando i nuovi studi partner per <strong>{cosaCercata}</strong> a {zonaFiltrata}.
            <br />Torna a trovarci tra pochi giorni per vedere la lista completa!
          </p>
          <a href="/" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            ← Torna alla ricerca globale
          </a>
        </div>

        {/* 5. IL PONTE PER LE ALTRE ZONE (MOLTO IMPORTANTE PER LA SEO) */}
        <div style={{ marginTop: '50px', fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
          <p>Potrebbe interessarti anche:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/dentisti-roma-prati" style={{ color: '#2563eb' }}>Dentisti Prati</a>
            <a href="/dentisti-roma-eur" style={{ color: '#2563eb' }}>Dentisti EUR</a>
            <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb' }}>Dentisti San Giovanni</a>
          </div>
        </div>

      </div>
    </div>
  );
}
