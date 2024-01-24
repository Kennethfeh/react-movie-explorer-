import { Link } from 'react-router-dom'
import { useMovieStore } from '../store/useMovieStore'
import { MovieCard } from '../components/MovieCard'

export const Favorites = () => {
  const favorites = useMovieStore(state => state.favorites)

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-100 mb-2">My CineVault</h1>
            <div className="w-20 h-1 bg-gold-500 rounded-full"></div>
          </div>
          
          <div className="text-center py-16">
            <div className="text-8xl mb-6 opacity-50">🤍</div>
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Your vault is empty
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Start building your personal collection by adding movies you love. 
              Click the heart icon on any movie to add it here.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <span>🎬</span>
              <span>Discover Movies</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div className="mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-100 mb-2">My CineVault</h1>
            <div className="w-20 h-1 bg-gold-500 rounded-full mb-3"></div>
            <p className="text-gray-400 text-lg flex items-center space-x-2">
              <span>❤️</span>
              <span>
                {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your personal collection
              </span>
            </p>
          </div>
          
          <Link 
            to="/" 
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add More Movies</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-dark-800 rounded-2xl border border-dark-600">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">💡</div>
            <div>
              <h2 className="text-xl font-semibold text-gold-400 mb-3">
                Pro Tip
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Your movie collection is automatically saved and will be here whenever you return. 
                Build the ultimate personal movie library with all your favorites in one place!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}