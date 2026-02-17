import React from 'react';

export default function Footer() {
 const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataAttuale = new Date();
  const dataStringa = `${mesi[dataAttuale.getMonth()]} ${dataAttuale.getFullYear()}`;
  return (
    <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', width: '100%', clear: 'both' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          
          {/* COLONNA 1: DESCRIZIONE */}
          <div>
            <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute.com</h4>
            <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
              ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
              Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
            </p>
{/* SEZIONE SOCIAL CON ICONE E LINK TESTATI */}
            <h5 style={{ color: 'white', fontSize: '14px', marginBottom: '10px', marginTop: '15px' }}>Seguici su:</h5>
            <div style={{ display: 'flex', gap: '15px' }}>
            <a href="https://www.instagram.com/servizisalute" target="_blank" rel="noopener noreferrer" style={{ color: '#a0aec0', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" width="18" height="18" alt="FB" /> Facebook
              </a>
             <a href="https://www.instagram.com/servizisalute/" target="_blank" rel="noopener noreferrer" style={{ color: '#a0aec0', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" width="18" height="18" alt="IG" /> Instagram
              </a>
            </div>
          </div>
        {/* COLONNA 2: PER GLI UTENTI (ORDINATA E COMPLETA) */}
          <div>
            <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
            <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>
            ● Disponibilità aggiornate: {dataStringa}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
             <li><a href="/quartieri-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
              
              {/* CATEGORIE NELL'ORDINE ESATTO RICHIESTO */}
              <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
              <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
              <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
              <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
              <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              
            {/* SEZIONE GUIDE */}
<li><a href="/guide/costo-visita-oculistica-roma" style={{ color: '#63b3ed', textDecoration: 'none' }}>Guida: Costo Visita Oculistica</a></li>
<li><a href="/guide/costo-risonanza-magnetica-roma" style={{ color: '#63b3ed', textDecoration: 'none' }}>Guida: Costo Risonanza Magnetica</a></li>
<li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#63b3ed', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
<li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#63b3ed', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
<li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#63b3ed', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
<li><a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#63b3ed', textDecoration: 'none' }}>Trovare servizi a Roma</a></li>
</ul>

{/* STATISTICA RICERCHE */}
            <p style={{ fontSize: '11px', color: '#a0aec0', marginTop: '15px', fontStyle: 'italic', borderTop: '1px solid #2d3748', paddingTop: '10px' }}>
              🔍 Oltre 15.000 ricerche mensili di pazienti registrate a Roma.
            </p>
          </div>
          {/* COLONNA 3: PROFESSIONISTI */}
          <div>
            <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
              <li><a href="/per-i-professionisti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Perché esserci</a></li>
              <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
              <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
            <li><a href="mailto:info@servizisalute.com" style={{ color: '#a0aec0', textDecoration: 'none' }}>Email: info@servizisalute.com</a></li>
            </ul>
            {/* BOX AD PICCOLO */}
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
              <p style={{ fontSize: '11px', color: '#feb2b2', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                ⚠️ ATTENZIONE: Richieste di specialisti in forte aumento nei quartieri Prati, Eur e Roma Centro.
              </p>
            </div>
          </div>

          {/* COLONNA 4: NOTE LEGALI + DISCLAIMER */}
          <div>
            <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
              <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
              <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
            </ul>
            {/* DISCLAIMER LEGALE RICHIESTO */}
            <p style={{ fontSize: '11px', color: '#718096', lineHeight: '1.4', fontStyle: 'italic', borderTop: '1px solid #2d3748', paddingTop: '10px', marginTop: '10px' }}>
  ServiziSalute è un portale <strong>indipendente</strong> di annunci <strong>pubblicitari</strong> e informazione. Non fornisce prestazioni sanitarie né consulenze mediche.
</p>
          </div>

        </div>

        {/* COPYRIGHT FINALE */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
 © {new Date().getFullYear()} <strong>ServiziSalute Roma</strong> – Portale Annunci Medici – Tutti i diritti riservati
</div>
      </div>
    </footer>
  );
}
