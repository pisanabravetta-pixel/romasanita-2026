import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function DentistiRomaEur() {
  const [specialisti, setSpecialisti] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. MOTORE DINAMICO SUPABASE
  useEffect(() => {
    async function fetchDentistiEur() {
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('zona', 'Eur')
        .ilike('categoria', '%Dentisti%');

      if (!error && data) {
        setSpecialisti(data);
      }
      setLoading(false);
    }
    fetchDentistiEur();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>Dentista Roma EUR | Migliori Studi Odontoiatrici EUR</title>
        <meta name="description" content="Cerchi un dentista a Roma EUR? Trova i migliori studi odontoiatrici per pulizia denti, carie e impianti nella zona EUR. Contatta direttamente su WhatsApp." />
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
          <a href="/dentisti-roma" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>← Tutti i Dentisti Roma</a>
        </nav>

        {/* H1 SEO E TESTO INTRODUTTIVO */}
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Dentista a Roma EUR</h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
          Sei alla ricerca di un <strong>dentista a Roma EUR</strong>? In questa pagina trovi l'elenco aggiornato degli studi odontoiatrici nel quartiere EUR, specializzati in igiene dentale, implantologia, ortodonzia e pronto soccorso dentistico.
        </p>

        {/* LISTA RISULTATI DAL DATABASE */}
        {loading ? (
          <p>Ricerca dentisti all'EUR...</p>
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
                  <p style={{ margin: '0', fontSize: '15px', color: '#64748b' }}>📍 Indirizzo: <strong>{s.zona}</strong></p>
                  <p style={{ fontSize: '15px', color: '#334155', marginTop: '12px', lineHeight: '1.5' }}>{s.descrizione}</p>
                </div>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>ATTIVO</span>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Prenota Visita su WhatsApp
                </a>
              </div>
            </div>
          ))
        ) : (
          /* CASO SENZA ANNUNCI: CTA PER INSERZIONISTI */
          <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '15px', border: '2px dashed #cbd5e1' }}>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Attualmente non ci sono dentisti dell'EUR registrati.</p>
            <p style={{ fontWeight: 'bold', color: '#1e3a8a', marginTop: '10px' }}>Hai uno studio dentistico a Roma EUR?</p>
            <a href="/pubblica-annuncio" style={{ display: 'inline-block', marginTop: '15px', backgroundColor: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Inserisci il tuo Studio Gratis
            </a>
          </div>
        )}

        {/* MICRO-TESTO SEO QUARTIERE */}
        <div style={{ marginTop: '60px', padding: '30px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '15px' }}>Scegliere un dentista nel distretto EUR</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7' }}>
            Il quartiere EUR è un punto strategico per chi lavora e vive a Roma Sud. Gli studi dentistici della zona sono facilmente raggiungibili tramite la <strong>linea B della metropolitana (fermate EUR Fermi, Palasport e Magliana)</strong>. Grazie all'ampia disponibilità di parcheggi e ai moderni centri direzionali, l'EUR ospita alcune delle cliniche odontoiatriche più all'avanguardia della capitale.
          </p>
        </div>

        {/* FAQ SEO - MANTENUTE E MIGLIORATE */}
        <section style={{ marginTop: '30px', padding: '30px', background: 'white', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', color: '#1e3a8a', marginBottom: '20px' }}>Domande Frequenti</h2>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#334155' }}>Quanto costa una pulizia denti a Roma EUR?</h4>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>In zona EUR il prezzo medio per una pulizia professionale varia tra i 70€ e i 100€, a seconda dello studio scelto.</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#334155' }}>Ci sono dentisti aperti il sabato all'EUR?</h4>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Sì, diversi specialisti in zona EUR offrono disponibilità il sabato mattina per venire incontro alle esigenze dei lavoratori del quartiere.</p>
          </div>
        </section>
      </main>

      {/* FOOTER PROFESSIONALE */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '60px 20px', marginTop: '80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h4 style={{ color: '#3b82f6', marginBottom: '20px' }}>ServiziSalute Roma</h4>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>
            Portiamo la sanità di qualità nei quartieri di Roma. Contatto diretto e trasparente.
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #1e293b', paddingTop: '20px', fontSize: '12px', color: '#64748b' }}>
            © 2026 ServiziSalute Roma – Specialisti Zona EUR
          </div>
        </div>
      </footer>
    </div>
  );
}
