import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", categoria: "" });
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        
        // 1. ANALISI PULITA DELLO SLUG (es: farmacie-roma-prati)
        const parti = slug.split('-'); 
        const catSlug = parti[0]; // farmacie
        const zonaSlug = parti[parti.length - 1]; // prati

        // 2. TEMA E ETICHETTE
        let labelCategoria = "Servizi Sanitari";
        if (catSlug.includes('farmac')) {
          setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE' });
          labelCategoria = "Farmacie";
        } else if (catSlug.includes('dentist')) {
          setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'DENTISTI' });
          labelCategoria = "Dentisti";
        } else if (catSlug.includes('cardiolog')) {
          setTema({ primario: '#dc2626', chiaro: '#fef2f2', label: 'CARDIOLOGI' });
          labelCategoria = "Cardiologi";
        }

        const zonaPulita = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
        setMeta({
          titolo: `${labelCategoria} a Roma ${zonaPulita}`,
          zona: zonaPulita,
          categoria: labelCategoria
        });

        // 3. QUERY SUPABASE CORRETTA
        // Filtriamo per categoria (es. farmacie) E zona (es. prati)
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${catSlug}%`)
          .ilike('zona', `%${zonaSlug}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);

      } catch (err) {
        console.error("Errore Database:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute Roma</title>
      </Head>

      {/* TOP BAR */}
      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>← Torna alla Home</a>

        {/* HEADER BOX */}
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0', fontWeight: '800' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', marginTop: '10px' }}>
            Tutti i contatti e gli indirizzi dei professionisti in zona <strong>{meta.zona}</strong>.
          </p>
        </div>

        {/* LISTA ANNUNCI */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Ricerca in corso...</div>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>Nessun risultato trovato per {meta.categoria} a {meta.zona}.</p>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ margin: '0', color: tema.primario, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '5px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>{v.descrizione || `Servizio professionale a Roma ${v.zona}.`}</p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>
                )}
              </div>
            </div>
          ))
        )}

        {/* FOOTER COMPLETO IDENTICO ALLA HOME */}
        <footer style={{ marginTop: '100px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px 30px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            
            {/* Colonna 1 */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
                Il portale indipendente per la ricerca di servizi sanitari a Roma. Trova velocemente farmacie, dentisti e specialisti vicino a te.
              </p>
            </div>

            {/* Colonna 2 */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px', fontWeight: '700' }}>Categorie Principali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti Roma</a></li>
                <li><a href="/cardiologi-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiologi Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Diagnostica Roma</a></li>
              </ul>
            </div>

            {/* Colonna 3 */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px', fontWeight: '700' }}>Informazioni Legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/termini-condizioni" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>

          {/* DISCLAIMER FINALE ESTESO */}
          <div style={{ borderTop: '1px solid #334155', paddingTop: '30px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '20px', maxWidth: '700px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
              <strong>DISCLAIMER:</strong> Le informazioni pubblicate su ServiziSalute Roma hanno scopo puramente informativo. Non costituiscono in alcun modo parere medico o diagnosi. Si raccomanda di contattare sempre il proprio medico curante o le strutture sanitarie ufficiali per urgenze e consulenze professionali. I dati su orari e servizi possono subire variazioni.
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 'bold' }}>© 2026 ServiziSalute Roma - Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
