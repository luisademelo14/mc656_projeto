// Objective: export functions to handle communication with the server
export const handleRecuperacao = async (email: string, isValid: boolean, setMessage: (message: string) => void) => {
    if (!isValid) {
      setMessage('Por favor, insira um email válido.');
      return;
    }
  
    try {
      const response = await fetch('/api/auth/password/recupera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setMessage('Verificação de email enviada. Por favor, verifique sua caixa de entrada.');
      } else {
        setMessage('Erro ao enviar verificação de email. Por favor, tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor. Por favor, tente novamente.');
    }
  };