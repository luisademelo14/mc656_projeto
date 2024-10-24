"use client";
import { useState } from "react";
import { Box, Button, Chip } from "@mui/material";
import Link from "next/link";
import "../recovery/styles.css";

interface Project {
  id: number;
  startDate: Date;
  name: string;
  description: string;
  imageUrl: string;
  participants: string[];
  minAge: number;
  category: string;
  certification: "SIM" | "NÃO";
  educationLevel: string;
  friendParticipants: string[]; // Lista de amigos participando
  topics: string[]; // Tópicos de aprendizado
}

const ProjectPage: React.FC = () => {
  const [project] = useState<Project>({
    id: 1,
    startDate: new Date("2024-05-19"),
    name: "Simulações da ONU",
    description:
      "As Simulações da ONU são eventos acadêmicos que simulam as discussões e negociações das Nações Unidas.",
    imageUrl: "/imagens/onu.jpg", // Substitua pela URL correta
    participants: [],
    minAge: 13,
    category: "Simulações da ONU",
    certification: "SIM",
    educationLevel: "Ensino Médio",
    friendParticipants: ["Beatriz"],
    topics: ["Comunicação", "Geopolítica"],
  });

  const handleSignup = () => {
    alert("Inscrição realizada com sucesso!");
  };

  return (
    <Box
      justifyContent={"center"}
      display="flex"
      sx={{
        backgroundImage: 'url(/imagens/fundo.jpg)', // Fundo personalizado
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
        maxWidth="400px"
        width="100%"
        display="grid"
        className="default-text"
        p={2}
        sx={{ textAlign: 'center' }}
      >
        {/* Imagem no topo */}
        <Box
          component="img"
          src={project.imageUrl}
          alt={project.name}
          sx={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
        />

        {/* Rótulo "Feito para você!" */}
        <Box
          sx={{
            backgroundColor: "#111",
            color: "#FFF",
            padding: "4px 8px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
            display: "inline-block",
          }}
        >
          Feito para você!
        </Box>

        {/* Informações sobre inscrições */}
        <Box className="default-text bold-text large-text">
          <p>Inscrições até 10/05/2024</p>
          <p>
            <strong>{project.startDate.toLocaleDateString("pt-BR")}</strong> - Online
          </p>
        </Box>

        {/* Botão de inscrição */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={handleSignup}
        >
          Clique aqui para se inscrever
        </Button>

        {/* Informações detalhadas sobre o projeto */}
        <Box sx={{ textAlign: "left", marginTop: "16px" }}>
          <p><strong>Categoria:</strong> {project.category}</p>
          <p><strong>Idade:</strong> {project.minAge} a 23 anos</p>
          <p><strong>Educação:</strong> {project.educationLevel}</p>
          <p><strong>Certificação:</strong> {project.certification}</p>
          <p><strong>Amigos participando:</strong> {project.friendParticipants.join(", ")}</p>
        </Box>

        {/* Tópicos que serão aprendidos */}
        <Box sx={{ marginBottom: "16px" }}>
          <strong>Você vai aprender</strong>
          <Box>
            {project.topics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                sx={{ margin: "4px", fontSize: "14px" }}
              />
            ))}
          </Box>
        </Box>

        {/* Descrição do Projeto */}
        <Box sx={{ textAlign: "left" }}>
          <p><strong>Descrição do Projeto:</strong></p>
          <p>{project.description}</p>
        </Box>

        {/* Botão para compartilhar */}
        <Button
          variant="outlined"
          sx={{ marginTop: "16px" }}
        >
          Compartilhar com amigos
        </Button>

        {/* Link para voltar */}
        <Box className="default-text small-text underline-text center-text" marginTop={2}>
          <Link href="/">
            <h1>Voltar para a página inicial</h1>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectPage;
