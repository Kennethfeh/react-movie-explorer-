import { useState, useCallback, useEffect } from 'react'
import { useMovieStore } from '../store/useMovieStore'
import { movieService } from '../services/movieService'

export const SearchBar = () => {
  const [localQuery, setLocalQuery] = useState('')
  const {
    searchQuery,
    setSearchQuery,
    setSearchResults,
    setLoading,
    setError,
    setCurrentPage,
    isLoading
  } = useMovieStore()

  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    if (!query.trim()) {
      useMovieStore.getState().clearSearch()
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await movieService.searchMovies(query.trim(), page)
      
      if (response.Response === 'True') {
        setSearchResults(response.Search, parseInt(response.totalResults))
        setCurrentPage(page)
      } else {
        setSearchResults([], 0)
        setError(response.Error || 'No movies found')
      }
    } catch (error) {
      setError('Failed to search movies. Please try again.')
      setSearchResults([], 0)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setSearchResults, setCurrentPage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = localQuery.trim()
    if (trimmedQuery) {
      setSearchQuery(trimmedQuery)
      handleSearch(trimmedQuery)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value)
  }

  const handleClear = () => {
    setLocalQuery('')
    setSearchQuery('')
    useMovieStore.getState().clearSearch()
  }

  // Sync with store state
  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  return (
    <form onSubmit={handleSubmit} className="relative" role="search">
      <div className="relative">
        <input
          type="search"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search movies..."
          className="input pr-20"
          aria-label="Search movies"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors rounded-full hover:bg-primary-700/60"
              aria-label="Clear search"
            >
              <span className="text-lg">✕</span>
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !localQuery.trim()}
            className="bg-purple-gradient hover:shadow-xl text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            aria-label="Search"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>🔍</span>
                <span>Search</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}