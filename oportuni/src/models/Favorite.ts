import mongoose, { Schema, Document } from "mongoose";

export interface IFavorite extends Document {
  userId: string; // ID do usuário
  projectId: number; // ID do projeto
  createdAt: Date; // Data de favoritação
}

const FavoriteSchema = new Schema<IFavorite>({
  userId: { type: String, required: true },
  projectId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Favorite || mongoose.model<IFavorite>("Favorite", FavoriteSchema);
