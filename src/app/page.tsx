import { getJobs } from "../lib/getJobs";
import { JobCard } from "../components/JobCard";
import { fetchJobs } from "@/lib/api"; 
import Header from "../components/Header";
//import { filter } from "../filtragem/filter"


export default async function Home() {
  const jobs = await getJobs();


  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Vagas Recentes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-light bg-center text-center border-30">
          Filtrar por Categorias: 
        </div> 

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 9).map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </>
  );
}



/*import { fetchJobs } from "@/lib/api";
import { redirect } from "next/navigation";
 import Link from "next/link";


import { getJobs } from "../lib/getJobs";
import { JobCard } from "../components/JobCard";
import  Link from "next/link";
import { fetchJobs } from "@/lib/api"; 
import Header from "../components/Header";

<h2 className="text-2xl font-light text-center mb-4"> Filtro </h2>
export default async function Home({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;
  const jobs = await fetchJobs(category);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Vagas de Emprego Remoto</h1>

      <form method="GET" className="mb-6">
        <label className="block mb-2 font-medium">Filtrar por categoria:</label>
        <select
          name="category"
          defaultValue={category || ""}
          className="p-2 border rounded"
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
        >
          <option value="">Todas</option>
          <option value="Software Development">Software Development</option>
          <option value="Customer Service">Customer Service</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
          { adicione mais se quiser }
        </select>
      </form>

      <ul className="space-y-4">
        {jobs.map((job: any) => 
        (
          <li key={job.id} className="border p-4 rounded hover:shadow-md transition">
            <Link href={`/jobs/${job.id}`}>
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company_name}</p>
              <p className="text-sm text-gray-500">{job.candidate_required_location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
} */