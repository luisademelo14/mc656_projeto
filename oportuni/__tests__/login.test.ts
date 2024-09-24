import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import handler from "../pages/api/auth/password/login"; // O caminho pode variar de acordo com a estrutura do seu projeto
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

// Mock da conexão com o banco de dados
jest.mock("@/lib/mongodb");
jest.mock("@/models/User");

describe("Login API", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
    };
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    res = {
      status,
    };
  });

  it("retorna erro se email ou senha não forem fornecidos", async () => {
    req.body = { email: "", password: "" };
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: "Email and password are required",
    });
  });

  it("retorna erro se o usuário não for encontrado", async () => {
    User.findOne = jest.fn().mockResolvedValue(null); // Simula usuário não encontrado
    req.body = { email: "test@test.com", password: "password123" };
    
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  it("retorna erro se a senha estiver incorreta", async () => {
    const mockUser = { email: "test@test.com", password: bcrypt.hashSync("password123", 8) };
    User.findOne = jest.fn().mockResolvedValue(mockUser); // Simula usuário encontrado com senha hash

    req.body = { email: "test@test.com", password: "wrongpassword" };
    
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });

  it("faz login com sucesso se as credenciais estiverem corretas", async () => {
    const mockUser = { email: "test@test.com", password: bcrypt.hashSync("password123", 8) };
    User.findOne = jest.fn().mockResolvedValue(mockUser); // Simula usuário encontrado

    req.body = { email: "test@test.com", password: "password123" };
    
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ message: "Login successful" });
  });
});
