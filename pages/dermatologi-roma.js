import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function DermatologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('dermatologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('dermatologi'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // CERCA NELLA COLONNA SPECIALISTA (Infallibile)
        .ilike('specialista', `%${queryBusca.spec}%`)
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
      titolo="Dermatologi"
      categoria="dermatologi"
      colore="#059669" 
      testoCTA="Gestisci uno Studio Dermatologico?"
      badgeSpec="🩺 DERMATOLOGIA"
      testoTopBar="🩺 STUDI DI DERMATOLOGIA E DERMATOLOGI A ROMA — AGGIORNATI A GENNAIO 2026"
      descrizioneMeta="Cerchi un dermatologo a Roma? Trova i migliori specialisti per mappatura nei, acne e malattie della pelle nei quartieri di Roma con contatti diretti."
      testoMiniSEO="In questa pagina trovi i migliori dermatologi a Roma, specializzati in mappatura dei nei, trattamento dell'acne, psoriasi e dermatologia estetica. Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un dermatologo a Roma disponibile per visite urgenti o controlli periodici."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dentisti", link: "/dentisti-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"}
      ]}
    />
  );
}
