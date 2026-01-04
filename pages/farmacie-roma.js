import React from 'react';

export default function FarmacieRoma() {
  const [zonaFiltrata, setZonaFiltrata] = React.useState("Roma");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const z = params.get('zona');
    if (z && z !== "Tutta Roma") {
      setZonaFiltrata(z);
    } else {
      setZonaFiltrata("Roma");
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>
          Farmacie a {zonaFiltrata}
        </h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova le farmacie aperte e i servizi sanitari di primo livello a {zonaFiltrata}.</p>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Farmacia Centrale {zonaFiltrata}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Posizione esatta in {zonaFiltrata}</p>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Sempre Aperta</button>
          </div>
        </div>
      </div>
    </div>
  );
}
