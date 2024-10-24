import mongoose, { Document, Model, Schema } from "mongoose";

// Definindo a interface para o Projeto
export interface IProject extends Document {
  id: number;                     // ID único do projeto
  startDate: Date;                // Data de início do projeto
  name: string;                   // Nome do projeto
  description: string;            // Descrição do projeto
  imageUrl: string;               // URL da imagem associada ao projeto
  participants: string[];         // Lista de participantes (e-mails)
  minAge: number;                 // Idade mínima para participação
  category: string;               // Categoria do projeto
  certification: "SIM" | "NÃO";   // Certificação disponível ("SIM" ou "NÃO")
  educationLevel: string;         // Nível de educação necessário para participar
  friendParticipants: string[];   // Lista de amigos participando do projeto
  topics: string[];               // Lista de tópicos abordados no projeto
}

// Criando o esquema do Projeto
const ProjectSchema: Schema<IProject> = new Schema({
  id: { type: Number, required: true, unique: true },   // ID do projeto, único e obrigatório
  startDate: { type: Date, required: true },            // Data de início do projeto
  name: { type: String, required: true },               // Nome do projeto
  description: { type: String, required: true },        // Descrição do projeto
  imageUrl: { type: String, required: true },           // URL da imagem associada
  participants: { type: [String], default: [] },        // Lista de e-mails dos participantes
  minAge: { type: Number, required: true },             // Idade mínima para participar
  category: { type: String, required: true },           // Categoria do projeto
  certification: { type: String, enum: ["SIM", "NÃO"], required: true }, // Certificação ("SIM" ou "NÃO")
  educationLevel: { type: String, required: true },     // Nível de educação necessário
  friendParticipants: { type: [String], default: [] },  // Lista de amigos participando
  topics: { type: [String], default: [] },              // Lista de tópicos abordados
});

// Criando o modelo do Projeto
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
