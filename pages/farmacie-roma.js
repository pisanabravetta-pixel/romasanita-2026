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
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '50px' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', textTransform: 'capitalize', marginBottom: '10px' }}>
            {cosaCercata || "Farmacia"} a {zonaFiltrata}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>
            Trova le migliori <strong>farmacie e parafarmacie</strong> in zona {zonaFiltrata}.
          </p>
        </header>

        <section style={{ marginBottom: '40px', lineHeight: '1.8', color: '#4b5563' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Farmacie a Roma: Servizi e Turni</h2>
          <p>
            Su <strong>ServiziSalute</strong> puoi trovare rapidamente una <strong>farmacia a Roma</strong> vicina alla tua posizione. 
            Il nostro portale raccoglie i riferimenti delle farmacie di quartiere che offrono servizi essenziali come la misurazione della pressione, 
            test diagnostici rapidi, ECG, Holter pressorio e consulenze farmacologiche personalizzate.
          </p>
          <p>
            Che tu sia alla ricerca di una farmacia a <strong>Roma Prati</strong>, all'<strong>EUR</strong> o in zona <strong>San Giovanni</strong>, 
            qui potrai trovare i recapiti e i servizi offerti da ogni struttura sanitaria locale. Facilitiamo la ricerca di farmaci, integratori e servizi sanitari di prossimità per tutti i cittadini romani.
          </p>
        </section>

        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px', border: '2px dashed #cbd5e1', borderRadius: '12px', backgroundColor: '#fff' }}>
          <p style={{ color: '#64748b' }}>
            Stiamo aggiornando l'elenco delle farmacie partner per <strong>{cosaCercata || "servizi farmaceutici"}</strong> a {zonaFiltrata}.
            <br />Torna presto per consultare la lista completa degli annunci!
          </p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '20px', color: '#2563eb', fontWeight: 'bold' }}>
            Sei una Farmacia? Pubblica qui il tuo profilo gratis
          </a>
        </div>
      </div>
    </div>
  );
}
