import mongoose, { Document, Model, Schema } from "mongoose";

// Definindo a interface para o Projeto
export interface IProject extends Document {
  startDate: Date;
  name: string;
  description: string;
  imageUrl: string;
  participants: string[]; // Adicionando o atributo participants como um vetor de strings
}

// Criando o esquema do Projeto
const ProjectSchema: Schema<IProject> = new Schema({
  startDate: { type: Date, required: true }, // Atributo do tipo Date
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  participants: { type: [String], default: [] }, // Definindo participants como um vetor de strings
});

// Criando o modelo do Projeto
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
