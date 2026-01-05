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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '50px' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Dentista"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Trova i migliori studi odontoiatrici per <strong>{cosaCercata || "cure dentali"}</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Ricerca Dentisti e Studi Dentistici a Roma</h2>
          <p>
            Benvenuto su <strong>ServiziSalute</strong>, il portale dedicato alla ricerca di specialisti odontoiatri a Roma. 
            Se cerchi un <strong>dentista a Roma</strong>, qui puoi individuare studi specializzati in ogni quartiere: da <strong>Prati</strong> all'<strong>EUR</strong>, 
            fino a <strong>San Giovanni</strong> e <strong>Roma Nord</strong>.
          </p>
          <p>
            Dall'igiene orale all'implantologia, facilitiamo l'incontro tra pazienti e dentisti a Roma, offrendo una vetrina aggiornata con i contatti diretti dei migliori specialisti locali.
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo verificando nuovi studi dentistici partner per <strong>{cosaCercata || "cure odontoiatriche"}</strong> a {zonaFiltrata}.
            <br />Torna a trovarci a breve per l'elenco completo!
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Sei un dentista? Pubblica qui il tuo studio gratis
          </a>
        </div>

        <div style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
            <strong>Nota Legale:</strong> ServiziSalute è una piattaforma informativa di annunci. Non fornisce consulenze mediche e non sostituisce il rapporto diretto tra paziente e professionista sanitario.
          </p>
        </div>
      </div>
    </div>
  );
}
