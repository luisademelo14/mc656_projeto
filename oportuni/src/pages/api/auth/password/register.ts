import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src/lib/mongodb";
import User from "@/src/models/User";
import { userFields } from "@/src/models/userConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const userData: Record<string, string> = {};

  // Iterate through userFields to validate required fields
  for (const field in userFields) {
    const key = field as keyof typeof userFields;

    // Check if a required field is missing
    if (userFields[key].required && !req.body[key]) {
      return res.status(400).json({ message: `É necessário preencher o campo de ${key}` });
    }

    userData[key] = req.body[key];
  }

  // Validate the email field
  const email = userData.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "E-mail inválido" });
  }

  // Validate the password field
  const password = userData.password;
  if (password && password.length < 6) {
    return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres" });
  }

  // Validate the birthdate field
  const birthdate = userData.birthdate;

  // Check if the birthdate is provided and matches the expected format (DD-MM-YYYY)
  const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = birthdate.match(dateRegex);

  if (!match) {
    return res.status(400).json({ message: "O formato da data de nascimento deve ser DD-MM-AAAA" });
  }

  // If the date format is correct, parse it into a Date object
  const [day, month, year] = match.slice(1).map((v) => parseInt(v, 10));
  const dateOfBirth = new Date(year, month - 1, day);

  // Check if the parsed date is valid
  if (isNaN(dateOfBirth.getTime())) {
    return res.status(400).json({ message: "Data de nascimento inválida" });
  }

  // Check if the birthdate is in the future
  if (dateOfBirth > new Date()) {
    return res.status(400).json({ message: "Data de nascimento inválida" });
  }

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return res.status(401).json({ message: "Usuário já cadastrado" });
  }

  const newUser = new User(userData);
  await newUser.save();
  console.log("New user created:", newUser);
  return res.status(200).json({ message: "Cadastro realizado com sucesso!" });
}
