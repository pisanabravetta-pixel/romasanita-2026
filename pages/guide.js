import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function GuideHub() {
  const guide = [
    { title: "Costo Pulizia Denti a Roma", link: "/guide/costo-pulizia-denti-roma", desc: "Quanto costa una seduta di igiene orale professionale nei vari quartieri?" },
    { title: "Costo Visita Cardiologica", link: "/guide/costo-visita-cardiologica-roma", desc: "Prezzi medi e cosa include una visita specialistica al cuore a Roma." },
    { title: "Costo Visita Dermatologica", link: "/guide/costo-visita-dermatologica-roma", desc: "Guida ai costi per il controllo dei nei e visite dermatologiche." },
    { title: "Come trovare servizi sanitari", link: "/guide/trovare-servizio-sanitario-roma", desc: "Guida pratica all'uso del portale per i cittadini romani." }
  ];

  return (
    <>
      <Head>
        <title>Guide Sanitarie e Costi Roma | ServiziSalute 2026</title>
        <meta name="description" content="Approfondimenti sulla salute a Roma: guide ai costi, esenzioni e consigli per trovare i migliori specialisti nella capitale." />
      </Head>
      <Navbar />
      <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '80vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#1e3a8a', marginBottom: '10px' }}>Guide alla Salute Roma</h1>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>Informazioni utili, costi medi e consigli pratici per orientarsi nella sanità romana.</p>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {guide.map((item, index) => (
              <a key={index} href={item.link} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}>
                  <h3 style={{ color: '#065f46', margin: '0 0 10px 0', fontSize: '20px' }}>{item.title} →</h3>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
