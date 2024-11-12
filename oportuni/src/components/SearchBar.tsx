import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Chama a função de pesquisa conforme digita
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-center p-4 max-w-screen-xl mx-auto">
        {/* Barra de pesquisa com ícone */}
        <div className="relative w-80">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            className="outline-none px-3 py-2 w-full border border-gray-300 rounded-lg pl-10"
          />
          {/* Ícone de lupa dentro da barra */}
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
