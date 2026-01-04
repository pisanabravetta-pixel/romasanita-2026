import React from 'react';

export default function DentistiRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
      {/* Header compatto */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Pubblica Gratis</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO - Fondamentale per Google */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px' }}>I Migliori Dentisti a Roma</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova studi odontoiatrici specializzati, dentisti pediatrici e centri per l'implantologia nei principali quartieri di Roma.</p>

        {/* CONTENUTO SEO (300 parole per il ranking) */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#f8fafc', padding: '25px', borderRadius: '12px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', color: '#2d3748' }}>Come scegliere un dentista a Roma</h2>
          <p>
            Cercare un <strong>dentista a Roma</strong> può essere complesso data la vasta scelta. Che tu viva a <strong>Prati, Eur, Trastevere o Roma Nord</strong>, è fondamentale trovare un professionista che offra servizi di igiene dentale, sbiancamento, ortodonzia invisibile o chirurgia orale. Su ServiziSalute selezioniamo i professionisti più apprezzati della capitale per garantirti cure di qualità.
          </p>
          <p>
            Molti studi odontoiatrici romani offrono la <strong>prima visita gratuita</strong> e finanziamenti personalizzati. Ti consigliamo di controllare sempre la vicinanza alla tua zona e le specializzazioni dello studio, come l'odontoiatria infantile o l'implantologia a carico immediato.
          </p>
        </div>

        {/* ELENCO ANNUNCI (Esempi Reali per dare sostanza) */}
        <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>Studi Dentistici Disponibili:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Annuncio 1 */}
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb' }}>Studio Odontoiatrico Prati</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>📍 Roma Nord (Zona Prati) - Via Crescenzio</p>
              <span style={{ fontSize: '12px', background: '#ebf8ff', color: '#3182ce', padding: '2px 8px', borderRadius: '10px', marginTop: '5px', display: 'inline-block' }}>Specialista Implantologia</span>
            </div>
            <button style={{ border: '2px solid #48bb78', color: '#48bb78', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', background: '#fff' }}>Vedi Telefono</button>
          </div>

          {/* Annuncio 2 */}
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb' }}>Dentista H24 Roma Sud</h3>
              <p style={{ margin: 0, fontSize: '14px' }}>📍 Roma Eur - Viale Europa</p>
              <span style={{ fontSize: '12px', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '10px', marginTop: '5px', display: 'inline-block' }}>Urgenze Disponibili</span>
            </div>
            <button style={{ border: '2px solid #48bb78', color: '#48bb78', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', background: '#fff' }}>Vedi Telefono</button>
          </div>
        </div>

        {/* CTA PER IL PROFESSIONISTA (Il tuo STEP 3) */}
        <div style={{ marginTop: '60px', textAlign: 'center', backgroundColor: '#1a365d', color: '#fff', padding: '40px', borderRadius: '15px' }}>
          <h2 style={{ margin: 0 }}>Sei un dentista a Roma?</h2>
          <p style={{ opacity: '0.9' }}>Aumenta i tuoi pazienti. Pubblica il tuo studio oggi stesso.</p>
          <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: '#48bb78', color: '#fff', padding: '15px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', marginTop: '10px', fontSize: '18px' }}>
            Pubblica il tuo Profilo Gratis
          </a>
        </div>
      </div>
    </div>
  );
}
