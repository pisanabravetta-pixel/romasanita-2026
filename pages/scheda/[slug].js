import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Se non siamo sul browser, non renderizziamo nulla
  if (!mounted) return null;

  // DATI DI TEST (Bypassiamo Supabase per vedere se la grafica regge)
  const datoFinto = {
    nome: "Farmacia Test Bravetta",
    categoria: "Farmacia",
    zona: "Aurelio",
    indirizzo: "Via di Bravetta, Roma",
    telefono: "0612345678",
    id: 1
  };

  return (
    <>
      <Head>
        <title>TEST - {slug}</title>
      </Head>

      <Navbar />

      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <h1 style={{ color: '#065f46' }}>{datoFinto.nome}</h1>
            <p>Stai cercando lo slug: <strong>{slug}</strong></p>
            <hr />
            <p>Se vedi questa pagina con Navbar e Footer, il problema è la connessione a Supabase o lo slug errato.</p>
            <p><strong>Indirizzo:</strong> {datoFinto.indirizzo}</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
