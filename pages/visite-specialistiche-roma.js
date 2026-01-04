import React from 'react';

export default function VisiteSpecialisticheRoma() {
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
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Sei un Medico?</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>
          Visite Specialistiche a {zonaFiltrata}
        </h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Prenota visite mediche specialistiche a {zonaFiltrata} nei migliori studi privati.</p>

        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#f8fafc', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', color: '#2d3748', marginBottom: '15px' }}>I migliori specialisti a {zonaFiltrata}</h2>
          <p>Trovare il giusto specialista a <strong>{zonaFiltrata}</strong> è oggi più semplice. Che tu cerchi un dermatologo, un cardiologo o un oculista, la nostra rete copre capillarmente tutta la zona di {zonaFiltrata}.</p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Dr.ssa Elena Bianchi - Dermatologa</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Disponibile a {zonaFiltrata} e zone limitrofe</p>
            </div>
            <a href="tel:061234567" style={{ backgroundColor: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama Ora</a>
          </div>
        </div>
      </div>
    </div>
  );
}
