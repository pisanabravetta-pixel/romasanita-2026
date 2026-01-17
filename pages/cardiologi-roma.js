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
        .ilike('categoria', `%${queryBusca.cat}%`) // Prende il "minestrone" (visite-specialistiche)
        .order('is_top', { ascending: false });
      
      if (data) {
        // FILTRO DI SICUREZZA: Teniamo solo quelli che hanno la parola "cardiologo" 
        // scritta in qualche colonna del record (nome, categoria o specialistica)
        const filtrati = data.filter(m => 
          JSON.stringify(m).toLowerCase().includes(queryBusca.spec.toLowerCase())
        );
        setMedici(filtrati);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);
  
  return (
    <HubLayout 
      titolo="Cardiologi"
      categoria="cardiologi"
      colore="#dc2626"
      testoCTA="Gestisci uno Studio Cardiologico?"
      badgeSpec="❤️ CARDIOLOGIA"
      testoTopBar="❤️ STUDI DI CARDIOLOGIA E CARDIOLOGI A ROMA — AGGIORNATI A GENNAIO 2026"
      descrizioneMeta="Cerchi un cardiologo a Roma? Trova i migliori specialisti per visite cardiologiche, ECG ed ecocardiogrammi nei quartieri di Roma con contatti diretti."
      testoMiniSEO="In questa pagina trovi i migliori cardiologi a Roma, specializzati in prevenzione cardiovascolare, controllo della pressione, ECG e aritmie. Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un cardiologo a Roma disponibile per visite specialistiche o check-up completi."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Dentisti", link: "/dentisti-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"}
      ]}
    />
  );
}
