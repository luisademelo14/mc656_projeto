"use client";
import Footer from "@/src/components/Footer"; // Importando o Footer

// Dois posts aleatórios
const randomPosts = [
  {
    id: "1",
    username: "john_doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "Esse é meu primeiro post na comunidade! Estou muito animado para participar.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Alguém mais está trabalhando em um projeto interessante? Adoraria saber mais!",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Alguém mais está trabalhando em um projeto interessante? Adoraria saber mais!",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Alguém mais está trabalhando em um projeto interessante? Adoraria saber mais!",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Alguém mais está trabalhando em um projeto interessante? Adoraria saber mais!",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Alguém mais está trabalhando em um projeto interessante? Adoraria saber mais!",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "Alguém mais está trabalhando em um projeto interessante? Adoraria saber mais!",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "1",
    username: "john_doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "Esse é meu primeiro post na comunidade! Estou muito animado para participar.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: "5",
    username: "RENAN",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    content: "Vai corinthians!!!!.",
    timestamp: new Date().toLocaleString(),
  },
  // Você pode adicionar mais mensagens aqui...
];

const Community = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Conteúdo geral da página */}
      <main className="flex-grow flex flex-col items-center"> {/* Adicionando items-center para centralizar */}
        <div className="flex flex-col items-center justify-start py-10 px-4">
          {/* Mensagem de boas-vindas */}
          <h1 className="text-4xl font-bold">Comunidade</h1>
        </div>

        {/* Seção do feed com um scroller específico para as mensagens */}
        <div className="feed flex-grow max-w-1xl w-full h-96 overflow-y-auto space-y-4 border border-gray-200 rounded-lg p-4 mb-20 flex flex-col items-center"> {/* Adicionando flex e items-center */}
          {randomPosts.map((post) => (
            <div key={post.id} className="post flex items-start w-full p-4 border border-gray-200 rounded-lg">
              <img src={post.avatar} alt={post.username} className="avatar w-12 h-12 rounded-full mr-4" />
              <div className="content flex-1">
                <div className="header flex justify-between i tems-center">
                  <strong className="text-lg">{post.username}</strong>
                  <span className="text-sm text-gray-500">{post.timestamp}</span>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer fixo */}
      <Footer />
    </div>
  );
};

export default Community;