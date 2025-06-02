'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Button } from '@mui/material';

type Job = {
  id: number;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
};

const JobTable = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('https://remotive.com/api/remote-jobs');
        const data = await res.json();
        const formattedJobs = data.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company_name: job.company_name,
          category: job.category,
          job_type: job.job_type,
        }));
        setJobs(formattedJobs);
      } catch (err) {
        console.error('Erro ao buscar vagas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Título',
      },
      {
        accessorKey: 'company_name',
        header: 'Empresa',
      },
      {
        accessorKey: 'category',
        header: 'Categoria',
      },
      {
        accessorKey: 'job_type',
        header: 'Tipo',
      },
    ],
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: '90%', margin: '2rem auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Vagas de Emprego</h1>

        {isLoading ? (
          <p style={{ textAlign: 'center' }}>Carregando vagas...</p>
        ) : (
          <MaterialReactTable
            columns={columns}
            data={jobs}
            enablePagination
            enableColumnActions={false}
            enableColumnFilters={false}
            enableSorting
            enableDensityToggle={false}
            positionPagination="bottom"
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button
            onClick={() => setIsDarkMode((prev) => !prev)}
            variant="outlined"
            size="small"
          >
            Alternar Tema
          </Button>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default JobTable;
