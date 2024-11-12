import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { email, password, age } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "É necessário preencher os campos de email e senha" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({ message: "Usuário já cadastrado" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  // const newUser = new User({ email, password: hashedPassword, age });
  const newUser = new User({ email, password, age });
  await newUser.save();
  return res.status(200).json({ message: "Cadastro realizado com sucesso!" });
}