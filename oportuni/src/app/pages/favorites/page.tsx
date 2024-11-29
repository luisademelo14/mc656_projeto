"use client";
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/src/components/Header';
import { IProject } from '@/src/models/Project';

const Favorites = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = "USER_ID_AQUI"; // Substitua pelo ID do usuário autenticado
        const url = `/api/project/favorites?userId=${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Erro ao carregar favoritos");
        }

        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
        setError("Falha ao carregar os projetos favoritos.");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Box>
      {/* Header fixo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Conteúdo principal */}
      <Box className="flex flex-col justify-between min-h-screen w-full bg-white p-8 pt-20">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.ID}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 min-h-full flex flex-col"
                >
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
                <p>Você ainda não tem favoritos!</p>
              </div>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
