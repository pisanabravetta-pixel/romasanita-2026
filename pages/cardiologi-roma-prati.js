import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function CardiologiRomaPrati() {
  const [specialisti, setSpecialisti] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO SUPABASE
  useEffect(() => {
    async function fetchCardiologi() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('zona', 'Prati')
        .ilike('categoria', '%Visite Specialistiche%') // Filtra per la categoria corretta
        .ilike('descrizione', '%cardio%'); // Cerca la parola chiave cardiologia

      if (!error && data) {
        setSpecialisti(data);
      }
      setLoading(false);
    }
    fetchCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Cardiologo Roma Prati | Studi Specialistici Cardiologia</title>
        <meta name="description" content="Cerchi un cardiologo a Roma Prati? Trova i migliori specialisti per visite cardiologiche, ECG e controllo pressione nel quartiere Prati." />
      </Head>

      {/* HEADER E LINK DI RICHIAMO */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        </nav>

        {/* H1 SEO E TESTO INTRODUTTIVO */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Cardiologo a Roma Prati</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Se cerchi un <strong>cardiologo a Roma Prati</strong>, in questa pagina trovi i migliori studi specialistici e professionisti sanitari operanti nella zona. Consulta gli annunci, verifica le disponibilità e contatta direttamente lo specialista per visite cardiologiche, ECG o Holter.
        </p>

        {/* LISTA RISULTATI DAL DATABASE */}
        {loading ? (
          <p>Caricamento specialisti...</p>
        ) : specialisti.length > 0 ? (
          specialisti.map((c) => (
            <div key={c.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{c.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#64748b' }}>📍 Zona: <strong>{c.zona}</strong></p>
                  <p style={{ fontSize: '15px', color: '#334155', marginTop: '12px', lineHeight: '1.5' }}>{c.descrizione}</p>
                </div>
                <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>CARDIOLOGIA</span>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Contatta su WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          /* CASO SENZA ANNUNCI: CTA PER INSERZIONISTI */
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '2px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Nessun cardiologo a Prati ha ancora pubblicato il suo annuncio.</p>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a' }}>Sei un medico o hai uno studio a Roma Prati?</p>
            <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Pubblica il tuo servizio Gratis
            </a>
          </div>
        )}

        {/* MICRO-TESTO SEO QUARTIERE */}
        <div style={{ marginTop: '60px', padding: '30px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Servizi Sanitari nel Quartiere Prati</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7' }}>
            Il quartiere Prati è uno dei poli medici principali del centro di Roma. Grazie alla vicinanza con le fermate della <strong>Metro A (Ottaviano e Lepanto)</strong>, gli studi cardiologici in questa zona sono facilmente raggiungibili da ogni parte della città. Oltre alle visite cardiologiche specialistiche, la zona offre numerose farmacie e centri di analisi cliniche d'eccellenza.
          </p>
        </div>
      </main>

      {/* FOOTER PROFESSIONALE */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h4 style={{ color: '#3b82f6', marginBottom: '20px' }}>ServiziSalute Roma</h4>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
            Il punto di riferimento per la sanità locale a Roma. Trova lo specialista più vicino a te, senza costi di intermediazione.
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #1e293b', paddingTop: '20px', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Sanità di Prossimità
          </div>
        </div>
      </footer>
    </div>
  );
}
