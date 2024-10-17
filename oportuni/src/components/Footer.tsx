"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { HomeIcon, MagnifyingGlassIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';

const Footer = () => {
  const router = useRouter(); // Initialize useRouter
  const pathname = usePathname();

  return (
      <footer className="flex h-20 w-full"> {/* Footer height is fixed */}
        <div className="flex w-full"> {/* Full width container for buttons */}
          {/* Botão 1 */}
          <Link href="/pages/home" className="flex-1">
            <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-102 hover:bg-gray-300 text-black ${pathname === '/pages/home' ? 'bg-white' : ''} bg-gray-200 rounded-lg shadow-md`}>
              <HomeIcon className="h-6 w-6 mr-2" />
              <span>Início</span>
            </button>
          </Link>
          
          {/* Botão 2 */}
          <Link href="/pages/search" className="flex-1">
          <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-102 hover:bg-gray-300 ${pathname === '/pages/search' ? 'bg-white' : ''} bg-gray-200 text-black rounded-lg shadow-md`}>
            <MagnifyingGlassIcon className="h-6 w-6 mr-2" />
              <span>Pesquisa</span>
            </button>
          </Link>
          
          {/* Botão 3 */}
          <Link href="/pages/community" className="flex-1">
          <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-102 hover:bg-gray-300 ${pathname === '/pages/community' ? 'bg-white' : ''} bg-gray-200 text-black rounded-lg shadow-md`}>
          <UserGroupIcon className="h-6 w-6 mr-2" />
              <span>Comunidade</span>
            </button>
          </Link>
          
          {/* Botão 4 */}
          <Link href="/pages/profile" className="flex-1">
          <button className={`btn btn-primary flex items-center justify-center h-full w-full transition duration-300 ease-in-out transform hover:scale-102 hover:bg-gray-300 ${pathname === '/pages/profile' ? 'bg-white' : ''} bg-gray-200 text-black rounded-lg shadow-md`}>
              <UserIcon className="h-6 w-6 mr-2" />
              <span>Perfil</span>
            </button>
          </Link>
        </div>
      </footer>
  );
};

export default Footer;
