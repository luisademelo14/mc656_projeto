import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
import { userFields } from "@/src/models/userConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const userData: Record<string, string> = {};

  // Use keyof typeof userFields to let TypeScript know `field` is a valid key
  for (const field in userFields) {
    const key = field as keyof typeof userFields;

    if (userFields[key].required && !req.body[key]) {
      return res.status(400).json({ message: `É necessário preencher o campo de ${key}` });
    }
    userData[key] = req.body[key];
  }

  // Check for existing user
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return res.status(401).json({ message: "Usuário já cadastrado" });
  }

  // Hash password if it exists
  if (userData.password) {
    userData.password = bcrypt.hashSync(userData.password, 10);
  }

  const newUser = new User(userData);
  await newUser.save();
  console.log("New user created:", newUser);
  return res.status(200).json({ message: "Cadastro realizado com sucesso!" });
}
