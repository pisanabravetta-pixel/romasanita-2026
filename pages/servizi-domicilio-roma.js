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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fffaf5', minHeight: '100vh' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#ea580c', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#9a3412', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Assistenza"} a Domicilio {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Professionisti disponibili per <strong>{cosaCercata || "cure domiciliari"}</strong> direttamente a casa tua a {zonaFiltrata}.
          </p>
        </header>

        <div style={{ backgroundColor: '#fff', border: '1px solid #fed7aa', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '20px', color: '#9a3412', marginBottom: '15px' }}>Assistenza Professionale a {zonaFiltrata}</h2>
          <p style={{ color: '#4b5563' }}>
            Il servizio di <strong>{cosaCercata}</strong> a domicilio è pensato per chi ha difficoltà a spostarsi 
            o preferisce la comodità della propria abitazione a <strong>{zonaFiltrata}</strong>.
          </p>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px' }}>
          <div style={{ fontSize: '40px' }}>🏠</div>
          <p style={{ color: '#64748b' }}>Stiamo cercando infermieri e specialisti in <strong>{cosaCercata}</strong> disponibili a {zonaFiltrata}.</p>
        </div>
      </div>
    </div>
  );
}
