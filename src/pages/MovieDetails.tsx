import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useMovieStore } from '../store/useMovieStore'
import { movieService } from '../services/movieService'

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    selectedMovie,
    isLoadingDetails,
    setSelectedMovie,
    setLoadingDetails,
    isFavorite,
    addToFavorites,
    removeFromFavorites
  } = useMovieStore()

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!id) {
        navigate('/')
        return
      }

      setLoadingDetails(true)
      try {
        const movie = await movieService.getMovieDetails(id)
        setSelectedMovie(movie)
      } catch (error) {
        console.error('Failed to load movie details:', error)
        setSelectedMovie(null)
      } finally {
        setLoadingDetails(false)
      }
    }

    loadMovieDetails()

    return () => {
      setSelectedMovie(null)
    }
  }, [id, navigate, setSelectedMovie, setLoadingDetails])

  const handleFavoriteClick = () => {
    if (!selectedMovie) return
    
    const movieData = {
      imdbID: selectedMovie.imdbID,
      Title: selectedMovie.Title,
      Year: selectedMovie.Year,
      Type: selectedMovie.Type,
      Poster: selectedMovie.Poster
    }

    if (isFavorite(selectedMovie.imdbID)) {
      removeFromFavorites(selectedMovie.imdbID)
    } else {
      addToFavorites(movieData)
    }
  }

  if (isLoadingDetails) {
    return (
      <div className="min-h-screen bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                <div className="skeleton aspect-[2/3] w-full rounded-xl" />
              </div>
              <div className="lg:w-2/3">
                <div className="skeleton-title mb-6 h-10" />
                <div className="skeleton-text mb-4" />
                <div className="skeleton-text mb-4" />
                <div className="skeleton-text mb-8 w-3/4" />
                <div className="skeleton h-40 mb-6 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="text-8xl mb-6 opacity-50">🎬</div>
            <h1 className="text-4xl font-bold text-gray-100 mb-4">
              Movie not found
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              The movie you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const placeholderPoster = `https://via.placeholder.com/400x600/e5e7eb/6b7280?text=${encodeURIComponent(selectedMovie.Title)}`
  const isInFavorites = isFavorite(selectedMovie.imdbID)

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Background */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: selectedMovie.Poster !== 'N/A' 
            ? `linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.7) 50%, rgba(10,10,10,0.95) 100%), url(${selectedMovie.Poster})`
            : 'linear-gradient(135deg, #1f1f1f 0%, #0a0a0a 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <nav className="mb-6" aria-label="Breadcrumb">
            <Link 
              to="/" 
              className="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center space-x-2 transition-colors"
            >
              <span>←</span>
              <span>Back to Movies</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <img
                src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : placeholderPoster}
                alt={`${selectedMovie.Title} poster`}
                className="w-full rounded-2xl shadow-movie hover:shadow-movie-hover transition-all duration-300"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = placeholderPoster
                }}
              />
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-dark-800 rounded-2xl p-8 shadow-movie border border-dark-600">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-2">
                    {selectedMovie.Title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="text-lg">{selectedMovie.Year}</span>
                    <span>•</span>
                    <span className="px-3 py-1 bg-dark-700 rounded-full text-sm">
                      {selectedMovie.Rated}
                    </span>
                    <span>•</span>
                    <span>{selectedMovie.Runtime}</span>
                  </div>
                </div>
                <button
                  onClick={handleFavoriteClick}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    isInFavorites
                      ? 'text-red-500 hover:text-red-400 bg-red-500/10'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                  }`}
                  aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <span className="text-2xl">{isInFavorites ? '❤️' : '🤍'}</span>
                </button>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedMovie.Genre.split(', ').map((genre, index) => (
                  <span key={index} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>

              {/* Plot */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gold-400 mb-4">Synopsis</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedMovie.Plot}</p>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">Director</h3>
                  <p className="text-gray-300">{selectedMovie.Director}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">Writers</h3>
                  <p className="text-gray-300">{selectedMovie.Writer}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gold-400 mb-3">Cast</h3>
                  <p className="text-gray-300">{selectedMovie.Actors}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-dark-700 p-4 rounded-xl">
                  <span className="font-medium text-gold-400">Country</span>
                  <p className="text-gray-300 mt-1">{selectedMovie.Country}</p>
                </div>
                <div className="bg-dark-700 p-4 rounded-xl">
                  <span className="font-medium text-gold-400">Language</span>
                  <p className="text-gray-300 mt-1">{selectedMovie.Language}</p>
                </div>
              </div>
            </div>

            {/* Ratings */}
            {selectedMovie.Ratings.length > 0 && (
              <div className="mt-6 bg-dark-800 rounded-2xl p-8 shadow-movie border border-dark-600">
                <h3 className="text-2xl font-bold text-gold-400 mb-6">Ratings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedMovie.Ratings.map((rating, index) => (
                    <div key={index} className="text-center bg-dark-700 p-6 rounded-xl">
                      <h4 className="font-medium text-gray-400 mb-2">{rating.Source}</h4>
                      <p className="text-2xl font-bold text-gold-400">{rating.Value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {selectedMovie.Awards && selectedMovie.Awards !== 'N/A' && (
              <div className="mt-6 bg-dark-800 rounded-2xl p-8 shadow-movie border border-dark-600">
                <h3 className="text-2xl font-bold text-gold-400 mb-4 flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Awards</span>
                </h3>
                <p className="text-gray-300 text-lg">{selectedMovie.Awards}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}