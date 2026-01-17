import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('cardiologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('cardiologi'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${queryBusca.cat}%`)
        .order('is_top', { ascending: false });
      
      if (data) setMedici(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      titolo="Cardiologi"
      categoria="cardiologi" 
      colore="#e11d48" 
      testoCTA="Sei un Cardiologo a Roma? Crea il tuo profilo"
      badgeSpec="❤️ CARDIOLOGIA"
      testoTopBar="❤️ VISITE CARDIOLOGICHE ROMA — GENNAIO 2026"
      descrizioneMeta="Trova i migliori cardiologi a Roma per visite specialistiche ed ECG."
      testoMiniSEO="Specialisti in cardiologia per la salute del tuo cuore: controlli, ECG e prevenzione a Roma."
      medici={medici}      // AGGIUNTO: Senza questo non vedi gli annunci
      loading={loading}    // AGGIUNTO: Senza questo non vedi il caricamento
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Servizi a Domicilio", link: "/servizi-domicilio-roma"}
      ]}
    />
  );
}
