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
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Trova le migliori <strong>farmacie e parafarmacie</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Farmacie a Roma: Servizi e Turni</h2>
          <p>
            Su <strong>ServiziSalute</strong> trovi rapidamente una <strong>farmacia a Roma</strong> vicino a te. 
            Il nostro portale raccoglie farmacie che offrono servizi come test diagnostici rapidi, misurazione pressione e consulenze farmacologiche.
          </p>
          <p>
            Cerca farmacie a <strong>Roma Prati</strong>, <strong>EUR</strong> o <strong>San Giovanni</strong> per trovare recapiti e servizi di prossimità per ogni cittadino romano.
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo aggiornando l'elenco delle farmacie partner a {zonaFiltrata}.
            <br />Torna presto per consultare la lista completa!
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Sei una Farmacia? Pubblica qui il tuo profilo gratis
          </a>
        </div>

        <div style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
            <strong>Nota Legale:</strong> ServiziSalute è una piattaforma informativa di annunci. Non fornisce consulenze mediche e non sostituisce il rapporto diretto tra paziente e professionista sanitario.
          </p>
        </div>
      </div>
    </div>
  );
}
