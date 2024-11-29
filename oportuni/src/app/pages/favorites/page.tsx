"use client";
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/src/components/SearchBar';
import Header from '@/src/components/Header';
import { IProject } from '@/src/models/Project';

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>(""); // New state for category
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = `/api/project/projects?name=${searchValue}&category=${category}&limit=4`;
        const response = await fetch(url, {
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

    fetchProjects();
  }, [searchValue, category]); // Re-fetch whenever searchValue or category changes

  return (
    <Box>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <div>
        {/* Search Bar */}
        <div>
          <SearchBar onSearch={(query: string) => setSearchValue(query)} />
        </div>

        {/* Category Filter */}
        <div className="mt-4 flex justify-start items-center pl-10">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered bg-white text-gray-700 p-3 pl-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Todas as Categorias</option>
            <option value="ONU">Simulações da ONU</option>
            <option value="Programação">Programação</option>
            <option value="Tecnologia">Tecnologia</option>
          </select>
        </div>

        {/* Main Content */}
        <Box className="flex flex-col justify-between min-h-screen w-full bg-white p-8">
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
        </Box>
      </div>
    </Box>
  );
};

export default Search;
