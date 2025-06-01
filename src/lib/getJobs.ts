//src/lib/getJobs.ts

export async function getJobs() {
    const res = await fetch("https://remotive.com/api/remote-jobs");
    if (!res.ok) throw new Error("Erro ao buscar vagas da API"); 
    const data = await res.json();
    return data.jobs;
}