"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
  };

  return (
    <header className="bg-gradient-to-b from-gray-800 to-black text-white py-4s shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center h-25">
        <Link
          href="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 hover:from-gray-500 hover:to-gray-700 transition-all duration-300 flex justify-center text-3xl sm:text-4xl p-4"
          onClick={handleNavigation}
        >
          Jobify
        </Link>
      </div>
    </header>
  );
}
