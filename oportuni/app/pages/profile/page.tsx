"use client"
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-white">
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bem-vindo ao Perfil</h1>
      </main>

      <Footer /> {/* Reusable Footer component */}
    </div>
  );
};

export default Home;