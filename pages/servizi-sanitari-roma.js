import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function ServiziSanitariRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('generale', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchTuttiServizi() {
      try {
        // Query generica: prende i primi 40 annunci approvati di QUALSIASI categoria
        // così l'hub generale è sempre pieno e vario
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .order('is_top', { ascending: false })
          .limit(40);

        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTuttiServizi();
  }, []);

  return (
    <HubLayout 
      medici={medici}
      loading={loading}
    titolo="Servizi Sanitari"
      categoria="generale"
      colore="#10b981" // Verde Smeraldo
      testoCTA="Gestisci una struttura sanitaria a Roma?"
      badgeSpec="🏥 SERVIZI SANITARI"
      testoTopBar="🏥 PORTALE SERVIZI SANITARI ROMA — TUTTE LE SPECIALISTICHE AGGIORNATE A FEBBRAIO 2026"
      descrizioneMeta="Tutti i servizi sanitari a Roma: farmacie, dentisti, psicologi e assistenza a domicilio. Trova il professionista più vicino nel tuo quartiere. Aggiornato 2026."
      testoMiniSEO="ServiziSalute è il punto di riferimento per chi cerca servizi sanitari a Roma. Il nostro portale aggrega i migliori professionisti della Capitale, offrendo una panoramica completa su centri di diagnostica, studi odontoiatrici, psicologi e assistenza infermieristica domiciliare."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dentisti", link: "/dentisti-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Psicologi", link: "/psicologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"}
      ]}
    />
  );
}
