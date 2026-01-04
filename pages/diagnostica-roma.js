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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {/* Barra di Navigazione */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#1a365d', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Intestazione */}
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1a365d', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Diagnostica"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Centri radiologici e laboratori specializzati in <strong>{cosaCercata || "esami diagnostici"}</strong> a {zonaFiltrata}.
          </p>
        </header>

        {/* Box informativo specifico per Diagnostica */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', color: '#1a365d', marginBottom: '15px' }}>Esami disponibili a {zonaFiltrata}</h2>
          <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
            I nostri centri partner a <strong>{zonaFiltrata}</strong> offrono tecnologie di ultima generazione per <strong>{cosaCercata}</strong>. 
            Puoi prenotare esami con tempi di attesa ridotti sia in regime privato che convenzionato.
          </p>
        </div>

        {/* Placeholder Risultati */}
        <div style={{ marginTop: '30px', textAlign: 'center', padding: '50px', backgroundColor: '#f8fafc', border: '2px dashed #94a3b8', borderRadius: '12px' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔬</div>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Stiamo aggiornando l'elenco dei macchinari e delle disponibilità per <strong>{cosaCercata}</strong>.
            <br />Controlla tra poche ore per i nuovi orari disponibili.
          </p>
        </div>

        {/* Ponte SEO per la Diagnostica */}
        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #cbd5e1', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>Altre zone coperte:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px' }}>
            <a href="/diagnostica-roma-nord" style={{ color: '#1a365d', fontWeight: 'bold' }}>Diagnostica Roma Nord</a>
            <a href="/visite-specialistiche-roma" style={{ color: '#1a365d' }}>Altre Specialistiche</a>
          </div>
        </div>

      </div>
    </div>
  );
}
