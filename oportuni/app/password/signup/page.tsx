"use client";
import { useState } from "react";
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import Box from "@mui/material/Box";
import React from "react";


const Signup: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSignup = async (data: { email: string, password?: string }) => {
    const res = await fetch("/api/auth/password/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMessage(result.message);
    if (res.status === 201) {
      setIsSuccessful(true);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };
  return (
    <Box 
      justifyContent="center"
      display="flex"
      sx={{
        backgroundImage: 'url(/imagens/fundo.jpg)',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        padding: 2,
      }}
    >
      <Box 
        bgcolor="#FEFFEE" 
        borderRadius="16px"
        maxWidth={'400px'}
        width={'100%'}
        maxHeight="80vh"
        display="grid"
        className="default-text bold-text large-text"
        p = {2}
      >
        {isSuccessful ? (
          <p 
            className="text-green-500 text-center"
            style={{ fontSize: '14px', fontWeight: 'bold' }}  // Ajuste do tamanho da fonte
          >
            Welcome!
          </p>
        ) : (
          <>
            <AuthForm 
              mode="Signup" 
              onSubmit={handleSignup}
            />
  
            {message && (
              <p
                className={`text-center mt-4 ${
                  isSuccess ? "text-red-500" : "text-green-800" 
                }`}
                style={{ fontSize: '20px' }}  // Ajuste de fonte na mensagem de sucesso ou erro
              >
                {message}
              </p>
            )}
  
            <Box className="default-text small-text underline-text center-text" marginTop="20px">
              <Link href="/password/login">
                <h1>Voltar para Login</h1>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
  
}
export default Signup;