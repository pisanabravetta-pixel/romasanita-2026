import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function NutrizionistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Recupero FAQ (3) e Schemi dal tuo seo-logic.js
  const schemas = getSchemas('nutrizionisti', 'roma');
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('nutrizionisti'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${queryBusca.cat}%`)
        .order('is_top', { ascending: false });
      
      if (data) {
        // Filtro per isolare solo i nutrizionisti
        const filtrati = data.filter(m => 
          JSON.stringify(m).toLowerCase().includes(queryBusca.spec.toLowerCase())
        );
        setMedici(filtrati);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      titolo="Nutrizionisti"
      categoria="nutrizionisti"
      colore="#65a30d" // Verde Lime / Salute
      testoCTA="Sei un Nutrizionista a Roma? Unisciti a noi"
      badgeSpec="🥗 NUTRIZIONE"
      testoTopBar="🥗 NUTRIZIONISTI E DIETISTI A ROMA — AGGIORNATI A GENNAIO 2026"
      descrizioneMeta="Cerchi un nutrizionista a Roma? Trova i migliori specialisti in diete personalizzate, educazione alimentare e nutrizione clinica nei quartieri di Roma."
      testoMiniSEO="In questa pagina trovi i migliori nutrizionisti e dietisti a Roma, esperti in piani alimentari personalizzati, gestione del peso, nutrizione sportiva e intolleranze. Contatta i professionisti del tuo quartiere per una consulenza nutrizionale e migliora il tuo stile di vita."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Psicologi", link: "/psicologi-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Farmacie", link: "/farmacie-roma"}
      ]}
    />
  );
}
