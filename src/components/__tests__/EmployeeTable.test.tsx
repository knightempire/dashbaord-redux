import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from '@/lib/store/slices/employeesSlice'
import authReducer from '@/lib/store/slices/authSlice'
import { EmployeeTable } from '../EmployeeTable'
import { User } from '../types'

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    image: 'john.jpg',
    status: true,
    company: {
      title: 'Software Engineer',
      department: 'Engineering',
      name: 'Tech Corp',
    },
    role: 'Software Engineer',
    department: 'Engineering',
    teams: 'Frontend',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    image: 'jane.jpg',
    status: false,
    company: {
      title: 'Product Manager',
      department: 'Product',
      name: 'Tech Corp',
    },
    role: 'Product Manager',
    department: 'Product',
    teams: 'Product Team',
  },
]

const mockDeletedUsers: User[] = [
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    image: 'bob.jpg',
    status: false,
    company: {
      title: 'Designer',
      department: 'Design',
      name: 'Tech Corp',
    },
    role: 'Designer',
    department: 'Design',
    teams: 'UI/UX',
  },
]

const createMockStore = () => {
  return configureStore({
    reducer: {
      employees: employeesReducer,
      auth: authReducer,
    },
    preloadedState: {
      employees: {
        users: mockUsers,
        deletedUsers: mockDeletedUsers,
        total: mockUsers.length,
        page: 1,
        limit: 10,
        deletedPage: 1,
        status: 'succeeded' as const,
        error: null,
      },
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      },
    },
  })
}

const renderWithStore = (component: React.ReactElement, store = createMockStore()) => {
  return render(<Provider store={store}>{component}</Provider>)
}

const mockProps = {
  users: mockUsers,
  loading: false,
  activeTab: 'all' as const,
  searchQuery: '',
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  deletedUsers: mockDeletedUsers,
  deletedPage: 1,
  deletedLimit: 10,
}

describe('EmployeeTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders employee table with headers', () => {
    renderWithStore(<EmployeeTable {...mockProps} />)
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Employee ID')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Teams')).toBeInTheDocument()
  })

  test('displays loading state', () => {
    renderWithStore(<EmployeeTable {...mockProps} loading={true} />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('displays employee data correctly', () => {
    renderWithStore(<EmployeeTable {...mockProps} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument()
  })

  test('filters employees based on search query', () => {
    renderWithStore(<EmployeeTable {...mockProps} searchQuery="John" />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  test('displays deleted employees when activeTab is deleted', () => {
    renderWithStore(<EmployeeTable {...mockProps} activeTab="deleted" />)
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
  })

  test('shows no deleted employees message when deleted list is empty', () => {
    renderWithStore(<EmployeeTable {...mockProps} activeTab="deleted" deletedUsers={[]} />)
    
    expect(screen.getByText('No deleted employees.')).toBeInTheDocument()
  })

  test('checkbox is present in table header', () => {
    renderWithStore(<EmployeeTable {...mockProps} />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
    expect(checkboxes[0]).toBeInTheDocument()
  })

  test('search functionality works with different fields', () => {
    // Test search by email
    renderWithStore(<EmployeeTable {...mockProps} searchQuery="jane.smith" />)
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  test('search is case insensitive', () => {
    renderWithStore(<EmployeeTable {...mockProps} searchQuery="JOHN" />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('empty search query shows all employees', () => {
    renderWithStore(<EmployeeTable {...mockProps} searchQuery="" />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})
