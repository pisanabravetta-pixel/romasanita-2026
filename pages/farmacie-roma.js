import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('farmacie', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('farmacie'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        // Cerca la radice 'farmac' in entrambe le colonne per non sbagliare mai
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
      titolo="Farmacie"
      categoria="farmacie" // Lascialo così, pulito
      colore="#16a34a" 
      testoCTA="Sei il titolare di una Farmacia a Roma?"
      badgeSpec="💊 FARMACIE"
      testoTopBar="💊 FARMACIE E SERVIZI FARMACEUTICI A ROMA — AGGIORNATO FEBBRAIO 2026"
      descrizioneMeta="Trova le farmacie a Roma aggiornate a Febbraio 2026. ✅ Elenco completo, contatti WhatsApp/Telefono e mappa delle strutture nel tuo quartiere."
      testoMiniSEO="In questa sezione trovi l'elenco delle farmacie a Roma, suddivise per quartiere. Oltre alla vendita di farmaci, molte strutture offrono servizi di autoanalisi, test e parafarmacia. Consulta i contatti diretti per trovare la struttura più vicina a te."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Dentisti", link: "/dentisti-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Servizi Domicilio", link: "/servizi-domicilio-roma"},
        {nome: "Nutrizionisti", link: "/nutrizionisti-roma"}
      ]}
    />
  );
}
