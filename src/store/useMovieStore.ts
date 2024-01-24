import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Movie, MovieDetails } from '../types/movie'

interface MovieStore {
  // Search state
  searchResults: Movie[]
  searchQuery: string
  selectedGenre: string
  currentPage: number
  totalResults: number
  isLoading: boolean
  error: string | null

  // Favorites state
  favorites: Movie[]

  // Movie details state
  selectedMovie: MovieDetails | null
  isLoadingDetails: boolean

  // Actions
  setSearchResults: (results: Movie[], total: number) => void
  setSearchQuery: (query: string) => void
  setSelectedGenre: (genre: string) => void
  setCurrentPage: (page: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Favorites actions
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (movieId: string) => void
  isFavorite: (movieId: string) => boolean
  
  // Movie details actions
  setSelectedMovie: (movie: MovieDetails | null) => void
  setLoadingDetails: (loading: boolean) => void

  // Utility actions
  clearSearch: () => void
  resetState: () => void
}

const initialState = {
  searchResults: [],
  searchQuery: '',
  selectedGenre: '',
  currentPage: 1,
  totalResults: 0,
  isLoading: false,
  error: null,
  selectedMovie: null,
  isLoadingDetails: false,
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      favorites: [],

      setSearchResults: (results, total) => 
        set({ searchResults: results, totalResults: total }),

      setSearchQuery: (query) => 
        set({ searchQuery: query, currentPage: 1 }),

      setSelectedGenre: (genre) => 
        set({ selectedGenre: genre, currentPage: 1 }),

      setCurrentPage: (page) => 
        set({ currentPage: page }),

      setLoading: (loading) => 
        set({ isLoading: loading }),

      setError: (error) => 
        set({ error }),

      addToFavorites: (movie) => {
        const favorites = get().favorites
        if (!favorites.find(fav => fav.imdbID === movie.imdbID)) {
          set({ favorites: [...favorites, movie] })
        }
      },

      removeFromFavorites: (movieId) => {
        const favorites = get().favorites.filter(fav => fav.imdbID !== movieId)
        set({ favorites })
      },

      isFavorite: (movieId) => {
        return get().favorites.some(fav => fav.imdbID === movieId)
      },

      setSelectedMovie: (movie) => 
        set({ selectedMovie: movie }),

      setLoadingDetails: (loading) => 
        set({ isLoadingDetails: loading }),

      clearSearch: () => 
        set({ 
          searchResults: [], 
          searchQuery: '', 
          currentPage: 1, 
          totalResults: 0,
          error: null 
        }),

      resetState: () => 
        set(initialState),
    }),
    {
      name: 'movie-store',
      partialize: (state) => ({ 
        favorites: state.favorites 
      }),
    }
  )
)