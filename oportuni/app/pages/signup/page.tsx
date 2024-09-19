"use client";
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

// Definindo os tipos para os dados do formulário
interface SignUpForm {
  name: string;
  email: string;
  schoolName: string;
  password: string;
}

// Validação com Yup
const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  schoolName: yup.string().required('Nome da escola é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
});

const SignUp: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    console.log("SUBMITTING", data);
    setIsSubmitting(true);
    setServerError('');

    try {
      // Chamada à API para cadastrar o usuário
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {

        const errorData = await response.json(); // Captura a resposta do erro
        throw new Error(errorData.message || 'Erro ao registrar o usuário');
      }

      // Sucesso no cadastro
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      setServerError('Erro Inesperado');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl mb-6 text-center">Cadastro</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label className="block text-sm mb-1">Nome</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border rounded p-2"
            placeholder="Digite seu nome"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">E-mail</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded p-2"
            placeholder="Digite seu e-mail"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Nome da Escola</label>
          <input
            type="text"
            {...register('schoolName')}
            className="w-full border rounded p-2"
            placeholder="Nome da escola"
          />
          {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Senha</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border rounded p-2"
            placeholder="Digite sua senha"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
