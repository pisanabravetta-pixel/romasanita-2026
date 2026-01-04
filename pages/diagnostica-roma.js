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
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#1a365d', textTransform: 'capitalize' }}>
        {cosaCercata || "Diagnostica"} a {zonaFiltrata}
      </h1>
      <p>Centri convenzionati per <strong>{cosaCercata || "esami diagnostici"}</strong> a {zonaFiltrata}.</p>
      <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <p>Risultati aggiornati per: <strong>{cosaCercata}</strong></p>
      </div>
      <br /><a href="/">← Torna alla Home</a>
    </div>
  );
}
