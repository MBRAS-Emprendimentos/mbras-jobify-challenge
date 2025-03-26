import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});


export default async function Home() {
  const res = await fetch('https://remotive.com/api/remote-jobs?limit=8');
  const data = await res.json();

  return (
    <div className={`w-full p-18 ${montserrat.className}`}>
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl">Jobify</h1>
        <span className="text-2xl">Bem-vindo à Jobify! A vaga ideal para você está aqui.</span>
        <div className="flex gap-2 mt-4">
          <Input
            className="h-12 w-[600px] placeholder:opacity-80 placeholder:text-white"
            placeholder="Pesquise aqui por (Cargo, Categoria ou Local)"
          />
          <Button className="bg-emerald-700 h-12 font-bold cursor-pointer hover:bg-emerald-800">Pesquisar</Button>
        </div>
        <span className="text-2xl mt-8">Exibindo 8 Vagas.</span>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {data.jobs.map((item: any) => (
          <Card className="p-8" key={item.id}>
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <span className="block mt-2">{item.description.substring(0, 100)}</span>
            <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{item.category}</Badge>
                <Badge variant="outline">{item.job_type}</Badge>
            </div>
            <Button className="bg-emerald-700 font-bold mt-4 h-12 cursor-pointer hover:bg-emerald-800">
              Saiba Mais
            </Button>
          </Card>
        ))}
      </main>
    </div>
  );
}

