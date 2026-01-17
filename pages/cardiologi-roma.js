import React, { useEffect, useState } from 'react'; // Aggiunto per annunci
import { supabase } from '../lib/supabaseClient'; // Aggiunto per annunci
import { getDBQuery, getSchemas } from '../lib/seo-logic'; // Aggiunto getDBQuery
import HubLayout from '../components/HubLayout';

export default function CardiologiRoma() {
  const [medici, setMedici] = useState([]); // Aggiunto per annunci
  const [loading, setLoading] = useState(true); // Aggiunto per annunci

  const schemas = getSchemas('cardiologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  // Logica per caricare gli annunci senza cambiare nient'altro
  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('cardiologi'); 
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${queryBusca.cat}%`)
        .ilike('specialistica', `%${queryBusca.spec}%`) 
        .order('is_top', { ascending: false });
      
      if (data) setMedici(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      titolo="Cardiologi a Roma"
      categoria="cardiologi" 
      colore="#e11d48" 
      badgeSpec="❤️ CARDIOLOGIA"
      testoTopBar="❤️ VISITE CARDIOLOGICHE ROMA — GENNAIO 2026"
      descrizioneMeta="Trova i migliori cardiologi a Roma per visite specialistiche ed ECG."
      testoMiniSEO="Specialisti in cardiologia per la salute del tuo cuore: controlli, ECG e prevenzione a Roma."
      medici={medici} // Passa gli annunci caricati
      loading={loading} // Passa lo stato di caricamento
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
