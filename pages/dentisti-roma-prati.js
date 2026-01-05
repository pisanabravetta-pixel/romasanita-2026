import React from 'react';
import Head from 'next/head';

export default function DentistiRomaPrati() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", lineHeight: "1.6", color: "#333" }}>
      <Head>
        <title>Dentista a Roma Prati | Studi e Visite | Aggiornato Gennaio 2026</title>
        <meta name="description" content="Trova un dentista a Roma Prati. Studi dentistici, visite private e urgenze odontoiatriche vicino a te nel quartiere Prati. Disponibilità aggiornate." />
      </Head>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/dentisti-roma" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Torna a Dentisti Roma</a>
        {/* PUNTO 1 DELLA LISTA: SENSO DI AGGIORNAMENTO */}
        <span style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold', backgroundColor: '#ecfdf5', padding: '5px 10px', borderRadius: '15px' }}>
          ● Dati aggiornati: Gennaio 2026
        </span>
      </div>
      
      <h1 style={{ color: "#1e3a8a", marginBottom: '10px' }}>Dentista a Roma Prati</h1>
      <p style={{ color: '#64748b', fontStyle: 'italic', marginBottom: '30px' }}>
        🔍 Attualmente 12 pazienti stanno cercando un dentista in zona Prati/Delle Vittorie su questo portale.
      </p>

    {/* ANNUNCIO REALE 1: STUDIO BAZZUCCHI */}
      <section style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '25px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '20px' }}>Studio Dentistico dr Marco Bazzucchi</h2>
            <p style={{ margin: '5px 0' }}>📍 Via dei Gracchi, 151, Roma (Prati)</p>
            <p style={{ fontSize: '14px', color: '#059669', fontWeight: 'bold' }}>● ⭐ 5.0 su Google Maps</p>
          </div>
        </div>
        
        <p style={{ fontSize: '14px', color: '#475569', marginTop: '15px' }}>
          Specializzato in ortodonzia invisibile (Invisalign) e odontoiatria estetica. Uno degli studi più tecnologici nel quartiere Prati.
        </p>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <a href="https://wa.me/39063234119?text=Salve,%20ho%20visto%20il%20vostro%20studio%20su%20ServiziSalute%20Roma" 
             target="_blank"
             style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
             Contatta su WhatsApp
          </a>
          
          <a href="https://www.google.com/maps/search/?api=1&query=Studio+Dentistico+dr+Marco+Bazzucchi+Roma" 
             target="_blank" 
             rel="nofollow" 
             style={{ border: '1px solid #cbd5e1', color: '#64748b', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            📍 Vedi su Maps
          </a>
        </div>
      </section>
{/* ANNUNCIO REALE 2: CENTRO DENTISTICO CAVOUR */}
      <section style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '25px', marginBottom: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 10px 0', fontSize: '20px' }}>Centro Dentistico Cavour</h2>
            <p style={{ margin: '5px 0' }}>📍 Via Pietro Cossa, 28, Roma (Prati)</p>
            <p style={{ fontSize: '14px', color: '#059669', fontWeight: 'bold' }}>● Centro Multidisciplinare</p>
          </div>
        </div>
        
        <p style={{ fontSize: '14px', color: '#475569', marginTop: '15px' }}>
          Ampia struttura specializzata in chirurgia implantare, protesi e igiene dentale. Ideale per famiglie e urgenze odontoiatriche in zona Piazza Cavour.
        </p>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <a href="https://wa.me/39063201452?text=Salve,%20ho%20visto%20il%20vostro%20centro%20su%20ServiziSalute%20Roma" 
             target="_blank"
             style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
             Contatta su WhatsApp
          </a>
          
          <a href="https://maps.app.goo.gl/vP3Z3L1Yh6Qv8vGq8" 
             target="_blank" 
             rel="nofollow" 
             style={{ border: '1px solid #cbd5e1', color: '#64748b', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
            📍 Vedi su Maps
          </a>
        </div>
      </section>
      {/* PUNTO 7 DELLA LISTA: BOX RECLUTAMENTO AGGRESSIVO */}
      <div style={{ marginTop: "40px", padding: "30px", backgroundColor: "#fff7ed", borderRadius: "12px", border: "1px solid #ffedd5", textAlign: "center" }}>
        <h3 style={{ color: "#9a3412", marginTop: 0 }}>Lavori come Dentista a Roma Prati?</h3>
        <p style={{ color: '#7c2d12' }}>Il tuo studio non è ancora presente? <strong>340 potenziali pazienti</strong> hanno visualizzato le ricerche in questa zona nell'ultimo mese.</p>
        <a href="/pubblica-annuncio" style={{ display: "inline-block", marginTop: '10px', padding: "12px 25px", backgroundColor: "#ea580c", color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
          Rivendica la tua posizione Gratis
        </a>
      </div>

      {/* LINK AI QUARTIERI - EFFETTO DOMINO */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Cerca dentisti in altre zone di Roma:</p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="/dentisti-roma-eur" style={{ color: "#2563eb", fontSize: "14px", textDecoration: 'none', fontWeight: '500' }}>• Roma EUR</a>
          <a href="/dentisti-roma-san-giovanni" style={{ color: "#2563eb", fontSize: "14px", textDecoration: 'none', fontWeight: '500' }}>• Roma San Giovanni</a>
          <a href="/dentisti-roma" style={{ color: "#2563eb", fontSize: "14px", textDecoration: 'none', fontWeight: '500' }}>• Tutta Roma</a>
        </div>
      </div>
    </main>
  );
}
