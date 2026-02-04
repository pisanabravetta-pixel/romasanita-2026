import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function VisiteSpecialisticheRoma() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('visite-specialistiche', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

useEffect(() => {
    async function fetchVisite() {
      try {
        setLoading(true);
        const { data } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          // Torniamo alla tua logica originale che funzionava + un jolly per il futuro
          .or(`nome.ilike.%Polo Cardiologico%,nome.ilike.%Studio Medico Prati%,nome.ilike.%Centro Medico Specialistico%,categoria.ilike.%specialistica%`)
          .order('is_top', { ascending: false });

        if (data) setAnnunci(data);
      } catch (err) {
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVisite();
  }, []);
const specialistiMedici = [
    { nome: "Dermatologi Roma", slug: "dermatologi", icona: "👨‍⚕️", colore: "#be185d", desc: "Mappatura nei, cura acne e visite specialistiche pelle." },
    { nome: "Cardiologi Roma", slug: "cardiologi", icona: "❤️", colore: "#dc2626", desc: "Check-up cardiaci, ECG e prevenzione cardiovascolare." },
    { nome: "Psicologi Roma", slug: "psicologi", icona: "🧠", colore: "#7c3aed", desc: "Sostegno psicologico, psicoterapia e benessere mentale." },
    { nome: "Ginecologi Roma", slug: "ginecologi", icona: "🤰", colore: "#db2777", desc: "Controlli ginecologici e prevenzione oncologica donna." },
    { nome: "Oculisti Roma", slug: "oculisti", icona: "👁️", colore: "#2563eb", desc: "Esami della vista, prevenzione e visite oculistiche." },
    { nome: "Ortopedici Roma", slug: "ortopedici", icona: "🦴", colore: "#ea580c", desc: "Cura traumi, ossa e visite specialistiche ortopediche." },
    { nome: "Nutrizionisti Roma", slug: "nutrizionisti", icona: "🥗", colore: "#16a34a", desc: "Piani alimentari e diete personalizzate su misura." },
  ];
  return (
    <HubLayout 
medici={annunci}
      loading={loading}
      titolo="Visite Specialistiche"
     categoria="visite-specialistiche"
      colore="#7c3aed" 
      testoCTA="Sei un Medico Specialista a Roma?"
      badgeSpec="👨‍⚕️ VISITE SPECIALISTICHE"
      testoTopBar="👨‍⚕️ VISITE MEDICHE SPECIALISTICHE A ROMA — AGGIORNATE A GENNAIO 2026"
      descrizioneMeta="Cerchi una visita specialistica a Roma? Trova i migliori medici specialisti in dermatologia, cardiologia, ginecologia e molto altro a Roma. Aggiornato a Gennaio 2026."
      testoMiniSEO="Cerchi un consulto medico professionale? In questa sezione trovi i contatti per le principali visite specialistiche a Roma. Dai controlli cardiologici alle visite dermatologiche, ginecologiche o ortopediche, puoi contattare direttamente i centri medici e gli studi privati della Capitale."
      quartieri={quartieri}
   schemas={schemas}
    >
      {/* --- INIZIO BOX SPECIALISTI --- */}
    <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '10px', 
        marginBottom: '25px',
        marginTop: '5px'
      }}>
        {specialistiMedici.map((s) => (
          <a 
            key={s.slug} 
            href={`/${s.slug}-roma`} 
            style={{ 
              textDecoration: 'none', 
              backgroundColor: '#f8fafc', 
              padding: '10px 12px', 
              borderRadius: '8px', 
              border: `1px solid #e2e8f0`,
              borderLeft: `4px solid ${s.colore}`,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '16px', marginRight: '6px' }}>{s.icona}</span>
              <h3 style={{ color: '#1e293b', fontSize: '13px', fontWeight: '900', margin: 0 }}>
                {s.nome}
              </h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '11px', lineHeight: '1.2', margin: '0 0 5px 0' }}>
              {s.desc}
            </p>
            <span style={{ color: s.colore, fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>
              Vai a {s.nome} →
            </span>
          </a>
        ))}
      </div>
      {/* --- FINE BOX SPECIALISTI --- */}

    </HubLayout>
  );
}
