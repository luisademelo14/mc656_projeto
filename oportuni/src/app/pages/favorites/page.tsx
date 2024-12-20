"use client";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/src/components/Header";
import { IProject } from "@/src/models/Project";

const Favorites = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log("Iniciando fetchFavorites");
      setLoading(true); // Marca como "carregando" no início
      try {
        const response = await fetch(`/api/project/favorites`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Erro ao carregar favoritos. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        setProjects(data);
        setError(null); // Limpa qualquer erro anterior
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
        setError("Falha ao carregar os projetos favoritos.");
      } finally {
        setLoading(false); // Marca como "não carregando" no final
        console.log("Atualizando estado de carregamento para 'false'");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Box>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Main Content */}
      <Box className="mt-20 flex flex-col justify-start min-h-screen w-full text-center bg-white p-8">
        <h1 className="text-4xl font-bold">Meus Favoritos</h1>
        {loading ? (
          <p className="my-60">Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {projects.length === 0 ? (
              <div className="flex justify-center items-center h-full w-full text-center">
                <p className="my-80">Você ainda não tem favoritos!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {projects.map((project) => (
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
                ))}
              </div>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
