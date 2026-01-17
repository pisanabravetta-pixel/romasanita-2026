import React from 'react';
import HubLayout from '../components/HubLayout';

export default function ServiziDomicilioRoma() {
  const faq = [
    { q: "Come prenotare un infermiere a domicilio?", a: "Contatta direttamente i professionisti elencati per concordare orario e prestazione." },
    { q: "Quali zone di Roma sono coperte?", a: "Il servizio copre tutti i principali quartieri all'interno e all'esterno del GRA." }
  ];

  return (
    <HubLayout 
      titolo="Servizi a Domicilio a Roma"
      categoria="servizi-domicilio"
      colore="#d97706" 
      badgeSpec="🏠 DOMICILIO"
      testoTopBar="🏠 ASSISTENZA SANITARIA A DOMICILIO ROMA — GENNAIO 2026"
      testoMiniSEO="Trova assistenza sanitaria professionale direttamente a casa tua: infermieri, fisioterapisti e medici per visite domiciliari rapide e sicure a Roma."
      descrizioneMeta="Servizi a domicilio a Roma: assistenza infermieristica e medica h24."
      quartieri={["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia"]}
      faq={faq}
      altreSpecialistiche={[
        {nome: "Cardiologi", link: "/cardiologi-roma"},
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"}
      ]}
    />
  );
}
