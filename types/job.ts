export type Job = {
  id: number;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  url: string;
  description?: string; // adicionado para [id].tsx
};
