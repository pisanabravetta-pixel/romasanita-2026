import React from 'react';

export default function VisiteSpecialisticheRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Sei un Medico?</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO - CATEGORIA MADRE */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Visite Specialistiche a Roma</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Prenota visite mediche specialistiche nei migliori studi privati e centri medici della Capitale.</p>

        {/* TESTO SEO CATEGORIA (Step 2) */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#f8fafc', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', color: '#2d3748', marginBottom: '15px' }}>I migliori medici specialisti a Roma</h2>
          <p>
            Trovare il giusto specialista a Roma non è sempre facile. Che tu abbia bisogno di un <strong>Dermatologo a Roma Nord, un Oculista in Centro o un Ginecologo all'Eur</strong>, il nostro portale ti permette di filtrare i professionisti per zona e specializzazione. La sanità privata romana offre eccellenze in ogni campo medico, garantendo tempi di attesa ridotti e visite approfondite.
          </p>
          <p>
            Su ServiziSalute puoi trovare: <strong>Cardiologi, Ortopedici, Endocrinologi, Urologi e Nutrizionisti</strong>. Ogni scheda professionale include la zona dello studio, i servizi offerti e i contatti diretti per prenotare il tuo appuntamento senza intermediari.
          </p>
        </div>

        {/* LISTA SPECIALIZZAZIONI RAPIDE */}
        <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '700' }}>Cerca per specializzazione:</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['Cardiologia', 'Dermatologia', 'Ginecologia', 'Ortopedia', 'Oculistica', 'Urologia', 'Pediatria'].map((spec) => (
                <span key={spec} style={{ background: '#e0e7ff', color: '#4338ca', padding: '8px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
                    {spec}
                </span>
            ))}
        </div>

        {/* LISTA ESEMPI ANNUNCI */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Medici disponibili ora:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Dr.ssa Elena Bianchi - Dermatologa</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Roma (Zona Quartiere Trieste) - Mappatura nei e acne</p>
