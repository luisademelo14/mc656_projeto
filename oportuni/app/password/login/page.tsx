"use client";
import { useState } from "react";
import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import { Box } from "@mui/material";



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
    className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <Box 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {isSuccessful ? (
          <p className="text-green-500 text-center text-lg font-semibold">
            Welcome!
          </p>
        ) : (
          <>
            <AuthForm mode="Login" onSubmit={handleLogin} />
            <Link href="/password/signup">
              <p className="text-center text-blue-500 font-bold underline py-4">
                Create a new account
              </p>
            </Link>
          </>
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