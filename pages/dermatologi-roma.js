import React, { useEffect, useState } from 'react';
import HubLayout from '../components/HubLayout';
import { getSchemas } from '../lib/seo-logic';

export default function DermatologiRoma() {
  const [loading, setLoading] = useState(true);

  const schemas = getSchemas('dermatologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    setLoading(false); // HubLayout gestirà il fetch dei dermatologi
  }, []);

  return (
    <HubLayout 
  titolo="Dermatologi"
  categoria="visite-specialistiche (dermatologo)"  // <-- QUI la stringa esatta del DB
  colore="#059669" 
  loading={loading}
  quartieri={quartieri}
  schemas={schemas}
  testoCTA="Gestisci uno Studio Dermatologico?"
  badgeSpec="🩺 DERMATOLOGIA"
  testoTopBar="🩺 STUDI DI DERMATOLOGIA E DERMATOLOGI A ROMA — AGGIORNATI A GENNAIO 2026"
  descrizioneMeta="Cerchi un dermatologo a Roma? Trova i migliori specialisti per mappatura nei, acne e malattie della pelle nei quartieri di Roma con contatti diretti."
  testoMiniSEO="In questa pagina trovi i migliori dermatologi a Roma, specializzati in mappatura dei nei, trattamento dell'acne, psoriasi e dermatologia estetica. Contatta direttamente i professionisti del tuo quartiere o filtra per zona per trovare un dermatologo a Roma disponibile per visite urgenti o controlli periodici."
  altreSpecialistiche={[
    {nome: "Dentisti", link: "/dentisti-roma"},
    {nome: "Cardiologi", link: "/cardiologi-roma"},
    {nome: "Diagnostica", link: "/diagnostica-roma"},
    {nome: "Oculisti", link: "/oculisti-roma"},
    {nome: "Ginecologi", link: "/ginecologi-roma"}
   ]}
    />  {/* <-- CHIUSURA CORRETTA */}
  );
}
