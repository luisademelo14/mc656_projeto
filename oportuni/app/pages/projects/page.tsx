"use client";
import { useEffect, useState } from "react";
import { Box, Button, Chip, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProjectPage: React.FC = () => {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const id = searchParams.get("id");

    if (!id) {
      alert("Projeto não encontrado.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/project/${id}`);
        if (!response.ok) throw new Error("Projeto não encontrado");

        const data = await response.json();
        setProject(data);
      } catch (error) {
        alert("Erro ao carregar o projeto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!project) {
    return <p>Projeto não encontrado</p>;
  }

  return (
    <Box
      justifyContent="center"
      display="flex"
      sx={{
        backgroundImage: 'url(/public/imagens/fundo.jpg)',
        backgroundSize: 'cover',
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
            <strong>{new Date(project.startDate).toLocaleDateString("pt-BR")}</strong> - Online
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
            {project.topics.map((topic: string, index: number) => (
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
          <Link href="../home">
            <h1>Voltar para a página inicial</h1>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectPage;
