import Filter from "@/components/filter";
import JobList from "@/components/jobsList";
import Pagination from "@/components/pagination";
import { fetchAllJobs, fetchCategories } from "@/app/services/jobs";
import { Job } from "@/app/types";

const JOBS_PER_PAGE = 20;

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const page = parseInt(searchParams?.page ?? "1", 10);
  const category = searchParams?.category ?? "";

  
  const [jobs, categories] = await Promise.all([
    fetchAllJobs(category || "all"),
    fetchCategories(),
  ]);

  const categoryMap = new Map(
    categories.map((cat: { name: string; slug: any; }) => [cat.name.toLowerCase(), cat.slug])
  );
  const reverseCategoryMap = new Map(
    categories.map((cat: { slug: any; name: any; }) => [cat.slug, cat.name])
  );

  const filteredJobs = category
    ? jobs.filter((job: Job) => {
        const jobSlug = categoryMap.get(job.category.toLowerCase());
        return jobSlug === category;
      })
    : jobs;

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * JOBS_PER_PAGE,
    page * JOBS_PER_PAGE
  );

  return (
    <main className="bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-6">    
      <section className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Encontre a vaga dos seus sonhos
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Bem-vindo ao Jobify! Aqui você pode explorar as melhores oportunidades de emprego, filtradas por categoria, e encontrar seu próximo desafio profissional. Navegue pelas vagas disponíveis e comece sua jornada agora mesmo!
        </p>
      </section>

      <Filter categories={categories} />
      <JobList jobs={paginatedJobs} />
      <Pagination page={page} totalPages={totalPages} category={category} />
    </main>
  );
}

