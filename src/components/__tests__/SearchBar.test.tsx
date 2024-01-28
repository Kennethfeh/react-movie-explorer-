import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../SearchBar'

// Mock the store
const mockSetSearchQuery = vi.fn()
const mockSetLoading = vi.fn()
const mockSetError = vi.fn()
const mockSetSearchResults = vi.fn()
const mockSetCurrentPage = vi.fn()
const mockClearSearch = vi.fn()

vi.mock('../../store/useMovieStore', () => ({
  useMovieStore: () => ({
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
    setSearchResults: mockSetSearchResults,
    setLoading: mockSetLoading,
    setError: mockSetError,
    setCurrentPage: mockSetCurrentPage,
    isLoading: false,
    getState: () => ({
      clearSearch: mockClearSearch,
    }),
  }),
}))

// Mock the movie service
vi.mock('../../services/movieService', () => ({
  movieService: {
    searchMovies: vi.fn(() => Promise.resolve({
      Search: [{ imdbID: '1', Title: 'Test Movie', Year: '2020', Type: 'movie', Poster: 'test.jpg' }],
      totalResults: '1',
      Response: 'True',
    })),
  },
}))

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search input with correct placeholder', () => {
    render(<SearchBar />)
    
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
    expect(screen.getByLabelText('Search movies')).toBeInTheDocument()
  })

  it('updates input value when user types', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    
    const input = screen.getByLabelText('Search movies')
    await user.type(input, 'batman')
    
    expect(input).toHaveValue('batman')
  })

  it('submits search on form submission', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    
    const input = screen.getByLabelText('Search movies')
    const submitButton = screen.getByLabelText('Search')
    
    await user.type(input, 'batman')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith('batman')
      expect(mockSetLoading).toHaveBeenCalledWith(true)
    })
  })

  it('shows clear button when input has value', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    
    const input = screen.getByLabelText('Search movies')
    await user.type(input, 'batman')
    
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    
    const input = screen.getByLabelText('Search movies')
    await user.type(input, 'batman')
    
    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)
    
    expect(input).toHaveValue('')
    expect(mockClearSearch).toHaveBeenCalled()
  })

  it('disables input and button when loading', () => {
    vi.mocked(require('../../store/useMovieStore').useMovieStore).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      setSearchResults: mockSetSearchResults,
      setLoading: mockSetLoading,
      setError: mockSetError,
      setCurrentPage: mockSetCurrentPage,
      isLoading: true,
      getState: () => ({ clearSearch: mockClearSearch }),
    })

    render(<SearchBar />)
    
    expect(screen.getByLabelText('Search movies')).toBeDisabled()
    expect(screen.getByLabelText('Search')).toBeDisabled()
  })
})