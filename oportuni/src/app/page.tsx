import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material'; // Se você estiver usando Material-UI

export default function Welcome() {
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
        sx={{
          bgcolor: '#FEFFEE',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          height: '70vh', // A caixa branca agora se estende por 80% da altura da tela
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Título */}
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Oportuni
        </Typography>

        {/* Botões de Login e Signup */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
            <Link href="/password/login" passHref>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
              borderRadius: '30px', // Bordas mais arredondadas no botão
              padding: '12px',
              backgroundColor: '#036564', // Cor de fundo personalizada
              fontSize: '1rem', // Tamanho do texto do botão
              fontWeight: 'bold', // Texto em negrito
              }}
            >
              Entrar
            </Button>
            </Link>
            
            <Link href="/password/signup" passHref>
            <Button
              variant="outlined"
              fullWidth
              sx={{
              color: '#036564', // Cor do texto personalizada
              borderRadius: '30px', // Bordas mais arredondadas no botão
              padding: '12px',
              fontSize: '1rem', // Tamanho do texto do botão
              fontWeight: 'bold', // Texto em negrito
              }}
            >
              Cadastrar
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
