"use client";
import { useState, FormEvent, useEffect } from "react";

interface AuthFormProps {
  mode: "Signup" | "Login";
  onSubmit: (data: { email: string; password: string; age?: string }) => void;
  resetForm?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, resetForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (resetForm) {
      setEmail("");
      setPassword("");
      setAge(""); // Reseta o campo idade também
    }
  }, [resetForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "Signup") {
      onSubmit({ email, password, age }); // Envia idade no Signup
    } else {
      onSubmit({ email, password }); // Somente email e senha no Login
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{mode}</h2>
      
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
      </div>

      {/* Campo Idade aparece apenas no modo Signup */}
      {mode === "Signup" && (
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Idade</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>
      )}

      <div>
        <label className="block text-gray-700 dark:text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {mode}
      </button>
    </form>
  );
};

export default AuthForm;
