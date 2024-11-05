// Importações dos componentes e bibliotecas necessárias
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import dbConnect from '@/src/lib/mongodb';
import Project from '@/src/models/Project';
import { MagnifyingGlassIcon, UsersIcon, UserIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Home = async () => {
  // Conectar ao MongoDB e buscar projetos
  await dbConnect();
  const projects = await Project.find({}).lean();

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#FEFFF5]">
      {/* Header fixo no topo da página */}
      <Header />

      {/* Conteúdo principal com padding para não sobrepor o Header */}
      <main className="flex-grow p-8 mt-20">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold">Bem-vindo ao Oportuni!</h1>
        </section>

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
          <h2 className="text-3xl font-semibold text-center text-[#031634]">Nossos Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projects.length === 0 ? (
              <p className="text-center">Nenhum projeto encontrado.</p>
            ) : (
              projects.map((project) => (
                <div key={project.ID} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <Link href={`/pages/projects/${project.ID}`}>
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 bg-[#031634] text-white">
                      <h3 className="text-lg font-bold">{project.name}</h3>
                      <p className="text-sm mt-2">{project.educationLevel}</p>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer fixo no rodapé da página */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;