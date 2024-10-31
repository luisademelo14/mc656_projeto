import Footer from '@/components/Footer';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

const Home = async () => {
  // Conectar ao MongoDB e buscar projetos
  await dbConnect();
  const projects = await Project.find({}).lean();

  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-white">
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold">Bem-vindo à Página Inicial</h1>

        <div className="text-center">
          <h2 className="text-2xl font-semibold">Projetos</h2>
          <ul className="mt-4 space-y-4">
            {projects.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`}>
                  {project.name} {/* Texto do link */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer /> {/* Componente de Footer reutilizável */}
    </div>
  );
};

export default Home;
