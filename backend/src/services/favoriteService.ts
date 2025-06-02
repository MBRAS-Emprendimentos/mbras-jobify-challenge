import { supabase } from '../config/db';

export async function addFavorite(
  userId: string,
  jobId: number,
  jobTitle: string,
  jobUrl: string,
  jobCompany?: string,
  jobLogo?: string
) {
  const { data, error } = await supabase.from('favorites').insert([
    {
      user_id: userId,
      job_id: jobId,
      job_title: jobTitle,
      job_url: jobUrl,
      job_company: jobCompany,
      job_logo: jobLogo,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
}

export async function getFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function removeFavorite(userId: string, jobId: number) {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId);

  if (error) throw new Error(error.message);
  return data;
}
