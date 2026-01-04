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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#16a34a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Farmacia"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Disponibilità di <strong>{cosaCercata || "farmaci e servizi"}</strong> nelle farmacie di zona {zonaFiltrata}.
          </p>
        </header>

        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', color: '#166534', marginBottom: '15px' }}>Servizi in Farmacia a {zonaFiltrata}</h2>
          <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
            Molte farmacie a <strong>{zonaFiltrata}</strong> offrono ormai servizi avanzati come <strong>{cosaCercata}</strong>, 
            autoanalisi, tamponi e prenotazioni CUP. Controlla gli orari di apertura e i turni notturni.
          </p>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #bbf7d0', borderRadius: '12px' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>💊</div>
          <p style={{ color: '#64748b' }}>Stiamo verificando le farmacie di turno che offrono <strong>{cosaCercata}</strong> a {zonaFiltrata}.</p>
        </div>

        <footer style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <a href="/farmacie-roma-centro" style={{ color: '#16a34a', fontSize: '14px' }}>Cerchi in Centro Storico? Clicca qui</a>
        </footer>
      </div>
    </div>
  );
}
