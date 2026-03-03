import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function GuideHub() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  const guideEsistenti = [
    {
      title: "Costo Visita Cardiologica a Roma",
      link: "/guide/costo-visita-cardiologica-roma",
      desc: "Prezzi medi (80–160 €) e cosa include una visita specialistica al cuore a Roma. ECG incluso o no.",
      colore: "#e53e3e",
      icon: "❤️"
    },
    {
      title: "Costo Visita Ginecologica a Roma",
      link: "/guide/costo-visita-ginecologica-roma",
      desc: "Prezzi medi per un controllo ginecologico completo e pap-test nei vari quartieri di Roma.",
      colore: "#db2777",
      icon: "🩺"
    },
    {
      title: "Costo Visita Oculistica a Roma",
      link: "/guide/costo-visita-oculistica-roma",
      desc: "Quanto costa un controllo della vista e del fondo oculare nei migliori centri romani?",
      colore: "#0891b2",
      icon: "👁️"
    },
    {
      title: "Costo Visita Dermatologica a Roma",
      link: "/guide/costo-visita-dermatologica-roma",
      desc: "Guida ai costi per il controllo dei nei, dermatiti e visite dermatologiche a Roma.",
      colore: "#d97706",
      icon: "🔬"
    },
    {
      title: "Costo Risonanza Magnetica Roma",
      link: "/guide/costo-risonanza-magnetica-roma",
      desc: "Prezzi per risonanza a ginocchio, schiena e articolazioni nei centri privati a Roma.",
      colore: "#7c3aed",
      icon: "🧲"
    },
    {
      title: "Costo Pulizia Denti a Roma",
      link: "/guide/costo-pulizia-denti-roma",
      desc: "Quanto costa una seduta di igiene orale professionale nei vari quartieri di Roma?",
      colore: "#059669",
      icon: "🦷"
    },
    {
      title: "Come Trovare Servizi Sanitari a Roma",
      link: "/guide/trovare-servizio-sanitario-roma",
      desc: "Guida pratica all'uso del portale per i cittadini romani.",
      colore: "#0369a1",
      icon: "🏥"
    },
  ];

  const guideNuove = [
    {
      title: "Costo Visita Ortopedica a Roma",
      link: "/guide/costo-visita-ortopedica-roma",
      desc: "Prezzi (80–180 €) per schiena, ginocchio, spalla e tutte le articolazioni. Quando evitare di aspettare.",
      colore: "#2563eb",
      icon: "🦴"
    },
    {
      title: "Costo Psicologo a Roma",
      link: "/guide/costo-psicologo-roma",
      desc: "Prezzi per seduta (60–120 €), Bonus Psicologo SSN e come trovare il professionista giusto.",
      colore: "#7c3aed",
      icon: "🧠"
    },
    {
      title: "Costo Nutrizionista a Roma",
      link: "/guide/costo-nutrizionista-roma",
      desc: "Prima visita 80–120 €, controlli da 40 €. Differenza nutrizionista, dietologo e dietista.",
      colore: "#16a34a",
      icon: "🥗"
    },
    {
      title: "Costo Ecografia Privata Roma",
      link: "/guide/costo-ecografia-privata-roma",
      desc: "Prezzi per distretto: addome 80–120 €, tiroide 60–80 €, pelvica 70–100 €. Senza ricetta.",
      colore: "#0891b2",
      icon: "🔬"
    },
    {
      title: "Analisi del Sangue Private Roma",
      link: "/guide/analisi-sangue-private-roma",
      desc: "Emocromo da 15 €, profilo metabolico 40–80 €. Senza ricetta, risultati in giornata.",
      colore: "#dc2626",
      icon: "🧪"
    },
    {
      title: "Check-Up Completo Roma",
      link: "/guide/check-up-completo-roma",
      desc: "Pacchetto base da 150 €, completo fino a 400 €. Cosa include e con quale frequenza farlo.",
      colore: "#0369a1",
      icon: "📋"
    },
    {
      title: "Costo TAC Privata Roma",
      link: "/guide/costo-tac-privata-roma",
      desc: "Prezzi per distretto: cranio 150–200 €, addome con contrasto 250–400 €. In 24–48 ore.",
      colore: "#6d28d9",
      icon: "🏥"
    },
    {
      title: "Costo Fisioterapia a Roma",
      link: "/guide/costo-fisioterapia-roma",
      desc: "Seduta standard 50–70 €, tecar e onde d'urto 60–90 €. Quante sedute servono per ogni problema.",
      colore: "#ea580c",
      icon: "💪"
    },
  ];

  const CardGuida = ({ item }) => (
    <a href={item.link} style={{ textDecoration: 'none' }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '28px',
        borderRadius: '20px',
        border: `2px solid #f1f5f9`,
        height: '100%',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        borderTop: `4px solid ${item.colore}`,
      }}
        className="card-guida"
      >
        <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
        <h3 style={{ color: '#1e3a8a', marginBottom: '10px', fontSize: '18px', fontWeight: '800', lineHeight: '1.3' }}>
          {item.title} <span style={{ color: item.colore }}>→</span>
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          {item.desc}
        </p>
      </div>
    </a>
  );

  return (
    <>
      <Head>
        <title>Guide Sanitarie e Costi Roma {new Date().getFullYear()} | ServiziSalute</title>
        <meta name="description" content={`Guide ai costi dei servizi sanitari privati a Roma, aggiornate a ${mese}. Prezzi visite specialistiche, esami diagnostici, fisioterapia e molto altro.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Guide Sanitarie e Costi Roma ${new Date().getFullYear()} | ServiziSalute`} />
        <meta property="og:description" content={`Guide ai prezzi dei servizi sanitari privati a Roma aggiornate a ${mese}. Visite, esami, fisioterapia e check-up.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide" />
        <meta property="og:type" content="website" />
      </Head>

      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <Navbar />

        {/* HERO */}
        <section style={{ backgroundColor: '#f0fdf4', padding: '60px 20px', borderBottom: '1px solid #dcfce7', textAlign: 'center' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#065f46', marginBottom: '15px' }}>
            Guide ai Costi Sanitari a Roma
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', maxWidth: '750px', margin: '0 auto 20px' }}>
            Prezzi aggiornati a <strong>{mese}</strong> per visite specialistiche, esami diagnostici, fisioterapia e check-up. Confronto privato vs SSN, tempi di attesa e dove prenotare.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <span style={{ backgroundColor: '#dcfce7', color: '#065f46', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700' }}>✅ {guideEsistenti.length + guideNuove.length} guide disponibili</span>
            <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700' }}>📅 Aggiornate a {mese}</span>
            <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700' }}>⚖️ Con disclaimer legale</span>
          </div>
        </section>

        {/* GUIDE ESISTENTI */}
        <section style={{ padding: '60px 20px 40px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ color: '#065f46', fontSize: '28px', fontWeight: '900', marginBottom: '8px' }}>
              Guide Visite Specialistiche
            </h2>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>Costi delle principali visite mediche specialistiche private a Roma.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
              {guideEsistenti.map((item, index) => (
                <CardGuida key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* NUOVE GUIDE */}
        <section style={{ padding: '40px 20px 100px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', marginBottom: '8px' }}>
              Altre Guide Sanitarie
            </h2>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>Ecografie, analisi del sangue, fisioterapia, check-up e molto altro.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
              {guideNuove.map((item, index) => (
                <CardGuida key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA BOX */}
        <section style={{ backgroundColor: '#065f46', padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '900', marginBottom: '15px' }}>
            Cerchi un professionista sanitario a Roma?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Usa ServiziSalute.com per trovare specialisti, dentisti, diagnostica e servizi sanitari vicino a te.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            <a href="/visite-specialistiche-roma" style={{ backgroundColor: 'white', color: '#065f46', fontWeight: '800', textDecoration: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px' }}>
              Visite Specialistiche →
            </a>
            <a href="/diagnostica-roma" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: '800', textDecoration: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', border: '2px solid rgba(255,255,255,0.4)' }}>
              Diagnostica e Analisi →
            </a>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx>{`
        .card-guida:hover {
          border-color: #065f46 !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
