"use client";
import { useState, useEffect } from "react";
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import { Box } from "@mui/material";
import '../recovery/styles.css';
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation

const Login: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Perform redirection only after successful login
    if (isSuccess) {
      router.push("/pages/home"); // Redirect to /home after success
    }
  }, [isSuccess, router]); // Dependency array to re-run the effect only when isSuccess changes

  const handleLogin = async (data: { email: string; password?: string }) => {
    const res = await fetch("/api/auth/password/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMessage(result.message);

    if (res.status === 200) {
      setIsSuccessful(true);
      setIsSuccess(true); // This will trigger the redirect
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <Box
      alignItems={'center'}     // Center vertically
      justifyContent={'center'} // Center horizontally
      display="flex"
      sx={{
        backgroundImage: 'url(/imagens/fundo.jpg)',
        backgroundSize: 'cover', // Melhor para imagem de fundo
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw', // Garantir que a largura da página seja 100% da tela
        flexDirection: 'column', // Alinhar os elementos em coluna
        overflow: 'auto', // Evitar overflow de conteúdo
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
        {isSuccessful ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <p>Bem-vindo!</p>
          </Box>
        ) : (
          <Box className="default-text">
            <AuthForm mode="Login" onSubmit={handleLogin} />
            <br />
            <Box className="default-text small-text center-text">
              <Link href="/password/recovery">
                <h1 style={{ color: '#036564', marginBottom: '8px' }}>
                  Esqueci a senha
                </h1>
              </Link>
              <Link href="/password/signup">
                <h1 style={{ color: '#036564', marginBottom: '8px' }}>
                  É meu primeiro acesso
                </h1>
              </Link>
            </Box>
          </Box>
        )}
        {message && (
          <p
            className={`text-center mt-4 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </Box>
    </Box>
  );
};

export default Login;
