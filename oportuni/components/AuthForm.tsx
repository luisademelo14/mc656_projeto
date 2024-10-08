"use client";
import { useState, FormEvent, useEffect } from "react";
import '../app/password/recovery/styles.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";

interface AuthFormProps {
  mode: "Signup" | "Login" | "Recovery";
  onSubmit: (data: { email: string; password?: string; age?: string }) => void;
  resetForm?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, resetForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (resetForm) {
      setEmail("");
      setPassword("");
      setAge(""); // Reseta o campo idade também
    }
  }, [resetForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "Signup") {
      onSubmit({ email, password, age }); // Envia idade no Signup
    } else if (mode === "Login") {
      onSubmit({ email, password }); // Somente email e senha no Login
    } else {
      onSubmit({ email }); // Somente email na recuperação
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box marginTop="9vh" bgcolor="#FEFFEE" borderRadius="38px">
        
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
            Oportuni
          </Typography>
        </Box>

          <Box justifyContent="center" display="flex" className="default-text body" p={2}>
            <TextField
              label="Email"
              type="email"
              className="black-text"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </Box>
          {mode !== "Recovery" && (
            <Box justifyContent="center" display="flex" className="default-text body" p={2}>
              <TextField
                label="Password"
                type="password"
                className="black-text"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
            </Box>
          )}
          {mode === "Signup" && (
            <Box justifyContent="center" display="flex" className="default-text body" p={2}>
              <TextField
                label="Age"
                type="text"
                className="black-text"
                variant="standard"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          )}
          <Box display="flex" justifyContent="center" className="button" p={1}>
            <button
              type="submit"
              className="button"
            >
              {mode === "Signup" ? "Cadastre-se" : mode === "Login" ? "Entrar" : "Recuperar"}
            </button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AuthForm;
