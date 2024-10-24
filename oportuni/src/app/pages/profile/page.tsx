"use client"
import Footer from '@/src/components/Footer';
import React from 'react';

const Perfil = () => {
  const usuario = {
    nomeCompleto: "Julian Barros da Silva",
    nomeUsuario: "@julianbarros12",
    email: "julianbarros08@gmail.com",
    bairro: "Aldeota",
    escola: "Colégio Ari de Sá",
    escolaridade: "2º ano do Ensino Médio",
    idade: 16,
    projetosAtuais: [
      { nome: "OQSP 2024", logo: "/oqsp2024-logo.png" },
    ],
    amigos: ["Beatriz", "Rafaela", "Eduardo", "Mais"],
  };

  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-white">
      <div className="flex-grow flex flex-col items-center p-6">
        <div className="w-full max-w-3xl">
          <div className="header flex justify-between items-center w-full">
            <button className="voltar-button text-2xl">←</button>
            <h1 className="text-2xl font-semibold">Meu perfil</h1>
            <button className="editar-button text-2xl">✎</button>
          </div>

          <div className="perfil-info mt-6 text-center">
            <div className="perfil-foto mx-auto">
              <img src="/avatar.png" alt="Avatar" className="w-32 h-32 rounded-full border-2 border-gray-300" />
            </div>
            <h2 className="mt-4 text-xl font-bold">{usuario.nomeUsuario}</h2>

            <div className="informacoes-publicas mt-6 text-left">
              <h3 className="text-lg font-semibold">Informações públicas</h3>
              <p><strong>Nome:</strong> {usuario.nomeCompleto}</p>
              <p><strong>Nome de Usuário:</strong> {usuario.nomeUsuario}</p>

              <div className="projetos-atuais mt-4">
                <p><strong>Projetos atuais:</strong></p>
                <div className="projeto flex items-center mt-2">
                  <img src={usuario.projetosAtuais[0].logo} alt={usuario.projetosAtuais[0].nome} className="w-12 h-12 mr-4" />
                  <span>{usuario.projetosAtuais[0].nome}</span>
                </div>
              </div>

              <div className="amigos mt-4">
                <p><strong>Amigos:</strong></p>
                <div className="amigos-lista flex gap-4 mt-2">
                  {usuario.amigos.map((amigo, index) => (
                    <span key={index} className="amigo bg-gray-200 rounded-full px-3 py-1 text-sm">{amigo}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="informacoes-privadas mt-6 text-left">
              <h3 className="text-lg font-semibold">Só você pode ver as informações abaixo</h3>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Bairro:</strong> {usuario.bairro}</p>
              <p><strong>Escola:</strong> {usuario.escola}</p>
              <p><strong>Escolaridade:</strong> {usuario.escolaridade}</p>
              <p><strong>Idade:</strong> {usuario.idade} anos</p>
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Reusable Footer component */}
    </div>
  );
};

export default Perfil;
