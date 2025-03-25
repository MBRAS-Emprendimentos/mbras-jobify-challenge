'use client'

import { useEffect, useState } from 'react'
import { mockJobs } from '../mocks/jobs'
import { Job } from '../types'
import { motion } from 'framer-motion'
import { cloneElement } from 'react'
import React from 'react'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const itemsPerPage = 4

  useEffect(() => {
    setJobs(mockJobs)
    setFilteredJobs(mockJobs)
    setCategories([...new Set(mockJobs.map((job) => job.category))])
  }, [])

  const handleSearch = () => {
    const results = jobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory = selectedCategory ? job.category === selectedCategory : true
      return matchTitle && matchCategory
    })
    setFilteredJobs(results)
    setPage(1)
    setSelectedJob(null)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setFilteredJobs(jobs)
    setPage(1)
    setSelectedJob(null)
  }

  const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <main className="min-h-screen bg-[#0e0e11] text-white px-4 py-10 font-sans">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-10">
        Encontre a vaga dos seus sonhos com a{' '}
        <span className="text-blue-500 font-bold">Jobify</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Pesquisar vagas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 rounded-md border border-[#2a2a2a] w-64 bg-[#1a1a1d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-md border border-[#2a2a2a] w-64 bg-[#1a1a1d] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Categoria</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-medium"
        >
          Buscar
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 rounded-md font-medium"
        >
          Limpar
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`cursor-pointer border rounded-xl p-5 transition duration-300 ${
                selectedJob?.id === job.id
                  ? 'border-blue-500 bg-[#16161a]'
                  : 'border-[#2e2e33] hover:border-blue-500'
              }`}
            >
              <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-full">
                  {cloneElement(job.icon, { className: 'w-5 h-5 text-white' })}
                </div>
                {job.title}
              </h3>
              <p className="text-sm text-gray-400">{job.company_name}</p>
              <p className="text-sm text-gray-300">
                {job.candidate_required_location} · {job.salary}
              </p>
              <p className="text-xs text-gray-500 mt-1">Publicado: {job.publication_date}</p>
            </div>
          ))}
        </div>

        <motion.div
          key={selectedJob?.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#16161a] border border-[#2e2e33] rounded-xl p-6 shadow-md h-[480px] flex flex-col justify-between overflow-y-auto"
        >
          {selectedJob ? (
            <>
              <div>
                <h2 className="text-2xl font-bold text-blue-400 mb-2 flex items-center gap-3">
                  <div className="bg-blue-600 p-3 rounded-full">
                    {cloneElement(selectedJob.icon, { className: 'w-6 h-6 text-white' })}
                  </div>
                  {selectedJob.title}
                </h2>
                <p className="text-sm text-gray-400">{selectedJob.company_name}</p>
                <p className="text-base font-medium text-gray-100 mt-1">
                  {selectedJob.candidate_required_location} · {selectedJob.salary}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-4 whitespace-pre-line">
                  {selectedJob.description}
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
                  Escolher vaga
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full">
                <span className="text-6xl mb-4">💼</span>
                  <p className="text-lg font-semibold">Nenhuma vaga selecionada</p>
                  <p className="text-sm mt-1 text-gray-500">Escolha uma oportunidade na lista ao lado</p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(filteredJobs.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-3 h-3 rounded-full ${
              page === i + 1 ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
        <div 
        className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
        </div>
    </main>
  )
}
