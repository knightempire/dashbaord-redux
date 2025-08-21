import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from '@/lib/store/slices/employeesSlice'
import authReducer from '@/lib/store/slices/authSlice'
import { CreateEmployeeModal } from '../CreateEmployeeModal'

const createMockStore = () => {
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
    },
  })
}

const renderWithStore = (component: React.ReactElement, store = createMockStore()) => {
  return render(<Provider store={store}>{component}</Provider>)
}

const mockProps = {
  show: true,
  onClose: jest.fn(),
  onSave: jest.fn(() => ({ success: true })),
  setToast: jest.fn(),
}

describe('CreateEmployeeModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders create employee modal when open', () => {
    renderWithStore(<CreateEmployeeModal {...mockProps} />)
    
    expect(screen.getByText('Create Employee')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
  })

  test('does not render modal when closed', () => {
    renderWithStore(<CreateEmployeeModal {...mockProps} show={false} />)
    
    expect(screen.queryByText('Create Employee')).not.toBeInTheDocument()
  })

  test('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup()
    renderWithStore(<CreateEmployeeModal {...mockProps} />)
    
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('allows typing in form fields', async () => {
    const user = userEvent.setup()
    renderWithStore(<CreateEmployeeModal {...mockProps} />)
    
    const firstNameInput = screen.getByPlaceholderText('First Name')
    const lastNameInput = screen.getByPlaceholderText('Last Name')
    
    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    
    expect(firstNameInput).toHaveValue('John')
    expect(lastNameInput).toHaveValue('Doe')
  })

  test('calls onSave when save button is clicked', async () => {
    const user = userEvent.setup()
    renderWithStore(<CreateEmployeeModal {...mockProps} />)
    
    await user.type(screen.getByPlaceholderText('First Name'), 'John')
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
    
    const saveButton = screen.getByText('Save changes')
    await user.click(saveButton)
    
    expect(mockProps.onSave).toHaveBeenCalledWith('John', 'Doe')
  })

  test('shows error when save fails', async () => {
    const user = userEvent.setup()
    const failingOnSave = jest.fn(() => ({ success: false, error: 'Save failed' }))
    renderWithStore(<CreateEmployeeModal {...mockProps} onSave={failingOnSave} />)
    
    await user.type(screen.getByPlaceholderText('First Name'), 'John')
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
    
    const saveButton = screen.getByText('Save changes')
    await user.click(saveButton)
    
    expect(screen.getByText('Save failed')).toBeInTheDocument()
  })

  test('closes modal on successful submission', async () => {
    const user = userEvent.setup()
    renderWithStore(<CreateEmployeeModal {...mockProps} />)
    
    await user.type(screen.getByPlaceholderText('First Name'), 'John')
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
    
    const saveButton = screen.getByText('Save changes')
    await user.click(saveButton)
    

    expect(mockProps.setToast).toHaveBeenCalledWith(true)
    
    await waitFor(() => {
      expect(mockProps.onClose).toHaveBeenCalled()
    }, { timeout: 3000 })
  })
})
