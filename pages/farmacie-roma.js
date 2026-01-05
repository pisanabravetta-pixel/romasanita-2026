import React, { useState, useEffect } from 'react';

export default function FarmacieRoma() {
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
            {cosaCercata || "Farmacia"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>Trova le migliori <strong>farmacie</strong> a {zonaFiltrata}.</p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Farmacie e Parafarmacie a Roma</h2>
          <p>La ricerca di una <strong>farmacia a Roma</strong> è semplificata dal nostro database locale. Scopri i presidi sanitari di zona che offrono servizi di telemedicina, autoanalisi e consegna farmaci.</p>
        </section>

        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', color: '#1e3a8a', marginBottom: '15px' }}>Cerca farmacie nei quartieri:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a href="/farmacie-roma-prati" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma Prati</a>
            <a href="/farmacie-roma-eur" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma EUR</a>
            <a href="/farmacie-roma-centro" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma Centro</a>
            <a href="/farmacie-roma-nord" style={{ color: '#2563eb', textDecoration: 'none' }}>• Roma Nord</a>
          </div>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>Stiamo aggiornando le farmacie partner a {zonaFiltrata}.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>Sei una Farmacia? Pubblica il tuo profilo gratis</a>
        </div>

        <div style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}><strong>Nota Legale:</strong> ServiziSalute non sostituisce il parere del medico o del farmacista.</p>
        </div>
      </div>
    </div>
  );
}
