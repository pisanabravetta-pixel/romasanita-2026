import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function OculistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Recupero FAQ (3) e Schemi dal tuo seo-logic.js
  const schemas = getSchemas('oculisti', 'roma');
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('oculisti'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${queryBusca.cat}%`)
        .order('is_top', { ascending: false });
      
      if (data) {
        // Filtro per isolare solo gli oculisti
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
      titolo="Oculisti"
      categoria="oculisti"
      colore="#0891b2" // Blu Ottanio / Visione
      testoCTA="Sei un Oculista a Roma? Pubblica il tuo studio"
      badgeSpec="👁️ OCULISTICA"
      testoTopBar="👁️ MIGLIORI OCULISTI E STUDI OCULISTICI A ROMA — GENNAIO 2026"
      descrizioneMeta="Cerchi un oculista a Roma? Trova i migliori specialisti per visite oculistiche, chirurgia refrattiva e controllo della vista nei quartieri di Roma."
      testoMiniSEO="Trova i migliori medici oculisti a Roma esperti in microchirurgia oculare, diagnosi del glaucoma, cataratta e correzione laser della vista. Contatta direttamente gli studi oculistici di Roma per prenotare una visita completa per adulti e bambini."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Ortopedici", link: "/ortopedici-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"}
      ]}
    />
  );
}
