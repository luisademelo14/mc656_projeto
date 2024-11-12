import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import Project from "@/src/models/Project";

// Função para buscar todos os projetos
const getAllProjects = async () => {
  await dbConnect();
  try {
    const projects = await Project.find({}).lean();
    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw new Error("Erro ao buscar os projetos");
  }
};

// Função para buscar um projeto específico
const getProjectById = async (ID: Number) => {
  await dbConnect();
  try {
    const project = await Project.findOne({ ID: Number(ID) }).lean();
    console.log("Projeto encontrado:", project);
    return project;
  } catch (error) {
    console.error("Erro ao buscar o projeto:", error);
    throw new Error("Erro ao buscar o projeto");
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ID } = req.query; // Obtém o ID do projeto da URL (se houver)

  if (req.method === "GET") {
    try {
      if (ID) {
        // Se houver um ID na URL, busca o projeto específico
        const project = await getProjectById(Number(ID));

        if (!project) {
          return res.status(404).json({ message: "Projeto não encontrado" });
        }

        return res.status(200).json(project); // Retorna o projeto específico
      } else {
        // Caso contrário, busca todos os projetos
        const projects = await getAllProjects();
        return res.status(200).json(projects); // Retorna todos os projetos
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      res.status(500).json({ message: "Erro ao buscar os projetos" });
    }
  } else if (req.method === "POST") {
    const { action } = req.body;

    if (action === "subscribe") {
      return res.status(200).json({
        message: "Você será redirecionade para o site do projeto! Faça sua inscrição lá!",
      });
    }

    if (action === "shareExperience") {
      return res.status(200).json({ message: "Redirecionando para seu perfil!" });
    }
  }

  // Retorna método não permitido caso a requisição não seja GET ou POST
  res.status(405).json({ message: "Método não permitido" });
}
