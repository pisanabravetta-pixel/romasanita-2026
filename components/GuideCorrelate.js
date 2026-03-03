/**
 * GuideCorrelate.js
 * Blocco "Leggi anche" con link interni tra guide sanitarie.
 * Migliora SEO (link interni) e riduce la frequenza di rimbalzo.
 */

const TUTTE_GUIDE = [
  { slug: 'costo-visita-cardiologica-roma',  title: 'Visita Cardiologica',  icon: '❤️',  price: '80–160 €' },
  { slug: 'costo-visita-ginecologica-roma',  title: 'Visita Ginecologica',  icon: '🩺',  price: '70–150 €' },
  { slug: 'costo-visita-oculistica-roma',    title: 'Visita Oculistica',    icon: '👁️',  price: '60–130 €' },
  { slug: 'costo-visita-dermatologica-roma', title: 'Visita Dermatologica', icon: '🔬',  price: '80–150 €' },
  { slug: 'costo-risonanza-magnetica-roma',  title: 'Risonanza Magnetica',  icon: '🧲',  price: '150–350 €' },
  { slug: 'costo-pulizia-denti-roma',        title: 'Pulizia Denti',        icon: '🦷',  price: '60–120 €' },
  { slug: 'trovare-servizio-sanitario-roma', title: 'Trovare Servizi SSN',  icon: '🏥',  price: 'Guida' },
  { slug: 'costo-visita-ortopedica-roma',    title: 'Visita Ortopedica',    icon: '🦴',  price: '80–180 €' },
  { slug: 'costo-psicologo-roma',            title: 'Psicologo',            icon: '🧠',  price: '60–120 €' },
  { slug: 'costo-nutrizionista-roma',        title: 'Nutrizionista',        icon: '🥗',  price: '80–120 €' },
  { slug: 'costo-ecografia-privata-roma',    title: 'Ecografia Privata',    icon: '🔬',  price: '60–180 €' },
  { slug: 'analisi-sangue-private-roma',     title: 'Analisi del Sangue',   icon: '🧪',  price: '15–80 €' },
  { slug: 'check-up-completo-roma',          title: 'Check-Up Completo',    icon: '📋',  price: '150–400 €' },
  { slug: 'costo-tac-privata-roma',          title: 'TAC Privata',          icon: '🏥',  price: '150–400 €' },
  { slug: 'costo-fisioterapia-roma',         title: 'Fisioterapia',         icon: '💪',  price: '40–90 €' },
];

/**
 * @param {string} slugCorrente - slug della guida corrente (da escludere)
 * @param {string[]} slugCorrelati - array di slug da mostrare (max 4)
 */
export default function GuideCorrelate({ slugCorrente, slugCorrelati }) {
  const guide = TUTTE_GUIDE.filter(g =>
    slugCorrelati.includes(g.slug) && g.slug !== slugCorrente
  ).slice(0, 4);

  if (guide.length === 0) return null;

  return (
    <div style={{
      marginTop: '50px',
      padding: '32px',
      backgroundColor: '#f0fdf4',
      borderRadius: '20px',
      border: '1px solid #bbf7d0'
    }}>
      <h3 style={{
        color: '#065f46',
        fontSize: '20px',
        fontWeight: '800',
        marginBottom: '20px',
        marginTop: 0
      }}>
        📚 Leggi anche — Guide correlate
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '14px'
      }}>
        {guide.map(g => (
          <a
            key={g.slug}
            href={`/guide/${g.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'white',
              border: '1px solid #d1fae5',
              borderRadius: '14px',
              padding: '14px 16px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <span style={{ fontSize: '24px', flexShrink: 0 }}>{g.icon}</span>
            <div>
              <div style={{ color: '#065f46', fontWeight: '700', fontSize: '14px', lineHeight: '1.3' }}>
                {g.title}
              </div>
              <div style={{ color: '#059669', fontSize: '12px', fontWeight: '600', marginTop: '2px' }}>
                {g.price}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
