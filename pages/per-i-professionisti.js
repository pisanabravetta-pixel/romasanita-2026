import Head from 'next/head';

export default function PerIProfessionisti() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      <Head>
        <title>Visibilità Online per Medici e Professionisti Sanitari Roma | ServiziSalute</title>
        <meta name="description" content="Aumenta la visibilità del tuo studio medico a Roma. Scopri come trovare nuovi pazienti e pubblicizzare la tua attività sanitaria gratuitamente." />
      </Head>

      {/* HEADER */}
      <header style={{ padding: '20px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
        <a href="/" style={{ fontSize: '24px', fontWeight: '800', color: '#0070f3', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* SEZIONE SEO-TARGETED */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '36px', color: '#1e3a8a', marginBottom: '20px' }}>
            Come trovare nuovi pazienti a Roma nel 2026
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Se sei un medico, un dentista o gestisci una struttura sanitaria, sai che la competizione nella Capitale è altissima. 
            <strong> ServiziSalute</strong> nasce per darti visibilità locale gratuita dove i pazienti cercano davvero.
          </p>
        </section>

        {/* I 3 VANTAGGI (PUNTO 2 DEL TUO PIANO) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#2563eb' }}>📍 Posizionamento Locale</h3>
            <p style={{ fontSize: '14px' }}>Compari nelle ricerche specifiche per il tuo quartiere (Prati, Eur, Roma Nord, ecc.).</p>
          </div>
          <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#2563eb' }}>🚀 Zero Costi Pubblicitari</h3>
            <p style={{ fontSize: '14px' }}>A differenza di Google Ads o altri portali, la pubblicazione dell'annuncio base su ServiziSalute è gratuita.</p>
          </div>
          <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#2563eb' }}>📈 Target Qualificato</h3>
            <p style={{ fontSize: '14px' }}>Ti connetti con persone che stanno attivamente cercando un servizio sanitario, non passanti distratti.</p>
          </div>
        </div>

        {/* GUIDA STRATEGICA PER IL PROFESSIONISTA */}
        <section style={{ background: '#fff', padding: '30px', borderRadius: '15px', border: '2px dashed #cbd5e1', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a' }}>Perché la visibilità del tuo studio dipende dai dati</h2>
          <p style={{ fontSize: '15px' }}>
            Google premia i siti che offrono informazioni chiare: orari, servizi specifici e zona. 
            Registrandoti su ServiziSalute, crei un segnale forte che aiuta la tua attività a scalare le classifiche di ricerca a Roma.
          </p>
        </section>

        {/* CALL TO ACTION FINALE */}
        <div style={{ textAlign: 'center', padding: '40px', background: '#0070f3', borderRadius: '20px', color: 'white' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Inizia ora a ricevere nuovi contatti</h2>
          <p style={{ marginBottom: '30px', opacity: '0.9' }}>La registrazione richiede meno di 2 minuti.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: 'white', color: '#0070f3', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', display: 'inline-block' }}>
            Pubblica il tuo annuncio gratis
          </a>
        </div>

      </main>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '12px' }}>
        © 2026 ServiziSalute Roma - Supporto Professionisti Sanitari
      </footer>
    </div>
  );
}
