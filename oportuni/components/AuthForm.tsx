"use client";
import { useState, FormEvent, useEffect } from "react";
import '../app/recuperacao/styles.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface AuthFormProps {
  mode: "Signup" | "Login" | "Recuperacao";
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
    <form onSubmit={handleSubmit}>
    <Box marginTop="30vh" bgcolor="#FEFFEE" borderRadius="38px">
      <Box className="default-text bold-text large-text" justifyContent="center" display="flex"  p={2}>
        <h1>Oportuni</h1>
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
      {mode !== "Recuperacao" && (
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
      <Box display="flex" justifyContent="center" className="button" p={2}>
        <button 
        type="submit"
        className="button green"
        >{mode}
        </button>
      </Box>
    </Box>
    </form>
    </Box>
  );
};

export default AuthForm;
