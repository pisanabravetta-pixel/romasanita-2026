import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, getSchemas } from '../lib/seo-logic';
import HubLayout from '../components/HubLayout';

export default function DermatologiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Recupero FAQ e Schemi (ora con 3 FAQ dal nuovo seo-logic)
  const schemas = getSchemas('dermatologi', 'roma');
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

 useEffect(() => {
    async function fetchDocs() {
      const queryBusca = getDBQuery('dermatologi'); 
      
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', `%${queryBusca.cat}%`)
        .order('is_top', { ascending: false });
      
      if (data) {
        // Questa riga risolve TUTTO: minuscole, maiuscole, singolari e plurali
        const filtrati = data.filter(m => 
          JSON.stringify(m).toLowerCase().includes(queryBusca.spec.toLowerCase().replace('i', '')) 
          // .replace('i', '') serve se vuoi essere estremo e cercare la radice della parola
        );
        
        // Versione più semplice e sicura:
        const puliti = data.filter(m => {
          const rigaCompleta = JSON.stringify(m).toLowerCase();
          const parolaCercata = queryBusca.spec.toLowerCase(); // 'dermatologo'
          
          // Controlla se c'è la parola o la sua versione plurale tronca
          return rigaCompleta.includes(parolaCercata.slice(0, -1)); 
        });

        setMedici(puliti);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);
  return (
    <HubLayout 
      titolo="Dermatologi"
      categoria="dermatologi"
      colore="#059669" // Verde Salute/Dermatologia
      testoCTA="Gestisci uno Studio Dermatologico?"
      badgeSpec="🩺 DERMATOLOGIA"
      testoTopBar="🩺 STUDI DI DERMATOLOGIA E DERMATOLOGI A ROMA — AGGIORNATI A GENNAIO 2026"
      descrizioneMeta="Cerchi un dermatologo a Roma? Trova i migliori specialisti per mappatura nei, acne e malattie della pelle nei quartieri di Roma con contatti diretti."
      testoMiniSEO="In questa pagina trovi i migliori dermatologi a Roma, specializzati in mappatura dei nei, trattamento dell'acne, psoriasi e dermatologia estetica. Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un dermatologo a Roma disponibile per visite urgenti o controlli periodici."
      medici={medici}
      loading={loading}
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dentisti", link: "/dentisti-roma"},
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ginecologi", link: "/ginecologi-roma"}
      ]}
    />
  );
}
