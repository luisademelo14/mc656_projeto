"use client";
import React, { useEffect, useState } from 'react';
import { IProject } from '@/src/models/Project';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/solid';
import Header from "@/src/components/Header";

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

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
  if (error) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography color="error">{error}</Typography></Box>;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#FEFFF5]">
      {/* Header fixo no topo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Conteúdo principal com espaçamento para o Header */}
      <main className="flex-grow p-8 mt-20">
        <Box
          component={Paper}
          elevation={3}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
        >
          {/* Título do Projeto */}
          <Typography 
            variant="h4" 
            component="h1" 
            className="text-3xl font-semibold text-center text-[#031634] mb-8"
          >
            {project?.name}
          </Typography>

          {/* Imagem do Projeto */}
          <img 
            src={project?.imageUrl} 
            alt={project?.name} 
            className="w-full h-64 object-cover rounded-md mb-4" 
          />

          {/* Caixa cinza para inscrições */}
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            className="bg-gray-200 text-[#031634] text-lg font-medium rounded-md p-3 mb-4"
          >
            Inscrições abertas
          </Box>

          {/* Data do evento */}
          <Box display="flex" alignItems="center" mb={4}>
            <CalendarDaysIcon className="h-6 w-6 text-gray-700 mr-2" />
            <Typography variant="body1" className="text-lg text-gray-700">
              {project?.startDate ? new Date(project.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}
            </Typography>
          </Box>

          {/* Localização */}
          <Box display="flex" alignItems="center" mb={6}>
            <MapPinIcon className="h-6 w-6 text-gray-700 mr-2" />
            <Typography variant="body1" className="text-lg text-gray-700">
              Online
            </Typography>
          </Box>

          {/* Botão de inscrição */}
          <Box display="flex" justifyContent="center" mb={6}>
            <button className="bg-[#031634] text-white text-xl font-bold py-3 px-6 rounded-lg hover:bg-[#02438A]">
              Clique aqui para se inscrever
            </button>
          </Box>

          {/* Detalhes do Projeto */}
          <Box className="bg-white text-[#031634] rounded-md p-6 space-y-4">
            <Typography variant="subtitle1" component="p">
              <strong>Data de Início:</strong> {project?.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="subtitle1" component="p">
              <strong>Idade Mínima:</strong> {project?.minAge}
            </Typography>
            <Typography variant="subtitle1" component="p">
              <strong>Categoria:</strong> {project?.category}
            </Typography>
            <Typography variant="subtitle1" component="p">
              <strong>Certificação:</strong> {project?.certification}
            </Typography>
            <Typography variant="subtitle1" component="p">
              <strong>Nível Educacional:</strong> {project?.educationLevel}
            </Typography>
            <Typography variant="subtitle1" component="p">
              <strong>Tópicos:</strong> {project?.topics.join(', ')}
            </Typography>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default ProjectPage;
