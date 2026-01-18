import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function OculistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('oculisti', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('oculisti'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // Cerca 'oculist' in categoria o specialista (Infallibile)
        .or(`categoria.ilike.%${queryBusca.cat}%,specialista.ilike.%${queryBusca.spec}%`)
        .order('is_top', { ascending: false });
      
      if (data) {
        setMedici(data);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      medici={medici}
      loading={loading}
      titolo="Oculisti"
      categoria="oculisti"
      colore="#0891b2" 
      testoCTA="Sei un Oculista a Roma? Pubblica il tuo studio"
      badgeSpec="👁️ OCULISTICA"
      testoTopBar="👁️ MIGLIORI OCULISTI E STUDI OCULISTICI A ROMA — GENNAIO 2026"
      descrizioneMeta="Cerchi un oculista a Roma? Trova i migliori specialisti per visite oculistiche, chirurgia refrattiva e controllo della vista nei quartieri di Roma."
      testoMiniSEO="Trova i migliori medici oculisti a Roma esperti in microchirurgia oculare, diagnosi del glaucoma, cataratta e correzione laser della vista. Contatta direttamente gli studi oculistici di Roma per prenotare una visita completa per adulti e bambini."
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
