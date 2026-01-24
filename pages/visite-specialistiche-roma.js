import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function VisiteSpecialisticheRoma() {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('visite-specialistiche', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
  async function fetchVisite() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // Questo filtro prende sia "visite-specialistiche" che "Visite Specialistiche"
        // e anche i tuoi 3 annunci specifici per nome, così sei sicuro al 100%
        .or(`categoria.ilike.%visite%,nome.ilike.%Polo Cardiologico%,nome.ilike.%Studio Medico Prati%,nome.ilike.%Centro Medico%`)
        .order('is_top', { ascending: false });

      if (data) setAnnunci(data);
    } catch (err) {
      console.error("Errore caricamento:", err);
    } finally {
      setLoading(false);
    }
  }
  fetchVisite();
}, []);

  return (
    <HubLayout 
medici={annunci}
      loading={loading}
      titolo="Visite Specialistiche"
      categoria="specialistica"
      colore="#7c3aed" 
      testoCTA="Sei un Medico Specialista a Roma?"
      badgeSpec="👨‍⚕️ VISITE SPECIALISTICHE"
      testoTopBar="👨‍⚕️ VISITE MEDICHE SPECIALISTICHE A ROMA — AGGIORNATE A GENNAIO 2026"
      descrizioneMeta="Cerchi una visita specialistica a Roma? Trova i migliori medici specialisti in dermatologia, cardiologia, ginecologia e molto altro a Roma. Aggiornato a Gennaio 2026."
      testoMiniSEO="Cerchi un consulto medico professionale? In questa sezione trovi i contatti per le principali visite specialistiche a Roma. Dai controlli cardiologici alle visite dermatologiche, ginecologiche o ortopediche, puoi contattare direttamente i centri medici e gli studi privati della Capitale."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"}
      ]}
    />
  );
}
