import React, { useState, useEffect } from 'react';

export default function VisiteSpecialisticheRoma() {
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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Visita Medica"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Prenota la tua visita per <strong>{cosaCercata || "specialisti medici"}</strong> a {zonaFiltrata}.
          </p>
        </header>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a' }}>Prenotazione rapida a {zonaFiltrata}</h2>
          <p style={{ color: '#4b5563' }}>
            Trova medici competenti per <strong>{cosaCercata}</strong>. Confronta i profili, leggi le recensioni e contatta lo studio più vicino a <strong>{zonaFiltrata}</strong>.
          </p>
        </div>

        <footer style={{ marginTop: '50px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Specialità cercate spesso:</p>
          <a href="/cardiologi-roma" style={{ color: '#2563eb', fontSize: '14px' }}>Cardiologia Roma</a>
        </footer>
      </div>
    </div>
  );
}
