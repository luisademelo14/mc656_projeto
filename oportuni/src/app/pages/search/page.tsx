"use client"
import Footer from '@/src/components/Footer';
import Box from '@mui/material/Box';
import React from 'react';
import SearchBar from '@/src/components/SearchBar'; 
import "./styles.css"

const Search = () => {
  const [valorDaBusca, setValorDaBusca] = React.useState<string>("ç~");
  return (
    <Box>
      <SearchBar onSearch={(query: string) => setValorDaBusca(query)} />
    <Box className="flex flex-col justify-between min-h-screen w-full bg-white">
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bem-vindo à Pesquisa</h1>
      </main>

      <Footer /> {/* Reusable Footer component */}
    </Box>
  </Box>
  );
};

export default Search;