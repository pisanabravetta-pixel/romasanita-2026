import React, { useState, useEffect } from 'react';

export default function ServiziDomicilioRoma() {
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
            {cosaCercata || "Servizio Domiciliare"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Infermieri, fisioterapisti e <strong>assistenza a domicilio</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Assistenza Sanitaria e Infermieristica a Domicilio a Roma</h2>
          <p>
            Hai bisogno di assistenza professionale direttamente a casa? <strong>ServiziSalute</strong> ti aiuta a trovare i migliori 
            <strong>servizi a domicilio a Roma</strong>. Mettiamo in contatto cittadini con infermieri, fisioterapisti e operatori sanitari 
            qualificati pronti a intervenire presso la tua abitazione.
          </p>
          <p>
            Dalle medicazioni post-operatorie alle sedute di fisioterapia riabilitativa, copriamo ogni zona di Roma per garantirti 
            cure rapide e professionali senza doverti spostare. Cerca i servizi disponibili nel tuo quartiere e contatta 
            immediatamente il professionista più adatto alle tue esigenze assistenziali.
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo selezionando nuovi professionisti per <strong>{cosaCercata || "assistenza domiciliare"}</strong> a {zonaFiltrata}.
            <br />A breve l'elenco dei servizi sarà disponibile!
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Offri servizi a domicilio? Pubblica qui gratuitamente
          </a>
        </div>

        {/* --- INIZIO DISCLAIMER OBBLIGATORIO --- */}
        <div style={{ 
          marginTop: '50px', 
          padding: '20px', 
          backgroundColor: '#f1f5f9', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0' 
        }}>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>
            <strong>Nota Legale:</strong> ServiziSalute è una piattaforma informativa di annunci. 
            Non fornisce consulenze mediche e non sostituisce il rapporto diretto tra paziente e professionista sanitario. 
            Le informazioni pubblicate sono fornite dagli inserzionisti.
          </p>
        </div>
        {/* --- FINE DISCLAIMER OBBLIGATORIO --- */}

      </div>
    </div>
  );
}
