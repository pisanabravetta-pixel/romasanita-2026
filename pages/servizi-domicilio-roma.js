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
      // QUERY DIRETTA: Se l'annuncio esiste con "domicilio" o "assistenza", ESCE.
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .or('categoria.ilike.%domicilio%,specialistica.ilike.%domicilio%,categoria.ilike.%assistenza%')
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
      // QUI AGGIUNGIAMO LE VOCI MANCANTI PER ARRIVARE A 5 (così la sezione è piena)
      altreSpecialistiche={[
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"}
      ]}
    />
  );
}
