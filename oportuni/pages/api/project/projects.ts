import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.body;

  // Verifica qual ação foi enviada e retorna a resposta correspondente
  if (action === "subscribe") {
    return res.status(200).json({ message: "Você será redirecionade para o site do projeto! Faça sua inscrição lá!" });
  }

  if (action === "shareExperience") {
    return res.status(200).json({ message: "Redirecionando para seu perfil!" });
  }
}
