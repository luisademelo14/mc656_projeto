import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "É necessário preencher os campos de email e senha" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  // const isValidPassword = bcrypt.compareSync(password, user.password);
  const isValidPassword = (password == user.password);
  if (!isValidPassword) {
    return res.status(402).json({ message: "Senha inválida" });
  }

  // Configurar o cookie com o userId
  res.setHeader("Set-Cookie", `userId=${user._id}; Path=/; HttpOnly; SameSite=Strict;`);

  return res.status(200).json({ message: "Login realizado com sucesso!" });
}