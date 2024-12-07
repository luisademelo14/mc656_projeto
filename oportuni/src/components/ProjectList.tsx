"use client";
import React, { useEffect, useState } from 'react';
import { IProject } from '@/src/models/Project';
import Link from 'next/link';

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/projects?limit=5", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        // Verifica se a requisição foi bem-sucedida
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

    fetchProjects(); // Chama a função para buscar os projetos
  }, []);

  return (
    <main className="flex-grow p-8 mt-8">
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
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
          ))}
        </div>
      )}
    </main>
  );
};

export default Projects;