'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from '@hugeicons/react'
import { Location01Icon, Calendar01FreeIcons } from '@hugeicons/core-free-icons'
import { formatPublicationDate } from '@/utils/dateUtils'
import ComboBox from '@/components/ui/combobox'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const category = searchParams.get('category') || ''
  const limitParam = searchParams.get('limit')
  const limit = limitParam && !isNaN(Number(limitParam)) ? Number(limitParam) : 16

  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  

  // Função para buscar vagas com base no search
  const fetchJobsBySearch = async (search: string) => {
    setLoading(true)
    const url = `https://remotive.com/api/remote-jobs?search=${search}&limit=${limit}`
    const res = await fetch(url)
    const data = await res.json()
    setJobs(data.jobs)
    setLoading(false)
  }

  // Função para buscar vagas com base na categoria
  const fetchJobsByCategory = async (category: string) => {
    setLoading(true)
    const url = `https://remotive.com/api/remote-jobs?category=${category}&limit=${limit}`
    const res = await fetch(url)
    const data = await res.json()
    setJobs(data.jobs)
    setLoading(false)
  }

  useEffect(() => {
    if (searchQuery) {
      fetchJobsBySearch(searchQuery);  // Buscar por search
    } else if (category) {
      fetchJobsByCategory(category);  // Buscar por categoria
    } else {
      // Se não houver pesquisa ou categoria, busque pelo menos 32 jobs
      setJobs([]);  // Limpar os resultados antes de fazer a busca
      fetchJobsByCategory('');  // Buscando todos os jobs, sem categoria
    }
  }, [searchQuery, category, limit]);
  

  const handleLoadMore = () => {
    const newLimit = limit + 16
    const query = new URLSearchParams(searchParams.toString())
    query.set('limit', newLimit.toString())
    router.push(`/?${query.toString()}`, { scroll: false })
  }

  return (
    <div className={`w-full p-18 ${montserrat.className}`}>
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl">Jobify</h1>
        <span className="text-2xl">Bem-vindo à Jobify! A vaga ideal para você está aqui.</span>
        <div className="flex gap-2 mt-4">
          {/* Campo de pesquisa */}
          <Input
            className="h-12 w-[600px] placeholder:opacity-80 placeholder:text-white"
            placeholder="Pesquise por título ou tecnologia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o searchQuery
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const inputValue = (e.target as HTMLInputElement).value
                setSearchQuery(inputValue) // Atualiza searchQuery para disparar o efeito
              }
            }}
          />
          {/* ComboBox de categoria */}
          <ComboBox 
            minSearchLength={0} 
            apiUrl="https://remotive.com/api/remote-jobs/categories" 
            apiQuery="category" 
            apiSearchQuery="search"
            onCategoryChange={(selectedCategory) => {
              const query = new URLSearchParams(searchParams.toString())
              query.set('category', selectedCategory)
              query.set('limit', '16')
              router.push(`/?${query.toString()}`, { scroll: false })
            }}
          />
          <Button
            className="bg-emerald-700 h-12 font-bold cursor-pointer"
            onClick={() => {
              const input = document.querySelector<HTMLInputElement>('input')!
              const query = new URLSearchParams(searchParams.toString())
              query.set('category', input.value)
              query.set('limit', '16')
              router.push(`/?${query.toString()}`)
            }}
          >
            Pesquisar
          </Button>
        </div>
        <span className="text-2xl mt-8">Exibindo {jobs.length} Vagas...</span>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {jobs.map((item) => (
          <Card className="p-8 transition-all duration-500 ease-out animate-fade-in" key={item.id}>
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <div className='flex gap-8 items-center'>
              <div className='flex gap-3 items-center'>
                <HugeiconsIcon icon={Location01Icon} />
                <span className="mt-1"> {item.candidate_required_location}</span>
              </div>
              <div className='flex gap-3 items-center'>
                <HugeiconsIcon icon={Calendar01FreeIcons} />
                <span className="mt-1">{formatPublicationDate(item.publication_date)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant="outline">{item.job_type}</Badge>
            </div>
            <Button className="bg-emerald-700 font-bold mt-4 h-12 cursor-pointer hover:bg-emerald-800">
              Saiba Mais
            </Button>
          </Card>
        ))}
      </main>

      {!loading && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} className="bg-emerald-700 font-bold h-12 px-6 hover:bg-emerald-800">
            Visualizar mais vagas
          </Button>
        </div>
      )}
    </div>
  )
}
