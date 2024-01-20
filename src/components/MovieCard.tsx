import { Link } from 'react-router-dom'
import { Movie } from '../types/movie'
import { useMovieStore } from '../store/useMovieStore'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieStore()
  const isInFavorites = isFavorite(movie.imdbID)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInFavorites) {
      removeFromFavorites(movie.imdbID)
    } else {
      addToFavorites(movie)
    }
  }

  const placeholderPoster = `https://via.placeholder.com/300x450/e5e7eb/6b7280?text=${encodeURIComponent(movie.Title)}`

  return (
    <div className="movie-card group">
      <Link 
        to={`/movie/${movie.imdbID}`}
        className="block"
        aria-label={`View details for ${movie.Title}`}
      >
        <div className="relative overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : placeholderPoster}
            alt={`${movie.Title} poster`}
            className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = placeholderPoster
            }}
          />
          <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-gold-500 text-dark-900 px-4 py-2 rounded-full font-bold text-sm mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                ▶ WATCH NOW
              </div>
              <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                View Details
              </p>
            </div>
          </div>
          
          {/* Rating overlay */}
          <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center space-x-1">
            <span className="rating-star">⭐</span>
            <span className="text-sm font-medium">8.2</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-100 line-clamp-2 flex-1 mr-2 text-lg leading-tight">
            {movie.Title}
          </h3>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
              isInFavorites
                ? 'text-red-500 hover:text-red-400 bg-red-500/10'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
            }`}
            aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isInFavorites ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-300 font-medium">{movie.Year}</span>
          <span className="genre-tag capitalize">
            {movie.Type}
          </span>
        </div>
        
        {/* Additional info */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span className="flex items-center space-x-1">
            <span>🎭</span>
            <span>Drama, Action</span>
          </span>
          <span>•</span>
          <span>2h 15m</span>
        </div>
      </div>
    </div>
  )
}

// Skeleton loader component
export const MovieCardSkeleton = () => {
  return (
    <div className="card">
      <div className="skeleton-image" />
      <div className="p-4">
        <div className="skeleton-title" />
        <div className="skeleton-text w-1/2" />
      </div>
    </div>
  )
}