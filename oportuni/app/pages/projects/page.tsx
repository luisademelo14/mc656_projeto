"use client";
import { useState } from "react";
import { Box, Button, Chip } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import "../recovery/styles.css";

const ProjectPage: React.FC = () => {
  const router = useRouter();
  const [project] = useState({
    id: 1,
    startDate: new Date("2024-05-19"),
    name: "Simulações da ONU",
    description:
      "As Simulações da ONU são eventos acadêmicos que simulam as discussões e negociações das Nações Unidas.",
    imageUrl: "public/imagens/onu.png",
    participants: ["Ana", "Flora", "Beatriz"],
    minAge: 13,
    category: "Simulações da ONU",
    certification: "SIM",
    educationLevel: "Ensino Médio",
    friendParticipants: ["Beatriz"],
    topics: ["Comunicação", "Geopolítica"],
  });

  const handleButtonClick = async (action: string) => {
    try {
      const response = await fetch("/api/handler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (action === "subscribe") {
        alert(data.message);
      } else if (action === "shareExperience") {
        router.push("/profile");
      }
    } catch (error) {
      alert("Erro ao realizar a ação. Tente novamente.");
    }
  };

  return (
    <Box
      justifyContent="center"
      display="flex"
      sx={{
        backgroundImage: 'url(public/imagens/fundo.jpg)',
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
        sx={{ textAlign: "center" }}
      >
        <Box
          component="img"
          src={project.imageUrl}
          alt={project.name}
          sx={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
        />

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

        <Box className="default-text bold-text large-text">
          <p>Inscrições até 10/05/2024</p>
          <p>
            <strong>{project.startDate.toLocaleDateString("pt-BR")}</strong> - Online
          </p>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={() => handleButtonClick("subscribe")}
        >
          Clique aqui para se inscrever
        </Button>

        <Box sx={{ textAlign: "left", marginTop: "16px" }}>
          <p><strong>Categoria:</strong> {project.category}</p>
          <p><strong>Idade:</strong> {project.minAge} a 23 anos</p>
          <p><strong>Educação:</strong> {project.educationLevel}</p>
          <p><strong>Certificação:</strong> {project.certification}</p>
          <p><strong>Amigos participando:</strong> {project.friendParticipants.join(", ")}</p>
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <strong>Você vai aprender</strong>
          <Box>
            {project.topics.map((topic, index) => (
              <Chip key={index} label={topic} sx={{ margin: "4px", fontSize: "14px" }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: "left" }}>
          <p><strong>Descrição do Projeto:</strong></p>
          <p>{project.description}</p>
        </Box>

        <Button
          variant="outlined"
          sx={{ marginTop: "16px" }}
          onClick={() => handleButtonClick("shareExperience")}
        >
          Compartilhar com amigos
        </Button>

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
