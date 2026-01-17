import React from 'react';
import HubLayout from '../components/HubLayout';
import { getSchemas } from '../lib/seo-logic';

export default function CardiologiRoma() {
  const schemas = getSchemas('cardiologi', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  return (
    <HubLayout 
      titolo="Cardiologi a Roma"
      categoria="cardiologi" 
      colore="#e11d48" 
      badgeSpec="❤️ CARDIOLOGIA"
      testoTopBar="❤️ VISITE CARDIOLOGICHE ROMA — GENNAIO 2026"
      descrizioneMeta="Trova i migliori cardiologi a Roma per visite specialistiche ed ECG."
      testoMiniSEO="Specialisti in cardiologia per la salute del tuo cuore: controlli, ECG e prevenzione a Roma."
      quartieri={quartieri}
      schemas={schemas}
      altreSpecialistiche={[
        {nome: "Dermatologi", link: "/dermatologi-roma"},
        {nome: "Oculisti", link: "/oculisti-roma"},
        {nome: "Ortopedici", link: "/ortopedici-roma"},
        {nome: "Diagnostica", link: "/diagnostica-roma"},
        {nome: "Servizi a Domicilio", link: "/servizi-domicilio-roma"}
      ]}
    />
  );
}
