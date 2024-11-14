// loginpage.tsx
"use client";
import { useState, useEffect } from "react";
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import { Box } from "@mui/material";
import '../recovery/styles.css';
import { useRouter } from "next/navigation";
import UserSession from "@/src/components/UserSession"; // Import the Singleton

const Login: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && UserSession.getInstance().isUserAuthenticated()) {
      router.push("/pages/home");
    }
  }, [isSuccess, router]);

  const handleLogin = async (data: { email: string; password?: string }) => {
    const res = await fetch("/api/auth/password/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setMessage(result.message);

    if (res.status === 200) {
      // Persist login status in UserSession
      UserSession.getInstance().login(); 
      setIsSuccess(true);
    } else {
      UserSession.getInstance().logout(); // Ensure any failed login clears session
      setIsSuccess(false);
    }
  };

  return (
    <Box
      alignItems={'center'}
      justifyContent={'center'}
      display="flex"
      sx={{
        backgroundImage: 'url(/imagens/fundo.jpg)',
        backgroundSize: 'cover',
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
        {UserSession.getInstance().isUserAuthenticated() ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <p>Bem-vindo de volta!</p>
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
