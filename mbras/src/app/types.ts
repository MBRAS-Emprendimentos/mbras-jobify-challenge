export type Job = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type?: "full_time" | "contract" | "part_time" | "freelance" | "internship";
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  description: string;
};
