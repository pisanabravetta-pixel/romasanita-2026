import React from 'react';

export default function DiagnosticaRoma() {
  const [zonaFiltrata, setZonaFiltrata] = React.useState("Roma");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const z = params.get('zona');
    if (z && z !== "Tutta Roma") setZonaFiltrata(z);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: '#1a365d' }}>Centri Diagnostici a {zonaFiltrata}</h1>
      <p>Esami del sangue, ecografie e radiologia nei centri convenzionati di {zonaFiltrata}.</p>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
        <h3>Centro Diagnostico {zonaFiltrata}</h3>
        <p>📍 Via principale, {zonaFiltrata}</p>
        <button style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}>Vedi Esami Disponibili</button>
      </div>
      <br />
      <a href="/" style={{ color: '#2563eb' }}>← Torna alla Home</a>
    </div>
  );
}
