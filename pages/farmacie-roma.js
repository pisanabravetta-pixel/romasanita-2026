import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function FarmacieRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Recupero FAQ (ora ne vedrai 3) e Schemi
  const schemas = getSchemas('farmacie', 'roma');
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

useEffect(() => {
    async function fetchDocs() {
      // 1. Prende 'farmacia' dal mapping che hai in seo-logic
      const queryBusca = getDBQuery('farmacie'); 
      
      // 2. Fa la query semplice che funzionava all'inizio
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
      titolo="Farmacie"
      categoria="farmacie"
      colore="#16a34a" // Verde Farmacia
      testoCTA="Sei il titolare di una Farmacia a Roma?"
      badgeSpec="💊 FARMACIE"
      testoTopBar="💊 FARMACIE DI TURNO E SERVIZI FARMACEUTICI A ROMA — GENNAIO 2026"
      descrizioneMeta="Cerca una farmacia a Roma. Trova farmacie di turno, parafarmacie e servizi di consegna farmaci a domicilio nei principali quartieri di Roma."
      testoMiniSEO="In questa sezione trovi l'elenco delle farmacie a Roma, suddivise per quartiere. Oltre alla vendita di farmaci, molte strutture offrono servizi di autoanalisi, test antigenici, prodotti galenici e parafarmacia. Consulta gli orari e i contatti per trovare la farmacia più vicina a te."
      medici={medici}
      loading={loading}
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
