import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function ServiziDomicilioRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Recupero FAQ (3) e Schemi dal tuo seo-logic.js
  const schemas = getSchemas('servizi-domicilio', 'roma');
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      // 1. Prende il mapping dal tuo seo-logic
      const queryBusca = getDBQuery('servizi-domicilio'); 
      
      // 2. Query identica a Farmacie per non perdere annunci
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
      titolo="Servizi a Domicilio"
      categoria="servizi-domicilio"
      colore="#d97706" 
      testoCTA="Offri assistenza sanitaria a domicilio a Roma?"
      badgeSpec="🏠 DOMICILIO"
      testoTopBar="🏠 ASSISTENZA SANITARIA A DOMICILIO ROMA — GENNAIO 2026"
      descrizioneMeta="Hai bisogno di assistenza a casa? Trova infermieri, medici e fisioterapisti per visite a domicilio a Roma nei principali quartieri con contatto diretto."
      testoMiniSEO="Servizi sanitari professionali direttamente a casa tua a Roma. In questa sezione trovi professionisti qualificati per assistenza infermieristica, fisioterapia domiciliare, prelievi e visite mediche specialistiche nel comfort della tua abitazione, attivi in tutti i quartieri della Capitale."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Farmacie", link: "/farmacie-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Infermieri", link: "/infermieri-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"}
      ]}
    />
  );
}
