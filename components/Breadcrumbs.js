import Link from 'next/link';

export default function Breadcrumbs({ categoria, quartiere }) {
  // Pulizia nomi per la visualizzazione
  const catNome = categoria ? categoria.replace(/-/g, ' ').replace('visite特别istiche ', '').toUpperCase() : '';
  const quartiereNome = quartiere ? quartiere.charAt(0).toUpperCase() + quartiere.slice(1) : '';

  const styles = {
    nav: { margin: '10px 0 20px 0', fontSize: '14px', color: '#64748b', fontFamily: 'Arial, sans-serif' },
    link: { color: '#2563eb', textDecoration: 'none', fontWeight: '600' },
    separator: { margin: '0 8px', color: '#cbd5e1' },
    current: { color: '#1e293b', fontWeight: 'bold' }
  };

  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.link}>Home</Link>
      <span style={styles.separator}>/</span>
      
      {/* Link alla categoria generale (es. Dentisti Roma) */}
      <Link href={`/${categoria}-roma`} style={styles.link}>
        {catNome}
      </Link>
      
      {quartiere && (
        <>
          <span style={styles.separator}>/</span>
          <span style={styles.current}>{quartiereNome}</span>
        </>
      )}
    </nav>
  );
}
