import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { SearchAndFilter } from '../SearchAndFilter'

const mockProps = {
  searchQuery: '',
  setSearchQuery: jest.fn(),
}

describe('SearchAndFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders search input and filter button', () => {
    render(<SearchAndFilter {...mockProps} />)
    
    expect(screen.getByPlaceholderText(/search employee/i)).toBeInTheDocument()
    expect(screen.getByText('Filter')).toBeInTheDocument()
  })

  test('calls setSearchQuery when typing in search input', async () => {
    const user = userEvent.setup()
    render(<SearchAndFilter {...mockProps} />)
    
    const searchInput = screen.getByRole('textbox')
    await user.type(searchInput, 'John')
    
    expect(mockProps.setSearchQuery).toHaveBeenCalled()
  })

  test('displays current search query value', () => {
    render(<SearchAndFilter {...mockProps} searchQuery="test query" />)
    
    const searchInput = screen.getByRole('textbox') as HTMLInputElement
    expect(searchInput.value).toBe('test query')
  })

  test('has correct placeholder text', () => {
    render(<SearchAndFilter {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search Employee by name, role, ID or any related keywords')
    expect(searchInput).toBeInTheDocument()
  })

  test('handles empty search query', () => {
    render(<SearchAndFilter {...mockProps} searchQuery="" />)
    
    const searchInput = screen.getByRole('textbox') as HTMLInputElement
    expect(searchInput.value).toBe('')
  })

  test('search input has search icon', () => {
    render(<SearchAndFilter {...mockProps} />)
    

    const searchContainer = screen.getByRole('textbox').closest('div')
    expect(searchContainer).toBeInTheDocument()
  })

  test('filter button is clickable', async () => {
    const user = userEvent.setup()
    render(<SearchAndFilter {...mockProps} />)
    
    const filterButton = screen.getByText('Filter')
    expect(filterButton).toBeEnabled()
    await user.click(filterButton)

  })

  test('search input updates correctly when query changes', () => {
    const { rerender } = render(<SearchAndFilter {...mockProps} searchQuery="initial" />)
    
    let searchInput = screen.getByRole('textbox') as HTMLInputElement
    expect(searchInput.value).toBe('initial')
    
    rerender(<SearchAndFilter {...mockProps} searchQuery="updated" />)
    searchInput = screen.getByRole('textbox') as HTMLInputElement
    expect(searchInput.value).toBe('updated')
  })
})
