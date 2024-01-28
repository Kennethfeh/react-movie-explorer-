import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MovieCard } from '../MovieCard'
import type { Movie } from '../../types/movie'

// Mock the store
vi.mock('../../store/useMovieStore', () => ({
  useMovieStore: () => ({
    isFavorite: vi.fn(() => false),
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  }),
}))

const mockMovie: Movie = {
  imdbID: 'tt0111161',
  Title: 'The Shawshank Redemption',
  Year: '1994',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg',
}

const renderMovieCard = (movie: Movie = mockMovie) => {
  return render(
    <BrowserRouter>
      <MovieCard movie={movie} />
    </BrowserRouter>
  )
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    renderMovieCard()
    
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument()
    expect(screen.getByText('1994')).toBeInTheDocument()
    expect(screen.getByText('movie')).toBeInTheDocument()
    expect(screen.getByAltText('The Shawshank Redemption poster')).toBeInTheDocument()
  })

  it('creates correct link to movie details', () => {
    renderMovieCard()
    
    const link = screen.getByLabelText('View details for The Shawshank Redemption')
    expect(link).toHaveAttribute('href', '/movie/tt0111161')
  })

  it('handles poster error by showing placeholder', () => {
    renderMovieCard()
    
    const img = screen.getByAltText('The Shawshank Redemption poster') as HTMLImageElement
    fireEvent.error(img)
    
    expect(img.src).toContain('via.placeholder.com')
  })

  it('displays placeholder poster when poster is N/A', () => {
    const movieWithNoPoster = { ...mockMovie, Poster: 'N/A' }
    renderMovieCard(movieWithNoPoster)
    
    const img = screen.getByAltText('The Shawshank Redemption poster') as HTMLImageElement
    expect(img.src).toContain('via.placeholder.com')
  })

  it('has proper accessibility attributes', () => {
    renderMovieCard()
    
    expect(screen.getByLabelText('View details for The Shawshank Redemption')).toBeInTheDocument()
    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument()
  })
})