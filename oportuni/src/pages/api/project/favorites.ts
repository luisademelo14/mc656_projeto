import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import User from "@/src/models/User";
import Project from "@/src/models/Project";

// Função para buscar os projetos favoritados pelo usuário
const getFavoritesByUserId = async (userId: string, limit = 10) => {
  await dbConnect();
  try {
    console.log("Buscando favoritos para o usuário:", userId);
    const user = await User.findById(userId);

    if (!user) throw new Error("Usuário não encontrado");
    const favoriteEntries = user.favorites;

    console.log("Favoritos encontrados:", favoriteEntries);

    if (favoriteEntries.length === 0) {
      return [];
    }

    const favoriteProjectIds = favoriteEntries.map((fav) => fav);
    console.log("IDs dos projetos favoritos:", favoriteProjectIds);

    const projects = await Project.find({ ID: { $in: favoriteProjectIds } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    console.log("Projetos retornados:", projects);

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos favoritados:", error);
    throw new Error("Erro ao buscar os projetos favoritados");
  }
};

// Handler da API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { limit } = req.query;

  if (req.method === "GET") {
    // Obtém o userId do cookie
    const userId = req.cookies.userId;
    console.log("ID do usuário:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const projects = await getFavoritesByUserId(userId, Number(limit) || 10);
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Erro ao buscar projetos favoritos:", error);
      res.status(500).json({ message: "Erro ao buscar os projetos favoritos", error });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
