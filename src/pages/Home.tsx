import { useEffect, useState } from 'react'
import { useMovieStore } from '../store/useMovieStore'
import { MovieCard, MovieCardSkeleton } from '../components/MovieCard'
import { Pagination } from '../components/Pagination'
import { HeroCarousel } from '../components/HeroCarousel'
import { MovieRow, MovieRowSkeleton } from '../components/MovieRow'
import { movieService } from '../services/movieService'
import { ExtendedMovieDetails } from '../data/movies'

export const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState<ExtendedMovieDetails[]>([])
  const [continueWatching, setContinueWatching] = useState<ExtendedMovieDetails[]>([])
  const [trendingMovies, setTrendingMovies] = useState<ExtendedMovieDetails[]>([])
  const [actionMovies, setActionMovies] = useState<ExtendedMovieDetails[]>([])
  const [dramaMovies, setDramaMovies] = useState<ExtendedMovieDetails[]>([])
  const [comedyMovies, setComedyMovies] = useState<ExtendedMovieDetails[]>([])
  const [sciFiMovies, setSciFiMovies] = useState<ExtendedMovieDetails[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const {
    searchResults,
    searchQuery,
    selectedGenre,
    currentPage,
    totalResults,
    isLoading,
    error,
    setLoading,
    setError,
    setSearchResults
  } = useMovieStore()

  // Load all movie categories for Netflix-style layout
  useEffect(() => {
    const loadAllCategories = async () => {
      if (searchQuery || selectedGenre) return // Skip if user is searching or filtering

      setIsLoadingCategories(true)
      
      try {
        const [
          featured,
          continueWatchingData,
          trending,
          action,
          drama,
          comedy,
          sciFi
        ] = await Promise.all([
          movieService.getFeaturedMovies(),
          movieService.getContinueWatchingMovies(),
          movieService.getTrendingMovies(),
          movieService.getActionMovies(),
          movieService.getDramaMovies(),
          movieService.getComedyMovies(),
          movieService.getSciFiMovies()
        ])

        setFeaturedMovies(featured)
        setContinueWatching(continueWatchingData)
        setTrendingMovies(trending)
        setActionMovies(action)
        setDramaMovies(drama)
        setComedyMovies(comedy)
        setSciFiMovies(sciFi)
      } catch (error) {
        console.error('Error loading movie categories:', error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadAllCategories()
  }, [searchQuery, selectedGenre])

  // Handle search and filtering functionality
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery && !selectedGenre) return

      setLoading(true)
      try {
        const response = await movieService.searchMovies(searchQuery, 1, selectedGenre)
        if (response.Response === 'True') {
          setSearchResults(response.Search, parseInt(response.totalResults))
        } else {
          setSearchResults([], 0)
          setError(response.Error || 'No movies found')
        }
      } catch (err) {
        setError('Search failed. Please try again.')
        setSearchResults([], 0)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [searchQuery, selectedGenre, setLoading, setError, setSearchResults])

  const handlePageChange = async (page: number) => {
    if (searchQuery || selectedGenre) {
      setLoading(true)
      try {
        const response = await movieService.searchMovies(searchQuery, page, selectedGenre)
        if (response.Response === 'True') {
          setSearchResults(response.Search, parseInt(response.totalResults))
          useMovieStore.getState().setCurrentPage(page)
        }
      } catch (err) {
        setError('Failed to load page')
      } finally {
        setLoading(false)
      }
    }
  }

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }, (_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">
            {error}
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Try searching for a different movie title.
          </p>
          <button 
            onClick={() => useMovieStore.getState().setSearchQuery('')}
            className="btn-primary"
          >
            Browse Movies
          </button>
        </div>
      )
    }

    if (searchResults.length === 0 && (searchQuery || selectedGenre)) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-3xl font-bold text-gray-100 mb-4">
            No movies found
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            {searchQuery && selectedGenre ? (
              <>No results for <span className="text-accent-400 font-semibold">"{searchQuery}"</span> in <span className="text-accent-400 font-semibold">{selectedGenre}</span> genre.</>
            ) : searchQuery ? (
              <>No results for <span className="text-accent-400 font-semibold">"{searchQuery}"</span>. Try a different search term.</>
            ) : (
              <>No movies found in <span className="text-accent-400 font-semibold">{selectedGenre}</span> genre.</>
            )}
          </p>
          <button 
            onClick={() => {
              useMovieStore.getState().setSearchQuery('')
              useMovieStore.getState().setSelectedGenre('')
            }}
            className="btn-primary"
          >
            Browse All Movies
          </button>
        </div>
      )
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            {searchQuery && selectedGenre ? 'Search & Filter Results' : searchQuery ? 'Search Results' : 'Filter Results'}
          </h1>
          <p className="text-gray-400 text-lg">
            {searchQuery && selectedGenre ? (
              <>Found {totalResults} results for "{searchQuery}" in {selectedGenre} genre</>
            ) : searchQuery ? (
              <>Found {totalResults} results for "{searchQuery}"</>
            ) : (
              <>Found {totalResults} movies in {selectedGenre} genre</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
        
        {totalResults > 10 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              resultsPerPage={10}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    )
  }

  // If user is searching or filtering, show search results
  if (searchQuery || selectedGenre) {
    return (
      <div className="min-h-screen bg-purple-gradient-dark">
        {renderSearchResults()}
      </div>
    )
  }

  // Netflix-style home page layout
  return (
    <div className="min-h-screen bg-purple-gradient-dark">
      {/* Hero Carousel */}
      {featuredMovies.length > 0 && (
        <HeroCarousel movies={featuredMovies} />
      )}

      {/* Movie Rows */}
      <div className="relative -mt-20 z-10 bg-gradient-to-t from-purple-gradient-dark via-purple-gradient-dark to-transparent pt-20">
        {isLoadingCategories ? (
          // Loading skeleton
          <div className="space-y-8">
            <MovieRowSkeleton title="Continue Watching" />
            <MovieRowSkeleton title="Trending Now" />
            <MovieRowSkeleton title="Action Movies" />
            <MovieRowSkeleton title="Drama Movies" />
            <MovieRowSkeleton title="Comedy Movies" />
            <MovieRowSkeleton title="Sci-Fi Movies" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Continue Watching */}
            {continueWatching.length > 0 && (
              <MovieRow 
                title="Continue Watching" 
                movies={continueWatching} 
              />
            )}

            {/* Trending Now */}
            {trendingMovies.length > 0 && (
              <MovieRow 
                title="Trending Now" 
                movies={trendingMovies} 
                showViewAll={true} 
              />
            )}

            {/* Action Movies */}
            {actionMovies.length > 0 && (
              <MovieRow 
                title="Action & Adventure" 
                movies={actionMovies} 
                showViewAll={true} 
              />
            )}

            {/* Drama Movies */}
            {dramaMovies.length > 0 && (
              <MovieRow 
                title="Award-Winning Dramas" 
                movies={dramaMovies} 
                showViewAll={true} 
              />
            )}

            {/* Comedy Movies */}
            {comedyMovies.length > 0 && (
              <MovieRow 
                title="Comedy Movies" 
                movies={comedyMovies} 
                showViewAll={true} 
              />
            )}

            {/* Sci-Fi Movies */}
            {sciFiMovies.length > 0 && (
              <MovieRow 
                title="Sci-Fi & Fantasy" 
                movies={sciFiMovies} 
                showViewAll={true} 
              />
            )}
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}