import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb"; // ajuste o caminho conforme a estrutura de pastas
import Project from "../../../models/Project"; // ajuste o caminho conforme a estrutura de pastas

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await dbConnect();

    const project = await Project.findOne({ id: Number(id) }); // Buscando pelo campo "id" numérico

    if (!project) {
      res.status(404).json({ message: "Projeto não encontrado" });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o projeto", error });
  }
}
