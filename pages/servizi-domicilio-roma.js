import React from 'react';

export default function ServiziDomicilioRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Offri Servizio</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Servizi Sanitari a Domicilio a Roma</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Assistenza infermieristica, fisioterapia e visite mediche direttamente a casa tua, in ogni quartiere di Roma.</p>

        {/* TESTO SEO CATEGORIA */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#fffaf0', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #feebc8' }}>
          <h2 style={{ fontSize: '22px', color: '#dd6b20', marginBottom: '15px' }}>Assistenza Medica e Infermieristica a Casa</h2>
          <p>
            Il servizio di <strong>assistenza a domicilio a Roma</strong> è una risorsa preziosa per anziani, persone con disabilità o chiunque abbia difficoltà a raggiungere una struttura sanitaria. Copriamo l'intero territorio comunale: dal <strong>Centro Storico al Grande Raccordo Anulare</strong>, includendo zone come <strong>Ostia, Acilia, Bufalotta e San Giovanni</strong>.
          </p>
          <p>
            Puoi trovare professionisti per: <strong>prelievi del sangue a domicilio, iniezioni, medicazioni post-operatorie, fisioterapia riabilitativa e assistenza anziani</strong>. I nostri inserzionisti sono infermieri certificati e medici pronti a intervenire con rapidità e professionalità nel comfort della tua abitazione.
          </p>
        </div>

        {/* LISTA ESEMPI */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Professionisti disponibili a domicilio:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Infermiere Professionale h24</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Copertura: Roma Centro, Prati, Parioli</p>
              <span style={{ fontSize: '11px', background: '#feebc8', color: '#dd6b20', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>PRELIEVI E INIEZIONI</span>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Contatta Subito</button>
          </div>
        </div>

        {/* CTA PER PROFESSIONISTI (Step 3) */}
        <div style={{ marginTop: '60px', textAlign: 'center', backgroundColor: '#dd6b20', color: '#fff', padding: '40px', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '26px' }}>Offri assistenza a domicilio a Roma?</h2>
          <p style={{ opacity: '0.9', marginBottom: '25px' }}>Aiuta le persone del tuo quartiere. Inserisci il tuo profilo professionale e ricevi chiamate dirette.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#dd6b20', padding: '16px 35px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
            Inizia a Lavorare Gratis
          </a>
        </div>
      </div>
    </div>
  );
}
