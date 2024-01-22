import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ExtendedMovieDetails } from '../data/movies'
import { useMovieStore } from '../store/useMovieStore'

interface HeroCarouselProps {
  movies: ExtendedMovieDetails[]
}

export const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore()

  const currentMovie = movies[currentIndex]

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || movies.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 8000) // Change slide every 8 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, movies.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
    setTimeout(() => setIsAutoPlaying(true), 30000) // Resume after 30 seconds
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % movies.length)
  }

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? movies.length - 1 : currentIndex - 1)
  }

  const handleFavoriteClick = () => {
    if (!currentMovie) return
    
    if (isFavorite(currentMovie.imdbID)) {
      removeFromFavorites(currentMovie.imdbID)
    } else {
      addToFavorites({
        imdbID: currentMovie.imdbID,
        Title: currentMovie.Title,
        Year: currentMovie.Year,
        Type: currentMovie.Type,
        Poster: currentMovie.Poster
      })
    }
  }

  if (!currentMovie || movies.length === 0) {
    return null
  }

  const isInFavorites = isFavorite(currentMovie.imdbID)

  return (
    <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: currentMovie.backdropImage 
            ? `url(${currentMovie.backdropImage})` 
            : `url(${currentMovie.Poster})`
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-6">
          {/* Category Badge */}
          <div className="flex items-center space-x-3">
            <span className="px-4 py-2 bg-purple-gradient text-white text-sm font-bold rounded-full uppercase tracking-wide shadow-lg">
              {currentMovie.featured ? 'Featured' : currentMovie.category}
            </span>
            {currentMovie.continueWatching && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent-500 text-white text-sm font-semibold rounded-full">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Continue Watching</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {currentMovie.Title}
          </h1>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-1">
              <span className="text-accent-400">⭐</span>
              <span className="font-bold">{currentMovie.userRating || currentMovie.imdbRating}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300">{currentMovie.Year}</span>
            <span className="text-gray-300">•</span>
            <span className="px-2 py-1 border border-gray-400 text-xs rounded">
              {currentMovie.Rated}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300">{currentMovie.duration}m</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {currentMovie.tags?.slice(0, 4).map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary-700/80 backdrop-blur-sm text-gray-200 text-xs rounded-full border border-primary-600/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Plot */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            {currentMovie.Plot}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={`/movie/${currentMovie.imdbID}`}
              className="flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              <span className="text-xl">▶️</span>
              <span>Play</span>
            </Link>

            <button
              onClick={handleFavoriteClick}
              className="flex items-center justify-center space-x-3 bg-gray-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
            >
              <span className="text-xl">{isInFavorites ? '❤️' : '🤍'}</span>
              <span>My List</span>
            </button>

            <Link
              to={`/movie/${currentMovie.imdbID}`}
              className="flex items-center justify-center space-x-3 bg-gray-600/40 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-600/60 transition-all duration-200"
            >
              <span>ℹ️</span>
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {movies.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Previous movie"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Next movie"
          >
            →
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Continue Watching Progress Bar */}
      {currentMovie.continueWatching && currentMovie.watchedPercentage && (
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-gray-600 h-1">
            <div 
              className="bg-accent-500 h-1 transition-all duration-300"
              style={{ width: `${currentMovie.watchedPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}