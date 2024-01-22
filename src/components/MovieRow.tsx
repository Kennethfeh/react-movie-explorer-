import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExtendedMovieDetails } from '../data/movies'
import { useMovieStore } from '../store/useMovieStore'
import { MoviePreviewCard } from './MoviePreviewCard'

interface MovieRowProps {
  title: string
  movies: ExtendedMovieDetails[]
  showViewAll?: boolean
}

export const MovieRow = ({ title, movies, showViewAll = false }: MovieRowProps) => {
  const [, setHoveredMovie] = useState<string | null>(null)
  const [previewMovie, setPreviewMovie] = useState<ExtendedMovieDetails | null>(null)
  const [previewPosition, setPreviewPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore()

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleFavoriteClick = (movie: ExtendedMovieDetails, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID)
    } else {
      addToFavorites({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster
      })
    }
  }

  const handleMouseEnter = (movie: ExtendedMovieDetails, event: React.MouseEvent) => {
    setHoveredMovie(movie.imdbID)
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    
    // Set timeout to show preview after 1 second
    hoverTimeoutRef.current = setTimeout(() => {
      const rect = event.currentTarget.getBoundingClientRect()
      setPreviewPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      })
      setPreviewMovie(movie)
    }, 1000)
  }

  const handleMouseLeave = () => {
    setHoveredMovie(null)
    
    // Clear timeout if mouse leaves before preview shows
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    // Small delay before closing preview to allow mouse to move to preview card
    setTimeout(() => {
      setPreviewMovie(null)
    }, 200)
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className="relative group mb-8">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        {showViewAll && (
          <button className="text-accent-400 hover:text-accent-300 font-semibold text-sm transition-colors">
            View All →
          </button>
        )}
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center ml-2 shadow-xl"
          aria-label="Scroll left"
        >
          ←
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center mr-2 shadow-xl"
          aria-label="Scroll right"
        >
          →
        </button>

        {/* Movie Cards Container */}
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex-shrink-0 w-48 md:w-56 transform transition-all duration-300 hover:scale-105 hover:z-20"
              onMouseEnter={(e) => handleMouseEnter(movie, e)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/movie/${movie.imdbID}`} className="block">
                <div className="relative group/card">
                  {/* Movie Poster */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : `https://via.placeholder.com/300x450/444/fff?text=${encodeURIComponent(movie.Title)}`}
                      alt={`${movie.Title} poster`}
                      className="w-full aspect-[2/3] object-cover transition-all duration-300 group-hover/card:brightness-75"
                      loading="lazy"
                    />

                    {/* Continue Watching Progress */}
                    {movie.continueWatching && movie.watchedPercentage && (
                      <div className="absolute bottom-0 left-0 right-0 bg-dark-800/80 backdrop-blur-sm p-2">
                        <div className="flex items-center space-x-2 text-xs text-white">
                          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                          <span>{movie.watchedPercentage}% watched</span>
                        </div>
                        <div className="mt-1 bg-gray-600 h-1 rounded">
                          <div 
                            className="bg-accent-500 h-1 rounded transition-all duration-300"
                            style={{ width: `${movie.watchedPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-dark-900/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-sm font-bold">
                      <span className="text-accent-400">⭐</span>
                      <span>{movie.userRating || movie.imdbRating}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-purple-overlay opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                          ▶ PLAY
                        </div>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex justify-center space-x-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-100">
                          <button
                            onClick={(e) => handleFavoriteClick(movie, e)}
                            className="w-8 h-8 bg-gray-700/80 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                            title={isFavorite(movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
                          </button>
                          <Link
                            to={`/movie/${movie.imdbID}`}
                            className="w-8 h-8 bg-gray-700/80 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                            title="More info"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ℹ️
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="pt-3 space-y-1">
                    <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover/card:text-accent-400 transition-colors">
                      {movie.Title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{movie.Year}</span>
                      <span className="px-2 py-1 bg-primary-700/60 rounded-full text-xs">
                        {movie.Rated}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {movie.tags?.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-0.5 bg-primary-700/40 text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="text-xs text-gray-400 pt-1">
                      {movie.duration ? `${movie.duration}m` : movie.Runtime}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Card */}
      {previewMovie && (
        <MoviePreviewCard
          movie={previewMovie}
          position={previewPosition}
          onClose={() => setPreviewMovie(null)}
        />
      )}
    </div>
  )
}

// Skeleton loader for movie rows
export const MovieRowSkeleton = ({ title: _ }: { title: string }) => {
  return (
    <div className="mb-8">
      <div className="px-4 sm:px-6 lg:px-8 mb-4">
        <div className="h-6 bg-primary-600 rounded w-48 animate-pulse"></div>
      </div>
      <div className="flex space-x-2 px-4 sm:px-6 lg:px-8">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex-shrink-0 w-48 md:w-56">
            <div className="bg-primary-600 aspect-[2/3] rounded-xl animate-pulse"></div>
            <div className="pt-3 space-y-2">
              <div className="h-4 bg-primary-600 rounded animate-pulse"></div>
              <div className="h-3 bg-primary-600 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}