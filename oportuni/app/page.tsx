import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Oportuni</h1>
        <p className="text-lg text-gray-700 mb-12">
          Encontre atividades extracurriculares que vão enriquecer sua experiência escolar.
        </p>
        <Link href="/login">
          <button className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200">
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}
