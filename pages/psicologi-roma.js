import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function PsicologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('psicologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('psicologi'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // Cerca la radice 'psico' in entrambe le colonne (Infallibile)
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
      titolo="Psicologi"
      categoria="psicologi"
      colore="#4f46e5" 
      testoCTA="Sei uno Psicologo a Roma? Crea il tuo profilo"
      badgeSpec="🧠 PSICOLOGIA"
      testoTopBar="🧠 PSICOLOGI E PSICOTERAPEUTI A ROMA — AGGIORNATO GENNAIO 2026"
      descrizioneMeta="Cerchi uno psicologo a Roma? Trova i migliori psicoterapeuti per ansia, stress e consulenza di coppia nei quartieri di Roma con contatti diretti."
      testoMiniSEO="Trova supporto psicologico a Roma con i migliori professionisti specializzati in psicoterapia cognitiva, sistemico-relazionale e supporto per adulti e adolescenti. Consulta i profili degli psicologi di Roma per percorsi individuali, di coppia o familiari."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Nutrizionisti", link: "/nutrizionisti-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"}
      ]}
    />
  );
}
