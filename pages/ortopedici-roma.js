import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function OrtopediciRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('ortopedia', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const altreSpecialistiche = [
    { nome: "Dermatologi", url: "/dermatologi-roma" },
    { nome: "Cardiologi", url: "/cardiologi-roma" },
    { nome: "Ginecologi", url: "/ginecologi-roma" },
    { nome: "Oculisti", url: "/oculisti-roma" },
    { nome: "Psicologi", url: "/psicologi-roma" },
    { nome: "Nutrizionisti", url: "/nutrizionisti-roma" }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const queryBusca = getDBQuery('ortopedia'); 
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .ilike('categoria', `%${queryBusca.cat}%`)
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch ortopedici:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Ortopedici a Roma – Visita Ortopedica e Traumatologia | ServiziSalute</title>
        <meta name="description" content="Trova i migliori ortopedici a Roma. Specialisti in chirurgia del ginocchio, anca, colonna vertebrale e traumatologia sportiva nei quartieri di Roma." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#1e40af', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🦴 ORTOPEDICI E TRAUMATOLOGI A ROMA – GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#1e40af', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        {/* HEADER HUB */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #1e40af', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', fontWeight: '800', margin: '0 0 10px 0' }}>Ortopedici a Roma</h1>
          <p style={{ lineHeight: '1.6', fontSize: '16px', color: '#4b5563' }}>
            Recupera la tua mobilità. Consulta i profili dei migliori <strong>ortopedici a Roma</strong> esperti in traumatologia, chirurgia protesica (anca e ginocchio), problemi della colonna vertebrale e medicina sportiva.
          </p>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/ortopedici-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#eff6ff', color: '#1e40af', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #bfdbfe', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        <h2 style={{ color: '#1e3a8a', marginBottom: '20px', fontSize: '22px' }}>Specialisti disponibili ora</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento medici...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #1e40af' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ color: '#1e3a8a', margin: 0, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                    <p style={{ fontSize: '17px', margin: '8px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                </div>
                {v.is_top && <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>

              {/* BADGE SPECIALISTICI */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                <span style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #bfdbfe' }}>🦴 PROTESI ANCA/GINOCCHIO</span>
                <span style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #bfdbfe' }}>🏃 MEDICINA SPORTIVA</span>
                <span style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', border: '1px solid #bfdbfe' }}>🏛️ COLONNA VERTEBRALE</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#1e40af', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Prenota Visita</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>Nessun ortopedico trovato.</div>
        )}

        {/* ALTRE SPECIALISTICHE */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #1e40af' }}>
          <h4 style={{ color: '#1e3a8a', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#1e40af', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome} a Roma</a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '30px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Domande Frequenti</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quando rivolgersi a un ortopedico?</p>
              <p style={{ color: '#64748b' }}>In caso di dolori articolari persistenti, traumi sportivi, limitazioni nel movimento o sospette patologie degenerative come l'artrosi.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quanto costa una visita ortopedica a Roma?</p>
              <p style={{ color: '#64748b' }}>Le tariffe medie a Roma variano tra i 90€ e i 160€, a seconda dell'esperienza del chirurgo e del centro specialistico.</p>
            </div>
          </div>
        </section>

        {/* CTA PROFESSIONISTI */}
        <section style={{ backgroundColor: '#ffffff', padding: '50px 30px', borderRadius: '32px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', marginBottom: '50px' }}>
          <h2 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '800', marginBottom: '15px' }}>Sei un ortopedico a Roma?</h2>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto 30px' }}>Raggiungi nuovi pazienti nella capitale. Posiziona il tuo studio in cima ai risultati del tuo quartiere.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pubblica-annuncio" style={{ backgroundColor: '#10b981', color: 'white', padding: '18px 35px', borderRadius: '16px', fontWeight: 'bold', textDecoration: 'none' }}>🚀 Inizia ora</a>
          </div>
        </section>
      </main>

      {/* FOOTER INTEGRALE */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>Portale di riferimento per la sanità privata a Roma.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Aggiornato: Gennaio 2026</p>
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
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>⚠️ ATTENZIONE: Richieste di ortopedici e fisioterapisti in forte aumento a Roma Nord ed Eur.</p>
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
