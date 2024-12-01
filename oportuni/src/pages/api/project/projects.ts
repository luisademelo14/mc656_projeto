import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import Project from "@/src/models/Project";
import User from "@/src/models/User";

const toggleFavorite = async (userId: string, projectId: number) => {
  await dbConnect();
  const user = await User.findById(userId);

  if (!user) throw new Error("Usuário não encontrado");

  const isFavorite = user.favorites.includes(projectId);

  if (isFavorite) {
    user.favorites = user.favorites.filter((id) => id !== projectId);
  } else {
    user.favorites.push(projectId);
  }

  await user.save();

  return !isFavorite;
};

const getAllProjects = async (filter = {}, limit = 10) => {
  await dbConnect();
  try {
    const projects = await Project.find(filter)
      .sort({ createdAt: -1 }) // Sort by creation date in descending order (newest first)
      .limit(limit) // Limit the results to the specified number
      .lean();
    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw new Error("Erro ao buscar os projetos");
  }
};

const getProjectById = async (ID: number) => {
  await dbConnect();
  try {
    const project = await Project.findOne({ ID: Number(ID) }).lean();
    return project;
  } catch (error) {
    console.error("Erro ao buscar o projeto:", error);
    throw new Error("Erro ao buscar o projeto");
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { limit } = req.query;
  const { ID, name, category } = req.query;

  if (req.method === "GET") {
    try {
      if (ID) {
        const project = await getProjectById(Number(ID));
        if (!project) {
          return res.status(404).json({ message: "Projeto não encontrado" });
        }
        return res.status(200).json(project);
      } else {
        const filter: any = {};
        if (name) {
          filter.name = { $regex: name, $options: "i" }; // Case-insensitive regex for name
        }
        if (category) {
          filter.category = category; // Exact match for category
        }
        const projects = await getAllProjects(filter, Number(limit));
        return res.status(200).json(projects);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      res.status(500).json({ message: "Erro ao buscar os projetos", error });
    }
  
  } else if (req.method === "GET" && req.query.ID) {
    try {
      const userId = req.cookies.userId;
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }
  
      const projectId = req.query.ID;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const isFavorite = user.favorites.includes(Number(projectId));
      return res.status(200).json({ isFavorite });
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
      res.status(500).json({ message: "Erro ao verificar favorito", error });
    }

  } else if (req.method === "POST" && req.url?.includes("/api/project/projects")) {
    try {
      const { projectId } = req.body;
      const userId = req.cookies.userId;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      const isFavorite = await toggleFavorite(String(userId), Number(projectId));
      return res.status(200).json({ isFavorite });
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      res.status(500).json({ message: "Erro ao atualizar favorito", error });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
