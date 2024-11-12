"use client";
import { useState, FormEvent, useEffect } from "react";
import '../app/password/recovery/styles.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";

interface AuthFormProps {
  mode: "Signup" | "Login" | "Recovery";
  onSubmit: (data: { email: string; password?: string; birthDate?: string; schoolName?: string; educationLevel?: string }) => void;
  resetForm?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, resetForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");

  useEffect(() => {
    if (resetForm) {
      setEmail("");
      setPassword("");
      setBirthDate("");
      setSchoolName("");
      setEducationLevel("");
    }
  }, [resetForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "Signup") {
      onSubmit({ email, password, birthDate, schoolName, educationLevel });
    } else if (mode === "Login") {
      onSubmit({ email, password });
    } else {
      onSubmit({ email });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box marginTop="9vh" bgcolor="#FEFFEE" borderRadius="38px" padding="16px">
        
          <Box display="flex" justifyContent="center" marginBottom="24px">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
              Oportuni
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" p={1}>
            <TextField
              label="Email"
              type="email"
              className="black-text"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="dense"
            />
          </Box>
          {mode !== "Recovery" && (
            <Box display="flex" justifyContent="center" p={1}>
              <TextField
                label="Password"
                type="password"
                className="black-text"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="dense"
              />
            </Box>
          )}
          {mode === "Signup" && (
            <>
              <Box display="flex" justifyContent="center" p={1}>
                <TextField
                  label="Data de Nascimento"
                  type="date"
                  className="black-text"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  fullWidth
                  margin="dense"
                />
              </Box>
              <Box display="flex" justifyContent="center" p={1}>
                <TextField
                  label="Nome da Escola"
                  type="text"
                  className="black-text"
                  variant="standard"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  fullWidth
                  margin="dense"
                />
              </Box>
              <Box display="flex" justifyContent="center" p={1}>
                <TextField
                  label="Escolaridade"
                  type="text"
                  className="black-text"
                  variant="standard"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  fullWidth
                  margin="dense"
                />
              </Box>
            </>
          )}
          <Box display="flex" justifyContent="center" className="button" p={1} marginTop="16px">
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
