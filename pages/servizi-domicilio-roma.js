import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function ServiziDomicilioRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('servizi-domicilio', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      // Prendiamo la configurazione dal tuo seo-logic.js
      const queryBusca = getDBQuery('servizi-domicilio'); 

      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // QUERY ELASTICA: Cerca la parola 'domicilio' in categoria, titolo o specialistica
        .or(`categoria.ilike.%domicilio%,specialistica.ilike.%domicilio%,titolo.ilike.%domicilio%`)
        .order('is_top', { ascending: false });
      
      if (data) {
        setMedici(data);
      }
      if (error) console.error("Errore query:", error);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      titolo="Servizi a Domicilio"
      categoria="servizi-domicilio"
      colore="#d97706" 
      testoCTA="Offri servizi sanitari a domicilio a Roma?"
      badgeSpec="🏠 DOMICILIO"
      testoTopBar="🏠 ASSISTENZA SANITARIA A DOMICILIO ROMA — GENNAIO 2026"
      descrizioneMeta="Hai bisogno di assistenza a casa? Trova infermieri e medici per visite a domicilio a Roma."
      testoMiniSEO="Servizi sanitari professionali direttamente a casa tua: assistenza, medicazioni e visite specialistiche domiciliari."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Farmacie", link: "/farmacie-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"}
      ]}
    />
  );
}
