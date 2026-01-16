import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getSchemas, getDBQuery } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "" });
  const [tema, setTema] = useState({ primario: '#0891b2', chiaro: '#ecfeff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        // LOGICA TEMA (Ciano per sanità, Verde per farmacie)
        const isFarmacia = catSlug.includes('farmac');
        const nomeCat = isFarmacia ? "Farmacie" : catSlug.charAt(0).toUpperCase() + catSlug.slice(1).replace('-roma', '');
        const primario = isFarmacia ? "#059669" : "#0891b2";
        const chiaro = isFarmacia ? "#ecfdf5" : "#ecfeff";
        
        setTema({ primario, chiaro, label: nomeCat.toUpperCase() });

        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1).replace(/-/g, ' ');
        const titoloCorretto = `${nomeCat} a Roma ${zonaBella}`;

        setMeta({ titolo: titoloCorretto, zona: zonaBella, cat: catSlug });

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

  if (!slug) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute</title>
        <meta name="description" content={`Trova i migliori professionisti per ${meta.titolo}. Contatti diretti, orari e disponibilità aggiornata.`} />
      </Head>

      <Navbar />

      {/* STRISCIA DI STATO DINAMICA */}
      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        📍 {tema.label} : {meta.zona}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        
        {/* HEADER PAGINA (STILE DIAGNOSTICA) */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', margin: '0', lineHeight: '1.2' }}>{meta.titolo}</h1>
          <p style={{ marginTop: '15px', color: '#64748b', fontSize: '18px' }}>
            Selezione dei migliori specialisti nel quartiere <strong>{meta.zona}</strong>. Contatta direttamente il professionista per prenotare.
          </p>
        </div>

        {/* LISTA ANNUNCI */}
        <div id="lista">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Caricamento specialisti...</p>
          ) : servizi.length > 0 ? (
            servizi.map((v) => (
              <div key={v.id} style={{ 
                backgroundColor: 'white', 
                padding: '30px', 
                borderRadius: '24px', 
                marginBottom: '25px', 
                border: v.is_top ? `2px solid ${tema.primario}` : '1px solid #e2e8f0', 
                boxShadow: '0 10px 20px rgba(0,0,0,0.03)',
                position: 'relative'
              }}>
                {v.is_top && (
                  <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: tema.primario, color: 'white', padding: '4px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '900' }}>RACCOMANDATO</span>
                )}
                <h2 style={{ color: '#164e63', margin: '0 0 10px 0', fontSize: '26px', fontWeight: '800' }}>{v.nome}</h2>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>CHIAMA ORA</a>
                  {v.whatsapp && (
                    <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>WHATSAPP</a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#f8fafc', borderRadius: '24px', border: '2px dashed #cbd5e0' }}>
              <h3 style={{ color: '#1e293b', fontSize: '22px' }}>Nessun professionista trovato a {meta.zona}</h3>
              <p style={{ color: '#64748b' }}>Stiamo verificando nuove disponibilità in questa zona.</p>
              <a href="/pubblica-annuncio" style={{ display: 'inline-block', backgroundColor: tema.primario, color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: '800', textDecoration: 'none', marginTop: '15px' }}>SEI UN PROFESSIONISTA? ISCRIVITI</a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
