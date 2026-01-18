import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function OrtopediciRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('ortopedici', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('ortopedici'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // Cerca 'ortoped' ovunque per non perdere nessun annuncio
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
      titolo="Ortopedici"
      categoria="ortopedici"
      colore="#c2410c" 
      testoCTA="Sei un Ortopedico a Roma? Registra il tuo studio"
      badgeSpec="🦴 ORTOPEDIA"
      testoTopBar="🦴 MIGLIORI ORTOPEDICI E CHIRURGHI ORTOPEDICI A ROMA — GENNAIO 2026"
      descrizioneMeta="Cerchi un ortopedico a Roma? Trova i migliori specialisti per problemi articolari, traumatologia e chirurgia ortopedica nei quartieri di Roma."
      testoMiniSEO="In questa pagina trovi i migliori ortopedici a Roma esperti in chirurgia protesica, traumatologia dello sport e cura delle patologie della colonna vertebrale, anca e ginocchio. Contatta i professionisti del tuo quartiere per visite specialistiche e infiltrazioni."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Psicologi", link: "/psicologi-roma"}
      ]}
    />
  );
}
