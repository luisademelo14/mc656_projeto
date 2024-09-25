import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { email } = req.body;
  if (!email) {
    return res.status(600).json({ message: "Email inválido" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Por favor, insira o email utilizado para se cadastrar" });
  }
  //TODO: Send email with password recovery link
  // return res.status(200).json({ message: "O procedimento de recuperação foi enviado para o seu Email!" });
  return res.status(200).json({ message: `A senha do usuário é: ${user.password}` });
}