import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getSchemas, getDBQuery } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "" });
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        // 1. Logica Tema
        const isFarmacia = catSlug.includes('farmac');
        const nomeCat = isFarmacia ? "Farmacie" : "Dentisti";
        const primario = isFarmacia ? "#059669" : "#2563eb";
        const chiaro = isFarmacia ? "#ecfdf5" : "#eff6ff";
        
        setTema({ primario, chiaro, label: nomeCat.toUpperCase() });

        // 2. Logica Meta Titoli
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
        const zonaSenzaRoma = zonaBella.toLowerCase() === 'roma' ? '' : ` ${zonaBella}`;
        const titoloCorretto = `${nomeCat} a Roma${zonaSenzaRoma}`;

        setMeta({ titolo: titoloCorretto, zona: zonaBella, cat: catSlug });

        // 3. Query Supabase (Filtro elastico per zona)
        const filtri = getDBQuery(catSlug);
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('zona', `%${zonaSlug}%`) 
          .or(`specialista.ilike.%${filtri.spec}%,categoria.ilike.%${filtri.cat}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);

      } catch (err) { 
        console.error("Errore Fetch:", err);
        setServizi([]); 
      } finally { 
        setLoading(false); 
      }
    }

    fetchDati();
  }, [slug]);

  // 4. Preparazione Schemi SEO (Solo se abbiamo i dati minimi)
  const indirizzoSchema = servizi.length > 0 ? servizi[0].indirizzo : "Roma";
  const schemas = getSchemas(meta.cat || 'servizi', meta.zona || 'Roma', indirizzoSchema);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute</title>
        {schemas?.medical && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        )}
        {schemas?.faq && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
        )}
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0', fontWeight: '800' }}>{meta.titolo}</h1>
          
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
              <a href="#lista" style={{ color: tema.primario, fontWeight: '600', textDecoration: 'none' }}>↓ Vedi Annunci</a>
              <a href="#faq" style={{ color: tema.primario, fontWeight: '600', textDecoration: 'none' }}>↓ Domande Frequenti</a>
            </div>
            
            <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '10px', marginTop: '5px', fontSize: '13px', color: '#64748b' }}>
              Esplora anche: 
              <a href={`/${meta.cat}-roma`} style={{ marginLeft: '8px', color: tema.primario, textDecoration: 'underline' }}>
                Tutti i {meta.cat.replace('-', ' ')} a Roma
              </a>
              <span style={{ margin: '0 8px' }}>|</span>
              <a href="/servizi-sanitari-roma" style={{ color: tema.primario, textDecoration: 'underline' }}>
                📍 Mappa Servizi per Quartiere
              </a>
            </div>
          </div>
        </div>
        <div id="lista" style={{ paddingTop: '20px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento...</p>
          ) : servizi.length > 0 ? (
            servizi.map((v) => (
              <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', margin: '20px 0', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h2 style={{ color: tema.primario, margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                  {v.is_top && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
                </div>
                <p style={{ fontSize: '17px', margin: '15px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                  <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                  {v.whatsapp && (
                    <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
                  )}
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.4', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>📍</a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '32px', border: '1px dashed #cbd5e0' }}>
              <h3 style={{ color: '#2d3748' }}>Ancora nessun professionista a {meta.zona}</h3>
              <p>Stiamo aggiornando le disponibilità.</p>
              <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: tema.primario, color: 'white', padding: '16px 32px', borderRadius: '16px', fontWeight: 'bold', textDecoration: 'none', marginTop: '10px' }}>Pubblica ora</a>
            </div>
          )}
        </div>

        {schemas?.faq && (
          <section id="faq" style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px' }}>
            <h3 style={{ color: tema.primario, fontSize: '24px', marginBottom: '20px' }}>Domande Frequenti</h3>
            {schemas.faq.mainEntity.map((item, i) => (
              <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <p style={{ fontWeight: 'bold', color: '#1e293b' }}>{item.name}</p>
                <p style={{ color: '#64748b' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </section>
        )}
      </main>

     <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '50px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'left' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                Il portale di annunci per i servizi sanitari a Roma. Trova professionisti vicino a te nei vari quartieri della capitale.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite Specialistiche</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', fontWeight: 'bold', textDecoration: 'none' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
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
