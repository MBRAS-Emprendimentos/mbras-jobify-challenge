export interface RemotiveJob {
    id: number;
    url: string;
    title: string;
    company_name: string;
    company_logo: string | null;
    category: string;
    job_type?: string;
    publication_date: string;
    candidate_required_location: string;
    salary?: string;
    description: string;
  }
  
  const API_BASE = "https://remotive.com/api/remote-jobs";
  
  export async function fetchJobs(params: {
    search?: string;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<RemotiveJob[]> {
    const qs = new URLSearchParams();
    if (params.search) qs.append("search", params.search);
    if (params.category) qs.append("category", params.category);
    if (params.limit) qs.append("limit", params.limit.toString());
    if (params.offset) qs.append("offset", params.offset.toString());
  
    const res = await fetch(`${API_BASE}?${qs.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Erro ao buscar vagas");
    const json = await res.json();
    return json.jobs as RemotiveJob[];
  }
  
  export async function fetchJobById(id: number): Promise<RemotiveJob | null> {
    const jobs = await fetchJobs({ limit: 200 });
    return jobs.find((j) => j.id === id) ?? null;
  }