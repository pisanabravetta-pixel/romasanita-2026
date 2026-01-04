import React from 'react';

export default function ServiziDomicilio() {
  const [zonaFiltrata, setZonaFiltrata] = React.useState("Roma");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const z = params.get('zona');
    if (z && z !== "Tutta Roma") setZonaFiltrata(z);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#1a365d' }}>Servizi a Domicilio a {zonaFiltrata}</h1>
      <p>Assistenza infermieristica e medica direttamente a casa tua a {zonaFiltrata}.</p>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
        <h3>Assistenza Professionale {zonaFiltrata}</h3>
        <p>📍 Copertura totale zona {zonaFiltrata}</p>
        <button style={{ backgroundColor: '#48bb78', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>Prenota Assistenza</button>
      </div>
      <br />
      <a href="/" style={{ color: '#2563eb' }}>← Torna alla Home</a>
    </div>
  );
}
