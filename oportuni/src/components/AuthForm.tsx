import { useState, FormEvent, useEffect } from "react";
import '../app/password/recovery/styles.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { userFields } from "@/src/models/userConfig";

interface AuthFormProps {
  mode: "Signup" | "Login" | "Recovery";
  onSubmit: (data: { name: string; email: string; password?: string; nivelescolar?: string; birthdate?: string }) => void;
  resetForm?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, resetForm }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.keys(userFields).reduce((acc, field) => {
      acc[field] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  useEffect(() => {
    if (resetForm) {
      setFormData(
        Object.keys(userFields).reduce((acc, field) => {
          acc[field] = "";
          return acc;
        }, {} as Record<string, string>)
      );
    }
  }, [resetForm]);

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Garantir que o formData tem as propriedades name, email, password, nivelescolar e birthdate
    const { name, email, password, nivelescolar, birthdate } = formData;

    // Verifique se 'nivelescolar' está realmente sendo preenchido
    console.log('FormData:', formData); // Verifique os dados no console

    // Passa os dados no formato correto para onSubmit
    onSubmit({ name, email, password, nivelescolar, birthdate });
  };

  const fieldsToShow: Array<keyof typeof userFields> = 
    mode === "Login" ? ["email", "password"] :
    mode === "Recovery" ? ["email"] :
    Object.keys(userFields) as Array<keyof typeof userFields>;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box marginTop="9vh" bgcolor="#FEFFEE" borderRadius="38px">
          <Box display="flex" justifyContent="center">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
              Oportuni
            </Typography>
          </Box>

          {fieldsToShow.map((field) => (
            <Box key={field} justifyContent="center" display="flex" className="default-text body" p={2}>
              <TextField
                label={userFields[field].label}
                type={field === "password" ? "password" : field === "birthdate" ? "text" : "text"} // Alterado para 'text'
                className="black-text"
                variant="standard"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                required={userFields[field].required}
                fullWidth
                margin="normal"
                InputLabelProps={field === "birthdate" ? { shrink: true } : {}}
              />
            </Box>
          ))}

          <Box display="flex" justifyContent="center" className="button" p={1}>
            <button type="submit" className="button">
              {mode === "Signup" ? "Cadastre-se" : mode === "Login" ? "Entrar" : "Recuperar"}
            </button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AuthForm;
