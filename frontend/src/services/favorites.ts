const API = 'http://localhost:5000/favorites';

export const getFavorites = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const addFavorite = async (job: { jobId: number, title: string, company: string }) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
  return await res.json();
};

export const removeFavorite = async (jobId: number) => {
  const res = await fetch(`${API}/${jobId}`, { method: 'DELETE' });
  return await res.json();
};
