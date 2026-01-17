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
      // PROVA DI EMERGENZA: Prendiamo tutto quello che è approvato
      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true); // Controlliamo solo che sia approvato
      
      if (data) {
        console.log("Dati ricevuti dal DB:", data); // Controlla la console del browser!
        setMedici(data);
      }
      if (error) console.error("Errore Supabase:", error);
      
      setLoading(false);
    }
    fetchDocs();
  }, []);
  return (
    <HubLayout 
      titolo="Servizi a Domicilio"
      categoria="servizi-domicilio"
      colore="#d97706" // Giallo Ambra / Assistenza
      testoCTA="Offri servizi sanitari a domicilio a Roma?"
      badgeSpec="🏠 DOMICILIO"
      testoTopBar="🏠 ASSISTENZA SANITARIA E SERVIZI A DOMICILIO A ROMA — GENNAIO 2026"
      descrizioneMeta="Hai bisogno di assistenza a casa? Trova infermieri, fisioterapisti e medici per visite a domicilio nei quartieri di Roma con intervento rapido."
      testoMiniSEO="In questa sezione trovi i migliori professionisti che offrono servizi sanitari a domicilio a Roma. Dalla fisioterapia riabilitativa all'assistenza infermieristica, fino alle visite mediche specialistiche direttamente a casa tua, per garantire continuità assistenziale in totale comodità."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Farmacie", link: "/farmacie-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Infermieri", link: "/infermieri-roma"},
        {nome: "Fisioterapisti", link: "/fisioterapisti-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"}
      ]}
    />
  );
}
