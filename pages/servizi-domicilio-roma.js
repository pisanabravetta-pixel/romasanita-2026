import React from 'react';
import HubLayout from '../components/HubLayout';
import { getSchemas } from '../lib/seo-logic';

export default function ServiziDomicilioRoma() {
  const schemas = getSchemas('servizi-domicilio', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  return (
    <HubLayout 
      titolo="Servizi a Domicilio a Roma"
      categoria="servizi-domicilio"
      colore="#d97706" 
      badgeSpec="🏠 DOMICILIO"
      testoTopBar="🏠 ASSISTENZA SANITARIA A DOMICILIO ROMA — GENNAIO 2026"
      descrizioneMeta="Hai bisogno di assistenza a casa? Trova infermieri e medici per visite a domicilio a Roma."
      testoMiniSEO="Servizi sanitari professionali direttamente a casa tua: assistenza, medicazioni, fisioterapia e visite specialistiche con i migliori professionisti di Roma."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Cardiologi Roma", link: "/cardiologi-roma"},
        {nome: "Dermatologi Roma", link: "/dermatologi-roma"},
        {nome: "Oculisti Roma", link: "/oculisti-roma"},
        {nome: "Ortopedici Roma", link: "/ortopedici-roma"},
        {nome: "Diagnostica Roma", link: "/diagnostica-roma"}
      ]}
    />
  );
}
