// pages/_app.tsx
import type { AppProps } from 'next/app';
import { JobsProvider } from '@/context/JobsContext';
import ThemeToggle from '@/components/ThemeToggle';
import '../styles/globals.css';
import '../styles/Loader.css';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <JobsProvider>
      <Component {...pageProps} />
    </JobsProvider>
  );
}
