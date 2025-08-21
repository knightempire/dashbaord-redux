import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from '@/lib/store/slices/employeesSlice'
import authReducer from '@/lib/store/slices/authSlice'
import Dashboard from '../dashboard/page'


global.fetch = jest.fn()

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      employees: employeesReducer,
      auth: authReducer,
    },
    preloadedState: {
      employees: {
        users: [],
        deletedUsers: [],
        total: 0,
        page: 1,
        limit: 10,
        deletedPage: 1,
        status: 'idle' as const,
        error: null,
      },
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      },
      ...initialState,
    },
  })
}

const renderWithStore = (component: React.ReactElement, store = createMockStore()) => {
  return render(<Provider store={store}>{component}</Provider>)
}


jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      users: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          image: 'john.jpg',
          company: {
            title: 'Software Engineer',
            department: 'Engineering',
            name: 'Tech Corp',
          },
        },
      ],
      total: 1,
    },
  })),
}))

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders dashboard with main components', async () => {
    renderWithStore(<Dashboard />)
    

    expect(screen.getByText('Employees')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('All Employees')).toBeInTheDocument()
    })
  })

  test('displays employee table', async () => {
    renderWithStore(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Employee ID')).toBeInTheDocument()
      expect(screen.getByText('Role')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Teams')).toBeInTheDocument()
    })
  })

  test('shows search functionality', async () => {
    renderWithStore(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search employee/i)).toBeInTheDocument()
    })
  })

  test('displays tabs for all and deleted employees', async () => {
    renderWithStore(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('All Employees')).toBeInTheDocument()
      expect(screen.getByText('Deleted Employees')).toBeInTheDocument()
    })
  })

  test('displays add employee button', async () => {
    renderWithStore(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('New Employee')).toBeInTheDocument()
    })
  })

  test('shows loading state initially', () => {
    const loadingStore = createMockStore({
      employees: {
        users: [],
        deletedUsers: [],
        total: 0,
        page: 1,
        limit: 10,
        deletedPage: 1,
        status: 'loading' as const,
        error: null,
      },
    })
    
    renderWithStore(<Dashboard />, loadingStore)
    

    expect(screen.getByText('Employees')).toBeInTheDocument()
  })

  test('handles error state', () => {
    const errorStore = createMockStore({
      employees: {
        users: [],
        deletedUsers: [],
        total: 0,
        page: 1,
        limit: 10,
        deletedPage: 1,
        status: 'failed' as const,
        error: 'Failed to fetch employees',
      },
    })
    
    renderWithStore(<Dashboard />, errorStore)
    


    expect(screen.getByText('Employees')).toBeInTheDocument()
  })
})
