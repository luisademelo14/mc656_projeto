"use client";
import { useState } from "react";
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import { Box } from "@mui/material";
import '../recovery/styles.css';



const Login: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <Box 
      justifyContent={'center'}
      display="flex"
      sx={{
        backgroundImage: 'url(/imagens/fundo.jpg)',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
      >
      <Box 
        marginTop="10vh" 
        bgcolor="#FEFFEE" 
        borderRadius="16px"
        maxWidth={'400px'}
        width={'100%'}
        maxHeight={'70vh'}  
        display="grid"  
        className="default-text bold-text large-text"  
        p={2}
        >
        {isSuccessful ? (
          <p>
            Welcome!
          </p>
        ) : (
          <Box className="default-text">
            <AuthForm mode="Login" onSubmit={handleLogin} />
            <br />
            <Box 
              className= "default-text small-text underline-text center-text" 
            >
              <Link href="/password/recovery">
                <h1>
                  Esqueci a senha
                </h1>
              </Link>
              <Link href="/password/signup">
                <h1>
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