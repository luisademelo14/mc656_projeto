// app/pages/projects/[id]/page.tsx
import dbConnect from '@/src/lib/mongodb';
import Project, { IProject } from '@/src/models/Project';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import InteractiveButtons from '../buttons_logic/InteractiveButtons';

interface ProjectPageProps {
  params: { ID: string };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { ID } = params;

  await dbConnect();
  const project: IProject | null = await Project.findOne({ ID: Number(ID) }).lean();

  if (!project) {
    console.log('Projeto não encontrado');
    notFound(); // Redireciona para uma página 404 se o projeto não for encontrado
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      p={6}
      sx={{ backgroundColor: 'gray.100' }}
    >
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <img 
        src={project.imageUrl} 
        alt={project.name} 
        className="w-64 h-64 object-cover rounded-md mb-4" 
      />
      <p className="text-lg text-gray-700">{project.description}</p>
      <Box mt={4}>
        <p><strong>Data de Início:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
        <p><strong>Idade Mínima:</strong> {project.minAge}</p>
        <p><strong>Categoria:</strong> {project.category}</p>
        <p><strong>Certificação:</strong> {project.certification}</p>
        <p><strong>Nível Educacional:</strong> {project.educationLevel}</p>
        <p><strong>Tópicos:</strong> {project.topics.join(', ')}</p>
      </Box>

      {/* Botões interativos */}
      <InteractiveButtons />
    </Box>
  );
};

export default ProjectPage;
