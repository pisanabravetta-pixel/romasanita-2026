import React from 'react';
import Head from 'next/head';
import { VISITE } from '../database';

export default function CardiologiRomaPrati() {
  // Filtriamo: deve essere in zona Prati e deve essere un Cardiologo
  const cardiologiPrati = VISITE.filter(v => 
    v.zona === "Prati" && 
    v.info.toLowerCase().includes("cardio")
  );

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>Cardiologo Roma Prati | Studi Specialistici</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/cardiologi-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Torna a Cardiologi Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a' }}>Cardiologo a Roma Prati</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>
          Professionisti e studi cardiologici selezionati nel quartiere Prati.
        </p>

        {cardiologiPrati.length > 0 ? (
          cardiologiPrati.map((c) => (
            <div key={c.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>{c.nome}</h3>
              <p style={{ margin: '5px 0' }}>📍 {c.indirizzo} (Prati)</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>🩺 Specializzazione: {c.info}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Contatta Studio
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #cbd5e1' }}>
            <p>Nessun cardiologo a Prati attualmente nel database.</p>
            <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold' }}>Sei un medico? Iscriviti qui</a>
          </div>
        )}

        {/* BOX DI NAVIGAZIONE ALTRE ZONE (Se in futuro ne aggiungi altre) */}
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Cerca in altre zone di Roma:</h4>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Al momento la lista completa è disponibile sulla <a href="/cardiologi-roma" style={{ color: '#2563eb' }}>pagina principale</a>.</p>
        </div>
      </div>
    </div>
  );
}
