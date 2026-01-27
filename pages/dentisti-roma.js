import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function DentistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  const schemas = getSchemas('dentisti', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('dentisti'); 
      const { data } = await supabase
  .from('annunci')
  .select('*')
  .eq('approvato', true)
  // INTERVENTO CHIRURGICO: Cerca in entrambe le colonne
  .or(`categoria.ilike.%${queryBusca.cat}%,specialista.ilike.%${queryBusca.spec}%`)
  .order('is_top', { ascending: false });
      
      if (data) setMedici(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      medici={medici}
      loading={loading}
      titolo="Dentisti"
      categoria="dentisti"
      colore="#3182ce"
      testoCTA="Gestisci uno Studio Dentistico?"
      badgeSpec="🦷 ODONTOIATRIA"
      testoTopBar="🦷 STUDI DENTISTICI E ODONTOIATRI A ROMA — AGGIORNATI A GENNAIO 2026"
      descrizioneMeta="Cerchi un dentista a Roma? Trova i migliori studi dentistici per pulizia denti, impianti e ortodonzia nei quartieri di Roma con contatti diretti."
      testoMiniSEO="In questa pagina trovi i migliori studi dentistici a Roma, specializzati in igiene dentale, impianti, ortodonzia e carie. Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un dentista a Roma disponibile per visite di controllo o urgenze."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"}
      ]}
    />
  );
}
