import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../types/movie'
import { useMovieStore } from '../store/useMovieStore'

interface HeroSectionProps {
  featuredMovie?: Movie
}

export const HeroSection = ({ featuredMovie }: HeroSectionProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore()
  const [isInFavorites, setIsInFavorites] = useState(false)

  useEffect(() => {
    if (featuredMovie) {
      setIsInFavorites(isFavorite(featuredMovie.imdbID))
    }
  }, [featuredMovie, isFavorite])

  if (!featuredMovie) {
    return (
      <section className="relative h-96 bg-dark-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-4xl font-bold text-gold-400 mb-4">
            Welcome to CineVault
          </h1>
          <p className="text-xl text-gray-300">
            Discover, explore, and collect your favorite movies
          </p>
        </div>
      </section>
    )
  }

  const handleFavoriteClick = () => {
    if (isInFavorites) {
      removeFromFavorites(featuredMovie.imdbID)
      setIsInFavorites(false)
    } else {
      addToFavorites(featuredMovie)
      setIsInFavorites(true)
    }
  }

  const backgroundImage = featuredMovie.Poster !== 'N/A' 
    ? `url(${featuredMovie.Poster})`
    : 'linear-gradient(135deg, #1f1f1f 0%, #0a0a0a 100%)'

  return (
    <section 
      className="relative h-96 md:h-[500px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: featuredMovie.Poster !== 'N/A' ? backgroundImage : undefined,
        backgroundColor: featuredMovie.Poster === 'N/A' ? '#1f1f1f' : undefined
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-dark-900/20"></div>
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-gold-500 text-dark-900 text-sm font-bold rounded-full">
              FEATURED
            </span>
            <span className="text-gray-300 text-sm">
              {featuredMovie.Year}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {featuredMovie.Title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <span className="rating-star">⭐</span>
              <span className="text-white font-medium">8.5</span>
              <span className="text-gray-400 text-sm">/10</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="px-3 py-1 bg-dark-700/80 text-gray-300 text-sm rounded-full capitalize">
              {featuredMovie.Type}
            </span>
          </div>
          
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            Dive into this captivating story that has captured the hearts of audiences worldwide. 
            Experience the magic of cinema at its finest.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={`/movie/${featuredMovie.imdbID}`}
              className="btn-primary inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <span>▶️</span>
              <span>Watch Now</span>
            </Link>
            
            <button
              onClick={handleFavoriteClick}
              className="btn-secondary inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <span>{isInFavorites ? '❤️' : '🤍'}</span>
              <span>{isInFavorites ? 'Remove from List' : 'Add to My List'}</span>
            </button>
            
            <Link
              to={`/movie/${featuredMovie.imdbID}`}
              className="btn-secondary inline-flex items-center justify-center space-x-2 px-6 py-4"
            >
              <span>ℹ️</span>
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Fade out bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-900 to-transparent"></div>
    </section>
  )
}