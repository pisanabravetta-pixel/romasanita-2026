import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function GuideHub() {
 const guide = [
  { 
    title: "Costo Visita Ginecologica a Roma", 
    link: "/guide/costo-visita-ginecologica-roma", 
    desc: "Prezzi medi per un controllo ginecologico completo e pap-test nei vari quartieri di Roma." 
  },
  { 
    title: "Costo Visita Oculistica a Roma", 
    link: "/guide/costo-visita-oculistica-roma", 
    desc: "Quanto costa un controllo della vista e del fondo oculare nei migliori centri romani?" 
  },
  { 
    title: "Costo Risonanza Magnetica", 
    link: "/guide/costo-risonanza-magnetica-roma", 
    desc: "Prezzi per risonanza a ginocchio, schiena e articolazioni nei centri privati a Roma." 
  },
  { 
    title: "Costo Pulizia Denti a Roma", 
    link: "/guide/costo-pulizia-denti-roma", 
    desc: "Quanto costa una seduta di igiene orale professionale nei vari quartieri?" 
  },
  { 
    title: "Costo Visita Cardiologica", 
    link: "/guide/costo-visita-cardiologica-roma", 
    desc: "Prezzi medi e cosa include una visita specialistica al cuore a Roma." 
  },
  { 
    title: "Costo Visita Dermatologica", 
    link: "/guide/costo-visita-dermatologica-roma", 
    desc: "Guida ai costi per il controllo dei nei e visite dermatologiche." 
  },
  { 
    title: "Come trovare servizi sanitari", 
    link: "/guide/trovare-servizio-sanitario-roma", 
    desc: "Guida pratica all'uso del portale per i cittadini romani." 
  }
];

  return (
    <>
      <Head>
        <title>Guide Sanitarie e Costi Roma | ServiziSalute 2026</title>
        <meta name="description" content="Approfondimenti sulla salute a Roma: guide ai costi, esenzioni e consigli per trovare i migliori specialisti." />
      </Head>
      
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <Navbar />
        
       {/* HERO SEZIONE GUIDE */}
<section style={{ backgroundColor: '#f0fdf4', padding: '60px 20px', borderBottom: '1px solid #dcfce7', textAlign: 'center' }}>
  <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#065f46', marginBottom: '15px' }}>
    Guide alla Salute Roma
  </h1>
  <p style={{ fontSize: '18px', color: '#475569', maxWidth: '700px', margin: '0 auto' }}>
    Informazioni utili, costi medi e consigli pratici per orientarsi nella sanità romana aggiornati a {new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}.
  </p>
</section>

        {/* LISTA DELLE GUIDE CON SPAZIATURA DI SICUREZZA IN FONDO */}
        <section style={{ padding: '60px 20px 100px 20px', backgroundColor: 'white', minHeight: '60vh' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {guide.map((item, index) => (
 <a key={index} href={item.link} style={{ textDecoration: 'none' }}>
  <div style={{ 
    backgroundColor: '#ffffff', 
    padding: '30px', 
    borderRadius: '20px', 
    border: '2px solid #f1f5f9', 
    height: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
  }}
  className="card-guida"
  >
    <h3 style={{ color: '#1e3a8a', marginBottom: '12px', fontSize: '20px', fontWeight: '800' }}>
      {item.title} <span style={{ color: '#2563eb' }}>→</span>
    </h3>
    <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
      {item.desc}
    </p>
  </div>
</a>
              ))}
            </div>
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
