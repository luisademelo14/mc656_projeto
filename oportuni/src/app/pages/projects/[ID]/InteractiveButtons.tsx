// app/pages/projects/[id]/InteractiveButtons.tsx
"use client";

import Link from 'next/link';
import { Box } from '@mui/material';

const InteractiveButtons = () => {
  const handleSubscriptionClick = () => {
    alert("Você será direcionado para a página deste projeto! Faça sua inscrição e venha compartilhar sua experiência no Oportuni!");
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
        onClick={handleSubscriptionClick}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Fazer Inscrição
      </button>
    </Box>
  );
};

export default InteractiveButtons;
