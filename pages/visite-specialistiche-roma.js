import React from 'react';

export default function VisiteSpecialisticheRoma() {
  const [zonaFiltrata, setZonaFiltrata] = React.useState("Roma");
  const [cosaCercata, setCosaCercata] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const z = params.get('zona');
    const c = params.get('cerca'); // Legge "ginecologo"
    
    if (z && z !== "Tutta Roma") setZonaFiltrata(z);
    if (c) setCosaCercata(c);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* TITOLO DINAMICO E POTENTE */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800', textTransform: 'capitalize' }}>
          {cosaCercata ? cosaCercata : "Visite Specialistiche"} a {zonaFiltrata}
        </h1>
        
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>
          Migliori professionisti per <strong>{cosaCercata || "visite mediche"}</strong> in zona {zonaFiltrata}.
        </p>

        <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <p style={{ margin: 0 }}>
            📍 Stai visualizzando i risultati per <strong>{cosaCercata}</strong> nel quartiere <strong>{zonaFiltrata}</strong>. 
            Contatta direttamente lo studio per prenotare un appuntamento.
          </p>
        </div>

        {/* Qui sotto andranno i medici veri */}
        <div style={{ marginTop: '30px' }}>
             <h2 style={{ fontSize: '20px' }}>Specialisti disponibili:</h2>
             <p style={{ color: '#64748b' }}>Nessun medico ha ancora pubblicato un annuncio specifico per "{cosaCercata}". Sei un medico? <a href="/pubblica-annuncio">Pubblica ora</a></p>
        </div>
      </div>
    </div>
  );
}
