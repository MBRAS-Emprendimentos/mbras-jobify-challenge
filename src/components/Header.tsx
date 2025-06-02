// src/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jobify</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#" className="hover:text-gray-300">Início</a></li>
            <li><a href="#" className="hover:text-gray-300">Vagas</a></li>
            <li><a href="#" className="hover:text-gray-300">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}