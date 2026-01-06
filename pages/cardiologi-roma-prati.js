import React from 'react';
import Head from 'next/head';
import { VISITE } from '../database';

export default function CardiologiRomaPrati() {
  // Automazione: Filtriamo per zona Prati e per parola chiave "cardio"
  const cardiologiPrati = VISITE.filter(v => 
    v.zona === "Prati" && 
    v.info.toLowerCase().includes("cardio")
  );

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Cardiologo Roma Prati | Studi Specialistici Cardiologia</title>
        <meta name="description" content="Trova i migliori specialisti in cardiologia a Roma Prati. Visite cardiologiche, ECG e controllo pressione nel quartiere Prati." />
      </Head>

      {/* HEADER */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#0070f3', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/cardiologi-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna a Cardiologi Roma</a>
        </nav>

        <h1 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '10px' }}>Cardiologo a Roma Prati</h1>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>
          Professionisti e studi cardiologici selezionati nel quartiere Prati.
        </p>

        {/* LISTA RISULTATI */}
        {cardiologiPrati.length > 0 ? (
          cardiologiPrati.map((c) => (
            <div key={c.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '20px' }}>{c.nome}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>📍 {c.indirizzo} (Prati)</p>
                  <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: 'bold', marginTop: '10px' }}>🩺 {c.info}</p>
                </div>
                <span style={{ backgroundColor: '#f0f9ff', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>SPECIALISTA</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href="https://wa.me/39" style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  WhatsApp
                </a>
                <a href="tel:061234567" style={{ flex: 1, textAlign: 'center', border: '1px solid #e2e8f0', color: '#1e3a8a', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Chiama Studio
                </a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b' }}>Nessun cardiologo a Prati attualmente nel database.</p>
            <a href="/pubblica-annuncio" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Sei un medico? Iscriviti qui gratis</a>
          </div>
        )}

        {/* BOX DI NAVIGAZIONE */}
        <div style={{ marginTop: '50px', padding: '25px', backgroundColor: '#eff6ff', borderRadius: '15px', border: '1px solid #dbeafe' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1e3a8a' }}>Cerca cardiologi in altre zone:</h4>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
            Stiamo aggiornando la lista degli specialisti. Puoi consultare l'elenco completo sulla <a href="/cardiologi-roma" style={{ color: '#2563eb', fontWeight: 'bold' }}>pagina principale dei cardiologi a Roma</a>.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '40px 20px', textAlign: 'center', marginTop: '60px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 ServiziSalute Roma - Specialisti Prati</p>
      </footer>
    </div>
  );
}
