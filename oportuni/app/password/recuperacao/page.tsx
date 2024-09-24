"use client";
import React, { useState } from 'react';
import AuthForm from "../../../components/AuthForm";
import Box from '@mui/material/Box';
import Link from 'next/link';
import './styles.css';

const Recuperacao: React.FC = () => {
    // Variáveis de estado
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState('');

    const handleRecuperacao = async (data: {email: string}) => {
        if (!isValid) {
          setMessage('Por favor, insira um email válido.');
          return;
        }
      
        try {
          const response = await fetch('/api/auth/password/recupera', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
      
          if (response.ok) {
            setMessage('Verificação de email enviada. Por favor, verifique sua caixa de entrada.');
          } else {
            setMessage('Erro ao enviar verificação de email. Por favor, tente novamente.');
          }
        } catch (error) {
          setMessage('Erro ao conectar ao servidor. Por favor, tente novamente.');
        }
      };

    return (
        <main>
            <Box
                sx={{
                    backgroundImage: 'url(/imagens/capa.png)',
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    borderRadius: '38px',
                    padding: 2,
                }}
            >
                <Box marginTop="30vh" bgcolor="#FEFFEE" borderRadius="38px">
                    <Box className="default-text bold-text large-text" justifyContent="center" display="flex"  p={2}>
                        <h1>Recuperação de Senha</h1>
                    </Box>
                    <Box justifyContent="center" display="flex" className="default-text body" p={2}>
                        <TextField
                            id="Email"
                            className="black-text"
                            label="Digite seu Email"
                            variant="standard"
                            value={email}
                            onChange={handleEmailChange}
                            error={!isValid}
                            helperText={!isValid ? 'O email parece inválido' : ''}
                        />
                    </Box>
                    <Box className="default-text body" p={2}>
                        {message && <p>{message}</p>}
                    </Box>
                    <Box display="flex" justifyContent="center" className="button" p={2}>
                        <button
                            id="button-recuperar"
                            className="button green"
                            // onClick={() => handleRecuperacao(email, isValid, setMessage)}
                        >
                            Recuperar Senha
                        </button>
                    </Box>
                    <Box display="flex" justifyContent="center" className="default-text underline-text" p={2}>
                        <h1>
                            <br />
                            <Link href="/">Voltar para Home</Link>
                        </h1>
                    </Box>
                </Box>
            </Box>
        </main>
    );
};

export default Recuperacao;
