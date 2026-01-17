import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function DiagnosticaRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Recupero FAQ e Schemi dal tuo seo-logic.js (ora con 3 FAQ)
  const schemas = getSchemas('diagnostica', 'roma');
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('diagnostica'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${queryBusca.cat}%`)
        .order('is_top', { ascending: false });
      
      if (data) {
        // Applichiamo il filtro intelligente per pulire la lista
        const puliti = data.filter(m => {
          const rigaCompleta = JSON.stringify(m).toLowerCase();
          const parolaCercata = queryBusca.spec.toLowerCase(); // 'centro diagnostico'
          // Cerchiamo la radice della parola per beccare singolare/plurale
          return rigaCompleta.includes(parolaCercata.slice(0, -1)); 
        });
        setMedici(puliti);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      titolo="Diagnostica"
      categoria="diagnostica"
      colore="#2563eb" // Blu Medicale
      testoCTA="Gestisci un Centro Diagnostico a Roma?"
      badgeSpec="🔬 DIAGNOSTICA"
      testoTopBar="🔬 CENTRI DIAGNOSTICI E LABORATORI ANALISI A ROMA — GENNAIO 2026"
      descrizioneMeta="Cerchi un centro diagnostico a Roma? Trova i migliori laboratori per analisi del sangue, ecografie, RM e TAC nei quartieri di Roma con contatti diretti."
      testoMiniSEO="In questa pagina trovi i principali centri diagnostici a Roma, specializzati in analisi cliniche, radiologia, ecografie e check-up completi. Contatta direttamente le strutture del tuo quartiere per prenotare esami diagnostici con tempi di attesa ridotti e tariffe competitive."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"}
      ]}
    />
  );
}
