import React from 'react';

export default function DentistiRomaPrati() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Pubblica Gratis</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO LOCALE */}
        <h1 style={{ color: '#1a365d', fontSize: '30px', marginBottom: '10px', fontWeight: '800' }}>Dentisti a Roma Prati: Studi e Professionisti</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova i migliori studi odontoiatrici nel quartiere Prati, tra Via Cola di Rienzo e Musei Vaticani.</p>

        {/* TESTO SEO PER IL QUARTIERE */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#f0f7ff', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #d1e3f8' }}>
          <h2 style={{ fontSize: '20px', color: '#2d3748', marginBottom: '15px' }}>Perché scegliere un dentista in zona Prati</h2>
          <p>
            Il quartiere <strong>Prati</strong> è uno dei poli principali per la sanità privata a Roma. Cercare un <strong>dentista a Roma Prati</strong> significa avere accesso a studi storici e cliniche moderne facilmente raggiungibili con la <strong>Metro A (fermate Lepanto e Ottaviano)</strong>.
          </p>
          <p>
            Che tu stia cercando uno specialista in igiene dentale vicino a Piazza Cavour o un centro per l'ortodonzia invisibile vicino a Via Fabio Massimo, la zona offre soluzioni per ogni esigenza, spesso con disponibilità di appuntamenti anche in orari serali per chi lavora nei numerosi uffici del quartiere.
          </p>
        </div>

        {/* LISTA ANNUNCI LOCALIZZATI */}
        <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '700' }}>Dentisti disponibili a Prati:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '18px' }}>Studio Odontoiatrico Lepanto</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Via Marcantonio Colonna, Roma (Prati) - a 200m dalla Metro</p>
              <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>APERTO SABATO</span>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold' }}>Vedi Telefono</button>
          </div>

        </div>

        {/* CTA PER IL PROFESSIONISTA DI ZONA */}
        <div style={{ marginTop: '50px', textAlign: 'center', border: '2px dashed #cbd5e1', padding: '30px', borderRadius: '15px' }}>
          <h3 style={{ color: '#1a365d' }}>Sei un dentista con studio a Prati?</h3>
          <p>Fatti trovare dai pazienti del tuo quartiere. La pubblicazione è gratuita.</p>
          <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'underline' }}>Aggiungi il tuo studio su Roma Prati</a>
        </div>
      </div>
    </div>
  );
}
