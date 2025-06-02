import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SeachBar";
import JobList from "./JobList";
import { fetchJobs } from "@/services/remotive";
import Pagination from "./Pagination";

export default async function JobSection({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const page = Number(searchParams.page ?? "1");
  const limit = 8;
  const offset = (page - 1) * limit;

  const jobs = await fetchJobs({
    search: searchParams.search ?? "",
    category: searchParams.category ?? "",
    limit,
    offset,
  });
  return (
    <section className="space-y-6 my-12">
      <div className="my-12 flex flex-col items-center space-y-6">
        <div className="w-full max-w-3xl space-y-4 mx-auto">
          <SearchBar />
        </div>
        <CategoryFilter />
      </div>

      <JobList jobs={jobs} />
      <Pagination currentPage={page} />
    </section>
  );
}
