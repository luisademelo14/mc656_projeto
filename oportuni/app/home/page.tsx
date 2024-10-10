// pages/index.tsx
"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { HomeIcon, UserCircleIcon, InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white">
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bem-vindo à Página Inicial</h1>
      </main>
      
      <footer className="flex h-10"> {/* Footer takes 25% of the height */}
        <div className="flex-grow flex space-x-4"> {/* Allow buttons to grow */}
          {/* Botão 1 */}
          <Link href="/page1" className="flex-grow">
            <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105 ${pathname === '/home' ? 'bg-gray-200' : ''} rounded-lg shadow-md`}>
              <HomeIcon className="h-6 w-6 mr-2" />
              <span>Página 1</span>
            </button>
          </Link>
          
          {/* Botão 2 */}
          <Link href="/page2" className="flex-grow">
            <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md`}>
              <UserCircleIcon className="h-6 w-6 mr-2" />
              <span>Página 2</span>
            </button>
          </Link>
          
          {/* Botão 3 */}
          <Link href="/page3" className="flex-grow">
            <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md`}>
              <InformationCircleIcon className="h-6 w-6 mr-2" />
              <span>Página 3</span>
            </button>
          </Link>
          
          {/* Botão 4 */}
          <Link href="/page4" className="flex-grow">
            <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100 rounded-lg shadow-md`}>
              <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
              <span>Página 4</span>
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
