import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function GinecologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('ginecologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('ginecologi'); 
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .or(`categoria.ilike.%${queryBusca.cat}%,nome.ilike.%${queryBusca.cat}%,specialista.ilike.%${queryBusca.spec}%`)
        .order('is_top', { ascending: false })
        .range(0, 199);
      
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
      titolo="Ginecologi"
      categoria="ginecologi"
      colore="#be185d" 
      testoCTA="Sei un Ginecologo o gestisci un Centro a Roma?"
      badgeSpec="🎀 GINECOLOGIA"
      testoTopBar="🎀 STUDI DI GINECOLOGIA E OSTETRICIA A ROMA — GENNAIO 2026"
      descrizioneMeta="Cerchi un ginecologo a Roma? Trova i migliori specialisti per visite ginecologiche, pap-test ed ecografie nei quartieri di Roma con contatti diretti."
      testoMiniSEO="In questa pagina trovi i migliori ginecologi a Roma, specializzati in prevenzione, ostetricia, diagnosi prenatale e menopausa. Contatta direttamente i professionisti del tuo quartiere per visite specialistiche, controllo della gravidanza o esami diagnostici specifici."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Nutrizionisti", link: "/nutrizionisti-roma"}
      ]}
    />
  );
}
