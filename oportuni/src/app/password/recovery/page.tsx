"use client";
import React, { useState } from 'react';
import AuthForm from "../../../components/AuthForm";
import Box from '@mui/material/Box';
import Link from 'next/link';
import './styles.css';

const Recovery: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleRecovery = async (data: { email: string }) => {      
        try {
            const res = await fetch('/api/auth/password/recover', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            setMessage(result.message);
        } catch (error) {
            setMessage('Erro ao conectar ao servidor. Por favor, tente novamente.');
        }
    };

    return (
        <Box
            alignItems={'center'}
            justifyContent={'center'}
            display="flex"
            sx={{
                backgroundImage: 'url(/imagens/fundo.jpg)',
                backgroundSize: 'cover', // Mantém consistência com a página de Login
                backgroundPosition: 'center',
                minHeight: '100vh',
                width: '100vw',
                flexDirection: 'column',
                overflow: 'auto',
            }}
        >
            <Box
                bgcolor="#FEFFEE"
                borderRadius="16px"
                maxWidth="400px"
                width="100%"
                maxHeight="100vh"
                display="grid"
                className="default-text bold-text large-text"
                p={2}
            >
                <Box className="default-text">
                    <AuthForm mode="Recovery" onSubmit={handleRecovery} />
                    <br />
                    <Box className="default-text small-text center-text">
                        <Link href="/password/login">
                            <h1 style={{ color: '#036564', marginBottom: '8px' }}>
                                Voltar para Login
                            </h1>
                        </Link>
                    </Box>
                </Box>
                {message && (
                    <p
                        className={`text-center mt-4 ${
                            message.includes('sucesso') ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </Box>
        </Box>
    );
};

export default Recovery;
