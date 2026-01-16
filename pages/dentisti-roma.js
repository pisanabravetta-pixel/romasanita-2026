import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import HubLayout from '../components/HubLayout';

export default function DentistiRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      try {
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', '%dentist%') // Filtra per dentisti
          .order('is_top', { ascending: false });

        if (!error && data) setMedici(data);
      } catch (err) {
        console.error("Errore caricamento dentisti:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  return (
    <HubLayout 
      titolo="Dentisti" 
      categoria="dentisti" 
      colore="#2563eb" // Blu medico classico per i dentisti
      medici={medici} 
      loading={loading} 
      quartieri={quartieri} 
    />
  );
}
