import Footer from '@/src/components/Footer';
import Link from 'next/link';
import dbConnect from '@/src/lib/mongodb';
import Project from '@/src/models/Project';

const Home = async () => {
  // Conectar ao MongoDB e buscar projetos
  await dbConnect();
  const projects = await Project.find({}).lean();

  // Verificar se os projetos foram encontrados
  console.log("Projetos encontrados:", projects);

  return (
    <div className="flex flex-col justify-between min-h-screen w-full bg-white">
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold">Bem-vindo à Página Inicial</h1>

        <div className="text-center">
          <h2 className="text-2xl font-semibold">Projetos</h2>
          <ul className="mt-4 space-y-4">
            {projects.length === 0 ? (
              <p>Nenhum projeto encontrado.</p> // Mensagem se não houver projetos
            ) : (
              projects.map((project) => {
                // Adicionando log para verificar a URL da imagem
                console.log("Nome do projeto:", project.name);
                console.log("URL da imagem:", project.imageUrl);
                console.log("Educacao:", project.educationLevel);

                return (
                  <li key={project.id} className="space-y-2">
                    <Link href={`/projects/${project.id}`}>
                      <img  
                        src={project.imageUrl} 
                        alt={project.name} 
                        className="w-48 h-48 object-cover rounded-md" 
                      />
                      <span className="text-blue-500 hover:underline">{project.name}</span>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </main>

      <Footer /> {/* Componente de Footer reutilizável */}
    </div>
  );
};

export default Home;
