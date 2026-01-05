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
      
      {/* 1. BARRA DI NAVIGAZIONE */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* 2. INTESTAZIONE DINAMICA */}
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Dentista"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Trova i migliori studi odontoiatrici per <strong>{cosaCercata || "cure dentali"}</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        {/* 3. TESTO SEO PER GOOGLE (Fondamentale per lo Step 1) */}
        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Ricerca Dentisti e Studi Dentistici a Roma</h2>
          <p>
            Benvenuto su <strong>ServiziSalute</strong>, il portale dedicato alla salute dei cittadini romani. 
            Se stai cercando un <strong>dentista a Roma</strong>, sei nel posto giusto. La nostra piattaforma ti permette di individuare 
            facilmente studi dentistici specializzati in ogni quartiere, dalla zona di <strong>Prati</strong> all'<strong>EUR</strong>, 
            passando per <strong>San Giovanni</strong> e <strong>Roma Nord</strong>.
          </p>
          <p>
            Che tu abbia bisogno di una seduta di igiene orale, di un intervento di implantologia, ortodonzia o di una cura per le carie, 
            qui puoi trovare professionisti pronti ad aiutarti. Il nostro obiettivo è facilitare l'incontro tra pazienti e dentisti a Roma, 
            offrendo una vetrina chiara, gratuita e costantemente aggiornata con i contatti diretti dei migliori specialisti locali.
          </p>
        </section>

        {/* 4. BOX DI FIDUCIA */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Vantaggi del portale</h2>
          <ul style={{ paddingLeft: '20px', color: '#4b5563' }}>
            <li style={{ marginBottom: '10px' }}>Specialisti in <strong>{cosaCercata || "Odontoiatria"}</strong> selezionati.</li>
            <li style={{ marginBottom: '10px' }}>Copertura capillare nella zona di {zonaFiltrata} e in tutta Roma.</li>
            <li>Contatto diretto per preventivi e appuntamenti rapidi.</li>
          </ul>
        </div>

        {/* 5. MESSAGGIO DI ATTESA (Annunci in arrivo) */}
        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo verificando nuovi studi dentistici partner per <strong>{cosaCercata || "cure odontoiatriche"}</strong> a {zonaFiltrata}.
            <br />Torna a trovarci tra pochi giorni per visualizzare l'elenco completo!
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Sei un dentista? Pubblica qui il tuo studio gratis
          </a>
        </div>

        {/* 6. IL PONTE SEO PER LE ZONE */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #e2e8f0', paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', marginBottom: '15px' }}>Potrebbe interessarti anche:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="/dentisti-roma-prati" style={{ color: '#2563eb', textDecoration: 'none' }}>Dentisti Prati</a>
            <a href="/dentisti-roma-eur" style={{ color: '#2563eb', textDecoration: 'none' }}>Dentisti EUR</a>
            <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', textDecoration: 'none' }}>Dentisti San Giovanni</a>
          </div>
        </div>

      </div>
    </div>
  );
}
