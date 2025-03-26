export function formatPublicationDate(dateString: string): string {
    const now = new Date();
    const published = new Date(dateString);
  
    if (isNaN(published.getTime())) return 'Data inválida';
  
    const diffTime = now.getTime() - published.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    const formattedDate = published.toLocaleDateString();
  
    const diffString =
      diffDays === 0
        ? 'Hoje'
        : diffDays === 1
        ? 'Há 1 dia'
        : `Há ${diffDays} dias`;
  
    return `${formattedDate} (${diffString})`;
  }
  