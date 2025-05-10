import { fetchAllJobs } from "@/app/services/jobs";
import { notFound } from "next/navigation";
import styles from "./JobDetail.module.css";

export default async function JobDetail({ params }: { params: { id: string } }) {
  const jobs = await fetchAllJobs();
  const job = jobs.find((job) => job.id.toString() === params.id);

  if (!job) return notFound();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{job.title}</h1>
      <p className={styles.company}>Empresa: {job.company_name}</p>
      <p className={styles.category}>Categoria: {job.category}</p>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: job.description }}
      />

      <a
        href={job.url}
        target="_blank"
        className={styles.applyButton}
      >
        Aplicar para a vaga
      </a>
    </main>
  );
}
