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

        let nomeCat = catSlug.includes('farmac') ? "Farmacie" : "Dentisti";
        let color = catSlug.includes('farmac') ? "#059669" : "#2563eb";
        let colorChiaro = catSlug.includes('farmac') ? "#ecfdf5" : "#eff6ff";
        
        setTema({ primario: color, chiaro: colorChiaro, label: nomeCat.toUpperCase() });
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
       // Se la zona è già "Roma", evita di scriverlo due volte
const zonaSenzaRoma = zonaBella.toLowerCase() === 'roma' ? '' : ` ${zonaBella}`;
const titoloCorretto = `${nomeCat} a Roma${zonaSenzaRoma}`;

setMeta({ 
  titolo: titoloCorretto, 
  zona: zonaBella, 
  cat: catSlug 
});
        const filtri = getDBQuery(catSlug);
        console.log("DEBUG FILTRI:", {
  categoria_cercata: filtri.cat,
  specialista_cercato: filtri.spec,
  zona_cercata: zonaSlug
});
       console.log("DEBUG - Sto cercando:", { catSlug, zonaSlug, filtri });

        const { data, error } = await supabase
          .from('annunci')
          .select('*'); // Prendiamo TUTTO senza filtri per un istante

        console.log("DEBUG - Dati trovati nel DB:", data);

        if (error) console.error("ERRORE SUPABASE:", error);
        
        // Filtriamo a mano per capire dove fallisce
        const filtrati = data?.filter(f => 
          String(f.categoria).toLowerCase().includes(catSlug.toLowerCase()) &&
          String(f.zona).toLowerCase().includes(zonaSlug.toLowerCase())
        );

        console.log("DEBUG - Risultati dopo il filtro:", filtrati);
        setServizi(filtrati || []);

        if (error) throw error;
        setServizi(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDati();
  }, [slug]);

  // Recuperiamo l'indirizzo del primo servizio della lista, se non c'è usiamo "Roma"
const indirizzoPrimoServizio = servizi.length > 0 ? servizi[0].indirizzo : "Roma";

const schemas = getSchemas(
  meta.cat || 'farmacie', 
  meta.zona || 'Roma', 
  indirizzoPrimoServizio
);

if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0', fontWeight: '800' }}>{meta.titolo}</h1>
          
          {/* LINK DI RICHIAMO RAPIDO E NAVIGAZIONE */}
<div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
    <a href="#lista" style={{ color: tema.primario, fontWeight: '600', textDecoration: 'none' }}>↓ Vedi Annunci</a>
    <a href="#faq" style={{ color: tema.primario, fontWeight: '600', textDecoration: 'none' }}>↓ Domande Frequenti</a>
  </div>
  
  <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '10px', marginTop: '5px', fontSize: '13px', color: '#64748b' }}>
    Esplora anche: 
    <a href={`/${meta.cat}-roma`} style={{ marginLeft: '8px', color: tema.primario, textDecoration: 'underline' }}>
  {meta.cat.includes('dentisti') ? 'Tutti i dentisti' : 
   meta.cat.includes('farmac') ? 'Tutte le farmacie' : 
   `Tutte le ${meta.cat.replace('-', ' ')}`} a Roma
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
      {/* 1. PULSANTE CHIAMA */}
      <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
      
     {/* 2. PULSANTE WHATSAPP (Se esiste) */}
      {v.whatsapp && (
        <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
      )}
      
      {/* 3. PULSANTE MAPPA (Sintassi corretta) */}
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.4', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>📍</a>
    </div>
  </div>
))
) : (
  <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px dashed #cbd5e0' }}>
    <div style={{ fontSize: '40px', marginBottom: '20px' }}>📍</div>
              <h3 style={{ color: '#2d3748', fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>
                Ancora nessun professionista a {meta.zona}
              </h3>
              <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '500px', margin: '0 auto 30px' }}>
                Stiamo aggiornando le disponibilità per il quartiere <strong>{meta.zona}</strong>. Se sei un professionista sanitario, non perdere l'opportunità di essere il primo nella tua zona.
              </p>
              <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: tema.primario, color: 'white', padding: '16px 32px', borderRadius: '16px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                Pubblica il tuo studio ora
              </a>
              <p style={{ marginTop: '20px', fontSize: '13px', color: '#94a3b8' }}>Tempo di attivazione stimato: 24 ore.</p>
            </div>
          )}
        </div>

        {/* SEZIONE FAQ */}
        <section id="faq" style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', marginBottom: '50px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: tema.primario, fontSize: '24px', marginBottom: '20px' }}>Domande Frequenti</h3>
          {schemas.faq.mainEntity.map((item, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
              <p style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '5px' }}>{item.name}</p>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </main>

      {/* FOOTER INTEGRALE - IDENTICO ALLA HOME */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.</p>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
              <p style={{ fontSize: '12px', color: '#718096', fontStyle: 'italic', lineHeight: '1.4' }}>ServiziSalute è un portale di annunci e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.</p>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>© 2026 ServiziSalute – Tutti i diritti riservati</div>
        </div>
      </footer>
    </div>
  );
}
