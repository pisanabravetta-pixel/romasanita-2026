import React, { useState, useEffect } from 'react';

export default function ServiziDomicilio() {
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
      <h1 style={{ color: '#2c7a7b', textTransform: 'capitalize' }}>
        {cosaCercata || "Assistenza"} a Domicilio: {zonaFiltrata}
      </h1>
      <p>Servizi professionali di <strong>{cosaCercata || "cura e assistenza"}</strong> direttamente a casa tua.</p>
      <br /><a href="/">← Torna alla Home</a>
    </div>
  );
}
