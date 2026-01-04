import React from 'react';

export default function DentistiRoma() {
  const [zonaFiltrata, setZonaFiltrata] = React.useState("Roma");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const z = params.get('zona');
    if (z) setZonaFiltrata(z);
  }, []);
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header compatto */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Pubblica Gratis</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO - Fondamentale per scalare Google */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>I Migliori Dentisti a Roma</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova i professionisti odontoiatrici più qualificati a Roma: dalla pulizia dei denti all'implantologia avanzata.</p>

        {/* CONTENUTO SEO (Strategia Step 2) */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#f8fafc', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', color: '#2d3748', marginBottom: '15px' }}>Come trovare il dentista giusto a Roma</h2>
          <p>
            Scegliere un <strong>dentista a Roma</strong> richiede attenzione. La capitale offre una vasta gamma di studi odontoiatrici specializzati in diversi settori: dall'estetica dentale (sbiancamento e faccette) all'ortodonzia invisibile, fino alla chirurgia orale complessa. Che tu risieda a <strong>Prati, Roma Nord, Eur o nel Centro Storico</strong>, è importante affidarsi a centri che utilizzano tecnologie all'avanguardia.
          </p>
          <p>
            Su <strong>ServiziSalute</strong>, facilitiamo la tua ricerca catalogando i migliori studi per zona e specializzazione. Molti dei nostri inserzionisti offrono la <strong>prima visita di controllo gratuita</strong> e preventivi trasparenti per garantirti il miglior sorriso al giusto prezzo.
          </p>
        </div>

        {/* LISTA ANNUNCI DI ESEMPIO (Per non far sembrare la pagina vuota) */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Studi Dentistici in evidenza:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          
          {/* Annuncio 1 */}
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Centro Odontoiatrico Roma Nord</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Zona Prati / Delle Vittorie - Via della Giuliana</p>
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginRight: '5px' }}>IMPLANTOLOGIA</span>
                <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>PRIMA VISITA GRATIS</span>
              </div>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Vedi Telefono</button>
          </div>

          {/* Annuncio 2 */}
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Studio Dentistico Eur Wellness</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Roma Eur - Viale America</p>
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginRight: '5px' }}>ORTODONZIA</span>
                <span style={{ fontSize: '11px', background: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>URGENZE H24</span>
              </div>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Vedi Telefono</button>
          </div>

        </div>

        {/* CTA PER IL PROFESSIONISTA (Step 3) */}
        <div style={{ marginTop: '60px', textAlign: 'center', backgroundColor: '#1a365d', color: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(26,54,93,0.2)' }}>
          <h2 style={{ fontSize: '26px', marginBottom: '10px' }}>Sei un Dentista a Roma?</h2>
          <p style={{ fontSize: '16px', opacity: '0.9', marginBottom: '25px' }}>Unisciti ai +850 professionisti già presenti. Ricevi contatti diretti dai pazienti in zona.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: '#48bb78', color: '#fff', padding: '16px 35px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', transition: 'transform 0.2s' }}>
            Inserisci il tuo Studio Ora - È GRATIS
          </a>
        </div>
      </div>
    </div>
  );
}
