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
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#2b6cb0', textTransform: 'capitalize' }}>
        {cosaCercata || "Dentista"} a {zonaFiltrata}
      </h1>
      <p>Studi odontoiatrici specializzati in <strong>{cosaCercata || "cure dentali"}</strong> a {zonaFiltrata}.</p>
      <br /><a href="/">← Torna alla Home</a>
    </div>
  );
}
