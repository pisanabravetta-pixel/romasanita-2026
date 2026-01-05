import React, { useState, useEffect } from 'react';

export default function DiagnosticaRoma() {
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
            {cosaCercata || "Centro Diagnostico"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Laboratori di analisi, <strong>TAC e Risonanze</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Centri Diagnostici e Analisi a Roma</h2>
          <p>
            Benvenuto su <strong>ServiziSalute</strong>, la tua guida ai <strong>centri diagnostici a Roma</strong>. 
            Il nostro obiettivo è aiutarti a trovare rapidamente strutture private per esami come risonanza magnetica, TAC, ecografie, 
            e laboratori di analisi cliniche in ogni zona di Roma. 
          </p>
          <p>
            Dall'analisi del sangue specialistica alla diagnostica per immagini avanzata, puoi filtrare i centri per quartiere 
            (es. <strong>Roma Nord</strong>, <strong>Ostia</strong> o <strong>Centro</strong>) per trovare l'appuntamento più vicino e veloce. 
            Tutti i centri pubblicati offrono tecnologie all'avanguardia per garantirti risultati precisi e tempi di attesa ridotti.
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Nuovi centri di <strong>{cosaCercata || "diagnostica"}</strong> a {zonaFiltrata} in fase di inserimento.
            <br />Controlla tra pochi giorni per vedere le strutture disponibili.
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Gestisci un centro diagnostico? Pubblicalo qui
          </a>
        </div>
      </div>
    </div>
  );
}
