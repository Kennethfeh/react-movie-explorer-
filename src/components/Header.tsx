import { Link, useLocation } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { GenreFilter } from './GenreFilter'
import { useMovieStore } from '../store/useMovieStore'

export const Header = () => {
  const location = useLocation()
  const favorites = useMovieStore(state => state.favorites)
  
  return (
    <header className="bg-primary-800/80 backdrop-blur-md shadow-2xl border-b border-primary-600/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-100 hover:text-accent-400 transition-colors duration-200 flex items-center space-x-3"
              aria-label="Movie Explorer Home"
            >
              <div className="w-10 h-10 bg-purple-gradient rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🎬</span>
              </div>
              <span className="bg-gradient-to-r from-gray-100 to-accent-400 bg-clip-text text-transparent font-extrabold">
                Movie Explorer
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-2" role="navigation">
              <Link
                to="/"
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  location.pathname === '/'
                    ? 'bg-purple-gradient text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-primary-700/60'
                }`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Browse Movies
              </Link>
              <Link
                to="/favorites"
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                  location.pathname === '/favorites'
                    ? 'bg-purple-gradient text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-primary-700/60'
                }`}
                aria-current={location.pathname === '/favorites' ? 'page' : undefined}
              >
                My Collection
                {favorites.length > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg font-bold"
                    aria-label={`${favorites.length} favorites`}
                  >
                    {favorites.length}
                  </span>
                )}
              </Link>
            </nav>
          </div>
          
          {location.pathname === '/' && (
            <div className="flex-1 max-w-4xl mx-8">
              <div className="flex items-center space-x-4">
                <div className="flex-1 max-w-2xl">
                  <SearchBar />
                </div>
                <GenreFilter />
              </div>
            </div>
          )}
          
          {/* Mobile navigation */}
          <nav className="md:hidden flex space-x-2" role="navigation">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'bg-purple-gradient text-white' : 'text-gray-300 hover:text-white'
              }`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Browse
            </Link>
            <Link
              to="/favorites"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors relative ${
                location.pathname === '/favorites' ? 'bg-purple-gradient text-white' : 'text-gray-300 hover:text-white'
              }`}
              aria-current={location.pathname === '/favorites' ? 'page' : undefined}
            >
              Collection
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
        
        {/* Mobile search bar */}
        {location.pathname === '/' && (
          <div className="md:hidden pb-4 space-y-3">
            <SearchBar />
            <div className="flex justify-center">
              <GenreFilter />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}