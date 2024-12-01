// src/models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";
import { userFields, UserFields } from "@/src/models/userConfig";

// Define the IUser interface that extends Mongoose's Document and uses the UserFields type
export interface IUser extends Document, UserFields {
  favorites: number[]; // Adiciona o campo favorites como uma lista de IDs numéricos
}

// Dynamically build the schema definition from userFields
const schemaDefinition: Record<keyof UserFields | 'favorites', any> ={ ...Object.keys(userFields).reduce((acc, field) => {
  const key = field as keyof typeof userFields;
  acc[key] = { type: String, required: userFields[key].required };
  return acc;
}, {} as Record<keyof UserFields, any>),
favorites: { type: [Number], default: [] } // Adiciona o campo favorites diretamente
};

const UserSchema: Schema<IUser> = new Schema(schemaDefinition);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;