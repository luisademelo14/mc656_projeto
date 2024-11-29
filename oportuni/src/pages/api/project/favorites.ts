import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import Favorite, { IFavorite } from "@/src/models/Favorite";
import Project from "@/src/models/Project";

// Função para buscar os projetos favoritados pelo usuário
const getFavoritesByUserId = async (userId: string, limit = 10) => {
  await dbConnect();
  try {
    // Busca os IDs dos projetos favoritados pelo usuário
    const favoriteEntries = await Favorite.find({ userId }).lean<IFavorite[]>();


    if (favoriteEntries.length === 0) {
      return []; // Retorna vazio se não houver favoritos
    }

    // Extrai os IDs dos projetos favoritados
    const favoriteProjectIds = favoriteEntries.map((fav) => fav.projectId);

    // Busca os detalhes dos projetos pelo ID
    const projects = await Project.find({ ID: { $in: favoriteProjectIds } })
      .sort({ createdAt: -1 }) // Ordena por data de criação (mais recentes primeiro)
      .limit(limit)
      .lean();

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos favoritados:", error);
    throw new Error("Erro ao buscar os projetos favoritados");
  }
};

// Handler da API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, limit } = req.query;

  if (req.method === "GET") {
    if (!userId) {
      return res.status(400).json({ message: "O ID do usuário é obrigatório." });
    }

    try {
      const projects = await getFavoritesByUserId(String(userId), Number(limit) || 10);
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Erro ao buscar projetos favoritos:", error);
      res.status(500).json({ message: "Erro ao buscar os projetos favoritos", error });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
