"use client";
import { useState } from "react";
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import Box from "@mui/material/Box";


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
        {isSuccessful ? (
          <Box>
            <p className="text-green-500 text-center text-lg font-semibold">
              Welcome!
            </p>
          </Box>
        ) : (
          <AuthForm mode="Signup" onSubmit={handleSignup} />
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
        <Box className="default-text small-text underline-text center-text">
          <Link href="/password/login">
            <h1>
              Voltar para Login
            </h1>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Signup;