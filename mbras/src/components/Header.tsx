"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Nome do site */}
        <Link href="/" className={styles.siteName} onClick={handleNavigation}>
          Jobify
        </Link>

        {/* Navegação */}
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink} onClick={handleNavigation}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLink} onClick={handleNavigation}>
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navLink} onClick={handleNavigation}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Spinner de carregamento */}
      {isLoading && <div className={styles.spinner}></div>}
    </header>
  );
}