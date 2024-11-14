"use client";
import React, { useEffect, useState } from 'react';
import { IProject } from '@/src/models/Project';
import { Box } from '@mui/material';
import Header from "@/src/components/Header"; // Importando o Header
import InteractiveButtons from './InteractiveButtons';

interface ProjectPageProps {
  params: { ID: string };
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const { ID } = params;
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/project/projects?ID=${ID}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Projeto não encontrado");
        }

        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar o projeto:", err);
        setError("Falha ao carregar o projeto.");
        setLoading(false);
      }
    };

    fetchProject();
  }, [ID]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixo no topo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Conteúdo da página com margem superior para o Header fixo */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        p={6}
        mt={20} // Ajustando para não sobrepor o Header
        sx={{ backgroundColor: 'gray.100' }}
      >
        <h1 className="text-3xl font-bold mb-4">{project?.name}</h1>
        <img 
          src={project?.imageUrl} 
          alt={project?.name} 
          className="w-64 h-64 object-cover rounded-md mb-4" 
        />
        <p className="text-lg text-gray-700">{project?.description}</p>
        <Box mt={4}>
          <p><strong>Data de Início:</strong> {project?.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Idade Mínima:</strong> {project?.minAge}</p>
          <p><strong>Categoria:</strong> {project?.category}</p>
          <p><strong>Certificação:</strong> {project?.certification}</p>
          <p><strong>Nível Educacional:</strong> {project?.educationLevel}</p>
          <p><strong>Tópicos:</strong> {project?.topics.join(', ')}</p>
        </Box>

        {/* Botões interativos */}
        <InteractiveButtons />
      </Box>
    </div>
  );
};

export default ProjectPage;
