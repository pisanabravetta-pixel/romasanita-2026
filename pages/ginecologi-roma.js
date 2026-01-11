import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';

export default function GinecologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('ginecologia', 'roma');

  const quartieriDoc = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"];
  
  const altreSpecialistiche = [
    { nome: "Dermatologi", url: "/dermatologi-roma" },
    { nome: "Cardiologi", url: "/cardiologi-roma" },
    { nome: "Ortopedici", url: "/ortopedici-roma" },
    { nome: "Psicologi", url: "/psicologi-roma" },
    { nome: "Nutrizionisti", url: "/nutrizionisti-roma" },
    { nome: "Dentisti", url: "/dentisti-roma" }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .or('categoria.ilike.%ginecologia%,categoria.ilike.%ostetricia%')
          .eq('approvato', true)
          .order('is_top', { ascending: false });
        
        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#fff1f2', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>Ginecologi a Roma – Visita Ginecologica e Ostetricia | ServiziSalute</title>
        <meta name="description" content="Trova i migliori ginecologi a Roma. Prenota visite ginecologiche, ecografie e pap-test nei principali quartieri della capitale con disponibilità immediata." />
        {schemas && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
          </>
        )}
      </Head>

      {/* BARRA SUPERIORE TESTO IN GRASSETTO */}
      <div style={{ backgroundColor: '#db2777', color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🌸 GINECOLOGIA E OSTETRICIA A ROMA – GENNAIO 2026
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        {/* LINK PER TORNARE A TUTTE LE SPECIALISTICHE */}
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', marginBottom: '20px', color: '#db2777', textDecoration: 'none', fontWeight: '600' }}>← Tutte le Specialistiche</a>

        {/* DIV CON TITOLO H1, DESCRIZIONE E QUARTIERI */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: '8px solid #db2777', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#831843', fontSize: '32px', fontWeight: '800', margin: '0 0 10px 0' }}>Ginecologi a Roma</h1>
          <p style={{ lineHeight: '1.6', fontSize: '16px', color: '#4b5563' }}>
            Trova le migliori <strong>ginecologhe e ginecologi a Roma</strong>. In questa pagina puoi consultare i profili dei professionisti per visite di controllo, pap-test, ecografie pelviche e assistenza alla gravidanza nei principali quartieri della Capitale.
          </p>
          
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #fce7f3' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#6b7280', display: 'block', marginBottom: '10px' }}>CERCA PER QUARTIERE:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quartieriDoc.map(q => (
                <a key={q} href={`/ginecologi-roma-${q.toLowerCase()}`} style={{ fontSize: '13px', backgroundColor: '#fff1f2', color: '#db2777', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #fecaca', fontWeight: '600' }}>
                  {q}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LISTA DERMATOLOGI DISPONIBILI */}
        <h2 style={{ color: '#831843', marginBottom: '20px', fontSize: '22px' }}>Specialisti disponibili</h2>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Caricamento medici...</p>
        ) : medici.length > 0 ? (
          medici.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? '3px solid #db2777' : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ color: '#831843', margin: 0, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#fdf2f8', color: '#db2777', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#db2777', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p>Nessun ginecologo trovato. Stiamo aggiornando le disponibilità.</p>
            <a href="/pubblica-annuncio" style={{ color: '#db2777', fontWeight: 'bold' }}>Sei un ginecologo? Registrati ora</a>
          </div>
        )}

        {/* SEZIONE ALTRE SPECIALISTICHE (CROSS-LINKING) */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #db2777' }}>
          <h4 style={{ color: '#831843', marginBottom: '15px', fontSize: '18px' }}>Altre Specialistiche a Roma</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            {altreSpecialistiche.map(s => (
              <a key={s.nome} href={s.url} style={{ color: '#db2777', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>• {s.nome}</a>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section style={{ marginTop: '30px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
          <h3 style={{ color: '#831843', fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Domande Frequenti (FAQ)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quanto costa una visita ginecologica a Roma?</p>
              <p style={{ color: '#64748b' }}>Il costo medio per una visita con ecografia varia tra i 100€ e i 180€ negli studi privati della capitale.</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Ogni quanto fare il Pap Test?</p>
              <p style={{ color: '#64748b' }}>Solitamente è consigliato ogni 1-3 anni a seconda dell'età e dello storico medico della paziente.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER INTEGRALE DELLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
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
