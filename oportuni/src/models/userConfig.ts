// userConfig.ts

export const userFields = {
  name: { type: "string", required: true, label: "Nome Completo" },
  email: { type: "string", required: true, label: "Email" },
  password: { type: "string", required: true, label: "Senha" },
  nivelescolar: { type: "string", required: true, label: "Nível de Escolaridade" },
  birthdate: { type: "string", required: true, label: "Data de Nascimento" },
};

// Create a TypeScript type from the configuration
export type UserFields = {
  [K in keyof typeof userFields]: string;
};
