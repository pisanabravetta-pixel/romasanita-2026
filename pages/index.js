import Head from 'next/head';

export default function Home() {
  const categorie = [
    { nome: 'Farmacie', icona: 'fa-pills', colore: 'bg-blue-100', text: 'text-blue-600' },
    { nome: 'Dentisti', icona: 'fa-tooth', colore: 'bg-green-100', text: 'text-green-600' },
    { nome: 'Diagnostica', icona: 'fa-microscope', colore: 'bg-purple-100', text: 'text-purple-600' },
    { nome: 'Specialisti', icona: 'fa-user-md', colore: 'bg-red-100', text: 'text-red-600' },
    { nome: 'Emergenze', icona: 'fa-ambulance', colore: 'bg-yellow-100', text: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Head>
        <title>RomaSanità | Portale Sanitario Capitale</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* TOP BAR */}
      <div className="bg-[#004C99] text-white py-2 px-4 text-xs font-bold uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-between">
          <span><i className="fas fa-hospital-symbol mr-2"></i> Roma e Provincia</span>
          <span><i className="fas fa-phone-alt mr-2"></i> EMERGENZA: 118</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-black text-[#0066CC] tracking-tighter">ROMA<span className="text-gray-800">SANITÀ</span></div>
          <div className="hidden lg:flex flex-1 max-w-lg mx-10 relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" placeholder="Cerca farmacie, zone, specialisti..." className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
          <button className="bg-[#0066CC] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition">+ PUBBLICA</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-[#111827] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">La salute a Roma,<br/><span className="text-blue-500">finalmente semplice.</span></h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl font-black text-green-400">+1.250</div>
              <div className="text-gray-500 text-xs font-bold uppercase mt-1">Annunci Attivi</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl font-black text-green-400">+850</div>
              <div className="text-gray-500 text-xs font-bold uppercase mt-1">Professionisti</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl font-black text-green-400">15.000</div>
              <div className="text-gray-500 text-xs font-bold uppercase mt-1">Utenti/Mese</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-xl font-black text-gray-800 uppercase mb-8">Esplora Categorie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categorie.map((c, i) => (
            <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition">
              <div className={`w-12 h-12 rounded-full ${c.colore} ${c.text} flex items-center justify-center text-xl`}>
                <i className={`fas ${c.icona}`}></i>
              </div>
              <span className="font-bold text-gray-700 uppercase text-sm">{c.nome}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="text-gray-500 font-bold text-sm uppercase">© 2026 ROMA SANITÀ - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}
