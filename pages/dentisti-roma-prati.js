import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function DentistiRomaPrati() {
  const [specialisti, setSpecialisti] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO: Pesca i dentisti a Prati dal Database reale
  useEffect(() => {
    async function fetchDentistiPrati() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('zona', 'Prati')
        .ilike('categoria', '%Dentisti%');

      if (!error && data) {
        setSpecialisti(data);
      }
      setLoading(false);
    }
    fetchDentistiPrati();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Dentista Roma Prati | Studi Odontoiatrici e Chirurgia Orale</title>
        <meta name="description" content="Cerchi un dentista a Roma Prati? Scopri i migliori studi dentistici per carie, impianti e igiene dentale nel quartiere Prati. Contatto diretto WhatsApp." />
      </Head>

      {/* HEADER E NAVIGAZIONE */}
      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/servizi-sanitari-roma" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Mappa Servizi</a>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/dentisti-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Tutti i Dentisti Roma</a>
        </nav>

        {/* H1 SEO E INTRODUZIONE QUARTIERE */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Dentista a Roma Prati</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Trova il tuo <strong>dentista di fiducia a Roma Prati</strong>. In questa pagina elenchiamo i professionisti e gli studi odontoiatrici specializzati in ortodonzia, estetica dentale e impianti nel cuore del quartiere Prati.
        </p>

        {/* LINK INCROCIATI PER SEO */}
        <div style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #e2e8f0', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b' }}>Cerca in altre zone:</span>
          <a href="/dentisti-roma-eur" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>EUR</a>
          <a href="/dentisti-roma-san-giovanni" style={{ color: '#2563eb', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>San Giovanni</a>
        </div>

        {/* LISTA ANNUNCI DAL DATABASE */}
        {loading ? (
          <p>Caricamento dentisti a Prati...</p>
        ) : specialisti.length > 0 ? (
          specialisti.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e3a8a', fontSize: '22px' }}>{s.nome}</h3>
                  <p style={{ margin: '0', fontSize: '15px', color: '#64748b' }}>📍 {s.zona} - Roma</p>
                  <p style={{ fontSize: '15px', color: '#334155', marginTop: '12px', lineHeight: '1.5' }}>{s.descrizione}</p>
                </div>
                <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>PRATI</span>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Contatta lo Studio (WhatsApp)
                </a>
              </div>
            </div>
          ))
        ) : (
          /* CTA PER INSERZIONISTI SE LA PAGINA È VUOTA */
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '2px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Nessun dentista di Prati ancora presente.</p>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginTop: '10px' }}>Hai uno studio odontoiatrico a Roma Prati?</p>
            <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Pubblica Gratis il tuo Studio
            </a>
          </div>
        )}

        {/* MICRO-TESTO SEO QUARTIERE (Punti di riferimento) */}
        <div style={{ marginTop: '60px', padding: '30px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Perché scegliere un dentista a Roma Prati</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7' }}>
            Il quartiere Prati è rinomato per l'alta concentrazione di studi medici d'eccellenza. Grazie alla sua posizione centrale, è facilmente accessibile tramite la <strong>Metro A (Lepanto e Ottaviano)</strong> e numerose linee di autobus che collegano Piazza Cavour e Via Cola di Rienzo. Scegliere un dentista a Prati significa affidarsi a professionisti che operano in una delle zone più eleganti e servite della Capitale.
          </p>
        </div>
      </main>

      {/* FOOTER PROFESSIONALE */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h4 style={{ color: '#3b82f6', marginBottom: '20px' }}>ServiziSalute Roma</h4>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>
            Connettiamo i cittadini di Roma con i migliori servizi sanitari di quartiere.
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #1e293b', paddingTop: '20px', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Specialisti Zona Prati
          </div>
        </div>
      </footer>
    </div>
  );
}
