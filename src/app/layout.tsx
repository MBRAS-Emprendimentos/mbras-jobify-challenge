import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/footer";
import "@/style/globals.css";

export const metadata: Metadata = {
  title: "Jobify",
  description:
    "Encontre as melhores vagas de emprego, envie seu currículo online e conquiste novas oportunidades profissionais. Cadastre-se gratuitamente e acelere sua carreira!",
  openGraph: {
    title: "Jobify",
    description:
      "Encontre as melhores vagas de emprego, envie seu currículo online e conquiste novas oportunidades profissionais. Cadastre-se gratuitamente e acelere sua carreira!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
