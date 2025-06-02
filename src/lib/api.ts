/*import { url } from "inspector";

export async function fetchJobs(category?: string) {
    const baseUrl = " https://remotive.com/api/remote-jobs";
    const url = category
    ? `${baseUrl}?category=${encodeURIComponent(category)}`
    : baseUrl;


const res = await fetch(url, {
    next: { revalidate: 3600}, //cache de 1 hora
});

if (!res.ok) {
    throw new Error("Erro ao buscar vagas");
}
const data =await res.json();
return data.jobs;
} */

export async function fetchJobs(category?: string) {
  const baseUrl = "https://remotive.io/api/remote-jobs";
  const url = category
    ? `${baseUrl}?category=${encodeURIComponent(category)}`
    : baseUrl;

  console.log(" URL usada para buscar vagas:", url); // <-- aqui!

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(" Status da resposta:", res.status);
    throw new Error("Erro ao buscar vagas");
  }

  const data = await res.json();
  return data.jobs;
}