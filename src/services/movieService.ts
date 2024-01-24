import { Movie, MovieDetails, SearchResponse } from '../types/movie'
import { moviesData, ExtendedMovieDetails, getFeaturedMovies, getContinueWatching, getMoviesByCategory } from '../data/movies'

class MovieService {
  async searchMovies(query: string, page: number = 1, genre: string = ''): Promise<SearchResponse> {
    try {
      // Simulate API delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Filter movies based on search query and genre
      let filteredMovies = moviesData.filter(movie => {
        const matchesQuery = !query || 
          movie.Title.toLowerCase().includes(query.toLowerCase()) ||
          movie.Genre.toLowerCase().includes(query.toLowerCase()) ||
          movie.Director.toLowerCase().includes(query.toLowerCase()) ||
          movie.Actors.toLowerCase().includes(query.toLowerCase())
          
        const matchesGenre = !genre || 
          movie.Genre.toLowerCase().includes(genre.toLowerCase())
          
        return matchesQuery && matchesGenre
      })

      // Simulate pagination (10 results per page)
      const startIndex = (page - 1) * 10
      const endIndex = startIndex + 10
      const paginatedMovies = filteredMovies.slice(startIndex, endIndex)

      // Convert to Movie objects (without detailed fields)
      const searchResults: Movie[] = paginatedMovies.map(movie => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster
      }))

      return {
        Search: searchResults,
        totalResults: filteredMovies.length.toString(),
        Response: searchResults.length > 0 ? 'True' : 'False',
        Error: searchResults.length === 0 ? 'Movie not found!' : undefined
      }
    } catch (error) {
      return {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: 'Search failed. Please try again.'
      }
    }
  }

  async getMovieDetails(imdbID: string): Promise<MovieDetails | null> {
    try {
      // Simulate API delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const movie = moviesData.find(m => m.imdbID === imdbID)
      return movie || null
    } catch (error) {
      console.error('Error fetching movie details:', error)
      return null
    }
  }

  async getPopularMovies(): Promise<Movie[]> {
    try {
      // Simulate API delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Return first 6 movies as "popular"
      return moviesData.slice(0, 6).map(movie => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster
      }))
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      return []
    }
  }

  // Netflix-style category methods
  async getFeaturedMovies(): Promise<ExtendedMovieDetails[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      return getFeaturedMovies()
    } catch (error) {
      console.error('Error fetching featured movies:', error)
      return []
    }
  }

  async getContinueWatchingMovies(): Promise<ExtendedMovieDetails[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      return getContinueWatching()
    } catch (error) {
      console.error('Error fetching continue watching:', error)
      return []
    }
  }

  async getMoviesByCategory(category: ExtendedMovieDetails['category']): Promise<ExtendedMovieDetails[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 250))
      return getMoviesByCategory(category)
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error)
      return []
    }
  }

  async getTrendingMovies(): Promise<ExtendedMovieDetails[]> {
    return this.getMoviesByCategory('trending')
  }

  async getActionMovies(): Promise<ExtendedMovieDetails[]> {
    return this.getMoviesByCategory('action')
  }

  async getDramaMovies(): Promise<ExtendedMovieDetails[]> {
    return this.getMoviesByCategory('drama')
  }

  async getComedyMovies(): Promise<ExtendedMovieDetails[]> {
    return this.getMoviesByCategory('comedy')
  }

  async getHorrorMovies(): Promise<ExtendedMovieDetails[]> {
    return this.getMoviesByCategory('horror')
  }

  async getSciFiMovies(): Promise<ExtendedMovieDetails[]> {
    return this.getMoviesByCategory('sci-fi')
  }
}

export const movieService = new MovieService()