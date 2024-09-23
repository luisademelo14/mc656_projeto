import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para ter matchers como 'toBeInTheDocument'
import userEvent from '@testing-library/user-event';
import SignUp from '../signup/page';

// Função para mockar a API Response
const createMockResponse = (overrides: Partial<Response> = {}): Response => {
  // Criamos o Response default com todos os campos necessários
  const defaultResponse: Response = {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: () => defaultResponse,
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    json: async () => ({}), // Resposta vazia
    text: async () => '',
  };

  // Retorna uma combinação do defaultResponse com os valores sobrescritos
  return { ...defaultResponse, ...overrides };
};


// Mock da função fetch global
global.fetch = jest.fn(() => Promise.resolve(createMockResponse()));

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', () => {
    render(<SignUp />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome da escola/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('displays validation errors if form is submitted empty', async () => {
    render(<SignUp />);

    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/nome da escola é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    });
  });

  it('displays an error if the email format is invalid', async () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    userEvent.type(emailInput, 'invalidemail');

    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it('submits the form correctly if all fields are valid', async () => {
    render(<SignUp />);

    // Preencher os campos
    userEvent.type(screen.getByLabelText(/nome/i), 'John Doe');
    userEvent.type(screen.getByLabelText(/e-mail/i), 'johndoe@example.com');
    userEvent.type(screen.getByLabelText(/nome da escola/i), 'Escola Exemplo');
    userEvent.type(screen.getByLabelText(/senha/i), '123456');

    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    userEvent.click(submitButton);

    // Verifica se fetch foi chamado corretamente
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'johndoe@example.com',
          schoolName: 'Escola Exemplo',
          password: '123456',
        }),
      });
    });

    // Verificar se o botão "Cadastrando..." está desativado
    expect(submitButton).toBeDisabled();
  });

  it('displays server error message if API fails', async () => {
    // Mock da chamada fetch para retornar um erro
    (fetch as jest.Mock).mockResolvedValueOnce(
      createMockResponse({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({ message: 'Erro no servidor' }),
      })
    );

    render(<SignUp />);

    // Preencher os campos
    userEvent.type(screen.getByLabelText(/nome/i), 'John Doe');
    userEvent.type(screen.getByLabelText(/e-mail/i), 'johndoe@example.com');
    userEvent.type(screen.getByLabelText(/nome da escola/i), 'Escola Exemplo');
    userEvent.type(screen.getByLabelText(/senha/i), '123456');

    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    userEvent.click(submitButton);

    // Verifica se a mensagem de erro do servidor é exibida
    await waitFor(() => {
      expect(screen.getByText(/erro inesperado/i)).toBeInTheDocument();
    });
  });
});
