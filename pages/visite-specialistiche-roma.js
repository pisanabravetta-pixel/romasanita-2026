import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas, seoData, buildCategoriaOr } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function VisiteSpecialisticheRoma() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);
  
 const schemas = getSchemas('visite-specialistiche', 'roma');
 const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    console.log("Tentativo di caricamento iniziato...");
    async function fetchVisite() {
      try {
        setLoading(true);
        const queryBusca = getDBQuery('visite-specialistiche');
        // Matcha tutti i record con "visite-specialistiche", "specialisti", "specialistica"
        // ESCLUDE farmacie, dentisti, diagnostica che hanno categoria propria
        const { data: databaseData, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .or(buildCategoriaOr(queryBusca.termini))
          .order('is_top', { ascending: false })
          .range(0, 299);

        if (error) throw error;

        if (databaseData) {
          // Esclude categorie non specialistiche che potrebbero matchare per errore
          const filtrati = databaseData.filter(item => {
            const cat = (item.categoria || '').toLowerCase();
            return !cat.includes('farmac') && !cat.includes('dentist') && !cat.includes('diagnost');
          });
          const ordinati = filtrati.sort((a, b) => (b.is_top ? 1 : 0) - (a.is_top ? 1 : 0));
          setAnnunci([...ordinati]);
        }
      } catch (err) {
        console.error("Errore:", err);
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
      testoTopBar="👨‍⚕️ VISITE MEDICHE SPECIALISTICHE A ROMA — AGGIORNATE A GENNAIO 2026"
      descrizioneMeta="Cerchi una visita specialistica a Roma? Trova i migliori medici specialisti in dermatologia, cardiologia, ginecologia e molto altro a Roma. Aggiornato a Gennaio 2026."
      testoMiniSEO="Cerchi un consulto medico professionale? In questa sezione trovi i contatti per le principali visite specialistiche a Roma. Dai controlli cardiologici alle visite dermatologiche, ginecologiche o ortopediche, puoi contattare direttamente i centri medici e gli studi privati della Capitale."
      quartieri={quartieri}
      schemas={schemas}
    >
      {/* Griglia delle specialistiche - Questa rimane perché è specifica di questa pagina hub */}
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
              border: '1px solid #e2e8f0',
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
            <p style={{ 
              color: '#1e293b', 
              fontSize: '11px', 
              lineHeight: '1.3', 
              margin: '0 0 6px 0',
              fontWeight: '500' 
            }}>
              {s.desc}
            </p>
            <span style={{ color: s.colore, fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>
              Vai a {s.nome} →
            </span>
          </a>
        ))}
      </div>

      {/* IL BLOCCO FAQ CHE C'ERA QUI È STATO RIMOSSO: LO GESTISCE GIÀ HUBLAYOUT IN FONDO */}
      
    </HubLayout>
  );
} // <--- Questa era la graffa mancante che bloccava la build!
