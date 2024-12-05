"use client";

import Link from 'next/link';
import { Box } from '@mui/material';
import { useState } from 'react';

interface InteractiveButtonsProps {
  projectId: string;
  initialIsFavorite: boolean;
}

const InteractiveButtons: React.FC<InteractiveButtonsProps> = ({ projectId, initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialIsFavorite);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`/api/project/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar favorito");

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
    }
  };

  return (
    <Box display="flex" gap={2} mt={6}>
      <Link href="/pages/home" passHref>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar para a Página Inicial
        </button>
      </Link>

      <Link href="/pages/community" passHref>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Compartilhar Experiência
        </button>
      </Link>

      <button
        onClick={toggleFavorite}
        className={`px-4 py-2 text-white rounded ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"}`}
      >
        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </Box>
  );
};

export default InteractiveButtons;
