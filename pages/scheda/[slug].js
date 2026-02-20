import { useRouter } from 'next/router';

export default function PaginaTest() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#065f46' }}>Test di Build</h1>
      <p>Se vedi questa pagina, il problema erano i componenti Navbar o Footer.</p>
      <p>Slug attuale: <strong>{slug}</strong></p>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Torna alla Home</a>
      </div>
    </div>
  );
}
