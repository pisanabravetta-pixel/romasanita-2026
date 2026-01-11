import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('cardiologia', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const altreSpecialistiche = [
    { nome: "Dermatologi", url: "/dermatologi-roma" },
    { nome: "Ginecologi", url: "/ginecologi-roma" },
    { nome: "Ortopedici", url: "/ortopedici-roma" },
    { nome: "Psicologi", url: "/psicologi-roma" },
    { nome: "Nutrizionisti", url: "/nutrizionisti-roma" },
    { nome: "Dentisti", url: "/dentisti-roma" }
  ];

  useEffect(() => {
    async function fetchCardiologi() {
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .or('categoria.ilike.%cardiologia%,categoria.ilike.%cardiologo%')
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch cardiologi:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCardiologi();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#fef2f2', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Cardiologi a Roma – Visita Cardiologica ed Ecocardiogramma | ServiziSalute</title>
        <meta name="description" content="Cerchi un cardiologo a Roma? Trova i migliori specialisti per visite cardiologiche, ECG ed ecocardiogrammi nei principali quartieri della Capitale." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        ❤️ SPECIALISTI IN CARDIOLOGIA A ROMA – PREVENZIONE E CURA 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        {/* LINK TORNA A TUTTE LE SPECIALISTICHE */}
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#dc2626', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        {/* HEADER HUB */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #dc2626', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#991b1b', fontSize: '32px', fontWeight: '800', margin: '0 0 10px 0' }}>Cardiologi a Roma</h1>
          <p style={{ lineHeight: '1.6', fontSize: '16px', color: '#4b5563' }}>
            Trova i migliori <strong>cardiologi a Roma</strong> per il monitoraggio della tua salute cardiovascolare. Prenota subito una visita cardiologica, un ECG o un ecocardiogramma nei principali quartieri della Capitale.
          </p>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #fee2e2' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#6b7280', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/cardiologi-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#fef2f2', color: '#dc2626', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #fecaca', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LISTA MEDICI */}
        <h2 style={{ color: '#991b1b', marginBottom: '20px', fontSize: '22px' }}>Specialisti disponibili oggi</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Caricamento specialisti...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #dc2626' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ color: '#991b1b', margin: 0, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                    <p style={{ fontSize: '17px', margin: '8px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>

              {/* 🔹 BADGE CARDIOLOGIA */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fef2f2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>📉 ECG</span>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fef2f2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>💓 ECOCARDIOGRAMMA</span>
                <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#fef2f2', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', border: '1px solid #fecaca' }}>🕒 HOLTER PRESSORIO</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#dc2626', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama Ora</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun cardiologo trovato.</div>
        )}

        {/* CROSS-LINKING */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #dc2626' }}>
          <h4 style={{ color: '#991b1b', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#dc2626', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome} a Roma</a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '30px' }}>
          <h3 style={{ color: '#991b1b', fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quanto costa una visita cardiologica a Roma?</p>
              <p style={{ color: '#64748b' }}>Il prezzo medio varia tra gli 80€ e i 150€ a seconda degli esami inclusi come ECG o Ecocardiogramma.</p>
            </div>
          </div>
        </section>

        {/* CTA PROFESSIONISTI */}
        <section style={{ backgroundColor: '#ffffff', padding: '50px 30px', borderRadius: '32px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', marginBottom: '50px' }}>
          <h2 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '800', marginBottom: '15px' }}>Sei un cardiologo a Roma?</h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px' }}>Aumenta la tua visibilità locale e ricevi contatti diretti dai pazienti del tuo quartiere.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '18px 35px', borderRadius: '16px', fontWeight: 'bold', textDecoration: 'none' }}>🚀 Pubblica il tuo profilo</a>
          </div>
        </section>
      </main>

      {/* FOOTER INTEGRALE */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>⚠️ ATTENZIONE: Richieste di specialisti in forte aumento a Roma Centro, Eur e Prati.</p>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
