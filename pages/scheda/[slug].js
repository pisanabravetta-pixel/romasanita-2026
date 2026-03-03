import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";
import { trackChiama, trackWhatsApp, trackMappa } from "../../lib/analytics";

// Prezzi indicativi per categoria
const prezziIndicativi = {
  farmacie:            [{ servizio: "Misurazione pressione", min: 2, max: 5 }, { servizio: "Test glicemia", min: 5, max: 10 }, { servizio: "Noleggio presidi", min: 10, max: 30 }],
  dentisti:            [{ servizio: "Visita odontoiatrica", min: 50, max: 100 }, { servizio: "Pulizia denti", min: 60, max: 120 }, { servizio: "Otturazione", min: 80, max: 150 }],
  diagnostica:         [{ servizio: "Ecografia addome", min: 80, max: 120 }, { servizio: "Risonanza magnetica", min: 150, max: 350 }, { servizio: "TAC", min: 150, max: 400 }],
  'centri-diagnostici':[{ servizio: "Ecografia", min: 60, max: 110 }, { servizio: "Radiografia", min: 40, max: 80 }],
  'servizi-domicilio': [{ servizio: "Prelievo sangue", min: 30, max: 50 }, { servizio: "Medicazione", min: 40, max: 70 }, { servizio: "Iniezione", min: 25, max: 45 }],
  specialisti:         [{ servizio: "Visita specialistica", min: 70, max: 120 }],
  cardiologi:          [{ servizio: "Visita cardiologica", min: 80, max: 160 }, { servizio: "ECG", min: 30, max: 60 }, { servizio: "Ecocardiogramma", min: 120, max: 200 }],
  psicologi:           [{ servizio: "Colloquio psicologico", min: 60, max: 120 }, { servizio: "Seduta terapia", min: 60, max: 120 }, { servizio: "Prima visita", min: 80, max: 130 }],
  dermatologi:         [{ servizio: "Visita dermatologica", min: 65, max: 150 }, { servizio: "Controllo nei", min: 80, max: 160 }, { servizio: "Dermoscopia", min: 90, max: 170 }],
  ginecologi:          [{ servizio: "Visita ginecologica", min: 70, max: 150 }, { servizio: "Pap-test", min: 50, max: 90 }, { servizio: "Ecografia pelvica", min: 80, max: 130 }],
  nutrizionisti:       [{ servizio: "Prima visita", min: 80, max: 120 }, { servizio: "Piano alimentare", min: 80, max: 130 }, { servizio: "Controllo follow-up", min: 40, max: 70 }],
  ortopedici:          [{ servizio: "Visita ortopedica", min: 80, max: 180 }, { servizio: "Infiltrazione", min: 100, max: 200 }, { servizio: "Controllo post-operatorio", min: 70, max: 130 }],
  oculisti:            [{ servizio: "Visita oculistica", min: 60, max: 130 }, { servizio: "Fondo oculare", min: 80, max: 150 }, { servizio: "Campo visivo", min: 70, max: 120 }],
};

// Servizi fittizi per categoria (mostrati con lucchetto)
const serviziPerCategoria = {
  farmacie:            ["Farmaci da banco", "Misurazione pressione", "Test rapidi", "Noleggio presidi", "Preparazioni galeniche", "Consegna a domicilio"],
  dentisti:            ["Visita odontoiatrica", "Pulizia professionale", "Sbiancamento", "Otturazioni", "Implantologia", "Ortodonzia", "Chirurgia orale"],
  diagnostica:         ["Ecografia", "Risonanza magnetica", "TAC", "Radiografia", "Mammografia", "MOC", "Analisi del sangue"],
  'servizi-domicilio': ["Prelievo sangue", "Medicazioni", "Iniezioni", "Terapia infusionale", "Assistenza infermieristica", "Fisioterapia domiciliare"],
  cardiologi:          ["Visita cardiologica", "ECG a riposo", "Ecocardiogramma", "Holter cardiaco", "Test da sforzo", "Visita di controllo"],
  psicologi:           ["Colloquio individuale", "Terapia cognitivo-comportamentale", "Supporto psicologico", "Valutazione psicodiagnostica", "Terapia di coppia"],
  dermatologi:         ["Visita dermatologica", "Mappatura nei", "Dermoscopia", "Trattamento acne", "Crioterapia", "Patch test allergie"],
  ginecologi:          ["Visita ginecologica", "Pap-test", "Ecografia pelvica", "Colposcopia", "Consulenza contraccettiva", "Visita in gravidanza"],
  nutrizionisti:       ["Prima visita nutrizionale", "Piano alimentare personalizzato", "Analisi composizione corporea", "Follow-up mensile", "Consulenza sportiva"],
  ortopedici:          ["Visita ortopedica", "Valutazione colonna", "Infiltrazioni", "PRP", "Valutazione ginocchio/spalla", "Controllo post-operatorio"],
  oculisti:            ["Visita oculistica", "Fondo oculare", "Campo visivo", "Tonometria", "OCT retina", "Valutazione per occhiali/lenti"],
};

// Orari fittizi — mostrati con lucchetto
const ORARI_FITTIZI = [
  { g: "Lunedì",    o: "09:00 – 13:00 / 15:00 – 19:00" },
  { g: "Martedì",   o: "09:00 – 13:00 / 15:00 – 19:00" },
  { g: "Mercoledì", o: "09:00 – 13:00" },
  { g: "Giovedì",   o: "09:00 – 13:00 / 15:00 – 19:00" },
  { g: "Venerdì",   o: "09:00 – 13:00 / 15:00 – 19:00" },
  { g: "Sabato",    o: "09:00 – 12:30" },
  { g: "Domenica",  o: "Chiuso" },
];

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchDati() {
      try {
        const { data } = await supabase.from("annunci").select("*").eq("slug", slug).single();
        if (data) setDato(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    fetchDati();
  }, [slug]);

  // Mappa Leaflet
  useEffect(() => {
    if (!dato || !dato.lat || !dato.lng) return;
    const caricaMappa = () => {
      if (typeof L === 'undefined') { setTimeout(caricaMappa, 200); return; }
      const container = L.DomUtil.get('map-scheda');
      if (container) { container._leaflet_id = null; }
      if (window.mapInstance) { window.mapInstance.remove(); }
      try {
        const lat = parseFloat(dato.lat);
        const lng = parseFloat(dato.lng);
        const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([lat, lng], 16);
        window.mapInstance = map;
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OSM' }).addTo(map);
        L.marker([lat, lng]).addTo(map).bindPopup(`<b>${dato.nome}</b>`).openPopup();
        setTimeout(() => { map.invalidateSize(); }, 400);
      } catch (e) { console.error("Errore mappa:", e); }
    };
    caricaMappa();
    return () => { if (window.mapInstance) { window.mapInstance.remove(); window.mapInstance = null; } };
  }, [dato]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', fontSize: '18px' }}>⏳ Caricamento scheda...</div>;
  if (!dato) return <div style={{ padding: '100px', textAlign: 'center' }}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";
  const categoria = dato.categoria || "Specialista";

  const cleanSlug = (text) => text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
  const catSlug = cleanSlug(categoria);
  const zonaSlug = cleanSlug(nomeZona);

  // Trova prezzi e servizi per questa categoria
  const catKey = Object.keys(prezziIndicativi).find(k => categoria.toLowerCase().includes(k.replace(/-/g, ' ').replace(/i$/, '').replace(/e$/, ''))) || 'specialisti';
  const prezzi = prezziIndicativi[catKey] || prezziIndicativi['specialisti'];
  const servizi = serviziPerCategoria[catKey] || serviziPerCategoria['cardiologi'];

  // Testo SEO auto-generato
  const generaTestoSEO = () => {
    const v = dato.id % 3;
    const nome = dato.nome;
    const indirizzo = dato.indirizzo;
    const zona = nomeZona;
    const cat = categoria.toLowerCase();
    const isFarmacia = cat.includes("farmac");
    const isDentista = cat.includes("dent");
    const isDiagnostica = cat.includes("diagnost");
    const isDomicilio = cat.includes("domicilio");

    if (isFarmacia) {
      if (v === 0) return `La ${nome} si trova in ${indirizzo}, nel quartiere ${zona} di Roma. Rappresenta un presidio sanitario territoriale a servizio dei residenti della zona. Per informazioni aggiornate su orari, turni o disponibilità di prodotti, è consigliabile contattare direttamente la farmacia.`;
      if (v === 1) return `Situata nel quartiere ${zona}, la ${nome} è una farmacia con sede in ${indirizzo}. Questa pagina riporta indirizzo e posizione per facilitarne l'individuazione. Per dettagli operativi o chiarimenti sui servizi disponibili è opportuno rivolgersi direttamente al punto vendita.`;
      return `Nel territorio di Roma ${zona} è presente la ${nome}, con sede in ${indirizzo}. La farmacia offre supporto sanitario di prossimità per i cittadini della zona. Per ricevere informazioni specifiche si invita a utilizzare i contatti ufficiali indicati in pagina.`;
    }
    if (isDentista) {
      if (v === 0) return `${nome} opera come studio odontoiatrico nel quartiere ${zona} di Roma, in ${indirizzo}. La scheda consente di visualizzare la posizione e accedere ai recapiti ufficiali. Per informazioni su visite o trattamenti è necessario contattare direttamente lo studio.`;
      if (v === 1) return `Lo studio dentistico ${nome} si trova in ${indirizzo}, zona ${zona} a Roma. Questa pagina riporta le informazioni utili per individuare la sede e mettersi in contatto con il professionista.`;
      return `Nel quartiere ${zona} di Roma è presente ${nome}, realtà odontoiatrica con sede in ${indirizzo}. La localizzazione precisa e i recapiti consentono un contatto diretto con lo studio.`;
    }
    if (isDiagnostica) {
      if (v === 0) return `${nome} è una struttura di diagnostica situata in ${indirizzo}, nel quartiere ${zona} di Roma. La scheda fornisce i riferimenti utili per individuare la sede e richiedere informazioni direttamente alla struttura.`;
      if (v === 1) return `Situato a Roma ${zona}, in ${indirizzo}, ${nome} rientra tra i centri di diagnostica presenti sul territorio. Per conoscere modalità di accesso o informazioni operative è consigliabile contattare direttamente la sede.`;
      return `Nel quartiere ${zona} opera ${nome}, centro di diagnostica con sede in ${indirizzo}. La pagina consente di visualizzare la posizione e accedere ai recapiti ufficiali per ogni richiesta informativa.`;
    }
    if (isDomicilio) {
      if (v === 0) return `${nome} fornisce servizi a domicilio nell'area di Roma ${zona}. La sede amministrativa risulta in ${indirizzo}. Per informazioni sulle modalità di intervento o disponibilità è necessario contattare direttamente il servizio.`;
      if (v === 1) return `Operativo nel quartiere ${zona} di Roma, ${nome} offre servizi sanitari a domicilio. La pagina riporta i recapiti utili per richiedere informazioni direttamente al referente del servizio.`;
      return `${nome} è attivo nell'area di Roma ${zona} per servizi a domicilio, con riferimento in ${indirizzo}. Per dettagli organizzativi o richieste specifiche si invita a contattare direttamente la struttura.`;
    }
    if (v === 0) return `${nome} opera come ${categoria} nel quartiere ${zona} di Roma, con studio in ${indirizzo}. La scheda riporta la localizzazione e i riferimenti utili per contattare direttamente il professionista.`;
    if (v === 1) return `Lo studio di ${nome}, specializzato in ${categoria}, si trova in ${indirizzo} a Roma ${zona}. Questa pagina consente di individuare facilmente la sede e accedere ai recapiti ufficiali.`;
    return `Nel territorio di Roma ${zona} è presente ${nome}, ${categoria}, con sede in ${indirizzo}. Per informazioni su attività e disponibilità è opportuno rivolgersi direttamente allo studio tramite i contatti indicati.`;
  };

  const schemaType = categoria.toLowerCase().includes('farmac') ? 'Pharmacy' :
    (categoria.toLowerCase().includes('dentist') ? 'Dentist' : 'Physician');

  // Stile lucchetto sezione premium
  const sezioneLock = {
    position: 'relative',
    borderRadius: '14px',
    border: '2px dashed #cbd5e1',
    padding: '20px',
    marginBottom: '24px',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  };
  const overlayLock = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(248,250,252,0.82)',
    backdropFilter: 'blur(3px)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: '12px', zIndex: 2,
    gap: '8px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>{dato.nome} – {categoria} a Roma {nomeZona} | ServiziSalute</title>
        <meta name="description" content={`${dato.nome} a Roma ${nomeZona}. Indirizzo: ${dato.indirizzo}. Contatti diretti, mappa e prezzi indicativi per ${categoria} a Roma.`} />
        <link rel="canonical" href={`https://www.servizisalute.com/scheda/${dato.slug}`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org", "@type": schemaType,
                "name": dato.nome,
                "url": `https://www.servizisalute.com/scheda/${dato.slug}`,
                "telephone": dato.telefono || "",
                "address": { "@type": "PostalAddress", "streetAddress": dato.indirizzo, "addressLocality": "Roma", "addressRegion": "Lazio", "postalCode": "00100", "addressCountry": "IT" },
                "geo": { "@type": "GeoCoordinates", "latitude": dato.lat, "longitude": dato.lng }
              },
              {
                "@context": "https://schema.org", "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.com/" },
                  { "@type": "ListItem", "position": 2, "name": `${categoria} Roma ${nomeZona}`, "item": `https://www.servizisalute.com/${catSlug}-roma-${zonaSlug}` },
                  { "@type": "ListItem", "position": 3, "name": dato.nome, "item": `https://www.servizisalute.com/scheda/${dato.slug}` }
                ]
              }
            ])
          }}
        />
      </Head>

      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />
      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '860px', margin: '0 auto', width: '100%' }}>

        {/* BREADCRUMB */}
        <div style={{ fontSize: '13px', marginBottom: '16px', color: '#64748b' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#0284c7' }}>Home</a>
          {' > '}
          <a href={`/${catSlug}-roma-${zonaSlug}`} style={{ textDecoration: 'none', color: '#0284c7' }}>{categoria} Roma {nomeZona}</a>
          {' > '}
          <span style={{ color: '#1e293b' }}>{dato.nome}</span>
        </div>

        {/* CARD PRINCIPALE */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', marginBottom: '20px' }}>

          {/* HEADER */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {/* Avatar placeholder */}
            <div style={{ width: '70px', height: '70px', borderRadius: '16px', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
              {categoria.toLowerCase().includes('farmac') ? '💊' :
               categoria.toLowerCase().includes('dent') ? '🦷' :
               categoria.toLowerCase().includes('cardiol') ? '❤️' :
               categoria.toLowerCase().includes('psicol') ? '🧠' :
               categoria.toLowerCase().includes('dermatol') ? '🔬' :
               categoria.toLowerCase().includes('ginecol') ? '🩺' :
               categoria.toLowerCase().includes('nutriz') ? '🥗' :
               categoria.toLowerCase().includes('ortoped') ? '🦴' :
               categoria.toLowerCase().includes('oculist') ? '👁️' :
               categoria.toLowerCase().includes('diagnost') ? '🏥' : '🩺'}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ color: '#1e293b', fontSize: '1.6rem', fontWeight: '900', margin: '0 0 6px 0', lineHeight: '1.2' }}>
                {dato.nome}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '700' }}>
                  {categoria}
                </span>
                <span style={{ color: '#64748b', fontSize: '13px' }}>📍 {nomeZona}, Roma</span>
              </div>
            </div>
          </div>

          {/* TESTO SEO */}
          <div style={{ marginBottom: '24px', lineHeight: '1.8', color: '#475569', fontSize: '15px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #0284c7' }}>
            <p style={{ margin: 0 }}>{generaTestoSEO()}</p>
          </div>

          {/* INFO PRINCIPALI */}
          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '14px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px', color: '#1e293b', marginTop: 0 }}>📋 Informazioni Principali</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
              <li style={{ fontSize: '15px', color: '#334155' }}><strong>📍 Indirizzo:</strong> {dato.indirizzo}</li>
              <li style={{ fontSize: '15px', color: '#334155' }}><strong>🏠 Zona:</strong> {nomeZona}, Roma</li>
              <li style={{ fontSize: '15px', color: '#334155' }}><strong>🩺 Specialità:</strong> {categoria}</li>
              {dato.telefono && <li style={{ fontSize: '15px', color: '#334155' }}><strong>📞 Telefono:</strong> {dato.telefono}</li>}
            </ul>
          </div>

          {/* CTA BOTTONI */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <a
              href={`tel:${dato.telefono}`}
              onClick={() => trackChiama(dato.nome, dato.categoria, dato.zona)}
              style={{ flex: 1, minWidth: '150px', backgroundColor: '#0284c7', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}
            >📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a
                href={`https://wa.me/39${dato.whatsapp}`}
                onClick={() => trackWhatsApp(dato.nome, dato.categoria, dato.zona)}
                style={{ flex: 1, minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '15px' }}
              >💬 WHATSAPP</a>
            )}
          </div>

          {/* ═══ SEZIONE ORARI — PREMIUM LOCK ═══ */}
          <div style={sezioneLock}>
            {/* Contenuto sfocato sotto */}
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginTop: 0, marginBottom: '14px' }}>🕐 Orari di Apertura</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <tbody>
                {ORARI_FITTIZI.map(({ g, o }) => (
                  <tr key={g} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px 0', fontWeight: '600', color: '#334155', width: '110px' }}>{g}</td>
                    <td style={{ padding: '8px 0', color: '#64748b' }}>{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Overlay lucchetto */}
            <div style={overlayLock}>
              <span style={{ fontSize: '32px' }}>🔒</span>
              <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '15px' }}>Orari non disponibili</span>
              <span style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', maxWidth: '260px' }}>
                Il titolare non ha ancora aggiornato gli orari. Contatta direttamente la struttura.
              </span>
            </div>
          </div>

          {/* ═══ SEZIONE SERVIZI — PREMIUM LOCK ═══ */}
          <div style={sezioneLock}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginTop: 0, marginBottom: '14px' }}>🏥 Servizi Offerti</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {servizi.map((s, i) => (
                <span key={i} style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{s}</span>
              ))}
            </div>
            <div style={overlayLock}>
              <span style={{ fontSize: '32px' }}>🔒</span>
              <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '15px' }}>Servizi non confermati</span>
              <span style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', maxWidth: '260px' }}>
                I servizi mostrati sono indicativi. Il titolare non ha ancora verificato questa scheda.
              </span>
            </div>
          </div>

          {/* ═══ SEZIONE FOTO — PREMIUM LOCK ═══ */}
          <div style={sezioneLock}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginTop: 0, marginBottom: '14px' }}>📷 Foto Studio / Struttura</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: '90px', backgroundColor: '#e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🏥</div>
              ))}
            </div>
            <div style={overlayLock}>
              <span style={{ fontSize: '32px' }}>🔒</span>
              <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '15px' }}>Foto non disponibili</span>
              <span style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', maxWidth: '260px' }}>
                Il titolare non ha ancora caricato le foto della struttura.
              </span>
            </div>
          </div>

          {/* PREZZI INDICATIVI — visibili a tutti */}
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#065f46', marginTop: 0, marginBottom: '14px' }}>
              💶 Prezzi Indicativi — {categoria} a Roma
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: 0, marginBottom: '12px' }}>
              ⚠️ Tariffe medie di mercato a Roma. I prezzi reali dipendono dalla struttura e dal caso clinico.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #bbf7d0' }}>
                  <th style={{ textAlign: 'left', padding: '8px 0', fontSize: '13px', color: '#065f46' }}>Prestazione</th>
                  <th style={{ textAlign: 'right', padding: '8px 0', fontSize: '13px', color: '#065f46' }}>Range prezzo</th>
                </tr>
              </thead>
              <tbody>
                {prezzi.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #d1fae5' }}>
                    <td style={{ padding: '10px 0', fontSize: '14px', color: '#334155' }}>{p.servizio}</td>
                    <td style={{ padding: '10px 0', fontSize: '14px', fontWeight: '700', color: '#065f46', textAlign: 'right' }}>
                      € {p.min} – {p.max}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MAPPA */}
          <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: '#1e293b' }}>🗺️ Posizione sulla Mappa</h2>
          <div id="map-scheda" style={{ height: '380px', width: '100%', borderRadius: '14px', border: '1px solid #cbd5e1', zIndex: 1 }}></div>

          <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />

          <p style={{ textAlign: 'center', margin: 0 }}>
            ← <a href={`/${catSlug}-roma-${zonaSlug}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
              Torna a {categoria} {nomeZona}
            </a>
          </p>
        </div>

        {/* ═══ BANNER "SEI IL TITOLARE?" ═══ */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)',
          borderRadius: '20px', padding: '30px', color: 'white',
          display: 'flex', flexWrap: 'wrap', gap: '20px',
          alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '20px', boxShadow: '0 8px 24px rgba(2,132,199,0.3)'
        }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>
              🏥 Sei il titolare di questa struttura?
            </div>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', lineHeight: '1.6' }}>
              Rivendica la tua scheda e aggiorna <strong>orari, servizi, foto e descrizione</strong>.<br />
              Più informazioni = più pazienti che ti contattano direttamente.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '14px', flexWrap: 'wrap', fontSize: '13px', opacity: 0.85 }}>
              <span>✅ Orari aggiornati</span>
              <span>✅ Foto struttura</span>
              <span>✅ Servizi verificati</span>
              <span>✅ Posizione in cima</span>
            </div>
          </div>
          <a
            href="/pubblica-annuncio"
            style={{
              backgroundColor: 'white', color: '#1e3a8a',
              fontWeight: '900', textDecoration: 'none',
              padding: '14px 28px', borderRadius: '14px',
              fontSize: '15px', whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            Rivendica GRATIS 🆓 →
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
