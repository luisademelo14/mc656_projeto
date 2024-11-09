import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import Project from "@/src/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const projects = await Project.find({}).lean(); // Buscar todos os projetos
      res.status(200).json(projects); // Retornar projetos
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      res.status(500).json({ message: "Erro ao buscar os projetos", error });
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

  // Retornar método não permitido caso a requisição não seja GET ou POST
  res.status(405).json({ message: "Método não permitido" });
}