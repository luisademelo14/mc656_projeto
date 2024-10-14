import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  
  const { email, projectId } = req.body;
  
  // verifica se os campos obrigatórios foram fornecidos
  if (!email || !projectId) {
    return res.status(400).json({ message: "Email e ID do projeto são necessários" });
  }

  // busca o projeto no banco de dados pelo ID
  const project = await Project.findById(projectId);
  
  // verifica se o projeto existe
  if (!project) {
    return res.status(404).json({ message: "Projeto não existe" });
  }

  // verifica a data de início do projeto
  const currentDate = new Date();
  const startDate = new Date(project.startDate);

  if (currentDate > startDate) {
    return res.status(403).json({ message: "Não é possível fazer inscrição" });
  }

  // busca o usuário pelo email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  //registrar o usuário no projeto (exemplo simplificado)
  // armazena as inscrições no banco de dados
  project.participants.push(email);
  await project.save();

  return res.status(200).json({ message: "Inscrição realizada com sucesso" });
}
