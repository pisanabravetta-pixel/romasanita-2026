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
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#c53030', textTransform: 'capitalize' }}>
        {cosaCercata || "Farmacia"} a {zonaFiltrata}
      </h1>
      <p>Servizi di <strong>{cosaCercata || "farmacia e autoanalisi"}</strong> in zona {zonaFiltrata}.</p>
      <div style={{ padding: '15px', borderLeft: '5px solid #c53030', backgroundColor: '#fff5f5' }}>
        <p>Stai cercando disponibilità per: <strong>{cosaCercata}</strong></p>
      </div>
      <br /><a href="/">← Torna alla Home</a>
    </div>
  );
}
