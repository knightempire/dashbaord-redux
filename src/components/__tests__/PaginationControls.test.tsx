import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { PaginationControls } from '../PaginationControls'

const mockProps = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 50,
  itemsPerPage: 10,
  onPageChange: jest.fn(),
}

describe('PaginationControls', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders pagination information', () => {
    render(<PaginationControls {...mockProps} />)
    
    // Check for page numbers
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('shows pagination controls when there are multiple pages', () => {
    render(<PaginationControls {...mockProps} />)
    
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  test('calls onPageChange when next button is clicked', async () => {
    const user = userEvent.setup()
    render(<PaginationControls {...mockProps} />)
    
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)
    
    expect(mockProps.onPageChange).toHaveBeenCalledWith(2)
  })

  test('calls onPageChange when previous button is clicked', async () => {
    const user = userEvent.setup()
    render(<PaginationControls {...mockProps} currentPage={3} />)
    
    const prevButton = screen.getByText('Previous')
    await user.click(prevButton)
    
    expect(mockProps.onPageChange).toHaveBeenCalledWith(2)
  })

  test('disables previous button on first page', () => {
    render(<PaginationControls {...mockProps} currentPage={1} />)
    
    const prevButton = screen.getByText('Previous')
    expect(prevButton).toBeDisabled()
  })

  test('disables next button on last page', () => {
    const totalPages = Math.ceil(mockProps.totalItems / mockProps.itemsPerPage)
    render(<PaginationControls {...mockProps} currentPage={totalPages} />)
    
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  test('does not render when there is only one page or less', () => {
    const { container } = render(<PaginationControls {...mockProps} totalItems={5} />)
    
    expect(container.firstChild).toBeNull()
  })

  test('shows ellipsis for large page numbers', () => {
    render(<PaginationControls {...mockProps} totalItems={100} currentPage={10} />)
    
    expect(screen.getByText('...')).toBeInTheDocument()
  })

  test('calls onPageChange when specific page number is clicked', async () => {
    const user = userEvent.setup()
    render(<PaginationControls {...mockProps} />)
    
    // Click on page 3
    const pageButton = screen.getByText('3')
    await user.click(pageButton)
    
    expect(mockProps.onPageChange).toHaveBeenCalledWith(3)
  })

  test('highlights current page', () => {
    render(<PaginationControls {...mockProps} currentPage={3} />)
    
    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('bg-gray-100')
  })
})
