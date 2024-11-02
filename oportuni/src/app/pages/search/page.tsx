"use client"
import Footer from '@/src/components/Footer';

const Search = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-white">
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bem-vindo à Pesquisa</h1>
      </main>

      <Footer /> {/* Reusable Footer component */}
    </div>
  );
};

export default Search;