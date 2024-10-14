"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import "../recovery/styles.css";

interface Project {
  startDate: Date; // Mudança para Date
  name: string;
  description: string;
  imageUrl: string;
  participants: string[]; // Adicionando o atributo participants como um vetor de strings
}

const ProjectPage: React.FC = () => {
  const [project] = useState<Project>({
    startDate: new Date("2024-11-01"), // Inicializando como um objeto Date
    name: "Projeto Acadêmico X",
    description:
      "Este projeto visa explorar novas metodologias de ensino para alunos do ensino médio, focando em atividades práticas e inovadoras.",
    imageUrl: "/imagens/projeto.jpg",
    participants: [], // Inicializando como um vetor vazio
  });
  
  const handleSignup = () => {
    // Lógica para realizar a inscrição do usuário no projeto.
    alert("Inscrição realizada com sucesso!");
  };

  return (
    <Box 
      justifyContent={'center'}
      display="flex"
      sx={{
        backgroundImage: 'url(/imagens/fundo.jpg)',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Box 
        marginTop="10vh" 
        bgcolor="#FEFFEE" 
        borderRadius="16px"
        maxWidth={'400px'}
        width={'100%'}
        maxHeight={'70vh'}  
        display="grid"  
        className="default-text bold-text large-text"  
        p={2}
      >
        <Box className="default-text">
          <h2>{project.name}</h2>
          <p>Data de Início: {project.startDate.toLocaleDateString("pt-BR")}</p> {/* Formatação da data */}
          <p>{project.description}</p>
          <Box
            component="img"
            src={project.imageUrl}
            alt={project.name}
            sx={{ width: "100%", borderRadius: "8px", marginTop: "16px" }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px" }}
            onClick={handleSignup}
          >
            Inscreva-se
          </Button>
          <Box marginTop={2}>
            <h4>Participantes:</h4>
            {project.participants.length > 0 ? (
              <ul>
                {project.participants.map((participant, index) => (
                  <li key={index}>{participant}</li> // Lista de participantes
                ))}
              </ul>
            ) : (
              <p>Nenhum participante inscrito.</p>
            )}
          </Box>
        </Box>
        <Box 
          className="default-text small-text underline-text center-text"
          marginTop={2}
        >
          <Link href="/">
            <h1>Voltar para a página inicial</h1>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectPage;
