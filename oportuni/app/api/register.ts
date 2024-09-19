import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { name, email, schoolName, password } = req.body;

  // Verificando se todos os campos estão preenchidos
  if (!name || !email || !schoolName || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  // Simulação de sucesso no cadastro
  return res.status(200).json({ message: 'Usuário registrado com sucesso' });
}
