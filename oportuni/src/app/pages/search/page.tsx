"use client";
import Footer from '@/src/components/Footer';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/src/components/SearchBar';
import { IProject } from '@/src/models/Project'; // Definir a interface de Projeto

const Search = () => {
  const [valorDaBusca, setValorDaBusca] = React.useState<string>("");  // O valor do filtro de busca
  const [projects, setProjects] = useState<IProject[]>([]);  // Armazenar os projetos filtrados
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/project/projects?category=${valorDaBusca}`, { // Passa o filtro de categoria
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Erro ao carregar projetos");
        }

        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
        setError("Falha ao carregar os projetos.");
        setLoading(false);
      }
    };

    if (valorDaBusca) {
      fetchProjects(); // Chama a API para buscar os projetos filtrados
    } else {
      setProjects([]); // Caso o valor da busca esteja vazio, não exibe projetos
      setLoading(false);
    }
  }, [valorDaBusca]); // O efeito é disparado quando `valorDaBusca` mudar

  return (
    <Box>
      <SearchBar onSearch={(query: string) => setValorDaBusca(query)} />
      <Box className="flex flex-col justify-between min-h-screen w-full bg-white mt-20">
        <main className="flex-grow p-8">
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.ID} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 min-h-full flex flex-col">
                    <Link href={`/pages/projects/${project.ID}`}>
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6 bg-[#031634] text-white">
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <p className="text-sm mt-2">{project.educationLevel}</p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full w-full text-center">
                  <p>Nenhum projeto encontrado para esta categoria.</p>
                </div>
              )}
            </div>
          )}
        </main>

        <Footer /> {/* Reusable Footer component */}
      </Box>
    </Box>
  );
};

export default Search;
