import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExtendedMovieDetails } from '../data/movies'
import { useMovieStore } from '../store/useMovieStore'

interface MoviePreviewCardProps {
  movie: ExtendedMovieDetails
  onClose: () => void
  position: { top: number; left: number }
}

export const MoviePreviewCard = ({ movie, onClose, position }: MoviePreviewCardProps) => {
  const [showPreview, setShowPreview] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore()

  useEffect(() => {
    const timer = setTimeout(() => setShowPreview(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleFavoriteClick = (e: React.MouseEvent) => {
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

  if (!showPreview) {
    return null
  }

  const genres = movie.Genre?.split(', ').slice(0, 3) || []

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={cardRef}
        className="absolute pointer-events-auto animate-scale-up origin-bottom-left"
        style={{
          top: Math.max(10, position.top - 50),
          left: Math.min(position.left - 50, window.innerWidth - 320),
          width: '300px'
        }}
      >
        <div className="bg-dark-900 rounded-lg shadow-2xl border border-primary-600/30 overflow-hidden backdrop-blur-xl">
          {/* Video Preview / Poster */}
          <div className="relative aspect-video bg-primary-800">
            {movie.trailerUrl && videoLoaded ? (
              <video
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src={movie.trailerUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={movie.backdropImage || movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover"
                onError={() => setVideoLoaded(false)}
              />
            )}
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Link
                to={`/movie/${movie.imdbID}`}
                className="w-16 h-16 bg-white/90 hover:bg-white text-black rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-xl"
              >
                <span className="text-2xl ml-1">▶️</span>
              </Link>
            </div>

            {/* Continue Watching Progress */}
            {movie.continueWatching && movie.watchedPercentage && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="flex items-center space-x-2 text-xs text-white mb-1">
                  <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                  <span>{movie.watchedPercentage}% watched</span>
                </div>
                <div className="bg-gray-600 h-1 rounded">
                  <div 
                    className="bg-accent-500 h-1 rounded transition-all duration-300"
                    style={{ width: `${movie.watchedPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  title="Play"
                >
                  <span className="text-sm">▶️</span>
                </Link>
                <button
                  onClick={handleFavoriteClick}
                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                  title={isFavorite(movie.imdbID) ? 'Remove from list' : 'Add to list'}
                >
                  <span className="text-sm">{isFavorite(movie.imdbID) ? '❤️' : '🤍'}</span>
                </button>
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                  title="More info"
                >
                  <span className="text-sm">ℹ️</span>
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-accent-400">⭐</span>
                <span className="text-white font-semibold">
                  {movie.userRating || movie.imdbRating}
                </span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="space-y-2">
              <h3 className="text-white font-bold text-sm leading-tight">
                {movie.Title}
              </h3>
              
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <span className="px-2 py-1 border border-gray-500 rounded text-xs">
                  {movie.Rated}
                </span>
                <span>{movie.Year}</span>
                <span>•</span>
                <span>{movie.duration || movie.Runtime}</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1">
                {genres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 bg-primary-700/60 text-gray-300 text-xs rounded-full"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>

              {/* Plot */}
              {movie.Plot && (
                <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                  {movie.Plot}
                </p>
              )}

              {/* Additional Info */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                <span>Director: {movie.Director}</span>
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <span className="text-accent-400">🏆</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}