import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <aside>
        <p>Incorpore vagas remotas e cresça mais rápido</p>
        <a href="/https://github.com/remotive-com/remote-jobs-api">Usar API</a>
      </aside>
      <nav className="shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Jobify
        </Link>
        <div className="space-x-4">
          <Link to="/home" className="hover:underline">
            Encontrar vagas
          </Link>
          <Link to="/favorites" className="hover:underline">
            Vagas salvas
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
