import { useState } from 'react'
import { useMovieStore } from '../store/useMovieStore'

const GENRES = [
  'All',
  'Action',
  'Adventure', 
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Western'
]

export const GenreFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedGenre, setSelectedGenre } = useMovieStore()

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre === 'All' ? '' : genre)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-primary-700/80 hover:bg-primary-600 text-white rounded-xl border border-primary-600/60 transition-all duration-200 backdrop-blur-sm"
      >
        <span className="text-sm font-medium">
          {selectedGenre || 'All Genres'}
        </span>
        <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-primary-600/40 shadow-2xl z-50 overflow-hidden">
          <div className="py-2 max-h-64 overflow-y-auto scrollbar-hide">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreSelect(genre)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-150 ${
                  (genre === 'All' && !selectedGenre) || genre === selectedGenre
                    ? 'bg-purple-gradient text-white'
                    : 'text-gray-300 hover:bg-primary-700/60 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}