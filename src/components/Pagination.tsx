interface PaginationProps {
  currentPage: number
  totalResults: number
  resultsPerPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ 
  currentPage, 
  totalResults, 
  resultsPerPage, 
  onPageChange 
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage)
  
  if (totalPages <= 1) return null

  const pages = []
  const maxVisiblePages = 5
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  
  // Adjust start page if we're near the end
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex justify-center items-center space-x-2" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ← Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded flex items-center justify-center ${
            page === currentPage
              ? 'bg-primary-500 text-white'
              : 'border border-gray-300 hover:bg-gray-100'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
            aria-label={`Page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  )
}