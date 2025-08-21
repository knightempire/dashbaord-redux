import { configureStore } from '@reduxjs/toolkit'
import employeesReducer, {
  setPage,
  setDeletedPage,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployees,
} from '../employeesSlice'
import { User } from '@/components/types'

// Mock axios
jest.mock('axios')

const mockUser: User = {
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
}

const mockUser2: User = {
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
}

type RootState = {
  employees: ReturnType<typeof employeesReducer>
}

describe('employeesSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>

  beforeEach(() => {
    store = configureStore<RootState>({
      reducer: {
        employees: employeesReducer,
      },
    })
  })

  test('should return the initial state', () => {
    const state = store.getState().employees
    expect(state.users).toEqual([])
    expect(state.deletedUsers).toEqual([])
    expect(state.total).toBe(0)
    expect(state.page).toBe(1)
    expect(state.limit).toBe(10)
    expect(state.deletedPage).toBe(1)
    expect(state.status).toBe('idle')
    expect(state.error).toBe(null)
  })

  test('should handle setPage', () => {
    store.dispatch(setPage(3))
    const state = store.getState().employees
    expect(state.page).toBe(3)
  })

  test('should handle setDeletedPage', () => {
    store.dispatch(setDeletedPage(2))
    const state = store.getState().employees
    expect(state.deletedPage).toBe(2)
  })

  test('should handle addEmployee', () => {
    store.dispatch(addEmployee(mockUser))
    const state = store.getState().employees
    expect(state.users).toHaveLength(1)
    expect(state.users[0]).toEqual(mockUser)
    expect(state.total).toBe(1)
  })

  test('should handle updateEmployee for existing user', () => {
    // First add a user
    store.dispatch(addEmployee(mockUser))
    
    // Then update the user
    const updatedUser = { ...mockUser, firstName: 'Johnny' }
    store.dispatch(updateEmployee(updatedUser))
    
    const state = store.getState().employees
    expect(state.users[0].firstName).toBe('Johnny')
  })

  test('should handle updateEmployee for deleted user', () => {
    // First add and delete a user
    store.dispatch(addEmployee(mockUser))
    store.dispatch(deleteEmployee(mockUser))
    
    // Then update the deleted user
    const updatedUser = { ...mockUser, firstName: 'Johnny' }
    store.dispatch(updateEmployee(updatedUser))
    
    const state = store.getState().employees
    expect(state.deletedUsers[0].firstName).toBe('Johnny')
  })

  test('should handle deleteEmployee', () => {
    // First add a user
    store.dispatch(addEmployee(mockUser))
    store.dispatch(addEmployee(mockUser2))
    
    // Then delete one user
    store.dispatch(deleteEmployee(mockUser))
    
    const state = store.getState().employees
    expect(state.users).toHaveLength(1)
    expect(state.users[0]).toEqual(mockUser2)
    expect(state.deletedUsers).toHaveLength(1)
    expect(state.deletedUsers[0]).toEqual(mockUser)
    expect(state.total).toBe(1)
  })

  test('should handle fetchEmployees.pending', () => {
    const action = { type: fetchEmployees.pending.type }
    const state = employeesReducer(undefined, action)
    expect(state.status).toBe('loading')
  })

  test('should handle fetchEmployees.fulfilled', () => {
    const payload = {
      users: [mockUser, mockUser2],
      total: 2,
    }
    const action = { type: fetchEmployees.fulfilled.type, payload }
    const state = employeesReducer(undefined, action)
    
    expect(state.status).toBe('succeeded')
    expect(state.users).toEqual(payload.users)
    expect(state.total).toBe(payload.total)
  })

  test('should handle fetchEmployees.rejected', () => {
    const action = {
      type: fetchEmployees.rejected.type,
      error: { message: 'Network error' },
    }
    const state = employeesReducer(undefined, action)
    
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Network error')
  })

  test('should handle fetchEmployees.rejected with default error message', () => {
    const action = {
      type: fetchEmployees.rejected.type,
      error: {},
    }
    const state = employeesReducer(undefined, action)
    
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Failed to fetch employees')
  })
})
