import Header from '@/src/components/Header';
import Projects from '@/src/components/ProjectList';
import { MagnifyingGlassIcon, UsersIcon, UserIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

const Home = async () => {
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#FEFFF5]">
      {/* Header fixo no topo da página */}
      <Header />

      {/* Seção principal com a imagem de fundo central */}
      <section
        className="relative flex justify-center items-center bg-cover bg-center h-[300px] md:h-[1100px]"
        style={{
          backgroundImage: "url('/imagens/oportuni.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 md:p-10">
          <h1 className="font-bold text-5xl text-white mt-8">Seja bem-vindo!</h1>
        </div>
      </section>

      {/* Conteúdo principal com padding para não sobrepor o Header */}
      <main className="flex-grow p-8 mt-20">
        <div className="flex flex-col md:flex-row justify-center items-start space-x-10 mb-10">
          {/* Seção de Sobre Nós */}
          <section className="bg-[#031634] shadow-lg rounded-lg p-8 text-white flex-1 mb-10 h-[500px] overflow-hidden">
            <h2 className="text-3xl font-semibold text-center">Sobre Nós</h2>
            <p className="mt-6 text-lg leading-relaxed">
              O <strong>Oportuni</strong> é uma plataforma dedicada a expandir o acesso a oportunidades educacionais, 
              capacitando jovens a descobrirem projetos que fortalecem tanto suas habilidades acadêmicas quanto pessoais. 
              Com foco em iniciativas extracurriculares, oferecemos uma ponte entre estudantes e programas como 
              olimpíadas, competições, intercâmbios e cursos que promovem o crescimento integral e a preparação para o futuro.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Nossa missão é criar um espaço inclusivo e inovador, onde cada estudante possa encontrar atividades 
              que alinhem com seus interesses e objetivos. Acreditamos que o poder da educação vai além das salas de aula, 
              e queremos ajudar a conectar estudantes a experiências transformadoras e redes de apoio.
            </p>
          </section>

          {/* Seção de Funcionalidades */}
          <section className="bg-[#031634] shadow-lg rounded-lg p-8 text-white flex-1 mb-10 h-[500px] overflow-hidden">
            <h2 className="text-3xl font-semibold text-center">Funcionalidades</h2>
            <ul className="mt-6 space-y-6">
              <li className="flex items-start">
                <MagnifyingGlassIcon className="h-8 w-8 text-[#FFCE6D] mr-4" />
                <div>
                  <strong className="text-xl">Busca Personalizada:</strong>
                  <p>Encontre oportunidades que se alinhem aos seus interesses e habilidades de maneira rápida e eficiente.</p>
                </div>
              </li>
              <li className="flex items-start">
                <UsersIcon className="h-8 w-8 text-[#FFCE6D] mr-4" />
                <div>
                  <strong className="text-xl">Comunidade Colaborativa:</strong>
                  <p>Compartilhe oportunidades com colegas e saiba o que outros estudantes estão fazendo para se desenvolver.</p>
                </div>
              </li>
              <li className="flex items-start">
                <UserIcon className="h-8 w-8 text-[#FFCE6D] mr-4" />
                <div>
                  <strong className="text-xl">Perfil:</strong>
                  <p>Gerencie suas atividades, visualize seu progresso e defina o que deseja alcançar em sua jornada educacional.</p>
                </div>
              </li>
              <li className="flex items-start">
                <ArrowUpIcon className="h-8 w-8 text-[#FFCE6D] mr-4" />
                <div>
                  <strong className="text-xl">Desenvolvimento Contínuo:</strong>
                  <p>Receba recomendações personalizadas e dicas para aprimorar suas habilidades e expandir seus horizontes.</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Seção de Projetos */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-center text-[#031634]">Projetos em Alta</h2>

          {/* Renderiza o componente Projects */}
          <Projects />
        </section>
      </main>
    </div>
  );
};

export default Home;