'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<any>(null)

  const router = useRouter() // Para navegação

  const handleBackClick = () => {
    router.back() // Volta para a página anterior
  }

  useEffect(() => {
    const storedJob = localStorage.getItem('selectedJob')
    if (storedJob) {
      const jobData = JSON.parse(storedJob)
      console.log(jobData);
      if (jobData.id == params.id) {
        setJob(jobData)
      }
    }
  }, [params.id])

  if (!job) {
    return <div className="p-10">Carregando ou vaga não encontrada...</div>
  }

  return (
    <div className="p-10">
        <div className='flex justify-between'>
            <Button
            onClick={handleBackClick}
            className="bg-gray-200 rounded-full p-2 mr-4 hover:bg-gray-300 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="M12 5l-7 7 7 7"></path>
            </svg>
            </Button>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <Button
              className="bg-emerald-700 font-bold mt-4 h-12 cursor-pointer hover:bg-emerald-800">
              Canditar Agora
            </Button>
        </div>
      <p className="text-sm text-gray-500 mb-6">{job.company_name} - {job.candidate_required_location}</p>

      {/* Descrição com HTML */}
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </div>
  )
}
