"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, MagnifyingGlassIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';

const links = [
  { href: '/pages/home', label: 'Início', Icon: HomeIcon },
  { href: '/pages/search', label: 'Pesquisa', Icon: MagnifyingGlassIcon },
  { href: '/pages/community', label: 'Comunidade', Icon: UserGroupIcon },
  { href: '/pages/profile', label: 'Perfil', Icon: UserIcon },
];

const Header = () => {
  const pathname = usePathname();

  const getLinkClass = (page: string) =>
    `text-lg font-medium transition duration-300 ease-in-out ${pathname === page ? 'text-[#FFCE6D]' : 'text-[#FEFFF5] hover:text-[#FFCE6D]'}`;

  const getIconClass = (page: string) =>
    `h-5 w-5 transition duration-300 ease-in-out ${pathname === page ? 'text-[#FFCE6D]' : 'text-[#FEFFF5]'}`;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#033649] shadow-md z-50 flex items-center justify-between px-4 flex-wrap">
      <h1 className="flex-shrink-0 text-xl font-bold text-[#FEFFF5]">Oportuni</h1>
      <nav className="flex flex-grow justify-center">
        <div className="flex space-x-8 sm:space-x-20">
          {links.map(({ href, label, Icon }) => (
            <Link key={href} href={href}>
              <div className="flex items-center space-x-2">
                <Icon className={getIconClass(href)} />
                <span className={getLinkClass(href)}>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <div className="w-20"></div>
    </header>
  );
};

export default Header;
