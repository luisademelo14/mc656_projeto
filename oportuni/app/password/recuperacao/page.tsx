"use client";
import React, { useState } from 'react';
import AuthForm from "../../../components/AuthForm";
import Box from '@mui/material/Box';
import Link from 'next/link';
import './styles.css';

const Recuperacao: React.FC = () => {
    // Variáveis de estado
    const [message, setMessage] = useState('');

    const handleRecuperacao = async (data: {email: string}) => {      
        try {
          const res = await fetch('/api/auth/password/recupera', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const result = await res.json();
            setMessage(result.message);
        
            if (res.status === 200) {
                setMessage('O procedimento de recuperação foi enviado para o seu Email!');
            } else if (res.status === 600) {
                setMessage('Por favor, insira um email válido');
            } else {
                setMessage('Por favor, insira o email utilizado para se cadastrar');
            }
        } catch (error) {
          setMessage('Erro ao conectar ao servidor. Por favor, tente novamente.');
        }
      };

    return (
        <main>
            <Box
                justifyContent={'center'}
                display={'flex'}
                sx={{
                    backgroundImage: 'url(/imagens/capa.png)',
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    minWidth: '100vw',
                    borderRadius: '38px',
                    padding: 2,
                }}
            >
                <Box 
                marginTop="10vh" 
                bgcolor="#FEFFEE" 
                borderRadius="38px"
                maxWidth="50vw"
                maxHeight={'70vh'}
                display="grid"
                className="default-text bold-text large-text"
                >
                    <Box justifyContent="center" display="flex" className="default-text body" p={2}>
                        <AuthForm mode="Recuperacao" onSubmit={handleRecuperacao} />
                    </Box>
                    <Box className="default-text body" p={2}>
                        {message && <p>{message}</p>}
                    </Box>
                    <Box className="default-text small-text underline-text center-text">
                        <h1>
                            <Link href="/password/login">Voltar para Login</Link>
                        </h1>
                    </Box>
                </Box>
            </Box>
        </main>
    );
};

export default Recuperacao;