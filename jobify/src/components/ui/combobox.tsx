import React, { useState, useEffect } from 'react'

interface ComboBoxProps {
  minSearchLength: number
  value: string
  apiUrl: string
  apiQuery: string
  apiSearchQuery: string
  onCategoryChange?: (selectedCategory: string) => void  // Adiciona o manipulador de evento de mudança de categoria
}

const ComboBox: React.FC<ComboBoxProps> = ({ 
  minSearchLength, 
  value,
  apiUrl, 
  apiQuery, 
  apiSearchQuery,
  onCategoryChange  // Recebe a função onCategoryChange
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Função para buscar os resultados da API
  const fetchResults = async (search: string, isSearch: boolean) => {
    setIsLoading(true)
    let url = ''
    
    if (isSearch) {
      // Caso seja uma busca por palavra-chave (input)
      url = `${apiUrl}?search=${search}`
    } else {
      // Caso seja uma busca por categoria (ComboBox)
      url = `${apiUrl}?category=${search}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      setResults(data.jobs)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (query.length >= minSearchLength) {
      fetchResults(query, apiSearchQuery === 'search')
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    setQuery(value) 
  }, [value])

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSelect = (item: any) => {
    setQuery(item.name)  // Ou qualquer outra chave que você deseje como valor selecionado
    setIsOpen(false)      // Fecha a lista de opções quando um item for selecionado
    if (onCategoryChange) {
      onCategoryChange(item.name)  // Chama a função onCategoryChange quando uma categoria é selecionada
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      {/* Campo de entrada */}
      <input
        className="py-2.5 sm:py-3 ps-4 pe-9 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        type="text"
        role="combobox"
        aria-expanded={isOpen ? 'true' : 'false'}
        value={query}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        placeholder='Busque por categoria...'
        onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay para clique dentro da dropdown
      />
      
      {/* Ícone de alternância */}
      <div
        className="absolute top-1/2 end-3 -translate-y-1/2 cursor-pointer"
        aria-expanded={isOpen ? 'true' : 'false'}
        role="button"
        onClick={handleToggle}
      >
        <svg className="shrink-0 size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 15 5 5 5-5"></path>
          <path d="m7 9 5-5 5 5"></path>
        </svg>
      </div>

      {/* Lista de resultados */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
          role="listbox"
        >
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            results.map((item: { name: string; id: number }) => (
              <div
                key={item.id}
                className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100"
                onClick={() => handleSelect(item)}
              >
                <div className="flex justify-between items-center w-full">
                  <div>{item.name}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ComboBox
