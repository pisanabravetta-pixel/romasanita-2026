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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '50px' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Medico Specialista"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Prenota la tua <strong>visita medica privata</strong> a {zonaFiltrata}.
          </p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Visite Specialistiche Private a Roma</h2>
          <p>
            Su <strong>ServiziSalute</strong> trovi i migliori professionisti sanitari per le tue <strong>visite specialistiche a Roma</strong>. 
            Che tu stia cercando un cardiologo, un dermatologo, un ortopedico o un ginecologo, il nostro portale ti aiuta 
            a trovare lo studio privato più vicino nei vari quartieri romani.
          </p>
          <p>
            Puoi confrontare i profili dei medici, verificare le loro aree di competenza e contattarli direttamente per fissare 
            un appuntamento senza lunghe liste d'attesa. Il portale è pensato per semplificare la ricerca del medico specialista 
            più adatto a te, garantendo trasparenza e professionalità in tutta la città di Roma.
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo selezionando nuovi medici specialisti per <strong>{cosaCercata || "salute e benessere"}</strong> a {zonaFiltrata}.
            <br />Torna a trovarci a breve per gli annunci aggiornati!
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Sei un medico? Pubblica il tuo profilo qui gratis
          </a>
        </div>
      </div>
    </div>
  );
}
