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
    { 
      nome: "Dermatologi Roma", 
      slug: "dermatologi", 
      icona: "👨‍⚕️", 
      colore: "#be185d", 
      desc: "Mappatura nei, cura dell'acne e visite dermatologiche specialistiche per la salute della pelle." 
    },
    { 
      nome: "Cardiologi Roma", 
      slug: "cardiologi", 
      icona: "❤️", 
      colore: "#dc2626", 
      desc: "Check-up cardiologici, ECG e visite per la prevenzione delle patologie cardiovascolari." 
    },
    { 
      nome: "Psicologi Roma", 
      slug: "psicologi", 
      icona: "🧠", 
      colore: "#7c3aed", 
      desc: "Sostegno psicologico e psicoterapia per il benessere mentale e la gestione dei disturbi emotivi." 
    },
    { 
      nome: "Ginecologi Roma", 
      slug: "ginecologi", 
      icona: "🤰", 
      colore: "#db2777", 
      desc: "Controlli ginecologici, prevenzione oncologica e assistenza specialistica per la salute della donna." 
    },
    { 
      nome: "Oculisti Roma", 
      slug: "oculisti", 
      icona: "👁️", 
      colore: "#2563eb", 
      desc: "Controlli della vista, visite oculistiche e prevenzione visiva per adulti e bambini a Roma." 
    },
    { 
      nome: "Ortopedici Roma", 
      slug: "ortopedici", 
      icona: "🦴", 
      colore: "#ea580c", 
      desc: "Trattamento di patologie muscolo-scheletriche, traumi e visite specialistiche ortopediche." 
    },
    { 
      nome: "Nutrizionisti Roma", 
      slug: "nutrizionisti", 
      icona: "🥗", 
      colore: "#16a34a", 
      desc: "Piani alimentari personalizzati, educazione nutrizionale e percorsi di dieta per ogni esigenza." 
    },
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '12px', 
        marginBottom: '30px',
        marginTop: '10px'
      }}>
        {specialistiMedici.map((s) => (
          <a 
            key={s.slug} 
            href={`/${s.slug}-roma`} 
            style={{ 
              textDecoration: 'none', 
              backgroundColor: 'white', 
              padding: '12px 15px', 
              borderRadius: '10px', 
              border: `1px solid #e2e8f0`,
              borderLeft: `5px solid ${s.colore}`, // Bordo a sinistra invece che sopra per occupare meno spazio verticale
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>{s.icona}</span>
              <h3 style={{ color: '#1e293b', fontSize: '14px', fontWeight: '900', margin: 0 }}>
                {s.nome}
              </h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.3', margin: '0 0 8px 0' }}>
              {s.desc}
            </p>
            <span style={{ color: s.colore, fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
              Vai a {s.nome} →
            </span>
          </a>
        ))}
      </div>
      {/* --- FINE BOX SPECIALISTI --- */}

    </HubLayout>
  );
}
